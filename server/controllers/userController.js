const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    try {
        // Get data from signup form
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            // If duplicate found, return a conflict status (HTTP 409)
            return res.status(409).json({ status: 409, message: "Email or username already exists" });
        }

        // Hash password with random salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a "User" with the defined model
        const user = new User({
            email,
            username,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();
        res.status(201).json({ status: 201, data: user });
    } catch (e) {
        res.status(500).json({ status: 500, message: "An error occurred" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({email });
        console.log(user)
        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Check if the passwords match
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (user) {
            const generateToken = () => {
                const issuedAt = Math.floor(Date.now() / 1000); // Current time in seconds
                const expiration = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour from now in seconds
                const token = jwt.sign(
                    {
                        username:user.username,
                        iat: issuedAt,
                        exp: expiration,
                        // other claims or payload data here...
                    },
                    "madhatter"
                );
            
                return token;
            };
            // If everything is valid, generate a JWT token which holds the identity of the new user
           
            const token = generateToken(); // Replace "jeff" with an env variable
            // Set the token as an HTTP-only cookie in the response
            res.cookie('token', token, { httpOnly: true });

            // Return the user and token in the response
            res.status(200).json({ user, token });
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'An error occurred' });
    }
};

module.exports = { createUser, loginUser };

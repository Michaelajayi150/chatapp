import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Chatrooms from './components/Chatrooms';
import WelcomePage from './components/WelcomePage';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chatroom/:id" component={Chat} />
        <Route exact path="/chatrooms" component={Chatrooms} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp'
import Feed from './Components/Feed'
import Login from './Components/Login'
import {AuthProvider} from './Context/AuthContext'
import { BrowserRouter as Router, Switch,Route} from "react-router-dom"
import PrivateRoute from './Components/PrivateRoute'

import React from 'react';
function App() {
  return (
  
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/" component={Feed}/>
            <Route path="/Login" component={Login}/>
            <Route path="/SignUp" component={SignUp}/>
          </Switch>
        </AuthProvider>
      </Router>
   
  );
}

export default App;

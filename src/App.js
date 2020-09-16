import React, { useState, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/navbar/TopNav';
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Destination from './components/destination/Destination';
import Hotels from './components/hotels/Hotels';
import Login from './components/login/Login';
import PrivateRoute from './components/login/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    signed: false,
    name: '',
    email: '',
    password: '',
    message: ''
  });

  return (
    <main>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <TopNav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/destination/:placeName" component={Destination} />
            <PrivateRoute path="/hotels/:placeName">
              <Hotels />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </main>
  );
}

export default App;

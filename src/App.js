import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from './components/navbar/TopNav';
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Destination from './components/destination/Destination';

function App() {
  return (
    <main>
      <Router>
        <TopNav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/destination/:placeName">
            <Destination />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;

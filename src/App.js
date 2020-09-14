import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Sorting from "./Sorting";
import Home from "./Home"
function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Switch>
                <Route path="/sorting">
                  <Sorting/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

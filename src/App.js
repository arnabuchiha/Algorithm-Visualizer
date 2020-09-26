import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Sorting from "./components/Sorting/Sorting";
import Home from "./components/Home"
import Pathfinding from "./components/Pathfinding/Pathfinding"
import ConvexHull from './components/ConvexHull/ConvexHull';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Switch>
                <Route path="/pathfind">
                  <Pathfinding/>
                </Route>
                <Route path="/sorting">
                  <Sorting/>
                </Route>
                <Route path="/convexhull">
                  <ConvexHull/>
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

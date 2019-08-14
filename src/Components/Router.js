import React from "react";

//import necessary Components from react-router-dom module
//https://reacttraining.com/react-router/web/example/url-params
import { BrowserRouter as MainRouter, Route, Switch, NavLink } from "react-router-dom";

//import our Components to be displayed in this Router.js Component
import Searcher from './Searcher';
import Gallery from './Gallery';
import Home from './Home';
import Error from './Error';

function Router() {
  return (
    <MainRouter>
      <div className="image-finder-title">
        <span className="title-blue">I</span>
        <span className="title-red">m</span>
        <span className="title-yellow">a</span>
        <span className="title-green">g</span>
        <span className="title-blue">e</span>
        &nbsp;
        <span className="title-red">F</span>
        <span className="title-yellow">i</span>
        <span className="title-blue">n</span>
        <span className="title-red">d</span>
        <span className="title-green">e</span>
        <span className="title-yellow">r</span> 
        </div>
      <Searcher />
    <div>
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/gallery/butterflies">Butterflies</NavLink>
          </li>
          <li>
            <NavLink to="/gallery/Cinderella">Cinderella</NavLink>
          </li>
          <li>
            <NavLink to="/gallery/Lion%20King">Lion King</NavLink>
          </li>
        </ul>
      </nav>
    </div>
    {/*three Switch routes:
        1) home page
        2) gallery page
               (accessible from search and nav links - or direct address bar manip)
        3) Error page - default route when the above two are not reached (404)
                  "https://reacttraining.com/react-router/web/guides/basic-components
                  "https://reacttraining.com/react-router/web/example/url-params"
    */}
      <Switch>
        <Route exact path="/" component={Home} />   
        <Route path="/gallery/:type" component={Gallery} />
        <Route component={Error} />
      </Switch>
    </MainRouter>
  );
}

export default Router;
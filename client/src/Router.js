import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Home from "./Home";

function MyRouter() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route />
    </Router>
  );
}

export default MyRouter;

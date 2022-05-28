import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import Editor from "./components/Editor/Editor";
import { pageLoad } from "./redux/actions/pageAction";
import MemberPage from "./pages/MemberPage/MemberPage";
import QnApage from  "./pages/QnAPage/QnAPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    pageLoad()(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/editor/:pageId" component={Editor}></Route>
        <Route exact path="/MemberPage" component={MemberPage}></Route>
        <Route exact path="/QnAPage" component={QnApage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

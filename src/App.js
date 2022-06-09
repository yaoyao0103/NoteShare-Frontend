import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import Editor from "./components/Editor/Editor";
import { pageLoad } from "./redux/actions/pageAction";
import MemberPage from "./pages/MemberPage/MemberPage";
import QnADetailPage from "./pages/QnADetailPage/QnADetailPage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetailPage";
import RewardDetailPage from "./pages/RewardDetailPage/RewardDetailPage";
import RewardOutlinePage from "./pages/RewardOutlinePage/RewardOutlinePage";
import QnAOutlinePage from "./pages/QnAOutlinePage/QnAOutlinePage";
import CollabDetailPage from "./pages/CollabDetailPage/CollabDetailPage";
import CollabOutlinePage from "./pages/CollabOutlinePage/CollabOutlinePage";
import ScreenShotCapture from "./pages/ScreenShotCapture";

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
        <Route exact path="/QnADetailPage" component={QnADetailPage}></Route>
        <Route exact path="/RewardDetailPage" component={RewardDetailPage}></Route>
        <Route exact path="/RewardOutlinePage" component={RewardOutlinePage}></Route>
        <Route exact path="/NoteDetailPage" component={NoteDetailPage}></Route>
        <Route exact path="/QnAOutlinePage" component={QnAOutlinePage}></Route>
        <Route exact path="/CollabDetailPage" component={CollabDetailPage}></Route>
        <Route exact path="/CollabOutlinePage" component={CollabOutlinePage}></Route>
        <Route exact path="/ScreenShotCapture" component={ScreenShotCapture}></Route>
      </Switch>
    </Router>
  );
}

export default App;

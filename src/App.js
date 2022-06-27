import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./Home";
import Editor from "./components/Editor/Editor";
import { pageLoad } from "./redux/actions/pageAction";
import MemberPage from "./pages/MemberPage/MemberPage";
import QnADetailPage from "./pages/QnADetailPage/QnADetailPage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetailPage";
import NoteOutlinePage from "./pages/NoteOutlinePage/NoteOutlinePage";
import RewardDetailPage from "./pages/RewardDetailPage/RewardDetailPage";
import RewardOutlinePage from "./pages/RewardOutlinePage/RewardOutlinePage";
import QnAOutlinePage from "./pages/QnAOutlinePage/QnAOutlinePage";
import CollabDetailPage from "./pages/CollabDetailPage/CollabDetailPage";
import CollabOutlinePage from "./pages/CollabOutlinePage/CollabOutlinePage";
import ScreenShotCapture from "./pages/ScreenShotCapture";
import QnAEditPage from "./pages/QnAEditPage/QnAEditPage";
import RewardEditPage from "./pages/RewardEditPage/RewardEditPage";
import CollabEditPage from "./pages/CollabEditPage/CollabEditPage";
import NoteEditPage from "./pages/NoteEditPage/NoteEditPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
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
        <Route exact path="/NoteDetailPage" component={NoteDetailPage}></Route>
        <Route exact path="/NoteOutlinePage" component={NoteOutlinePage}></Route>
        <Route exact path="/RewardOutlinePage" component={RewardOutlinePage}></Route>
        <Route exact path="/RewardDetailPage" component={RewardDetailPage}></Route>
        <Route exact path="/RewardEditPage" component={RewardEditPage}></Route>
        <Route exact path="/QnAOutlinePage" component={QnAOutlinePage}></Route>
        <Route exact path="/QnADetailPage" component={QnADetailPage}></Route>
        <Route exact path="/QnAEditPage" component={QnAEditPage}></Route>
        <Route exact path="/CollabOutlinePage" component={CollabOutlinePage}></Route>
        <Route exact path="/CollabDetailPage" component={CollabDetailPage}></Route>
        <Route exact path="/CollabEditPage" component={CollabEditPage}></Route>
        <Route exact path="/ScreenShotCapture" component={ScreenShotCapture}></Route>
        <Route exact path="/NoteEditPage" component={NoteEditPage}></Route>
        <Route exact path="/ProfilePage" component={ProfilePage}></Route>
        <Route exact path="/LoginPage" component={LoginPage}></Route>
        <Route exact path="/SignUpPage" component={SignUpPage}></Route>
        <Route exact path="/VerificationPage/:email" component={VerificationPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

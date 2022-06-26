import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import QnAEditPage from "./pages/QnAEditPage/QnAEditPage";
import RewardEditPage from "./pages/RewardEditPage/RewardEditPage";
import CollabEditPage from "./pages/CollabEditPage/CollabEditPage";
import NoteEditPage from "./pages/NoteEditPage/NoteEditPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    pageLoad()(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/editor/:pageId" element={<Editor />}></Route>
        <Route exact path="/MemberPage" element={<MemberPage />}></Route>
        <Route exact path="/RewardOutlinePage" element={<RewardOutlinePage />}></Route>
        <Route exact path="/RewardDetailPage" element={<RewardDetailPage />}></Route>
        <Route exact path="/RewardEditPage" element={<RewardEditPage />}></Route>
        <Route exact path="/QnAOutlinePage" element={<QnAOutlinePage />}></Route>
        <Route exact path="/QnADetailPage" element={<QnADetailPage />}></Route>
        <Route exact path="/QnAEditPage" element={<QnAEditPage />}></Route>
        <Route exact path="/CollabOutlinePage" element={<CollabOutlinePage />}></Route>
        <Route exact path="/CollabDetailPage" element={<CollabDetailPage />}></Route>
        <Route exact path="/CollabEditPage/:action/:postId" element={<CollabEditPage />}></Route>
        <Route exact path="/ScreenShotCapture" element={<ScreenShotCapture />}></Route>
        <Route exact path="/NoteDetailPage/:noteId" element={<NoteDetailPage />}></Route>
        <Route exact path="/NoteEditPage/:noteId" element={<NoteEditPage />}></Route>
        <Route exact path="/NoteNewPage/:folderId" element={<NoteEditPage />}></Route>
        <Route exact path="/ProfilePage" element={<ProfilePage />}></Route>
        <Route exact path="/PersonalPage" element={<PersonalPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

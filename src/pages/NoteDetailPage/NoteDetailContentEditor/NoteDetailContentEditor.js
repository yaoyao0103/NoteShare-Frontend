
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../api_utils";
import geditorConfig from "../../../api_utils/geditor_config";
import TopNav from "../../../components/Page/TopNav";
import "./NoteDetailContentEditor.css";
//import PageSection from "../Page/PageSection";

const NoteDetailContentEditor = ( { noteId } ) => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;
/*
  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`);
        setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
      }
    }

    getAllAssets();
  }, []);
  */

  useEffect(() => {
    async function getNoteById() {
      try {
        /*const response = await axios.get(`${API_HOST}note/${noteId}`);
        const note = response.data;*/
        const note = require('./noteTestJson.json');
        console.log(note);
      } catch (error) {
      }
    }

    getNoteById();
  }, []);

/*
  useEffect(() => {
    const editor = geditorConfig(assets, pageId);
    setEditor(editor);
    stompClient = editor.stompClient;
  }, [pageId, assets]);*/


  return (
    
    <div className="App">
      <div id = "editor-area" style={{
        z: -99,
      }}>
        <div className="NoteDetailContentEditor_Main_Content-content" id="NoteDetailContentEditor_Main_Content">
          
          <div id="editor"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailContentEditor;


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

  /*useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`);
        setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
      }
    }

    getAllAssets();
  }, []);*/


  useEffect(() => {
    console.log("noteId", noteId)
    const editor = geditorConfig(assets, noteId);
    setEditor(editor);
  }, [noteId, assets]);


  return (
    
    <div className="App">
      <div id = "editor-area" style={{
        z: -99,
      }}>
        <div className="noteDetailContentEditor__Content" id="noteDetailContentEditor__Content">
          <div id="editor"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailContentEditor;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../api_utils";
import geditorConfig from "../../../api_utils/geditor_config";
import TopNav from "../../../components/Page/TopNav";
import "./ContentEditor.css";
//import PageSection from "../Page/PageSection";

const ContentEditor = ( { versionId } ) => {
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
    console.log("versionId", versionId)
    const editor = geditorConfig(assets, versionId);
    setEditor(editor);
  }, [versionId, assets]);


  return (
    
    <div className="App">
      <div className = "content__Editor" >
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default ContentEditor;

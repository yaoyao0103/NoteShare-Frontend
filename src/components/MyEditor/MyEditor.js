import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_HOST } from "../../api_utils";
import Sidebar from "../Page/Sidebar";
import TopNav from "../Page/TopNav";
import Navbar from "../Navbar/Navbar"
import geditorConfig from "../../api_utils/geditor_config";
import { Layout, Row, Col } from 'antd';
import "./MyEditor.css"
//import PageSection from "../Page/PageSection";

const MyEditor = (props) => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);

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
  }, []);*/


  useEffect(() => {
    console.log("props", props)
    const editor = geditorConfig(assets, props.noteId, props.version, props.isCollab? props.isCollab:false, props.email, props.name, props.avatar, props.setQueue);
    setEditor(editor);
    
  }, [props.noteId, props.version, props.isCollab, props.email, props.name, props.avatar, assets]);

  return (
    
    <Layout className="myEditor">
        <Row>
            {props.page == 'NoteEditPage' || props.page == 'NoteNewPage' || props.page == 'CollabNoteEditPage'? 
              <>
                <Col span={5}>
                <Sidebar />
                </Col>
                <Col span={19}>
                    <TopNav />
                    <div id="editor"></div>
                </Col>
              </>
              :
              <>
                  <div id="editor"></div>
              </>
            }
            
        </Row>
    </Layout>
  );
};

export default MyEditor;

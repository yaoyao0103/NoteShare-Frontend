//import "./Editor.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import { useSelector } from "react-redux";
import { API_HOST } from "../../api_utils";
import Sidebar from "../Page/Sidebar";
import TopNav from "../Page/TopNav";
import Navbar from "../Navbar/Navbar"
import geditorConfig from "../../api_utils/geditor_config";
import Cookie from "../Cookies/Cookies";
import { message } from "antd";
//import PageSection from "../Page/PageSection";

const Editor = (props) => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const { pageId } = useParams();

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;
  const cookieParser = new Cookie(document.cookie)
  useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`, {
          headers: {
            'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
          }
        });
        setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
        if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
          if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again!')
        }
        else {
          message.error('Server Error! Please try again later.')
        }
      }
    }

    getAllAssets();
  }, []);


  useEffect(() => {
    const editor = geditorConfig(assets, pageId);
    setEditor(editor);
  }, [pageId, assets]);

  return (

    <div className="App">
      <Navbar setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} />
      <div id="editor-area">
        <div className="sidenav d-flex flex-column overflow-scroll">
          {/* <div id="navbar" className="sidenav d-flex flex-column overflow-scroll"> */}
          {/* <nav className="navbar navbar-light">
            { <div className="container-fluid">
              <span className="navbar-brand mb-0 h3 logo">Code Dexterous</span>
            </div> }
          </nav> */}
          {/* <PageSection pages={pages} /> */}
          <Sidebar />
        </div>
        <div className="main-content" id="main-content">
          <TopNav />
          <div id="editor"></div>

        </div>
      </div>
    </div>
  );
};

export default Editor;

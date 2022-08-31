
import React, { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import { useSelector } from "react-redux";
import { API_HOST } from "../../../api_utils";
import geditorConfig from "../../../api_utils/geditor_config";
import TopNav from "../../../components/Page/TopNav";
//import "./ContentEditor.css";
//import PageSection from "../Page/PageSection";

const ContentEditor = ({ versionId }) => {
  const [editor, setEditor] = useState(null);
  const [assets, setAssets] = useState([]);
  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

  /*useEffect(() => {
    async function getAllAssets() {
      try {
        const response = await axios.get(`${API_HOST}assets/`,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        });
        setAssets(response.data);
      } catch (error) {
        setAssets(error.message);
         if (error.response.status === 500 || error.response.status === 404){
                    document.cookie = 'error=true'
                }
                else if (error.response.status === 403){
                    {
                            document.cookie = 'error=Jwt'
message.destroy()
message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({page:'LoginPage'})
                        }                       
                }
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
      <div className="content__Editor" >
        <div id="editor"></div>
      </div>
    </div>
  );
};

export default ContentEditor;

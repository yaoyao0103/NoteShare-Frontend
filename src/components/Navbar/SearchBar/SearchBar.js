import React, { useState, useRef, useEffect } from 'react'
import "./SearchBar.css"
import { message, Tabs } from 'antd';
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import Text from "../../Text/Text";
import AdvancedSearch from './AdvancedSearch/AdvancedSearch';


const { TabPane } = Tabs;


const SearchBar = () => {
  const [selected, setSelected] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [keyword, setKeyword] = useState('');
  const ref = useRef(null)

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAdvanced(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onSearch = () => {
    message.info(keyword);
  }
  const onChange = (ev) =>{
    setKeyword(ev.target.value);
  }
  
  return (
    
    //<Search className='navSearchBar' placeholder="" />
    <>
      <div className={`navSearchBar ${ selected && "navSearchBar--selected"}`} >
        <input 
          onFocus={() => setSelected(true)}  
          onBlur={() => setSelected(false)} 
          onChange={onChange}
          type="text" 
          className='navSearchBar__Input' 
          value = {keyword}
        />
        <SearchOutlined className='navSearchBar__Button' onClick={onSearch}/>
        <MoreOutlined className='navSearchBar__Button' onClick={() => setAdvanced(!advanced)}/>
      </div>
      <div ref={ref} className={`navSearchBar__AdvancedSearch ${ advanced? "navSearchBar__AdvancedSearch--show":"navSearchBar__AdvancedSearch--hidden"}`}>
        <Tabs className="navSearchBar__AdvancedSearch__Tab" defaultActiveKey="1"   >
          <TabPane className="navSearchBar__AdvancedSearch__Tab__Pane" tab={ <Text color='black' cls='Small' content={"Note"} fontSize={"14"} display="inline-block" />} key="1">
            <AdvancedSearch type={"note"} className="navSearchBar__AdvancedSearch__Tab__Items"/>
          </TabPane>
          <TabPane className="navSearchBar__AdvancedSearch__Tab__Pane" tab={<Text color='black' cls='Small' content={"Collab"} fontSize={"14"} display="inline-block" />} key="2">
            <AdvancedSearch type={"collab"} className="navSearchBar__AdvancedSearch__Tab__Items"/>
          </TabPane>
          <TabPane className="navSearchBar__AdvancedSearch__Tab__Pane" tab={<Text color='black' cls='Small' content={"Reward"} fontSize={"14"} display="inline-block" />} key="3">
            <AdvancedSearch type={"reward"} className="navSearchBar__AdvancedSearch__Tab__Items"/>
          </TabPane>
          <TabPane className="navSearchBar__AdvancedSearch__Tab__Pane" tab={<Text color='black' cls='Small' content={"QnA"} fontSize={"14"} display="inline-block" />} key="4">
            <AdvancedSearch type={"QnA"} className="navSearchBar__AdvancedSearch__Tab__Items"/>
          </TabPane>
          <TabPane className="navSearchBar__AdvancedSearch__Tab__Pane" tab={<Text color='black' cls='Small' content={"Folder"} fontSize={"14"} display="inline-block" />} key="5">
            <AdvancedSearch type={"folder"} className="navSearchBar__AdvancedSearch__Tab__Items"/>
          </TabPane>
        </Tabs>
      </div>
      
    </>
    
  )
}

export default SearchBar

// rafce
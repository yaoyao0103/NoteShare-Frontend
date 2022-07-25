import React,{useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './NavMenu.css';
import { Menu, Select } from 'antd';
const { Option } = Select;
const data = require("../../../EducationSet.json");
function NavMenu(props){
    /*const [departments, setDepartments] = useState([])
    useEffect(() => {
      const list = new Array()
      data.departments.map((department, index)=>{
        list.push({key:index, icon:undefined, children:undefined, label:department, type:undefined})
      })
      setDepartments(list)

      
    },[])
    
    function getItem(label, key, icon, children, type) {
        return{key,icon,children,label,type};
    };
    const items = [
        getItem('Department', 'sub1', null, departments),

      ];*/

  return (
      <div className='navMenu'>
        {/* <Menu id='Menu'mode="inline" items={items}/> */}
        <Select defaultValue={"Department"} showSearch className="navMenu__Dropdown" onChange={(department) => {props.setPageProps({page:'NoteOutlinePage', pageNumber:1,sortMode:'likeCount',department:department})}}>
            {data.departments.map((department) => (
                <Option key={department}>{department}</Option>
            )
            )}
        </Select>
      </div>
  );

}
export default NavMenu;
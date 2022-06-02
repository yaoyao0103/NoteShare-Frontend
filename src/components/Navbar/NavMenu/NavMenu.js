import React,{useState} from 'react';
import 'antd/dist/antd.css';
import './NavMenu.css';
import { Menu } from 'antd';
function NavMenu(){
    
    function getItem(label, key, icon, children, type) {
        return{key,icon,children,label,type};
    };
    const items = [
        getItem('Department', 'sub1', null, [
            getItem('資工系', '1'),
            getItem('電機系', '2'),
            getItem('輪機系', '3'),
            getItem('法律系', '4'),
        ]),
      ];
    const{Items,setItems}=useState( [
        getItem('Department', 'sub1', null, [
          getItem('資工系', '1'),
          getItem('電機系', '2'),
          getItem('輪機系', '3'),
          getItem('法律系', '4'),
        ]),
      ]);
   

  return (
      <div id='navMenu'>
        <Menu id='Menu'mode="inline" items={items}/>
      </div>
  );

}
export default NavMenu;
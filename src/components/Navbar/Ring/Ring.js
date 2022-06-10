import React from "react";
import { Dropdown, Menu,Divider } from 'antd';
import { BellOutlined} from '@ant-design/icons';
import './Ring.css';
import Text from "../../Text/Text";

function Ring() {
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                        
                        <Text className='Ring__item__text' cls='Gerneral' fontSize='16'content={'1st menu item51165115151561'}/>
                        </> 
                           
                       
                        
                    ),
                },
                {
                    key: '2',
                    label: (
                        <>
                        <Text className='Ring__item__text' cls='Gerneral' fontSize='16'content={'2nd menu item51165115151561'}/>
                        </> 
                    ),
                },
                {
                    key: '3',
                    label: (
                        <>
                        <Text className='Ring__item__text' cls='Gerneral' fontSize='16'content={'3rd menu item51165115151561'}/>
                        </> 
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            <Dropdown
                className='Ring__Dropdown'
                overlay={menu}
                trigger='click'
                placement="bottom"
            >
                <BellOutlined className='Ring__Bell__Button' style={{fontSize:'24px'}}/>
            </Dropdown>

        </div>
    );
}
export default Ring;
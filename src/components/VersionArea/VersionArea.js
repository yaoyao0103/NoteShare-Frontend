import React from 'react';
import { List, message } from 'antd';
import Text from '../Text/Text';
import OptionMenu from '../OptionMenu/OptionMenu';

const VersionArea = (props) => {

  return (
    <List
      size="large"
      dataSource={props.versions}
      renderItem={(item, index) => (index !=0 && <List.Item actions={

          [
            <OptionMenu page={"NoteDetailPageVersion"} index = {index} versions={props.versions} setVersion={props.setVersion}/>
          ]
    } >{item.name}</List.Item>)}
    />
  )
}

export default VersionArea
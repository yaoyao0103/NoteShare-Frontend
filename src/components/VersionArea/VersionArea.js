import React, {useEffect} from 'react';
import { List, message } from 'antd';
import OptionMenu from '../OptionMenu/OptionMenu';

const VersionArea = (props) => {
  useEffect(() => {
    console.log(props)
  },[props])

  return (
    <List
      size="large"
      dataSource={props.versions}
      renderItem={(item, index) => (index !=0 && <List.Item actions={

          [
            <OptionMenu page={props.page} index = {index} versions={props.versions} setVersion={props.setVersion}/>
          ]
    } >{item.name}</List.Item>)}
    />
  )
}

export default VersionArea

//page: NoteDetailPageVersion
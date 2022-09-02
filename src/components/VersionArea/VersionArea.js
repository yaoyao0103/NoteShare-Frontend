import React, {useEffect} from 'react';
import { List, message } from 'antd';
import OptionMenu from '../OptionMenu/OptionMenu';

const VersionArea = (props) => {

  return (
    <List
      size="large"
      dataSource={props.versions}
      renderItem={(item, index) => ((index !=0 && ((props.isAuthor) || (!props.isAuthor && !props.versions[index].temp))) && <List.Item actions={

          [
            <div style={props.versions[index].temp?{color: "red" , margin:".5em 0 .5em 0"}:{color: "green", margin:".5em 0 .5em 0"}}>{props.notePublic? (props.versions[index].temp? "Private":"Public"):""}</div>,
            <OptionMenu setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps}page={props.page} index = {index} versions={props.versions} setVersions={props.setVersions} setVersion={props.setVersion} isAuthor={props.isAuthor} notePublic={props.notePublic} id={props.id}/>
          ]
    } >{item.name}</List.Item>)}
    />
  )
}

export default VersionArea

//page: NoteDetailPageVersion
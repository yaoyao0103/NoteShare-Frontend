import React, { useEffect, useState } from "react";
import "./OptionMenu.css";
import { Menu, Dropdown, Space, Drawer, message } from "antd";
import { EditOutlined, CommentOutlined, ShareAltOutlined, InboxOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import VersionArea from "../VersionArea/VersionArea";
import CommentArea from "../CommentArea/CommentArea";

const OptionMenu = (props) => {
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(
    <Menu />
  );
  const [drawer, setDrawer] = useState(<CommentArea comments={props.comments}/>);
  const [drawerType, setDrawerType] = useState('');

  const comments = (<CommentArea comments={props.comments}/>);
  const versions = (<VersionArea versions={props.versions} setVersion={props.setVersion}/>);

  const showDrawer = () => {
    console.log(drawerType);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };



  const archive = () => {
    message.info("Set to archived")
    /* Todo: set archived
    // call archive API
    axios.put(`API_URL`)
    .then(res => {
    })
    */
  }

  const deletePost = () => {
    message.info("Delete")
    /* Todo: delete it from db
    // call archive API
    axios.put(`API_URL`)
    .then(res => {
    })
    */
  }

  // set private or public
  const setStatus = () => {
    message.info("Delete")
    /* Todo: delete it from db
    // call setStatus API
    axios.put(`API_URL`)
    .then(res => {
    })
    */
  }

    const { setVersion } = props;

    const versionEdit = (index) => {
        message.info("edit: "+ index);
    }
    const versionBrowse = (index) => {
        message.info("browse: "+ index);
        setVersion(index);
    }

  const NoteDetailMenu = (
    <Menu items={
      [
        {
            label: "Edit",
            key: "1",
            icon: <EditOutlined />
        },
        {
            label: "Share",
            key: "2",
            icon: <ShareAltOutlined />
        },
        {
            label: (<a onClick=
              {() => {
                setDrawerType('Comment');
                showDrawer();
              }}
              >Comment</a>),
            key: "3",
            icon: <CommentOutlined />
        },
        {
          label: (<a onClick={deletePost}>Delete</a>),
          key: "4",
          icon: <DeleteOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Version');
              showDrawer();
            }}
            >Manage Version</a>),
          key: "5",
          icon: <InfoCircleOutlined />
        },
      ]
    }/>
  );

  const QnADetailMenu = (
    <Menu items={
      [
        {
            label: "Edit",
            key: "1",
            icon: <EditOutlined />
        },
        {
            label: "Share",
            key: "2",
            icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick={archive}>Archive</a>),
          key: "3",
          icon: <InboxOutlined />
        },
        {
          label: (<a onClick={deletePost}>Delete</a>),
          key: "4",
          icon: <DeleteOutlined />
        },
        {
          label: props.public? (<a onClick={setStatus}>Set Private</a>): (<a onClick={setStatus}>Set Public</a>),
          key: "5",
          icon: <UserOutlined />
        },
      ]
    }/>
  );

  const RewardDetailMenu = (
    <Menu items={
      [
        {
            label: "Edit",
            key: "1",
            icon: <EditOutlined />
        },
        {
            label: "Share",
            key: "2",
            icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick={deletePost}>Delete</a>),
          key: "3",
          icon: <DeleteOutlined />
        }]
    }/>
  );

  const VersionDetailMenu = (
    <Menu items={
      [
        {
            label: (<a onClick={()=>{ versionBrowse(props.index) }}>Browse</a>),
            key: "1",
            icon: <EyeOutlined />
        },
        {
            label: (<a onClick={()=>{ versionEdit(props.index) }}>Edit</a>),
            key: "2",
            icon: <EditOutlined />
        },
        {
          label: props.versions[props.index]?.isTemp? (<a onClick={setStatus}>Set Private</a>): (<a onClick={setStatus}>Set Public</a>),
          key: "3",
          icon: <DeleteOutlined />
        }]
    }/>
  );


  useEffect(()=>{
    // set menu
    switch(props.page){
      case 'NoteDetailPage': setMenu( NoteDetailMenu ); break;
      case 'QnADetailPage': setMenu( QnADetailMenu ); break;
      case 'RewardDetailPage': setMenu( RewardDetailMenu ); break;
      case 'NoteDetailPageVersion': setMenu( VersionDetailMenu ); break;
    }
  },[props])

  useEffect(()=>{
    switch(drawerType){
      case 'Comment': setDrawer(comments);break;
      case 'Version': setDrawer(versions);break;
    }
  },[drawerType])


  
  return(
    <>
      <Space className="dropdownFunction" wrap >
        <Dropdown.Button 
          className="dropdownFunction"
          overlay={menu}
        ></Dropdown.Button>
      </Space>
      <Drawer title={drawerType} placement="right" onClose={onClose} visible={visible}>
        {drawer}
      </Drawer>
    </>
  );
}

OptionMenu.defaultProps = {
  comments: [],
  versions: [],
  hasComment: false,
  public: false,
  setVersion: ()=>{},
  index: 0,
};

export default OptionMenu;
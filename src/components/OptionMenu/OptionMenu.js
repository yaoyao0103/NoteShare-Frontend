import React, { useEffect, useState } from "react";
import "./OptionMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Space, Drawer, message, Input, Tooltip, Button } from "antd";
import { CopyOutlined , EditOutlined, CommentOutlined, CheckOutlined, CloseOutlined, ShareAltOutlined, InboxOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined, UserOutlined, LikeOutlined } from "@ant-design/icons";
import VersionArea from "../VersionArea/VersionArea";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import Text from "../Text/Text";

const OptionMenu = (props) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(
    <Menu />
  );
  const [drawer, setDrawer] = useState(<CommentArea page={props.page} comments={props.comments} id={props.id}/>);
  const [drawerType, setDrawerType] = useState('');

  const comments = (<CommentArea page={props.page} comments={props.comments} id={props.id}/>);
  const versions = (<VersionArea page={'NoteDetailPageVersion'} versions={props.versions} setVersion={props.setVersion}/>);

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

    const { setVersion, setContent, setPoppedContentShow } = props;

    const versionEdit = (index) => {
        message.info("edit: "+ index);
    }
    const versionBrowse = (index) => {
        message.info("browse: "+ index);
        setVersion(index);
    }

    const contentBrowse = (id) => {
      message.info("browse: "+ id);
      setContent(<ContentEditor versionId = {id}/>)
    }

    const chooseBest = (id) => {
      message.info("choose: "+ id + " best");
      // Todo: connect choose best API
    }

    const chooseRef = (id) => {
      message.info("choose: "+ id + " ref");
      // Todo: connect choose ref API
    }

    const agreeApplier = (id) => {
      message.info("agree applier: "+ id);
      // Todo: connect choose best API
    }

    const rejectApplier = (id) => {
      message.info("reject applier: "+ id);
      // Todo: connect choose ref API
    }

  const NoteDetailMenu = (
    <Menu items={
      [
        {
            label: (<a onClick=
              {() => {
                props.setPageProps({
                  noteId: props.id,
                  action: "edit"
                })
                props.setCurrPage('NoteEditPage');
              }}
              >Edit</a>),
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
          label: (<a onClick=
            {() => {
              setDrawerType('Version');
              showDrawer();
            }}
            >Manage Version</a>),
          key: "4",
          icon: <InfoCircleOutlined />
        },
      ]
    }/>
    );
    
  const QnADetailMenu = (
      <Menu items={
        [
          {
            label: (<a onClick=
              {() => {
                props.setPageProps({
                  postId: props.id,
                  type: 'QA',
                  action: "edit"
                })
                props.setCurrPage('QnAEditPage');
              }}
              >Edit</a>),
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
            icon: <UserOutlined style={{color: "#333"}}/>
          },
          

        ]
      }/>
  );

  const RewardDetailMenu = (
    <Menu items={
      [
        {
          label: (<a onClick=
            {() => {
              props.setPageProps({
                postId: props.id,
                type: 'reward',
                action: "edit"
              })
              props.setCurrPage('RewardEditPage');
            }}
            >Edit</a>),
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

  const CollabDetailMenu = (
    <Menu items={
      [
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Comment');
              showDrawer();
            }}
            >Comment</a>),
          key: "1",
          icon: <CommentOutlined />
        },
        {
            label: "Share",
            key: "2",
            icon: <ShareAltOutlined />
        }]
    }/>
  );

  const CollabDetailMenuOfAuthor = (
    <Menu items={
      [
        {
          label:(
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Invite Link"} fontSize='12' />
            <Input.Group compact>
            <Input
              style={{ width: '80%' }}
              defaultValue="git@github.com:ant-design/ant-design.git"
            />
            <Tooltip title="copy git url">
              <Button icon={<CopyOutlined />} />
            </Tooltip>
          </Input.Group>
          </>
          ),
          key: "1",
        },
        {
          label: (<a onClick=
            {() => {
              //setDrawerType('Version');
              showDrawer();
            }}
            >Manage Version</a>),
            key: "2",
            icon: <InfoCircleOutlined />
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
            label: "Share",
            key: "4",
            icon: <ShareAltOutlined />
        }]
    }/>
  );

  const CollabDetailMenuOfManager = (
    <Menu items={
      [
        {
          label:(<Input.Group compact>
            <Input
              style={{ width: '80%' }}
              defaultValue="git@github.com:ant-design/ant-design.git"
            />
            <Tooltip title="copy git url">
              <Button icon={<CopyOutlined />} />
            </Tooltip>
          </Input.Group>),
          key: "1",
        },
        {
          label: (<a onClick=
            {() => {
              setPoppedContentShow(true);
            }}
            >Manage Applier</a>),
            key: "2",
            icon: <InfoCircleOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              //setDrawerType('Version');
              showDrawer();
            }}
            >Manage Version</a>),
            key: "3",
            icon: <InfoCircleOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Comment');
              showDrawer();
            }}
            >Comment</a>),
          key: "4",
          icon: <CommentOutlined />
        },
        {
            label: "Share",
            key: "5",
            icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick={deletePost}>Delete</a>),
          key: "6",
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
          label: props.versions[props.index]?.isTemp? (<a >Set Private</a>): (<a >Set Public</a>),
          key: "3",
          icon: <DeleteOutlined />
        }]
    }/>
  );

  const VersionEditMenu = (
    <Menu items={
      [
        {
            label: (<a onClick={()=>{ setVersion(props.index) }}>Copy</a>),
            key: "1",
            icon: <EditOutlined />
        },
        {
          label: props.versions[props.index]?.isTemp? (<a >Set Private</a>): (<a >Set Public</a>),
          key: "2",
          icon: <DeleteOutlined />
        }]
    }/>
  );

  const AnswerDetailMenu = (
    <Menu items={
      [
        {
            label: (<a onClick={()=>{ contentBrowse(props.answerId) }}>Browse</a>),
            key: "1",
            icon: <EyeOutlined />
        },
        {
            label: (<a style={{color: "blue"}} onClick={()=>{ chooseBest(props.answerId) }}>Choose as the best</a>),
            key: "2",
            icon: <LikeOutlined style={{color: "blue"}}/>
        },
        {
          label: (<a style={{color: "green"}} onClick={()=>{ chooseRef(props.answerId) }}>Choose as reference</a>),
          key: "3",
          icon: <LikeOutlined style={{color: "green"}}/>
        },]
    }/>
  );

  const ApplierDetailMenu = (
    <Menu items={
      [
        {
            label: (<a onClick={()=>{ contentBrowse(props.answerId) }}>Browse</a>),
            key: "1",
            icon: <EyeOutlined />
        },
        {
            label: (<a style={{color: "green"}} onClick={()=>{ agreeApplier(props.answerId) }}>Agree</a>),
            key: "2",
            icon: <CheckOutlined style={{color: "green"}}/>
        },
        {
          label: (<a style={{color: "red"}} onClick={()=>{ rejectApplier(props.answerId) }}>Reject</a>),
          key: "3",
          icon: <CloseOutlined style={{color: "red"}}/>
        },]
    }/>
  )

  const PersonalPageNoteMenu = (
    <Menu items={
      [
        {
            label: (<Link className="personalPageNoteMenu" to={`/NoteEditPage/${props.noteId}`}>Edit</Link>),
            key: "1",
            icon: <EditOutlined />
        },
        {
          label: (<a onClick={()=>{ message.info("Share: " + props.noteId) }}>Share</a>),
            key: "2",
            icon: <ShareAltOutlined />
        },
      ]
    }/>
    );


  useEffect(()=>{
    // set menu
    switch(props.page){
      case 'NoteDetailPage': setMenu( NoteDetailMenu ); break;
      case 'QnADetailPage': setMenu( QnADetailMenu ); break;
      case 'RewardDetailPage': setMenu( RewardDetailMenu ); break;
      case 'NoteDetailPageVersion': setMenu( VersionDetailMenu ); break;
      case 'NoteEditPageVersion': setMenu( VersionEditMenu ); break;
      case 'RewardDetailPageAnswer': setMenu( AnswerDetailMenu ); break;
      case 'CollabDetailPageApplier': setMenu( ApplierDetailMenu ); break;
      case 'CollabDetailPage': 
        if(props.isAuthor){
          if(props.isManager) setMenu( CollabDetailMenuOfManager ); 
          else setMenu( CollabDetailMenuOfAuthor ); 
        }
        else setMenu( CollabDetailMenu ); 
        break;
      case 'PersonalPage': setMenu( PersonalPageNoteMenu ); break;
      // case 'QnAOutlinePage': setMenu( QnAOutlineMenu ); break;

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
  public: false,
  setVersion: ()=>{},
  index: 0,
  id: '',
};

export default OptionMenu;
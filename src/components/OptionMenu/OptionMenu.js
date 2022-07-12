import React, { useEffect, useState } from "react";
import "./OptionMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Space, Drawer, message, Input, Tooltip, Button, Popover, List, Avatar } from "antd";
import { StarOutlined, CopyOutlined, EditOutlined, CommentOutlined, CheckOutlined, CloseOutlined, ShareAltOutlined, InboxOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined, UserOutlined, LikeOutlined } from "@ant-design/icons";
import VersionArea from "../VersionArea/VersionArea";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import Text from "../Text/Text";
import MyButton from "../Button/Button";
import Cookie from "../Cookies/Cookies";
import axios from "../axios/axios";
import MyEditor from "../MyEditor/MyEditor";

const OptionMenu = (props) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(
    <Menu />
  );
  const [drawer, setDrawer] = useState(<CommentArea page={props.page} type="note" comments={props.comments} id={props.id} />);
  const [drawerType, setDrawerType] = useState('');
  const [chooseManagerList, setChooseManagerList] = useState(<></>)
  const [kickUserList, setKickUserList] = useState(<></>)

  const comments = (<CommentArea page={props.page} type="note" comments={props.comments} id={props.id} />);
  const versions = (<VersionArea page={'NoteDetailPageVersion'} id={props.id} versions={props.versions} setVersion={props.setVersion} isAuthor={props.isAuthor} />);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };



  const archive = () => {
    axios.put(`http://localhost:8080/post/archive/${props.id}`)
      .then(res => {
        message.success("Archived")
        props.setIsArchive(true)
        /*console.log("status", res.data.res.public)
        if(res.data.res.public)
          message.success("Set archive")
        else
          message.success("set non-archive")*/
      })
      .catch(err => {
        console.log(err)
      })
  }

  // set private or public
  const setStatus = () => {
    axios.put(`http://localhost:8080/post/publish/${props.id}`)
      .then(res => {
        props.setIsPublic(res.data.res.public)
        if (res.data.res.public)
          message.success("Set public")
        else
          message.success("set private")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const { setVersion, setContent, setPoppedContentShow } = props;

  const versionBrowse = (index) => {
    message.info("browse: " + index);
    setVersion(index);
  }

  const versionPublish = (index) => {
    axios.put(`http://localhost:8080/note/publish/${props.id}/${index}`)
      .then(res => {
        if (!res.data.res.temp)
          message.success("Set public")
        else
          message.success("set private")
      })
      .catch(err => {
        console.log(err)
      })
  }
    const contentBrowse = (noteId) => {
      message.info("browse: "+ noteId);
      setContent(<MyEditor noteId={noteId} version={'0'} page={props.page}/>)
    }

  const commentBrowse = (comment, index) => {
    message.info("browse: " + index);
    setContent(
      <div className="commentFromApplicant">
        <div className="commentFromApplicantLabel">
          <Text color='black' cls='Default' content={"Message:"} fontSize='28' display="inline-block" />
        </div>
        <div className="commentFromApplicantComment">
          {comment}
        </div>
        <div className="commentFromApplicantButton" onClick={() => reject(props.email)}>
          <MyButton color={"red"}><Text color='white' cls='Large' content={"Reject"} fontSize='17' display="inline-block" /></MyButton>
        </div>
        <div className="commentFromApplicantButton" onClick={() => approve(props.email)}>
          <MyButton color={"green"}><Text color='white' cls='Large' content={"Agree"} fontSize='17' display="inline-block" /></MyButton>
        </div>
      </div>
    )
  }

    const chooseBest = (id) => {
      //message.info("choose: "+ id + " best");
      axios.put(`http://localhost:8080/post/reward/best/${props.postId}/${id}`)
      .then ( res => {
          message.success("Best!")
          // Todo: remove applicant from list
      })
      .catch(err =>{
          console.log(err)
      })
    }

    const chooseRef = (id) => {
      //message.info("choose: "+ id + " ref");
      axios.put(`http://localhost:8080/post/reward/reference/${props.postId}/${id}`)
      .then ( res => {
          message.success("Reference!")
          // Todo: remove applicant from list
      })
      .catch(err =>{
          console.log(err)
      })
      // Todo: connect choose ref API
    }

  const approve = (email) => {
    
    
    message.info("agree applier: " + email);
    axios.put(`http://localhost:8080/post/add/${props.postId}/${email}`)
      .then(res => {
        
        message.success("Agree!!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }

  const reject = (email) => {
    message.info("reject applier: " + email);
    axios.delete(`http://localhost:8080/post/apply/${props.postId}/${email}`)
      .then(res => {
        message.success("reject!!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deletePost = () => {
    message.info("delete post: " + props.id);
    axios.delete(`http://localhost:8080/post/${props.id}`)
      .then(res => {
        message.success("delete!!")
        if (props.page == 'PersonalPage')
          props.rerenderPosts()
        else {
          props.setPageProps({
            page: 'PersonalPage'
          })
        }
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }

  const favorite = () => {
    message.info("favorite!!")
    /*axios.put(`http://localhost:8080/favorite/note/${props.id}/${email}`)
    .then ( res => {
        message.success("Agree!!")
        console.log(res.data.res)
        // Todo: remove applicant from list
    })
    .catch(err =>{
        console.log(err)
    })*/
  }

  const unfavorite = () => {
    message.info("unfavorite!!")
    /*axios.put(`http://localhost:8080/favorite/add/${props.postId}/${email}`)
    .then ( res => {
        message.success("Agree!!")
        console.log(res.data.res)
        // Todo: remove applicant from list
    })
    .catch(err =>{
        console.log(err)
    })*/
  }

  const chooseManager = (userObj) => {
    axios.put(`http://localhost:8080/note/admin/${props.noteId}/${userObj.email}`)
      .then(res => {
        message.success("Success!!")
        setChooseManagerList(
          <>
            <List.Item className='currUserItem' >
              <Text color='black' cls='Small' content={"Current"} fontSize='3' display="inline-block" />
              <div>
                <Avatar style={{ cursor: "pointer" }} size={20} src={userObj.avatar} onClick={() => props.setPageProps({ page: 'ProfilePage', email: userObj.email })}></Avatar>
                <Text color='black' cls='Default' content={userObj.name} fontSize='12' display="inline-block" />
              </div>
            </List.Item>
            <List
              dataSource={props.author}
              renderItem={(item, index) => (
                <List.Item className='userItem' onClick={() => chooseManager(item)}><span>{item.name}</span></List.Item>
              )}
            />
          </>
        )
        //setMan
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }

  const kickUser = (email) => {
    const data = {
      year: 2022,
      month: 7,
      day: 10,
      kickTargetEmail: email,
    }
    axios.post(`http://localhost:8080/schedule/vote/${props.id}`, data)
      .then(res => {
        message.success("Vote Submit!!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }

    const NoteDetailMenuReward = (
      <Menu items={
        [
          {
            label: (<a onClick=
              {() => {
                props.setPageProps({
                  postId: props.postId,
                  page:'RewardDetailPage'
                })
              }}
              >Goto Reward Post</a>),
            key: "1",
            icon: <EyeOutlined />
          },
        ]
      }/>
      );

  const NoteDetailMenuAuthor = (
    <Menu items={
      [
        {
          label: "Share",
          key: "1",
          icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Comment');
              showDrawer();
            }}
          >Comment</a>),
          key: "2",
          icon: <CommentOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Version');
              showDrawer();
            }}
          >Manage Version</a>),
          key: "3",
          icon: <InfoCircleOutlined />
        },
      ]
    } />
  );

  const NoteDetailMenu = (
    <Menu items={
      [
        {
          label: !props.isFavoriter ? (<a onClick={favorite}>Favorite</a>) : (<a onClick={unfavorite}>UnFavorite</a>),
          key: "1",
          icon: <StarOutlined />
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
    } />
  );

  const QnADetailMenu = (
    <Menu items={
      [
        {
          label: "Share",
          key: "",
          icon: <ShareAltOutlined />
        }
      ]
    } />
  );

  const QnADetailMenuAuthor = (
    <Menu items={
      [
        {
          label: (<a onClick=
            {() => {
              props.setPageProps({
                postId: props.id,
                type: 'QA',
                action: "edit",
                page: 'QnAEditPage'
              })
            }}
          >Edit Information</a>),
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
          label: props.public ? (<a onClick={setStatus}>Set Private</a>) : (<a onClick={setStatus}>Set Public</a>),
          key: "4",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (<a onClick={deletePost} style={{ color: "red" }}>Delete</a>),
          key: "5",
          icon: <DeleteOutlined style={{ color: "red" }} />
        },


      ]
    } />
  );

  const QnADetailMenuAuthorArchive = (
    <Menu items={
      [
        {
          label: (<a onClick=
            {() => {
              props.setPageProps({
                postId: props.id,
                type: 'QA',
                action: "edit",
                page: 'QnAEditPage'
              })
            }}
          >Edit Information</a>),
          key: "1",
          icon: <EditOutlined />
        },
        {
          label: "Share",
          key: "2",
          icon: <ShareAltOutlined />
        },
        {
          label: (<a>Archive</a>),
          key: "3",
          icon: <InboxOutlined />,
          disabled: true
        },
        {
          label: props.public ? (<a onClick={setStatus}>Set Private</a>) : (<a onClick={setStatus}>Set Public</a>),
          key: "4",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (<a onClick={deletePost} style={{ color: "red" }}>Delete</a>),
          key: "5",
          icon: <DeleteOutlined style={{ color: "red" }} />
        },


      ]
    } />
  );

  const RewardDetailMenuAuthor = (
    <Menu items={
      [
        {
          label: (<a onClick=
            {() => {
              props.setPageProps({
                postId: props.id,
                type: 'reward',
                action: "edit",
                page: 'RewardEditPage'
              })
            }}
          >Edit Information</a>),
          key: "1",
          icon: <EditOutlined />
        },
        {
          label: "Share",
          key: "2",
          icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick={deletePost} style={{ color: "red" }}>Delete</a>),
          key: "3",
          icon: <DeleteOutlined style={{ color: "red" }} />
        }]
    } />
  );

  const RewardDetailMenu = (
    <Menu items={
      [
        {
          label: "Share",
          key: "1",
          icon: <ShareAltOutlined />
        }]
    } />
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
        },
      ]
    } />
  );

  const CollabDetailMenuOfAuthor = (
    <Menu items={
      [
        {
          label: (
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
              props.setPageProps({
                postId: props.id,
                type: 'collab',
                action: "edit",
                page: 'CollabEditPage'
              })
            }}
          >Edit Information</a>),
          key: "2",
          icon: <EditOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Version');
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
        }]
    } />
  );

  const CollabDetailMenuOfManager = (
    <Menu items={
      [
        {
          label: (<Input.Group compact>
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
              props.setPageProps({
                postId: props.id,
                type: 'collaboration',
                action: "edit",
                page: 'CollabEditPage'
              })
            }}
          >Edit Information</a>),
          key: "2",
          icon: <EditOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              setPoppedContentShow(true);
            }}
          >Manage Applier</a>),
          key: "3",
          icon: <InfoCircleOutlined />
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
        {
          label: (<a onClick=
            {() => {
              setDrawerType('Comment');
              showDrawer();
            }}
          >Comment</a>),
          key: "5",
          icon: <CommentOutlined />
        },
        {
          label: "Share",
          key: "6",
          icon: <ShareAltOutlined />
        },
        {
          label: (
            <Popover
              content={chooseManagerList}
              title={<Text color='black' cls='Small' content={"Choose a user"} fontSize='17' display="inline-block" />}
              trigger="hover"
              placement="left">
              Choose Manager
            </Popover>
          ),
          key: "7",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (
            props.voting ?
              "Kick User1"
              :
              <Popover
                content={kickUserList}
                title={<Text color='black' cls='Small' content={"Choose a user"} fontSize='17' display="inline-block" />}
                trigger="hover"
                placement="left">
                Kick User1
              </Popover>

          ),
          key: "8",
          icon: <UserOutlined style={{ color: "#333" }} />,
          disabled: props.voting ? true : false
        },
        {
          label: props.public ? (<a onClick={setStatus}>Set Private</a>) : (<a onClick={setStatus}>Set Public</a>),
          key: "9",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
      ]
    } />
  );

  const VersionDetailMenuAuthor = (
    <Menu items={
      [
        {
          label: (<a onClick={() => { versionBrowse(props.index) }}>Browse</a>),
          key: "1",
          icon: <EyeOutlined />
        },
        {
          label: !props.versions[props.index]?.temp ? (<a onClick={() => versionPublish(props.index)}>Set Private</a>) : (<a onClick={() => versionPublish(props.index)}>Set Public</a>),
          key: "2",
          icon: <DeleteOutlined />
        }]
    } />
  );

  const VersionDetailMenu = (
    <Menu items={
      [
        {
          label: (<a onClick={() => { versionBrowse(props.index) }}>Browse</a>),
          key: "1",
          icon: <EyeOutlined />
        }]
    } />
  );

  const VersionEditMenu = (
    <Menu items={
      [
        {
          label: (<a onClick={() => { setVersion(props.index) }}>Copy</a>),
          key: "1",
          icon: <EditOutlined />
        },
        {
          label: props.versions[props.index]?.isTemp ? (<a >Set Private</a>) : (<a >Set Public</a>),
          key: "2",
          icon: <DeleteOutlined />
        }]
    } />
  );

  const AnswerDetailMenu = (
    <Menu items={
      [
        {
          label: (<a onClick={() => { contentBrowse(props.answerId) }}>Browse</a>),
          key: "1",
          icon: <EyeOutlined />
        },
        {
          label: (<a style={{ color: "blue" }} onClick={() => { chooseBest(props.answerId) }}>Choose as the best</a>),
          key: "2",
          icon: <LikeOutlined style={{ color: "blue" }} />
        },
        {
          label: (<a style={{ color: "green" }} onClick={() => { chooseRef(props.answerId) }}>Choose as reference</a>),
          key: "3",
          icon: <LikeOutlined style={{ color: "green" }} />
        },]
    } />
  );

  const ApplierDetailMenu = (
    <Menu items={
      [
        {
          label: (<a onClick={() => { commentBrowse(props.commentFromApplicant, props.index) }}>Browse</a>),
          key: "1",
          icon: <EyeOutlined />
        },
        {
          label: (<a style={{ color: "green" }} onClick={() => { approve(props.email) }}>Agree</a>),
          key: "2",
          icon: <CheckOutlined style={{ color: "green" }} />
        },
        {
          label: (<a style={{ color: "red" }} onClick={() => { reject(props.email) }}>Reject</a>),
          key: "3",
          icon: <CloseOutlined style={{ color: "red" }} />
        },]
    } />
  )

  const PersonalPageNoteMenu = (
    <Menu items={
      [
        {
          label: (<a onClick={() => {
            if (props.type) {
              switch (props.type) {
                case 'QA': props.setPageProps({ page: 'QnAEditPage', type: 'QA', postId: props.id, action: 'edit' })
                case 'reward': props.setPageProps({ page: 'RewardEditPage', type: 'reward', postId: props.id, action: 'edit' })
                case 'collaboration': props.setPageProps({ page: 'CollabEditPage', type: 'collaboration', postId: props.id, action: 'edit' })
              }
            }
            else {
              props.setPageProps({ page: 'NoteEditPage', noteId: props.id, action: 'edit' })
            }
          }}>Edit</a>),
          key: "1",
          icon: <EditOutlined />
        },
        {
          label: (<a onClick={() => { message.info("Share: " + props.id) }}>Share</a>),
          key: "2",
          icon: <ShareAltOutlined />
        },
        {
          label: (<a onClick={() => { props.setCopy(props.id) }}>Copy</a>),
          key: "3",
          icon: <CopyOutlined />
        },
        {
          label: (<a onClick={() => deletePost()} style={{ color: "red" }}>Delete</a>),
          key: "4",
          icon: <DeleteOutlined style={{ color: "red" }} />
        },
      ]
    } />
  );


  useEffect(() => {
    // set menu
    switch (props.page) {
      case 'NoteDetailPage':
        if (props.noteType == 'reward') {
          setMenu(NoteDetailMenuReward); break;
        }
        else {
          if (props.isAuthor) {
            setMenu(NoteDetailMenuAuthor); break;
          }
          else {
            setMenu(NoteDetailMenu); break;
          }
        }
      case 'QnADetailPage': {
        if (props.isAuthor) {
          if (props.isArchive) {
            setMenu(QnADetailMenuAuthorArchive); break;
          }
          else {
            setMenu(QnADetailMenuAuthor); break;
          }
        }
        else {
          setMenu(QnADetailMenu); break;
        }
      }
      case 'RewardDetailPage': {
        if (props.isAuthor) {
          setMenu(RewardDetailMenuAuthor); break;
        }
        else {
          setMenu(RewardDetailMenu); break;
        }
      }
      case 'NoteDetailPageVersion':
        if (props.isAuthor) {
          setMenu(VersionDetailMenuAuthor); break;
        }
        else {
          setMenu(VersionDetailMenu); break;
        }
      case 'NoteEditPageVersion': setMenu(VersionEditMenu); break;
      case 'RewardDetailPageAnswer': setMenu(AnswerDetailMenu); break;
      case 'CollabDetailPageApplier': setMenu(ApplierDetailMenu); break;
      case 'CollabDetailPage':
        if (props.isAuthor) {
          if (props.isManager) {
            setKickUserList(
              <List
                dataSource={props.author}
                renderItem={(item, index) => (
                  <List.Item className='userItem' onClick={() => kickUser(item.email)}><span>{item.name}</span></List.Item>
                )}
              />
            )
            setChooseManagerList(
              <>
                <List.Item className='currUserItem' >
                  <Text color='black' cls='Small' content={"Current"} fontSize='3' display="inline-block" />
                  {props.manager ?
                    <div>
                      <Avatar style={{ cursor: "pointer" }} size={20} src={props.manager.userObjAvatar} onClick={() => props.setPageProps({ page: 'ProfilePage', email: props.manager.userObjEmail })}></Avatar>
                      <Text color='black' cls='Default' content={props.manager.userObjName} fontSize='12' display="inline-block" />
                    </div> :
                    <Text color='black' cls='Default' content={" None"} fontSize='3' display="inline-block" />
                  }
                </List.Item>
                <List
                  dataSource={props.author}
                  renderItem={(item, index) => (
                    <List.Item className='userItem' onClick={() => chooseManager(item)}><span>{item.name}</span></List.Item>
                  )}
                />
              </>
            )
            setMenu(CollabDetailMenuOfManager); break;
          }
          else {
            setMenu(CollabDetailMenuOfAuthor); break;
          }
        }
        else {
          setMenu(CollabDetailMenu); break;
        }
      case 'PersonalPage': setMenu(PersonalPageNoteMenu); break;
      // case 'QnAOutlinePage': setMenu( QnAOutlineMenu ); break;
    }
  }, [props])

  useEffect(() => {
    if (props.page == 'CollabDetailPage')
      setMenu(CollabDetailMenuOfManager);
  }, [kickUserList, chooseManagerList])

  useEffect(() => {
    switch (drawerType) {
      case 'Comment': setDrawer(comments); break;
      case 'Version': setDrawer(versions); break;

    }
  }, [drawerType])



  return (
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
  setVersion: () => { },
  index: 0,
  id: '',
};

export default OptionMenu;
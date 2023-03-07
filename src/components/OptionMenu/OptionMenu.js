import React, { useEffect, useState } from "react";
import "./OptionMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Space, Drawer, message, Input, Tooltip, Button, Popover, List, Avatar, Modal, Popconfirm, notification } from "antd";
import { StarOutlined, CopyOutlined, EditOutlined, PlusOutlined, CheckOutlined, CloseOutlined, ShareAltOutlined, InboxOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined, UserOutlined, LikeOutlined, DownloadOutlined, EllipsisOutlined } from "@ant-design/icons";
import VersionArea from "../VersionArea/VersionArea";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import Text from "../Text/Text";
import MyButton from "../Button/Button";
import Cookie from "../Cookies/Cookies";
import axios from "../axios/axios";
import MyEditor from "../MyEditor/MyEditor";
import { set } from "react-hook-form";
import moment from 'moment';
import download from 'downloadjs'
import { FacebookShareButton, FacebookIcon } from "react-share";

const frontendURL = "https://noteshare.soselab.tw/";
const cookieParser = new Cookie(document.cookie)
const OptionMenu = (props) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menu, setMenu] = useState(
    <Menu />
  );
  const [chooseManagerList, setChooseManagerList] = useState(<></>)

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const shareLink = 'https://noteshare.soselab.tw/sharePage/'

  const archive = () => {
    if (props.isAnswered) {
      axios.put(`/post/archive/${props.id}`, {}, {
        headers: {
          'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
        }
      })
        .then(res => {
          message.success("You archived a post")
          props.setIsArchive(true)
          /*console.log("status", res.data.res.public)
          if(res.data.res.public)
            message.success("Set archive")
          else
            message.success("set non-archive")*/
        })
        .catch(err => {
          if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
            if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
              document.cookie = 'error=Jwt'
              message.destroy()
              message.warning('The connection timed out, please login again !')
              document.cookie = 'email=;'
              props.setLoggedIn(false)
              props.setPageProps({ page: 'LoginPage' })
            }
            else
              document.cookie = 'error=true'
            message.error('Server Error! Please refresh again! (Archive Post Error)')
          }
          else {
            message.error("Server Error! Please try again later. (Archive Post Error)")
          }
        })
    }
    else {
      message.error("You have to choose a best answer first before you archive the post!")
    }
  }

  // set private or public
  const setStatus = () => {
    axios.put(`/post/publish/${props.id}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        props.setIsPublic(res.data.res.public)
        if (res.data.res.public)
          message.success("You set the post public!")
        else
          message.success("You set the post private!")
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again!  (Set Post Public/Private Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Set Post Public/Private Error)")
        }
      })
  }

  const setNoteStatus = () => {
    if (props.type === "collaboration") {
      let publishDate = moment(props.publishDate)
      let now = moment()
      let diffHours = (now.diff(publishDate, 'hours', true))
      if (diffHours > 24) {
        message.error("Once the note has been posted for more than 24 hours, you can never unpublish it!")
        return;
      }
    }
    axios.put(`/note/publish/${props.noteId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("Success!")
        props.setIsNotePublic(!props.notePublic)
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again!  (Set Note Public/Private Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Set Note Public/Private Error)")
        }
      })
  }

  const { setVersion, setContent, setPoppedContentShow } = props;

  const versionBrowse = (index) => {
    //message.info("browse: " + index);
    setVersion(index);
  }

  const versionPublish = (index) => {
    axios.put(`/note/publish/${props.id}/${index}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        if (!res.data.res.temp) {
          let tempVersions = props.versions
          let tempVersion = tempVersions[index]
          tempVersion.temp = false;
          tempVersions[index] = tempVersion
          props.setVersions([...tempVersions])
          message.success("You set this version public!")
        }
        else {
          let tempVersions = props.versions
          let tempVersion = tempVersions[index]
          tempVersion.temp = true;
          tempVersions[index] = tempVersion
          props.setVersions([...tempVersions])
          message.success("You set this version private!")
        }
      })
      .catch(err => {
        console.log("the error:", err)
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Set Version Public/Private Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Set Version Public/Private Error)")
        }
      })
  }
  const contentBrowse = (noteId) => {
    //message.info("browse: "+ noteId);
    setContent(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={noteId} version={'0'} page={props.page} />)
  }

  const commentBrowse = (comment, index) => {
    //message.info("browse: " + index);
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
    axios.put(`/post/reward/best/${props.postId}/${id}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You selected the note as best!")
        props.refreshAnswer()
        notification.open({
          message: 'The Note has been saved to Owned Folder.',
          placement: 'bottomLeft'
        });
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Select Reward Best Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Select Reward Best Error)")
        }
      })
  }

  const chooseRef = (id) => {
    //message.info("choose: "+ id + " ref");
    axios.put(`/post/reward/reference/${props.postId}/${id}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You selected the note for reference!")
        props.refreshAnswer()
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Select Reward For Reference Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Select Reward For Reference Error)")
        }
      })
    // Todo: connect choose ref API
  }

  const approve = (email) => {


    message.success("Agree applier: " + email);
    axios.put(`/post/add/${props.postId}/${email}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You agreed the applier!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Agree Applier Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Agree Applier Error)")
        }
      })
  }

  const reject = (email) => {
    message.success("Reject applier: " + email);
    axios.delete(`/post/apply/${props.postId}/${email}`, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You rejected the applier!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Reject Applier Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Reject Applier Error)")
        }
      })
  }

  const deletePost = () => {
    //message.info("delete post: " + props.id);
    console.log("type:", props)
    if (props.type == "note") {
      axios.put(`/note/delete/${props.id}/${props.folderId}`, {}, {
        headers: {
          'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
        }
      })
        .then(res => {
          message.success("You deleted a note!")
          if (props.page === 'PersonalPage')
            props.rerenderNotes()
          else {
            props.setPageProps({
              page: 'PersonalPage'
            })
          }
          // Todo: remove applicant from list
        })
        .catch(err => {
          if (err.response.status === 409) {
            message.warn("You cannot delete the last note!")
          }
          else if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
            if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
              document.cookie = 'error=Jwt'
              message.destroy()
              message.warning('The connection timed out, please login again !')
              document.cookie = 'email=;'
              props.setLoggedIn(false)
              props.setPageProps({ page: 'LoginPage' })
            }
            else
              document.cookie = 'error=true'
            message.error('Server Error! Please refresh again!')
          }
          else {
            message.error('Server Error! Please try again later.')
          }
        })
    }
    else {
      axios.delete(`/post/${props.id}`, {
        headers: {
          'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
        }
      })
        .then(res => {
          message.success("You deleted a post!")
          if (props.page === 'PersonalPage')
            props.rerenderPosts()
          else {
            props.setPageProps({
              page: 'PersonalPage'
            })
          }
          // Todo: remove applicant from list
        })
        .catch(err => {
          if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
            if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
              document.cookie = 'error=Jwt'
              message.destroy()
              message.warning('The connection timed out, please login again !')
              document.cookie = 'email=;'
              props.setLoggedIn(false)
              props.setPageProps({ page: 'LoginPage' })
            }
            else
              document.cookie = 'error=true'
            message.error('Server Error! Please refresh again! (Delete Post Error)')
          }
          else {
            message.error("Server Error! Please try again later. (Delete Post Error)")
          }
        })
    }

  }

  const favorite = () => {
    if (props.email) {
      axios.put(`/favorite/note/${props.id}/${props.email}`, {}, {
        headers: {
          'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
        }
      })
        .then(res => {
          message.success("You set the note as favorite!")
          props.setIsFavoriter(true)
          // Todo: remove applicant from list
        })
        .catch(err => {
          if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
            if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
              document.cookie = 'error=Jwt'
              message.destroy()
              message.warning('The connection timed out, please login again !')
              document.cookie = 'email=;'
              props.setLoggedIn(false)
              props.setPageProps({ page: 'LoginPage' })
            }
            else
              document.cookie = 'error=true'
            message.error('Server Error! Please refresh again! (Set As Favorite Error)')
          }
          else {
            message.error("Server Error! Please try again later. (Set As Favorite Error)")
          }
        })
    }
    else {
      message.warn("Please log in first!")
      props.setPageProps({
        page: "LoginPage"
      })
    }
  }

  const unfavorite = () => {
    axios.put(`/favorite/note/${props.id}/${props.email}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You set the note as unfavorite!")
        props.setIsFavoriter(false)
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Set As Unfavorite Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Set As Unfavorite Error)")
        }
      })
  }

  const chooseManager = (userObj) => {
    axios.put(`/note/admin/${props.noteId}/${userObj.email}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You chose a new manager!")
        setChooseManagerList(
          <>
            <List.Item className='currUserItem' >
              <Text color='black' cls='Small' content={"Current"} fontSize='3' display="inline-block" />
              <div>
                <Avatar style={{ cursor: "pointer" }} size={20} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: userObj.email })}></Avatar>
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
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Choose Manager Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Choose Manager Error)")
        }
      })
  }

  /*const kickUser = (email) => {
    const data = {
      year: 2022,
      month: 7,
      day: 10,
      kickTargetEmail: email,
    }
    axios.post(`/schedule/vote/${props.id}`, data,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
      .then(res => {
        message.success("Vote Submit!!")
        // Todo: remove applicant from list
      })
      .catch(err => {
        console.log(err)
      })
  }*/

  /////////// Kick User //////// 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios.delete(`/post/${props.id}`, {
      headers: {
        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
      }
    })
      .then(res => {
        message.success("You deleted the post!")
        props.setPageProps({
          page: 'PersonalPage'
        })
        // Todo: remove applicant from list
      })
      .catch(err => {
        if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
          if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
            document.cookie = 'error=Jwt'
            message.destroy()
            message.warning('The connection timed out, please login again !')
            document.cookie = 'email=;'
            props.setLoggedIn(false)
            props.setPageProps({ page: 'LoginPage' })
          }
          else
            document.cookie = 'error=true'
          message.error('Server Error! Please refresh again! (Delete Post Error)')
        }
        else {
          message.error("Server Error! Please try again later. (Delete Post Error)")
        }
      })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //////////////////////////

  const showHistoricalVoting = () => {
    Modal.info({
      title: 'Vote History',
      content: (
        <List
          size="small"
          bordered
          dataSource={props.vote}
          renderItem={(item) => <List.Item
            actions={[<p>{item.result.charAt(0).toUpperCase() + item.result.slice(1)}</p>]}
          >
            <div>
              <Avatar style={{ cursor: "pointer" }} size={20} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: item.kickTargetUserObj.userObjEmail })}></Avatar>
              <Text color='black' cls='Default' content={item.kickTargetUserObj.userObjName} fontSize='12' display="inline-block" />
            </div>
          </List.Item>}
        />
      ),

      onOk() { },
    });
  }

  const share = (type) => {
    const copyText = "https://noteshare.soselab.tw/sharePage/" + type + '/' + props.id

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    message.success('Copied link to clipboard!')
  }

  const downloadNOte = () => {
    if (cookieParser.getCookieByName("email")) {
      if (props.isBuyer || props.isAuthor) {
        axios.get("/download/" + props.id + '/0/0', {
          headers: {
            'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
          },
          responseType: 'blob'
        }).then(res => {
          download(res.data, props.title, "application/pdf")
          message.success('Download success!')
        }).catch((error) => {
          if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
            if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
              document.cookie = 'error=Jwt'
              message.destroy()
              message.warning('The connection timed out, please login again !')
              document.cookie = 'email=;'
              props.setLoggedIn(false)
              props.setPageProps({ page: 'LoginPage' })
            }
            else
              document.cookie = 'error=true'
            message.error('Server Error! Please refresh again! (Get Fans Error)')
          }
          else {
            message.error("Server Error! Please try again later. (Get Fans Error)")
          }
        })
      }
      else {
        message.warn('Please buy first!')
      }
    }
    else {
      message.warn('Please log in first!')
    }
  }
  const NoteDetailMenuReward = (
    <Menu items={
      [
        {
          label: (
            props.rewardIsEnd ?
              <Tooltip title={"You can't access the post because the reward is over."}>
                <a style={{ cursor: "not-allowed", opacity: 0.5, textDecoration: "none" }}>Goto Reward Post</a>
              </Tooltip>
              :
              <a onClick=
                {() => {
                  props.setPageProps({
                    postId: props.postId,
                    page: 'RewardDetailPage'
                  })
                }}
              >Goto Reward Post</a>
          ),
          key: "1",
          icon: <EyeOutlined />,
        },
        {
          label: (<a onClick=
            {() => {
              downloadNOte();
            }}
          >Download</a>),
          key: "2",
          icon: <DownloadOutlined />
        },
      ]
    } />
  );

  const NoteDetailMenuAuthor = (
    <Menu items={
      props.notePublic ?
        [{
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "note" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
                </Tooltip>
              </Input.Group>
            </>
          ),
          key: "1",
        },
        {
          label: (<a onClick=
            {() => {
              showDrawer();
            }}
          >Manage Version</a>),
          key: "3",
          icon: <InfoCircleOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              downloadNOte();
            }}
          >Download</a>),
          key: "4",
          icon: <DownloadOutlined />
        }, {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/note/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "5",
          icon: <FacebookIcon size={16} round />
        }
        ]
        :
        [{
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "note" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
                </Tooltip>
              </Input.Group>
            </>
          ),
          key: "1",
        },
        {
          label: (<a onClick=
            {() => {
              showDrawer();
            }}
          >Manage Version</a>),
          key: "2",
          icon: <InfoCircleOutlined />
        },
        {
          label: (
            <Popconfirm
              title="Are you sure to publish the note?"
              okText="Yes"
              cancelText="No"
              onConfirm={setNoteStatus}
            >
              <a style={{ textDecoration: "none" }}>Publish the note</a>
            </Popconfirm>),
          key: "3",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (<a onClick=
            {() => {
              downloadNOte();
            }}
          >Download</a>),
          key: "4",
          icon: <DownloadOutlined />
        }, {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/note/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "5",
          icon: <FacebookIcon size={16} round />
        }
        ]
    } />
  );

  const NoteDetailMenu = (
    <Menu items={
      [
        {
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "note" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
                </Tooltip>
              </Input.Group>
            </>
          ),
          key: "1",
        },
        {
          label: !props.isFavoriter ? (<a onClick={favorite}>Favorite</a>) : (<a onClick={unfavorite}>UnFavorite</a>),
          key: "2",
          icon: <StarOutlined />
        }, {
          label: (<a onClick=
            {() => {
              downloadNOte();
            }}
          >Download</a>),
          key: "3",
          icon: <DownloadOutlined />
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/note/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "4",
          icon: <FacebookIcon size={16} round />
        }

      ]
    } />
  );

  const NoteDetailMenuBuyer = (
    <Menu items={
      [
        {
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "note" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
                </Tooltip>
              </Input.Group>
            </>
          ),
          key: "1",
        },
        {
          label: !props.isFavoriter ? (<a onClick={favorite}>Favorite</a>) : (<a onClick={unfavorite}>UnFavorite</a>),
          key: "2",
          icon: <StarOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              showDrawer();
            }}
          >View All Versions</a>),
          key: "3",
          icon: <InfoCircleOutlined />
        }, {
          label: (<a onClick=
            {() => {
              downloadNOte();
            }}
          >Download</a>),
          key: "4",
          icon: <DownloadOutlined />
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/note/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "5",
          icon: <FacebookIcon size={16} round />
        }
      ]
    } />
  );

  const QnADetailMenu = (
    <Menu items={
      [
        {
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "qnA" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "qnA" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
                </Tooltip>
              </Input.Group>
            </>
          ),
          key: "1",
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/qnA/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "2",
          icon: <FacebookIcon size={16} round />
        }
      ]
    } />
  );

  const QnADetailMenuAuthor = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "qnA" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "qnA" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
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
              type: 'QA',
              action: "edit",
              page: 'QnAEditPage'
            })
          }}
        >Edit Information</a>),
        key: "2",
        icon: <EditOutlined />
      },
      {
        label: (<a onClick={archive}>Archive</a>),
        key: "3",
        icon: <InboxOutlined />
      },
      /*{
        label: props.isAnswered? props.public ? (<a onClick={setStatus}>Set the post private</a>) : (<a onClick={setStatus}>Set the post public</a>)
        :(
        <Tooltip title={"You have to select a best answers before set the post private."}>
          <a style={{ opacity: "0.4", textDecoration: "none" }}>Set the post private</a>
        </Tooltip>),
        key: "4",
        icon: <UserOutlined style={props.isAnswered? { color: "#333" }:{ color: "#333", opacity: "0.4"}}/>
      },*/
      {
        label: (
          <FacebookShareButton
            url={`${frontendURL}sharePage/qnA/${props.id}`}
            quote={"フェイスブックはタイトルが付けれるようです"}
            hashtag={"#NoteShare"}
            description={"aiueo"}
          >
            Share on Facebook
          </FacebookShareButton>
        ),
        key: "5",
        icon: <FacebookIcon size={16} round />
      }


      ]
    } />
  );

  const QnADetailMenuAuthorArchive = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "qnA" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "qnA" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
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
              type: 'QA',
              action: "edit",
              page: 'QnAEditPage'
            })
          }}
        >Edit Information</a>),
        key: "2",
        icon: <EditOutlined />
      },
      {
        label: (<a>Archive</a>),
        key: "3",
        icon: <InboxOutlined />,
        disabled: true
      },
      // {
      //   label: props.public ? (<a onClick={setStatus}>Set the post private</a>) : (<a onClick={setStatus}>Set the post public</a>),
      //   key: "5",
      //   icon: <UserOutlined style={{ color: "#333" }} />
      // },


      ]
    } />
  );

  const RewardDetailMenuAuthor = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "reward" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "reward" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
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
              type: 'reward',
              action: "edit",
              page: 'RewardEditPage'
            })
          }}
        >Edit Information</a>),
        key: "2",
        icon: <EditOutlined />
      },
      {
        label: (
          props.isAnswered ?
            <Popconfirm
              title="Are you sure to delete the post?"
              okText="Yes"
              cancelText="No"
              onConfirm={deletePost}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
            :
            <Tooltip title={"You have to select all best/reference answers before delete the post."}>
              <a style={{ color: "red", opacity: "0.4", textDecoration: "none" }}>Delete</a>
            </Tooltip>
        ),
        key: "3",
        icon: (
          props.isAnswered ?
            <DeleteOutlined style={{ color: "red" }} />
            :
            <DeleteOutlined style={{ color: "red", opacity: "0.4" }} />
        ),

        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/reward/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "4",
          icon: <FacebookIcon size={16} round />
        }
      ]
    } />
  );



  const RewardDetailMenu = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "reward" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "reward" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
              </Tooltip>
            </Input.Group>
          </>
        ),
        key: "1",
        
      },
      {
        label: (
          <FacebookShareButton
            url={`${frontendURL}sharePage/reward/${props.id}`}
            quote={"フェイスブックはタイトルが付けれるようです"}
            hashtag={"#NoteShare"}
            description={"aiueo"}
          >
            Share on Facebook
          </FacebookShareButton>
        ),
        key: "2",
        icon: <FacebookIcon size={16} round />
      }]
    } />
  );

  const CollabDetailMenu = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "collab" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "collab" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
              </Tooltip>
            </Input.Group>
          </>
        ),
        key: "1",
      }, {
        label: (
          <FacebookShareButton
            url={`${frontendURL}sharePage/collab/${props.id}`}
            quote={"フェイスブックはタイトルが付けれるようです"}
            hashtag={"#NoteShare"}
            description={"aiueo"}
          >
            Share on Facebook
          </FacebookShareButton>
        ),
        key: "2",
        icon: <FacebookIcon size={16} round />
      }
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
                  defaultValue={shareLink + "collab" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "collab" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
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
              showDrawer();
            }}
          >Manage Version</a>),
          key: "3",
          icon: <InfoCircleOutlined />
        },
        {
          label: (<a onClick=
            {() => {
              showHistoricalVoting();
            }}
          >Historical Voting</a>),
          key: "4",
          icon: <InfoCircleOutlined />
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/qnA/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "5",
          icon: <FacebookIcon size={16} round />
        }
      ]
    } />
  );


  const CollabDetailMenuOfManager = (
    <Menu items={
      [
        {
          label: (
            <>
              <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Invite Link"} fontSize='12' />
              <Input.Group compact>
                <Input
                  style={{ width: '80%' }}
                  defaultValue={shareLink + "collab" + '/' + props.id}
                />
                <Tooltip title="copy share link">
                  <Button icon={<CopyOutlined />} onClick={() => {
                    navigator.clipboard.writeText(shareLink + "collab" + '/' + props.id);
                    message.success('Copied link to clipboard!')
                  }} />
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
              showDrawer();
            }}
          >Manage Version</a>),
          key: "4",
          icon: <InfoCircleOutlined />
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
          key: "5",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (<a onClick={() => props.showKickWindow()}>Kick User</a>),
          key: "6",
          icon: <UserOutlined style={{ color: "#333" }} />,
        },
        {
          label: props.public ? (<a onClick={setStatus}>Set the post private</a>) : (<a onClick={setStatus}>Set the post public</a>),
          key: "7",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (
            <Tooltip title={"Publish time: " + moment(props.publishDate).format('YYYY-MM-DD HH:mm:ss')}>
              {props.notePublic ?
                (<a onClick={setNoteStatus} style={{ textDecoration: "none" }}>Unpublish the note</a>) : (<a onClick={setNoteStatus} style={{ textDecoration: "none" }}>Publish the note</a>)
              }
            </Tooltip>

          ),
          key: "8",
          icon: <UserOutlined style={{ color: "#333" }} />
        },
        {
          label: (<a onClick=
            {() => {
              showHistoricalVoting();
            }}
          >Historical Voting</a>),
          key: "9",
          icon: <InfoCircleOutlined />
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/collab/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "10",
          icon: <FacebookIcon size={16} round />
        }
      ]
    } />
  );

  /*
  {
          label: (
            props.voting ?
              "Kick User"
              :
              <Popover
                content={kickUserList}
                title={<Text color='black' cls='Small' content={"Choose a user"} fontSize='17' display="inline-block" />}
                trigger="hover"
                placement="left">
                Kick User
              </Popover>

          ),
          key: "8",
          icon: <UserOutlined style={{ color: "#333" }} />,
          disabled: props.voting ? true : false
        },
  
  */
  const VersionDetailMenuAuthor = (
    <Menu items={
      !props.notePublic ?
        [
          {
            label: (<a onClick={() => { versionBrowse(props.index) }}>Browse</a>),
            key: "1",
            icon: <EyeOutlined />
          },
        ]
        :
        [
          {
            label: (<a onClick={() => { versionBrowse(props.index) }}>Browse</a>),
            key: "1",
            icon: <EyeOutlined />
          },
          {
            label: !props.versions[props.index]?.temp ? (<a onClick={() => versionPublish(props.index)}>Set Private</a>) : (<a onClick={() => versionPublish(props.index)}>Set Public</a>),
            key: "2",
            icon: <EyeOutlined />
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
      !props.notePublic ?
        [
          {
            label: (<a onClick={() => { setVersion(props.index) }}>Copy</a>),
            key: "1",
            icon: <EditOutlined />
          },
        ]
        :
        [
          {
            label: (<a onClick={() => { setVersion(props.index) }}>Copy</a>),
            key: "1",
            icon: <EditOutlined />
          },
          {

            label: !props.versions[props.index]?.temp ? (<a onClick={() => versionPublish(props.index)}>Set Private</a>) : (<a onClick={() => versionPublish(props.index)}>Set Public</a>),
            key: "2",
            icon: <EyeOutlined />
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
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "note" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
              </Tooltip>
            </Input.Group>
          </>
        ),
        key: "1",
      },
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
        key: "2",
        icon: <EditOutlined />
      },
      {
        label: (<a onClick={() => { props.setCopy(props.id) }}>Copy</a>),
        key: "3",
        icon: <CopyOutlined />
      },
      {
        label: (
          <Popconfirm
            title="Are you sure to delete the note from the folder?"
            okText="Yes"
            cancelText="No"
            onConfirm={deletePost}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        ),
        key: "4",
        icon: <DeleteOutlined style={{ color: "red" }} />
      },{
        label: (
          <FacebookShareButton
            url={`${frontendURL}sharePage/note/${props.id}`}
            quote={"フェイスブックはタイトルが付けれるようです"}
            hashtag={"#NoteShare"}
            description={"aiueo"}
          >
            Share on Facebook
          </FacebookShareButton>
        ),
        key: "5",
        icon: <FacebookIcon size={16} round />
      }
      ]
    } />
  );

  const PersonalPageAllNoteMenu = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "note" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
              </Tooltip>
            </Input.Group>
          </>
        ),
        key: "1",
      },
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
          key: "2",
          icon: <EditOutlined />
        },
        {
          label: (<a onClick={() => { props.setCopy(props.id) }}>Add to Folder</a>),
          key: "3",
          icon: <PlusOutlined />
        },
        {
          label: (
            <FacebookShareButton
              url={`${frontendURL}sharePage/note/${props.id}`}
              quote={"フェイスブックはタイトルが付けれるようです"}
              hashtag={"#NoteShare"}
              description={"aiueo"}
            >
              Share on Facebook
            </FacebookShareButton>
          ),
          key: "4",
          icon: <FacebookIcon size={16} round /> 
        }
      ]
    } />
  );

  const FolderDetailPageNoteMenu = (
    <Menu items={
      [{
        label: (
          <>
            <Text className="detailNotice__Header__Title" color='black' cls='Small' content={"Share Link"} fontSize='12' />
            <Input.Group compact>
              <Input
                style={{ width: '80%' }}
                defaultValue={shareLink + "note" + '/' + props.id}
              />
              <Tooltip title="copy share link">
                <Button icon={<CopyOutlined />} onClick={() => {
                  navigator.clipboard.writeText(shareLink + "note" + '/' + props.id);
                  message.success('Copied link to clipboard!')
                }} />
              </Tooltip>
            </Input.Group>
          </>
        ),
        key: "1",
      },
      {
        label: (
          <FacebookShareButton
            url={`${frontendURL}sharePage/note/${props.id}`}
            quote={"フェイスブックはタイトルが付けれるようです"}
            hashtag={"#NoteShare"}
            description={"aiueo"}
          >
            Share on Facebook
          </FacebookShareButton>
        ),
        key: "3",
        icon: <FacebookIcon size={16} round />
      }
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
            if (props.isBuyer) {
              setMenu(NoteDetailMenuBuyer); break;
            }
            else {
              setMenu(NoteDetailMenu); break;
            }
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
            setChooseManagerList(
              <>
                <List.Item className='currUserItem' >
                  <Text color='black' cls='Small' content={"Current"} fontSize='3' display="inline-block" />
                  {props.manager ?
                    <div>
                      <Avatar style={{ cursor: "pointer" }} size={20} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: props.manager.userObjEmail })}></Avatar>
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
      case 'PersonalPage':
        if(props.mode != 'search'){
          if (!props.allNote) {
            setMenu(PersonalPageNoteMenu); break;
          }
          else {
            setMenu(PersonalPageAllNoteMenu); break;
          }
        }
        else{
          setMenu(FolderDetailPageNoteMenu); break;
        }
      // case 'QnAOutlinePage': setMenu( QnAOutlineMenu ); break;
    }
  }, [props])

  useEffect(() => {
    if (props.page == 'CollabDetailPage')
      setMenu(CollabDetailMenuOfManager);
  }, [chooseManagerList])

  useEffect(() => {
    if (props.isAnswered) {
      showModal()
    }
  }, [props.isAnswered])


  return (
    <>
      <Dropdown
        className="dropdownFunction"
        overlay={menu}
      >
        <Button><EllipsisOutlined style={{ fontSize: "1.5em", float: "right" }} /></Button>
      </Dropdown>
      <Drawer title={"Version"} placement="right" onClose={onClose} visible={visible}>
        <VersionArea setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={'NoteDetailPageVersion'} notePublic={props.notePublic} id={props.id} versions={props.versions} setVersions={props.setVersions} setVersion={props.setVersion} isAuthor={props.isAuthor} />
      </Drawer>
      {(props.page == "RewardDetailPage" && props.isAuthor) &&
        <Modal title="Notification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          You have selected all best/reference answers. Would you want to delete this reward post now?
        </Modal>
      }
    </>
  );
}

OptionMenu.defaultProps = {
  versions: [],
  public: false,
  setVersion: () => { },
  index: 0,
  id: '',
};

export default OptionMenu;
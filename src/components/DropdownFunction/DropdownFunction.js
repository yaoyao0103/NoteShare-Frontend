import React, { useEffect, useState } from "react";
import "./DropdownFunction.css";
import { Menu, Dropdown, message, Space, Drawer, List, Comment, Mentions } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import { EditOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const { Option } = Mentions;
const MOCK_DATA = {
    '@': ['afc163', 'zombiej', 'yesmeck'],
    '#': ['1.0', '2.0', '3.0'],
};
const DropdownFunction = (props) => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [names, setNames] = useState({
    '@': [],
    '#': ['1.0', '2.0', '3.0'],
});
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const showDrawer = () => {
    console.log("props", props);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={
        props.hasComment? [
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
        ]
        :
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
            label: (<a onClick={showDrawer}>Comment</a>),
            key: "3",
            icon: <CommentOutlined />
          },
        ]
    }
    />
  );

  useEffect(()=>{
    setComments(props.comments);
    const nameSet = new Set([]);
    props.comments.map( item => {
      nameSet.add(item.author);
    });
    setNames({
      '@': [...nameSet],
      '#': ['1.0', '2.0', '3.0'],
    });
  },[props])

  const [prefix, setPrefix] = useState('@');

    const onSearch = (_, newPrefix) => {
        setPrefix(newPrefix);
    };


  
  return(
    <>
      <Space className="dropdownFunction" wrap >
        <Dropdown.Button 
          className="dropdownFunction"
          onClick={handleButtonClick}
          overlay={menu}
        ></Dropdown.Button>
      </Space>
      <Drawer title="Comment" placement="right" onClose={onClose} visible={visible}>
        
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item, i) => (
          <li key={i}>
            <Comment
              actions={null}
              author={item.author}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>}
              content={item.content}
              datetime={item.date}
            />
          </li>
        )}
        />

          <div className='Comment__Input'>
              <Mentions
                  style={{
                      width: '100%',
                      height: '200px',
                  }}
                  placeholder="input @ to mention people, # to mention tag"
                  prefix={['@', '#']}
                  onSearch={onSearch}
                  >
                  {(names[prefix] || []).map((value) => (
                      <Option key={value} value={value}>
                      {value}
                      </Option>
                  ))}
              </Mentions>
          </div>
          <div className='Comment__Button' >
              <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
          </div>
      </Drawer>
    </>
  );
}

DropdownFunction.defaultProps = {
  comments: [],
  hasComment: false
};

export default DropdownFunction;

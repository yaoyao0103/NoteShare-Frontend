import React, { useState, useEffect } from "react";
import "./NavButton.css";
import { Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import NavMenu from "../NavMenu/NavMenu";
import SearchBar from "../SearchBar/SearchBar";

function NavButton(props) {
  

  const [width, setWindowWidth] = useState(0)
    useEffect(() => { 

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    const responsive = {
        showButtons: width >= 1024,
        showMenu: width >= 768,
        showSearchBar: width >= 650,
    }


  const [Showing, setShowing] = useState({
    PersonalPage: false,
    Reward: false,
    QnA: false,
    Collab: false,
  });
  const onClick = e => {
    handleShowingChange(e);
  };
  const handleShowingChange = e => {

    if (e.target.innerText === 'Personal Page') {
      setShowing({
        PersonalPage: true,
        Reward: false,
        QnA: false,
        Collab: false,
      });
      props.setPageProps({ page: 'PersonalPage' })
    } else if (e.target.innerText === 'Reward') {
      setShowing({
        PersonalPage: false,
        Reward: true,
        QnA: false,
        Collab: false,
      });
      props.setPageProps({ page: 'RewardRecommendPage', pageNumber: 1,sortMode:'date'});
    } else if (e.target.innerText === 'QA') {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: true,
        Collab: false,
      });
      props.setPageProps({ page: 'QnARecommendPage', pageNumber: 1,sortMode:'date' });
    } else if (e.target.innerText === 'Collab') {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: false,
        Collab: true,
      });
      props.setPageProps({ page: 'CollabRecommendPage', pageNumber: 1 ,sortMode:'date'});
    }
    else {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: false,
        Collab: false,
      });

    }
  };
  useEffect(() => {

    if (props.pageProps.page === 'PersonalPage') {
      setShowing({
        PersonalPage: true,
        Reward: false,
        QnA: false,
        Collab: false,
      });

    } else if (props.pageProps.page === 'RewardRecommendPage') {
      setShowing({
        PersonalPage: false,
        Reward: true,
        QnA: false,
        Collab: false,
      });

    } else if (props.pageProps.page === 'QnARecommendPage') {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: true,
        Collab: false,
      });

    } else if (props.pageProps.page === 'CollabRecommendPage') {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: false,
        Collab: true,
      });

    }
    else {
      setShowing({
        PersonalPage: false,
        Reward: false,
        QnA: false,
        Collab: false,
      });

    }

  }, [props.pageProps]);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <a onClick={onClick}>
              Personal Page
            </a>
          ),
          key: '0',
          value:'PersonalPage'
        },
        {
          type: 'divider',
        },
        {
          label: (
            <a onClick={onClick}>
              Reward
            </a>
          ),
          key: '1',
          value:'RewardOutlinePage'
        },
        {
          label: (
            <a onClick={onClick}>
              QA
            </a>
          ),
          key: '2',
          value:'QnAOutlinePage'
        },
        {
          label: (
            <a onClick={onClick}>
              Collab
            </a>
          ),
          key: '3',
          value: 'CollabOutlinePage'
        },
        {
          type: 'divider',
        },
        !responsive.showMenu && {
          label: (
            <NavMenu setPageProps={props.setPageProps} /> 
          ),
          key: '4',
          disabled: true
        },
        !responsive.showSearchBar && {
          label: (
            <SearchBar setPageProps={props.setPageProps} />
          ),
          key: '5',
          disabled: true,
          style:{ color: "#666"}
        }
      ]}
    />
  );

  return (
    <div className="navButton" >
      {responsive.showButtons?
      <>
        <Button type='text' className={`button button__first${Showing.PersonalPage ? '--active' : ''}`} value='PersonalPage'onClick={onClick}>Personal Page</Button>
        <Button type='text' className={`button button__second${Showing.Reward ? '--active' : ''}`} value='RewardOutlinePage'  onClick={onClick}>Reward</Button>
        <Button type='text' className={`button button__third${Showing.QnA ? '--active' : ''}`} value='QnAOutlinePage' onClick={onClick}>QA</Button>
        <Button type='text' className={`button button__forth${Showing.Collab ? '--active' : ''}`} value='CollabOutlinePage' onClick={onClick}>Collab</Button>
      </>
      :
      <Dropdown overlay={menu} overlayStyle={{textDecoration: "none"}}>
        <p style={{cursor:'pointer'}}onClick={(e) => e.preventDefault()}>
          <Space className="navDropdown">
            Functions
            <DownOutlined />
          </Space>
        </p>
      </Dropdown>
    }
    
    </div>
  );
}

export default NavButton;
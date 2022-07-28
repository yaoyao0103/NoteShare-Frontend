import React, { useState, useEffect } from "react";
import "./NavButton.css";
import { Button } from 'antd';

function NavButton(props) {
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
  return (
    <div id="navButton" className="navButton" >
      <Button type='text' className='button__first' value='PersonalPage' id={`button${Showing.PersonalPage ? '--active' : ''}`} onClick={onClick}>Personal Page</Button>
      <Button type='text' className='button__second' value='RewardOutlinePage' id={`button${Showing.Reward ? '--active' : ''}`} onClick={onClick}>Reward</Button>
      <Button type='text' className='button__third' value='QnAOutlinePage' id={`button${Showing.QnA ? '--active' : ''}`} onClick={onClick}>QA</Button>
      <Button type='text' className='button__forth' value='CollabOutlinePage' id={`button${Showing.Collab ? '--active' : ''}`} onClick={onClick}>Collab</Button>
    </div>
  );
}

export default NavButton;
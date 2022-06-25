import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavButton.css";
import { Button } from 'antd';

function NavButton(props) {
    const navigate = useNavigate();
    const [Showing, setShowing] = useState({
      PersonalPage:true,
      Reward:false,
      QnA:false,
      Collab:false,
    });
    const onClick = e =>{
      console.log(e.target.innerText);
      handleShowingChange(e);
      //this.forceUpdate();
    };
    const handleShowingChange = e => {
      if(e.target.innerText==='Personal Page'){
        setShowing({ PersonalPage:true,
          Reward:false,
          QnA:false,
          Collab:false,
        });
      }else if(e.target.innerText==='Reward'){
        setShowing({ PersonalPage:false,
          Reward:true,
          QnA:false,
          Collab:false,
        });
      }else if(e.target.innerText==='QnA'){
        setShowing({ PersonalPage:false,
          Reward:false,
          QnA:true,
          Collab:false,
        });
      }else if(e.target.innerText==='Collab'){
        setShowing({ PersonalPage:false,
          Reward:false,
          QnA:false,
          Collab:true,
        });
      }
      else{
        setShowing({ PersonalPage:false,
          Reward:false,
          QnA:false,
          Collab:false,
        });
      }
      props.changePage(e.target.innerText);
    };
  
    return (
      <div id = "navButton" className = "navButton" >
          <Button type='text' className='button__first'id={`button${Showing.PersonalPage ? '--active':''}`} onClick={() => navigate('/PersonalPage')}>Personal Page</Button>
          <Button type='text' className='button__second'id={`button${Showing.Reward ? '--active':''}`} onClick={onClick}>Reward</Button>
          <Button type='text' className='button__third'id={`button${Showing.QnA ? '--active':''}`} onClick={onClick}>QnA</Button>
          <Button type='text' className='button__forth'id={`button${Showing.Collab ? '--active':''}`} onClick={onClick}>Collab</Button>
      </div>
    );
  }
  
  export default NavButton;
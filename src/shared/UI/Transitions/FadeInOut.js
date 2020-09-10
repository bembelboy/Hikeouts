import React from 'react';
import { CSSTransition } from 'react-transition-group';

const FadeInOut = (props) => {
    return ( 
        <CSSTransition
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionName={{
          enter: enter,
          enterActive: enterActive,
          leave: leave,
          leaveActive: leaveActive,
        }}
      >
            {props.children}
        </CSSTransition>
     );
}

const enter = { opacity: 0.01 };

const enterActive = {
  opacity: 1,
  transition: 'opacity 500ms ease-in',
};

const leave = { opacity: 1 };

const leaveActive = {
  opacity: 0.01,
  transition: 'opacity 300ms ease-in',
};
 
export default FadeInOut;
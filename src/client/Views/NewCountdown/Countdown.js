import React from 'react';
import Countdown from 'react-countdown-now';
 
// Random component
const Completionist = () => <span>You are good to go!</span>;


const LemonCD = (props) => {
    return (
    <React.Fragment>
        <Countdown date={Date.now() + props.time} /*onPause={0}*/>
            <Completionist />
        </Countdown>
    </React.Fragment>
    )
}
export default LemonCD;
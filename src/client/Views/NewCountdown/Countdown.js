import React from 'react';
import Countdown from 'react-countdown-now';
 
// Random component
const Completionist = () => <span>You are good to go!</span>;

const LemonCD = (prop) => {
    return (
    <React.Fragment>
        <Countdown date={Date.now() + prop.time} onClick={prop.stop} >
            <Completionist />
        </Countdown>
    </React.Fragment>
    )
}
export default LemonCD;
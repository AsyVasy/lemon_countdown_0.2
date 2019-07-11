import React from 'react';
import Countdown from 'react-countdown-now';
 
const LemonCD = (prop) => {
    return (
    <React.Fragment>
        <Countdown date={Date.now() + prop.time} onClick={prop.stop} >
        <span className="msgCountdown">{prop.msg}</span>
        </Countdown>
    </React.Fragment>
    )
}
export default LemonCD;
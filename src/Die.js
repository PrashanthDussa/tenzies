import React from "react";
import Dot from './Dot'
export default function Die(props){
    const styles={
        backgroundColor: props.isHeld? "#59E391":"white"
    }
    const dotsArray=Array.from({ length: props.value }, (_, index) => index + 1)
    const dots= dotsArray.map(()=><Dot/>)
    return(
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {/* <h2>{props.value}</h2> */}
            <div className="dots">
                {dots}
            </div>
        </div>
    )
}
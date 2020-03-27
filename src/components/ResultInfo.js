import React from 'react';

function ResultInfo(props) {
    let result = null;
    if(props.fightResult !== '') {
        if(props.fightResult !== 'draw') {
            result = (
                <div className="text-center mt-3">
                    <span style={props.style}><strong>{props.fightResult} Player Won!</strong></span>
                </div>
            );
        } else {
            result = (
                <div className="text-center mt-3"><span><strong>It's a draw!</strong></span></div>
            );
        }
    }

    return(
        <React.Fragment>
            {result}
        </React.Fragment>
    );
}

export default ResultInfo;
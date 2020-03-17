import React from 'react';

function ScoreCounter(props) {

    let scoreRender = null;

    if(props.show) {
        scoreRender = (
            <div className="text-center mt-3">
              <span>First Player Score: { props.first }</span>
              <span> | </span>
              <span>Second Player Score: { props.second }</span>
            </div> 
        );
    }

    return(
        <React.Fragment>
            { scoreRender }
        </React.Fragment>
    );
}

export default ScoreCounter;
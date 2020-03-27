import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner(props) {
    let spinner = null;
    if(props.newGame && props.loading && props.error === '') {
        spinner = <div className="text-center mt-3"><Spinner animation="border" /></div>
    } 

    return(
        <React.Fragment>
            {spinner}
        </React.Fragment>
    );
}

export default LoadingSpinner;
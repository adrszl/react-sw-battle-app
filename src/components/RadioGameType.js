import React from 'react';

function RadioGameType(props) {
    return (
        <React.Fragment>
            <div className="input-group mx-auto">
                <div className="input-group-prepend ml-auto">
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="People">People</label>
                    <input type="radio" name="game_type" value="People" onChange={ props.handleRadioChange } />
                    </div>
                </div>
                <div className="input-group-append mr-auto">
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Starhips">Starhips</label>
                    <input type="radio" name="game_type" value="Starships" onChange={ props.handleRadioChange } />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RadioGameType;
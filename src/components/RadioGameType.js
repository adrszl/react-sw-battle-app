import React from 'react';

function RadioGameType(props) {

    const disabledButtonsStyle = {
        cursor: 'not-allowed'
    };

    return (
        <React.Fragment>
            <div className="input-group mx-auto">
                <div className="input-group-prepend ml-auto">
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="People">People</label>
                    <input type="radio" name="game_type" value="People" onChange={ props.handleRadioChange } />
                    </div>
                </div>
                <div className="input-group-append mr-0">
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Starhips">Starhips</label>
                    <input type="radio" name="game_type" value="Starships" onChange={ props.handleRadioChange } />
                    </div>
                </div>
                <div className="input-group-append mr-0" style={disabledButtonsStyle} >
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Films">Films [soon...]</label>
                    <input type="radio" name="game_type" value="Films" disabled />
                    </div>
                </div>
                <div className="input-group-append mr-0" style={disabledButtonsStyle} >
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Planets">Planets [soon...]</label>
                    <input type="radio" name="game_type" value="Planets" disabled />
                    </div>
                </div>
                <div className="input-group-append mr-0" style={disabledButtonsStyle} >
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Starhips">Species [soon...]</label>
                    <input type="radio" name="game_type" value="Species" disabled />
                    </div>
                </div>
                <div className="input-group-append mr-auto" style={disabledButtonsStyle}>
                    <div className="d-flex flex-column input-group-text">
                    <label htmlFor="Vehicles">Vehicles [soon...]</label>
                    <input type="radio" name="game_type" value="Vehicles" disabled />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RadioGameType;
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropdownPlayAgainst(props) {
    let dropdownRender = null;
    if(props.gameType === 'People') {
        dropdownRender = (
            <div className="mt-4 text-center">
                <Dropdown onSelect={props.handleSelect}>
                    <Dropdown.Toggle variant="secondary">
                        Play against {props.playAgainst}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey={'height'}>Height</Dropdown.Item>
                        <Dropdown.Item eventKey={'mass'}>Mass</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    } else if(props.gameType === 'Starships') {
        dropdownRender = (
            <div className="mt-4 text-center">
                <Dropdown onSelect={props.handleSelect}>
                    <Dropdown.Toggle variant="secondary">
                        Play against {props.playAgainst}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey={'cost_in_credits'}>Cost In Credits</Dropdown.Item>
                        <Dropdown.Item eventKey={'length'}>Length</Dropdown.Item>
                        <Dropdown.Item eventKey={'max_atmosphering_speed'}>Max Atmosphering Speed</Dropdown.Item>
                        <Dropdown.Item eventKey={'crew'}>Crew</Dropdown.Item>
                        <Dropdown.Item eventKey={'passengers'}>Passengers</Dropdown.Item>
                        <Dropdown.Item eventKey={'cargo_capacity'}>Cargo Capacity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
    return (
        <React.Fragment>
            { dropdownRender }
        </React.Fragment>
    );
}

export default DropdownPlayAgainst;
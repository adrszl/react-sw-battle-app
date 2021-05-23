import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
    const [firstHeaderVisible, setFirstHeaderVisible] = useState(true);
    const [secondHeaderVisible, setSecondHeaderVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => { 
            setFirstHeaderVisible(false);
        }, 4000);

        setTimeout(() => { 
            setSecondHeaderVisible(false);
        }, 7000);
    });

    return (
        <React.Fragment>
            { firstHeaderVisible ?
                <h1 className="text-center">React based SW battle app</h1>
                : null
            }
            { secondHeaderVisible ?
                <h2 className="text-center">Created by <a href="https://adrszl.github.io/" target="_blank">Adrian Szlegel</a></h2>
                : null
            }
            <h4 className="text-center">Select game type:</h4>
        </React.Fragment>
    );
}

export default Header;
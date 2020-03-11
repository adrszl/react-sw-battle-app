import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => { 
            setVisible(false);
        }, 4000);
    });

    return (
        <React.Fragment>
            { visible ?
                <h1 className="text-center">React based SW battle app</h1>
                : null
            }
            <h4 className="text-center">Select game type:</h4>
        </React.Fragment>
    );
}

export default Header;
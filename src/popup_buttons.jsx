import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BsCircleFill ,BsFillDpadFill ,BsFillHandIndexThumbFill } from 'react-icons/bs';
import './uiElements.css';

function MoveSetting() {
    const [selected, setSelected] = useState(1);
    const [open, setOpen] = useState(false);

    const handleClick = (id) => {
        console.log(id); // can assign a function here to call unity from in here
        setSelected(id);
        setOpen(false);
    }

    const getIcon = (id) => {
        switch(id) {
            case 1: 
                return <BsCircleFill  />
            case 2: 
                return <BsFillDpadFill  />
            case 3: 
                return <BsFillHandIndexThumbFill  />
            default: 
                return null;
        }
    }

    return (
        <div className="UIElement">
            {!open &&(
                <Button className='RoundButton' variant="outline-light" size= "lg" onClick={() => setOpen(!open)}>
                    {selected ?   getIcon(selected)  : 'Click to open'}
                </Button>
            )}
            {open && (
                <div className="options">
                    {[1, 2, 3].map(id => (
                        <Button 
                            key={id} 
                            className={selected === id ? 'active' : ''} 
                            variant="outline-light"
                            size= "lg"
                            onClick={() => handleClick(id)}
                        >
                            {getIcon(id)}                            
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MoveSetting;

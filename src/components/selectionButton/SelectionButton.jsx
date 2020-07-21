import React, {useState, useEffect} from 'react';
import "./SelectionButton.css"

const SelectionButton = ({text, options, onSelect}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [selected]);
    return (
        <div onClick={() => setOpen(true)} onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)} className="selectionButton">
            <button><span>{text}</span></button>
            <div className={`arrowUp ${open ? "open" : ""}`}></div>
            <div className={`optionsContainer ${open ? "open" : ""}`}>
                <div className="options">{options.map(opt => <span onClick={() => {
                    setSelected(!selected);
                    onSelect(opt.value);
                }}>{opt.label}</span>)}</div>
            </div>
        </div>      
    );
}

export default SelectionButton;
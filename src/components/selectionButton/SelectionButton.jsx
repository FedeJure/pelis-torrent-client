import React, {useState, useEffect} from 'react';
import "./SelectionButton.css"

const SelectionButton = ({text, options, onSelect}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selection, setSelection] = useState(options[0] || {label: ""});

    useEffect(() => {
        setOpen(false);
    }, [selected]);
    return (
        <div onClick={() => setOpen(!open)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="selectionButton">
            <button><span>{text ? text : selection.label}</span><div className={`${open ? "arrowUp2" : "arrowDown"}`}></div></button>
            <div className={`arrowUp ${open ? "open" : ""}`}></div>
            <div className={`optionsContainer ${open ? "open" : ""}`}>
                <div className="options">{options.map(opt => <span onClick={() => {
                    onSelect(opt);                    
                    setSelected(!selected);
                    setSelection(opt);
                }}>{opt.label}</span>)}</div>
            </div>
        </div>      
    );
}

export default SelectionButton;
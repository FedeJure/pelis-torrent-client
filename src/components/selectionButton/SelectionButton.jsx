import React, {useState, useEffect} from 'react';
import "./SelectionButton.css"

const SelectionButton = ({text, options, onSelect, className, selectedValue}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selection, setSelection] = useState(selectedValue ? options.find(o => o.value == selectedValue) || {label: ""} : options[0] || {label: ""});
    const [draged, setDraged] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [selected]);

    return (
        <div onClick={() => setOpen(!open)} className={`selectionButton ${className}`} onBlur={() => !draged && setOpen(false)} onMouseEnter={() => setDraged(true)} onMouseLeave={() => setDraged(false)}>
            <button><span>{text ? text : selection.label}</span><div className={`${open ? "arrowUp2" : "arrowDown"}`}></div></button>
            <div className={`arrowUp ${open ? "open" : ""}`}></div>
            <div className={`optionsContainer ${open ? "open" : ""}`}>
                <div className="options">{options.map(opt => <span onClick={() => {
                    onSelect(opt);                    
                    setSelected(!selected);
                    setSelection(opt);
                }} key={Math.random()}>{opt.label}</span>)}</div>
            </div>
        </div>  
    );
}

export default SelectionButton;
import React from 'react';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';

const theme = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: 'rgba(77, 111, 167, 1)'
    },
});


const customStyles = {
    control: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex'
    }),
    menuList: (provided, state) =>({
        ...provided,
        display: state.options.length > 0 ? provided.display : 'none'
    }),
    menu: (provided, state) =>({
        backgroundColor: 'rgba(29, 39, 56, 1)',
        display: state.options.length > 0 ? provided.display : 'none'
    }),
    input: (provided, state) =>({
        ...provided,
        color: 'white'
    }),
    noOptionMessage: (provided, state) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        color: 'white'
    })
};

const DropdownInput = props => {

    return props.async ? 
    <AsyncSelect {...props} styles={customStyles} theme={theme}/> :
    <Select {...props} styles={customStyles} theme={theme}/>
};

export default DropdownInput;
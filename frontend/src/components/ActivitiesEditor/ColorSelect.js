import React from 'react';
import PropTypes from 'prop-types';

import { COLOR_MAX_ID } from "~/constants";

export default function ColorSelect(props) {
    const colorIds = [...Array(COLOR_MAX_ID).keys()];

    return (
        <select className={`color-select color-select--color-${props.value}`} onChange={onChange} value={props.value}>
            {colorIds.map(colorId => (
                <option key={colorId} value={colorId} className={`color-select__option color-select__option--color-${colorId}`}/>
            ))}
        </select>
    );

    function onChange(e) {
        props.onChange(e.target.value);
    }
};

ColorSelect.propTypes = {
    value: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired,
};
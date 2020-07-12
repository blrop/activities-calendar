import React from 'react';
import PropTypes from 'prop-types';

import { COLOR_MAX_ID } from "~/constants";

export default function ColorSelect(props) {
    const colorIds = [...Array(COLOR_MAX_ID).keys()];

    return (
        <select className="color-select" onChange={onChange} value={props.value}>
            {colorIds.map(colorId => (
                <option key={colorId} value={colorId}/>
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
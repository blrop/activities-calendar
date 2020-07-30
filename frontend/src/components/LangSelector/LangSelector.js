import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AVAILABLE_LANGUAGES } from "~/constants";

import './LangSelector.scss';

export default function LangSelector({ onSelect }) {
    return (
        <div className="lang-selector">
            {AVAILABLE_LANGUAGES.map((item, index) => (
                <LangSelectorItem
                    key={item.code}
                    index={index}
                    name={item.name}
                    code={item.code}
                    onClickCallback={onSelect}
                />
            ))}
        </div>
    );
};

LangSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

function LangSelectorItem({ code, name, onClickCallback, index }) {
    const r = useRef(null);

    useEffect(() => {
        if (r.current) {
            r.current.focus();
        }
    }, []);

    return (
        <button
            className="lang-selector__item"
            onClick={onClick}
            ref={index === 0 ? r : null}
        >
            {name}
        </button>
    );

    function onClick() {
        onClickCallback(code);
    }
}

LangSelectorItem.propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,

    onClickCallback: PropTypes.func.isRequired,
};
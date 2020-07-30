import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { LanguageContext } from "~/components/App";
import { AVAILABLE_LANGUAGES } from "~/constants";

import './LangSelector.scss';

export default function LangSelector({ onSelect }) {
    const currentLangCode = useContext(LanguageContext);

    return (
        <div className="lang-selector">
            {AVAILABLE_LANGUAGES.map((item, index) => (
                <LangSelectorItem
                    key={item.code}
                    index={index}
                    name={item.name}
                    code={item.code}
                    onClickCallback={onSelect}
                    currentLangCode={currentLangCode}
                />
            ))}
        </div>
    );
};

LangSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

function LangSelectorItem({ code, name, onClickCallback, index, currentLangCode }) {
    const r = useRef(null);

    useEffect(() => {
        if (r.current) {
            r.current.focus();
        }
    }, []);

    return (
        <button
            className={classNames(
                "lang-selector__item",
                { "lang-selector__item--selected": (code === currentLangCode) }
            )}
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
    currentLangCode: PropTypes.string.isRequired,

    onClickCallback: PropTypes.func.isRequired,
};
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { COLOR_MAX_ID } from "~/constants";
import ToolDialog from "~/components/ToolDialog/ToolDialog";
import { LanguageContext } from "~/components/App";
import { createLangGetter } from "~/tools/tools";

export default function ColorSelect(props) {
    const lang = createLangGetter(useContext(LanguageContext));

    const [isDialogShown, setDialogState] = useState(false);

    const colorIds = [...Array(COLOR_MAX_ID).keys()];

    return (
        <>
            <button type="button" onClick={showDialog} className="color-select__button">
                <span className={`color-select__button-indicator color-${props.value}`}/>
                <span className="color-select__button-text">{lang('cs-change-color')}</span>
            </button>

            {isDialogShown && (
                <ToolDialog closeCallback={hideDialog}>
                    <div className="color-select__items">
                        {colorIds.map(rawColorId => {
                            const colorId = (rawColorId + 1).toString();
                            return (
                                <ColorItem
                                    key={colorId}
                                    colorId={colorId}
                                    onClick={onColorSelect}
                                    selected={props.value === colorId}
                                />
                            );
                        })}
                    </div>
                </ToolDialog>
            )}
        </>
    );

    function onColorSelect(colorId) {
        setDialogState(false);
        props.onChange(colorId);
    }

    function showDialog() {
        setDialogState(true);
    }

    function hideDialog() {
        setDialogState(false);
    }
};

ColorSelect.propTypes = {
    value: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired,
};

function ColorItem(props) {
    return (
        <div
            className={classNames(
                'color-select__item',
                `color-${props.colorId}`,
                { 'color-select__item--selected': props.selected },
            )}
            onClick={onClick}
        />
    );

    function onClick() {
        props.onClick(props.colorId);
    }
}

ColorItem.propTypes = {
    colorId: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
};
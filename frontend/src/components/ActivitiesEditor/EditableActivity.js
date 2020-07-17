import PropTypes from "prop-types";
import React from "react";

import ColorSelect from "./ColorSelect";

export default function EditableActivity(props) {
    if (props.deleted) {
        return (
            <div className="editable-activity editable-activity--deleted">
                <div className="editable-activity__row1">
                    <div className="editable-activity__title">
                        {props.item.title}
                    </div>
                    <button type="button" onClick={onDeleteClick} className="delete-button">Restore</button>
                </div>
            </div>
        );
    }

    return (
        <div className="editable-activity">
            <div className="editable-activity__row1">
                <input type="text" value={props.item.title} onChange={onTitleChange} required/>
                <button type="button" onClick={onDeleteClick} className="delete-button">Delete</button>
            </div>
            <div className="editable-activity__row2">
                <ColorSelect onChange={onColorChange} value={props.item.colorId}/>
            </div>
        </div>
    );

    function onDeleteClick() {
        props.onDeleteClick(props.index);
    }

    function onTitleChange(e) {
        props.onTitleChange(props.index, e.target.value);
    }

    function onColorChange(colorId) {
        props.onColorChange(props.index, colorId);
    }
}

EditableActivity.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,

    onTitleChange: PropTypes.func.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};
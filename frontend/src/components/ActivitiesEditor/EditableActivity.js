import PropTypes from "prop-types";
import React from "react";

export default function EditableActivity(props) {
    if (props.deleted) {
        return (
            <div className="editable-activity editable-activity--deleted">
                <div className="editable-activity__row1">
                    <div className="editable-activity__title">
                        {props.item.title}
                    </div>
                    <button onClick={onDeleteClick} className="delete-button">Restore</button>
                </div>
            </div>
        );
    }

    return (
        <div className="editable-activity">
            <div className="editable-activity__row1">
                <input type="text" value={props.item.title} onChange={onTitleChange}/>
                <button onClick={onDeleteClick} className="delete-button">Delete</button>
            </div>
            <div className="editable-activity__row2">
                <ColorSelect onChange={onColorChange}/>
            </div>
        </div>
    );

    function onDeleteClick() {
        props.onDeleteClick(props.id);
    }

    function onTitleChange(e) {
        props.onTitleChange(props.id, e.target.value);
    }

    function onColorChange(colorId) {
        props.onColorChange(props.id, colorId);
    }
}

EditableActivity.propTypes = {
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired,

    onTitleChange: PropTypes.func.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};
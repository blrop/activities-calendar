import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import update from 'immutability-helper';

import EditableActivity from "./EditableActivity";
import './ActivitiesEditor.scss';
import { DEFAULT_ACTIVITY_COLOR_ID } from "~/constants";


export default function ActivitiesEditor(props) {
    const DTO = {
        toInternalFormat(items) {
            return items.map(item => ({
                data: item,
                deleted: false,
            }));
        },
        fromInternalFormat(items) {
            return items
                .filter(item => !item.deleted)
                .map(item => item.data);
        }
    };

    const activitiesInitialState = DTO.toInternalFormat(props.activities);
    const [activities, setActivities] = useState(activitiesInitialState);

    if (!props.isShown) {
        return null;
    }

    return (
        <div className="modal-dialog-wrapper" onClick={onWrapperClick}>
            <form onSubmit={onSubmit} className="modal-dialog">
                <div className="modal-dialog__header">
                    <h2 className="modal-dialog__title">Edit Activities</h2>
                    <button
                        className="modal-dialog__close-button icon-close"
                        aria-label="Close"
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
                <div className="modal-dialog__body">
                    <div className="editable-activities">
                        <div className="editable-activities__list">
                            {renderBody()}
                        </div>
                        <div className="editable-activities__new">
                            <button type="button" onClick={addNewActivity}>Add activity</button>
                        </div>
                    </div>
                </div>
                <div className="modal-dialog__buttons">
                    <button type="submit" className="button-primary">Save changes</button>
                    <button type="button" className="button-secondary" onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );

    function addNewActivity() {
        setActivities(update(activities, {
            $push: [{
                data: {
                    title: '',
                    colorId: DEFAULT_ACTIVITY_COLOR_ID,
                },
                deleted: false,
            }]
        }));
    }

    function onWrapperClick(e) {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }

    function onSubmit(e) {
        e.preventDefault();

        props.onSubmit(DTO.fromInternalFormat(activities));
    }

    function renderBody() {
        return _.map(activities, (item, index) => {
            return (
                <EditableActivity
                    item={item.data}
                    index={index}
                    key={index}
                    deleted={item.deleted}
                    onTitleChange={onTitleChange}
                    onColorChange={onColorChange}
                    onDeleteClick={toggleActivityDeleted}
                />
            );
        });
    }

    function onTitleChange(index, value) {
        setActivities(update(activities, {
            [index]: {
                data: {
                    title: {
                        $set: value,
                    }
                }
            }
        }));
    }

    function onColorChange(index, colorId) {
        setActivities(update(activities, {
            [index]: {
                data: {
                    colorId: {
                        $set: colorId,
                    },
                }
            }
        }));
    }

    function toggleActivityDeleted(index) {
        setActivities(update(activities, {
            [index]: {
                deleted: {
                    $set: !activities[index].deleted
                },
            }
        }));
    }
};

ActivitiesEditor.propTypes = {
    activities: PropTypes.array.isRequired,
    isShown: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

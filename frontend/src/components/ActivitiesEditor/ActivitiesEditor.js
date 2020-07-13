import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import update from 'immutability-helper';

import EditableActivity from "./EditableActivity";
import './ActivitiesEditor.scss';


export default function ActivitiesEditor(props) {
    const [activities, setActivities] = useState(props.activities.map(item => ({
        data: item,
        deleted: false,
    })));

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
};

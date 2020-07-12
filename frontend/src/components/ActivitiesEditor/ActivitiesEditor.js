import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import EditableActivity from "./EditableActivity";
import './ActivitiesEditor.scss';


export default function ActivitiesEditor(props) {
    const [activities, setActivities] = useState(_.map(props.activities, (item, key) => ({
        data: item,
        id: key,
        deleted: false,
    })));

    return _.map(activities, (item) => {
        return (
            <EditableActivity
                item={item.data}
                id={item.id}
                key={item.id}
                deleted={item.deleted}
                onTitleChange={onTitleChange}
                onColorChange={onColorChange}
                onDeleteClick={toggleActivityDeleted}
            />
        );
    });

    function onTitleChange(id, value) {
        setActivities(activities.map(item => {
            if (item.id === id) {
                item.data.title = value;
            }
            return item;
        }));
    }

    function onColorChange(id, colorId) {
        setActivities(activities.map(item => {
            if (item.id === id) {
                item.data.colorId = colorId;
            }
            return item;
        }));
    }

    function toggleActivityDeleted(id) {
        setActivities(activities.map(item => {
            if (item.id === id) {
                item.deleted = !item.deleted;
            }
            return item;
        }));
    }
};

ActivitiesEditor.propTypes = {
    activities: PropTypes.object.isRequired,
};

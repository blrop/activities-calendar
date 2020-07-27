import moment from 'moment';
import { useState } from "react";

export const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
};

export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return { value, onChange: handleChange };
}

export const fillLogWithEmptyDates = (log) => {
    if (log.length === 0) {
        return [{
            content: [],
            date: formatDate(moment()),
        }];
    }

    let result = [];
    let nextDate = moment().startOf('day');

    for (let i = 0; i < log.length; i++) {
        const itemDate = moment(log[i].date).startOf('day');
        while (nextDate.diff(itemDate, 'days') >= 1) {
            result.push({
                content: [],
                date: formatDate(nextDate),
            });
            nextDate = nextDate.subtract(1, 'days');
        }
        result.push(log[i]);
        nextDate = moment(log[i].date).subtract(1, 'days').startOf('day');
    }

    return result;
};
import moment from 'moment';
import { useState } from "react";

export const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD');
};

export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return { value, onChange: handleChange };
}
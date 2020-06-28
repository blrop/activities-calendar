import moment from 'moment';

export const getCurrentDate = () => {
    return moment().format('YYYY-MM-DD');
};
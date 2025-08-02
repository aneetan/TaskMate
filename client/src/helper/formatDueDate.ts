import moment from 'moment';

export const formatDueDate =  (dueDate: Date | string): string => {
    //moment gets todays date and startof("day") resets the date to the 00:00 so that we only compare date
    const today = moment().startOf("day");
    const due = moment(dueDate).startOf('day');
    const diffDays = due.diff(today, 'days');

    if(diffDays === 0) return 'Due today';
    if(diffDays === 1) return 'Due tomorrow';
    if(diffDays > 0) return `Due at ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;

}
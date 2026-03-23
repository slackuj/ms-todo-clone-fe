import React from 'react';
import { TbCalendarWeek } from "react-icons/tb";
import './DatePicker.css';

interface DatePickerProps {
    selectedDate: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {

    // Convert Date object to YYYY-MM-DD string for the input
    const dateToString = (date: Date | undefined): string => {
        if (!date) return "";
        return date.toISOString().split('T')[0];
    };

    // Calculate today's date in YYYY-MM-DD to disable past days
    const todayStr = new Date().toISOString().split('T')[0];

    const formatDate = (date: Date | undefined): string => {
        if (!date) return "";

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const resetTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const targetTime = resetTime(date);

        if (targetTime === resetTime(today)) return "Today";
        if (targetTime === resetTime(tomorrow)) return "Tomorrow";

        const isThisYear = date.getFullYear() === today.getFullYear();

        return 'Due ' + date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: isThisYear ? undefined : 'numeric',
        });
    };

    return (
        <div className="datePicker-container">
            <div className="icon-wrapper" data-tooltip="Add due date">
                <TbCalendarWeek className="date-icon" />
                <input
                    type="date"
                    className="hidden-date-input"
                    value={dateToString(selectedDate)}
                    min={todayStr}
                    onChange={(e) => {
                        const val = e.target.value;
                        onDateChange(val ? new Date(val) : undefined);
                    }}
                />
            </div>
            {selectedDate && (
                <span className="display-date-text">
                    {formatDate(selectedDate)}
                </span>
            )}
        </div>
    );
};
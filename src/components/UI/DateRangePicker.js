import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateRange = ({ selectedRange, onChange, dateStates, ...rest }) => {
  // Function to determine the CSS class based on the date state
  const getDayClass = (date) => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const state = dateStates[dateStr] || "available"; // Default to 'available'
    return `date-${state}`;
  };

  return (
    <ReactDatePicker
      selectsRange={true}
      startDate={selectedRange?.[0]?.startDate || null}
      endDate={selectedRange?.[0]?.endDate || null}
      onChange={(range) => {
        const selectedRange = {
          selection: [
            { startDate: range?.[0], endDate: range?.[1], key: "selection" },
          ],
        };
        onChange(selectedRange);
      }}
      isClearable={false}
      dayClassName={getDayClass}
      {...rest}
    />
  );
};

export default DateRange;

import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({ selectedRange, onChange, ...rest }) => {
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
      {...rest}
    />
  );
};

export default DateRange;

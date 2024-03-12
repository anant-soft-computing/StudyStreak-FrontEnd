import React from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRange = ({ selectedRange, onChange }) => {
  return (
    <DateRangePicker
      onChange={onChange}
      ranges={selectedRange}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      direction="horizontal"
    />
  );
};

export default DateRange;
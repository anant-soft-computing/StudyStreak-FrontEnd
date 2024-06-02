import React from "react";
// import { DateRange as DateRangePicker } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({ selectedRange, onChange }) => {
  return (
    <>
      {/* <DateRangePicker
        onChange={onChange}
        ranges={selectedRange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        direction='horizontal'
        staticRanges={[]}
        inputRanges={[]}
        showPreview={false}
      /> */}

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
      />
    </>
  );
};

export default DateRange;

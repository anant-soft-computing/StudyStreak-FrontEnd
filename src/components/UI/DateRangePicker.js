import React from "react";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({
  type,
  selectedDate,
  onChange,
  highlightedRanges,
  ...rest
}) => {
  const isDateInRange = (date, range) => {
    const day = moment(date).startOf("day");
    const start = moment(range.start).startOf("day");
    const end = moment(range.end).endOf("day");
    return day.isBetween(start, end, null, "[]");
  };

  const isCurrentDate = (date) => {
    return moment(date)?.isSame(moment(), "day");
  };

  const isSelectedDate = (date) => {
    const selectedDateMoment = moment(selectedDate).startOf("day");
    const currentDate = moment(date).startOf("day");
    return currentDate.isSame(selectedDateMoment, "day");
  };

  const isBeforeCurrentDate = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={(date) => {
        onChange(date);
      }}
      isClearable={false}
      filterDate={(date) => {
        if (type !== "Recorded Classes") {
          return !isBeforeCurrentDate(date);
        }
        return true;
      }}
      {...rest}
      highlightDates={[
        ...highlightedRanges?.map((range) => ({
          "highlighted-range": [new Date(range.start), new Date(range.end)],
        })),
      ]}
      dayClassName={(date) => {
        if (type !== "Recorded Classes" && isBeforeCurrentDate(date)) {
          return "greyed-day";
        }
        if (isCurrentDate(date)) {
          return "current-day";
        }
        if (isSelectedDate(date)) {
          return "selected-day";
        }
        return highlightedRanges?.some((range) => isDateInRange(date, range))
          ? "highlighted-day"
          : undefined;
      }}
    />
  );
};

export default DateRange;

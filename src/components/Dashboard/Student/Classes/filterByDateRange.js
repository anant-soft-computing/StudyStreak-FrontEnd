import moment from "moment";

export const filterByDateRange = (start_time, end_time, selectedDate) => {
  const classStartDate = moment(start_time).format("YYYY-MM-DD");
  const classEndDate = moment(end_time).format("YYYY-MM-DD");
  const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");

  return (
    classStartDate <= formattedSelectedDate &&
    classEndDate >= formattedSelectedDate
  );
};
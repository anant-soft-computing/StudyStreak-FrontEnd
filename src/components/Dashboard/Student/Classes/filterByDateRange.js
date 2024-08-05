import moment from "moment";

export const filterByDateRange = (start_time, end_time, selectedDateRange) => {
  const classStartDate = moment(start_time).format("YYYY-MM-DD");
  const classEndDate = moment(end_time).format("YYYY-MM-DD");
  const { startDate, endDate } = selectedDateRange?.[0] || {};

  if (startDate && !endDate) {
    return (
      classStartDate <= moment(startDate).format("YYYY-MM-DD") &&
      classEndDate >= moment(startDate).format("YYYY-MM-DD")
    );
  }

  if (startDate && endDate) {
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

    return (
      (classStartDate >= formattedStartDate &&
        classStartDate <= formattedEndDate) ||
      (classEndDate >= formattedStartDate &&
        classEndDate <= formattedEndDate) ||
      (classStartDate <= formattedStartDate && classEndDate >= formattedEndDate)
    );
  }

  return true;
};
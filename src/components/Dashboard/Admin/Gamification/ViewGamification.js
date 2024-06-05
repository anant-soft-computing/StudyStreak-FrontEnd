import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const specificColumns = {
  FlashCard: [
    { headerName: "No.", field: "no", resizable: false, width: 110 },
    { headerName: "Name", field: "title", filter: true },
    { headerName: "Description", field: "description", filter: true },
    { headerName: "Priority", field: "set_priority", filter: true },
    { headerName: "Course", field: "course.Course_Title", filter: true },
    { headerName: "Items", field: "flash_card_items.length", filter: true },
  ],
  Lesson: [
    { headerName: "Lesson Title", field: "name", filter: true },
    {
      headerName: "Description",
      field: "Lesson_Description",
      filter: true,
    },
    {
      headerName: "Video",
      field: "Lesson_Video",
      filter: true,
    },
    {
      headerName: "Duration",
      field: "Lesson_Duration",
      filter: true,
    },
  ],
  Course: [
    { headerName: "No.", field: "no", resizable: false, width: 60 },
    { headerName: "Course Title", field: "Course_Title", filter: true },
    {
      headerName: "Course Identifire",
      field: "course_identifier",
      filter: true,
    },
    {
      headerName: "Course Delivery",
      field: "course_delivery",
      filter: true,
    },
    { headerName: "Course Type", field: "course_type", filter: true },
    {
      headerName: "Enrollment Start Date",
      field: "EnrollmentStartDate",
      filter: true,
    },
    {
      headerName: "Enrollment End Date",
      field: "EnrollmentEndDate",
      filter: true,
    },
    {
      headerName: "Max Enrollment",
      field: "max_enrollments",
      filter: true,
    },
    { headerName: "Category", field: "Category.name", filter: true },
    { headerName: "Level", field: "Level.name", filter: true },
    { headerName: "Language", field: "Language.name", filter: true },
    {
      headerName: "SEO Meta Keyword",
      field: "SEO_Meta_Keywords",
      filter: true,
    },
    {
      headerName: "SEO Meta Keyword",
      field: "Meta_Description",
      filter: true,
    },
  ],
  Exam: [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "exam_name", filter: true },
    { headerName: "Exam Type", field: "exam_type", filter: true },
    { headerName: "No. Of Questions", field: "no_of_questions", filter: true },
    { headerName: "Block Type", field: "block_type", filter: true },
    { headerName: "Difficulty Level", field: "difficulty_level", filter: true },
    { headerName: "Block Threshold", field: "block_threshold", filter: true },
  ],
  FullLengthTest: [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "name", filter: true },
    { headerName: "Exam Level", field: "difficulty_level", filter: true },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
    },
  ],
  module: [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "Name", filter: true },
    { headerName: "Difficulty Level", field: "difficulty_level", filter: true },
    { headerName: "Reading Set", field: "Reading.length", filter: true },
    { headerName: "Writing Set", field: "Writing.length", filter: true },
    { headerName: "Listening Set", field: "Listening.length", filter: true },
    { headerName: "Speaking Set", field: "Speaking.length", filter: true },
  ],
  Live_Class: [
    { headerName: "Meeting Title", field: "meeting_title" },
    {
      headerName: "Start Date",
      field: "start_date",
      valueGetter: (params) => {
        return moment(params.data.start_time).format("DD MMM, YYYY");
      },
    },
    {
      headerName: "Start Time",
      field: "start_time",
      valueGetter: (params) => {
        return moment(params.data.start_time).format("hh:mm A");
      },
    },
    {
      headerName: "End Date",
      field: "end_date",
      valueGetter: (params) => {
        return moment(params.data.end_time).format("DD MMM, YYYY");
      },
    },
    {
      headerName: "End Time",
      field: "end_time",
      valueGetter: (params) => {
        return moment(params.data.end_time).format("hh:mm A");
      },
    },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
  ],
};

const ViewGamification = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [gamificationList, setGamificationList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const fetchData = async (url, setter) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setter(response?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`/gamification/`, setGamificationList);
  }, [authData?.accessToken]);

  useEffect(() => {
    const endpoints = {
      FlashCard: `/gamification/flashcard/`,
      Lesson: `/lessonview/`,
      Course: `/courselistview/`,
      Exam: `/exam-blocks/`,
      FullLengthTest: `/get/flt/`,
      module: `/moduleListView/`,
      Live_Class: `/liveclass_list_view/`,
    };

    if (content && endpoints[content]) {
      fetchData(endpoints[content], setDataList);
    }
  }, [authData?.accessToken, content]);

  const filteredDataList = () => {
    switch (content) {
      case "FlashCard":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.title && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "Lesson":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Lesson_Title && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "Course":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Course_Title && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "Exam":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) =>
                i.name === `${item.exam_name}-${item.exam_type}` &&
                i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "FullLengthTest":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.name && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "module":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.Name && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      case "Live_Class":
        return dataList
          .filter((item) =>
            gamificationList.some(
              (i) => i.name === item.meeting_title && i.model === content
            )
          )
          .map((item, index) => ({ ...item, no: index + 1 }));
      default:
        return gamificationList
          .filter((item) => item.model === content)
          .map((item, index) => ({ ...item, no: index + 1 }));
    }
  };

  const columns = [...(specificColumns[content] || [])];

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : filteredDataList().length > 0 ? (
    <Table rowData={filteredDataList()} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Gamification Available !!</h5>
  );
};

export default ViewGamification;

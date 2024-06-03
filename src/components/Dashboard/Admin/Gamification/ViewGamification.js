import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const commonColumns = [
  { headerName: "No.", field: "no", resizable: false, width: 68 },
  { headerName: "Model", field: "model", filter: true, width: 180 },
];

const specificColumns = {
  flashcard: [
    { headerName: "Title", field: "title", filter: true },
    { headerName: "Description", field: "description", filter: true },
    { headerName: "Set Priority", field: "set_priority", filter: true },
    {
      headerName: "Flash Card Items",
      field: "flash_card_items.length",
      filter: true,
    },
  ],
  lesson: [
    { headerName: "Lesson Title", field: "Lesson_Title", filter: true },
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
  course: [
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
  exam: [
    { headerName: "Exam Name", field: "exam_name", filter: true },
    { headerName: "Exam Type", field: "exam_type", filter: true },
  ],
  fulllengthtest: [
    { headerName: "Name", field: "name", filter: true },
    { headerName: "Difficulty Level", field: "difficulty_level", filter: true },
  ],
  module: [
    { headerName: "Name", field: "Name", filter: true },
    {
      headerName: "Difficulty Level",
      field: "difficulty_level",
      filter: true,
    },
    {
      headerName: "Practice Test Type",
      field: "practice_test_type",
      filter: true,
    },
  ],
  liveclass: [],
};

const ViewGamification = ({ content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gamificationList, setGamificationList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/gamification/`,
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
          setIsLoading(false);
          setGamificationList(response?.data || []);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [authData?.accessToken]);

  const filteredList = gamificationList
    .filter((item) => item.model === content)
    .map((item, index) => ({ ...item, no: index + 1 }));

  const columns = [...commonColumns, ...(specificColumns[content] || [])];

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : filteredList.length > 0 ? (
    <Table rowData={filteredList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Gamification Available !!</h5>
  );
};

export default ViewGamification;

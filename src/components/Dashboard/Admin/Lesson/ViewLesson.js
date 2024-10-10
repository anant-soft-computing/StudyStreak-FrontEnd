import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const ViewLesson = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lessonList, setLessonList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const ViewButton = ({ url }) =>
    url !== "-" ? (
      <button className="take-test" onClick={() => window.open(url)}>
        View
      </button>
    ) : (
      "-"
    );

  useEffect(() => {
    if (activeTab === "View Lesson") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            `/lesson-get/`,
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
          if (response.status === 200) {
            const lessonWithNumbers = response?.data?.map((lesson, index) => ({
              ...lesson,
              no: index + 1,
            }));
            setLessonList(lessonWithNumbers);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeTab, authData?.accessToken]);

  const columns = [
    { headerName: "No.", field: "no", resizable: false, width: 60 },
    { headerName: "Lesson Title", field: "Lesson_Title", filter: true },
    {
      headerName: "Lesson Description",
      field: "Lesson_Description",
      filter: true,
    },
    {
      headerName: "Lesson Duration",
      field: "Lesson_Duration",
      filter: true,
    },
    { headerName: "Active", field: "active", filter: true },
    {
      headerName: "Lesson Video",
      field: "Lesson_Video",
      filter: true,
      cellRenderer: (params) => <ViewButton url={params.value} />,
    },
    {
      headerName: "Lesson Assignment",
      field: "lesson_assignment.length",
      filter: true,
    },
    {
      headerName: "Lesson Attachment",
      field: "lesson_attachments.length",
      filter: true,
    },
    {
      headerName: "Lesson Quiz",
      field: "quiz_questions.length",
      filter: true,
    },
  ];

  return isLoading ? (
    <Loading />
  ) : lessonList.length > 0 ? (
    <Table rowData={lessonList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Lesson Available !!</h5>
  );
};

export default ViewLesson;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const ViewExam = ({ activeTab }) => {
  const [examList, setExamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [speakingList, setSpeakingList] = useState([]);
  const [ptList, setPtList] = useState([]);
  const [fltList, setFltList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const mtData = [...examList, ...speakingList];
  const miniTestData = mtData.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const fetchData = async (url, filterFn, setData) => {
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
      if (response.status === 200) {
        const filteredData = response.data.filter(filterFn);
        const dataWithNumbers = filteredData.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(dataWithNumbers);
        setIsLoading(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (activeTab === "View Exam") {
      fetchData(
        "/exam-blocks/?fields=id,exam_name,exam_type,no_of_questions,block_type",
        ({ block_type }) => block_type === "Mock Test",
        setExamList
      );
      fetchData("/speaking-block/", () => true, setSpeakingList);
      fetchData("/moduleListView/", () => true, setPtList);
      fetchData("/get/flt/", () => true, setFltList);
    }
  }, [activeTab]);

  return (
    <div>
      <div className="dashboard__form__wraper">
        <div className="dashboard__form__input">
          <label>(1) Mock Tests : </label>
        </div>
      </div>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : miniTestData.length > 0 ? (
        <Table
          rowData={miniTestData}
          columnDefs={[
            { headerName: "No.", field: "no", resizable: false, width: 68 },
            {
              headerName: "Exam Name",
              field: "exam_name" || "name",
              filter: true,
              valueGetter: (params) => {
                return params.data?.exam_name || params.data?.name;
              },
            },
            {
              headerName: "Exam Type",
              field: "exam_type" || "Speaking",
              filter: true,
              valueGetter: (params) => {
                return params.data?.exam_type || "Speaking";
              },
            },
            {
              headerName: "No. Of Questions",
              field: "no_of_questions" || "questions.length",
              filter: true,
              valueGetter: (params) => {
                return (
                  params.data?.no_of_questions || params.data?.questions.length
                );
              },
            },
            {
              headerName: "Block Type",
              field: "block_type" || "Mock Test",
              filter: true,
              valueGetter: (params) => {
                return params.data?.block_type || "Mock Test";
              },
            },
          ]}
        />
      ) : (
        <h5 className="text-center text-danger">No Mini Test Available !!</h5>
      )}
      <div>
        <div>
          <div className="dashboard__form__wraper mt-4">
            <div className="dashboard__form__input">
              <label>(2) Practice Tests : </label>
            </div>
          </div>
          {isLoading ? (
            <Loading text="Loading..." color="primary" />
          ) : ptList.length > 0 ? (
            <Table
              rowData={ptList}
              columnDefs={[
                { headerName: "No.", field: "no", resizable: false, width: 68 },
                { headerName: "Exam Name", field: "Name", filter: true },
                {
                  headerName: "Reading Set",
                  field: "reading_count",
                  filter: true,
                },
                {
                  headerName: "Writing Set",
                  field: "writing_count",
                  filter: true,
                },
                {
                  headerName: "Listening Set",
                  field: "listening_count",
                  filter: true,
                },
                {
                  headerName: "Speaking Set",
                  field: "speaking_count",
                  filter: true,
                },
              ]}
            />
          ) : (
            <h5 className="text-center text-danger">
              No Practice Test Available !!
            </h5>
          )}
        </div>
        <div>
          <div className="dashboard__form__wraper mt-4">
            <div className="dashboard__form__input">
              <label>(3) Full Length Tests : </label>
            </div>
          </div>
          {isLoading ? (
            <Loading text="Loading..." color="primary" />
          ) : fltList.length > 0 ? (
            <Table
              rowData={fltList}
              columnDefs={[
                { headerName: "No.", field: "no", resizable: false, width: 68 },
                { headerName: "Exam Name", field: "name", filter: true },
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
              ]}
            />
          ) : (
            <h5 className="text-center text-danger">
              No Full Length Test Available !!
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExam;

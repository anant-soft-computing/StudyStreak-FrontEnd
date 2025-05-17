import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import {
  Mic,
  PenTool,
  Book,
  Headphones,
  UserCircle,
  Trophy,
  BookOpen,
} from "lucide-react";
import moment from "moment";
import ajaxCall from "../../../../../helpers/ajaxCall";

const summaries = [
  {
    title: "Speaking",
    score: "198",
    percentage: "3.3%",
    color: "#4B9DFF",
    icon: <Mic size={28} color="white" />,
  },
  {
    title: "Writing",
    score: "66",
    percentage: "12.2%",
    color: "#E76565",
    icon: <PenTool size={28} color="white" />,
  },
  {
    title: "Reading",
    score: "288",
    percentage: "13.8%",
    color: "#4CAF50",
    icon: <Book size={28} color="white" />,
  },
  {
    title: "Listening",
    score: "77",
    percentage: "1.7%",
    color: "#FFC107",
    icon: <Headphones size={28} color="white" />,
  },
];

const cardData = [
  {
    icon: <Mic color="white" size={24} />,
    score: 5995,
    label: "SPEAKING",
    leftColor: "#4B9DFF",
    textColor: "#4B9DFF",
  },
  {
    icon: <PenTool color="white" size={24} />,
    score: 541,
    label: "WRITING",
    leftColor: "#E76565",
    textColor: "#E76565",
  },
  {
    icon: <BookOpen color="white" size={24} />,
    score: 2084,
    label: "READING",
    leftColor: "#4CAF50",
    textColor: "#4CAF50",
  },
  {
    icon: <Headphones color="white" size={24} />,
    score: 4477,
    label: "LISTENING",
    leftColor: "#FFC107",
    textColor: "#FFC107",
  },
];

const speakingItems = [
  {
    label: "Read aloud",
    shortcode: "[RA]",
    value: "63/1067",
    progress: "5.9",
    variant: "primary",
  },
  {
    label: "Repeat sentence",
    shortcode: "[RS]",
    value: "72/2609",
    progress: "2.8",
    variant: "primary",
  },
  {
    label: "Describe image",
    shortcode: "[DI]",
    value: "17/451",
    progress: "3.8",
    variant: "primary",
  },
  {
    label: "Re-tell lecture",
    shortcode: "[RL]",
    value: "4/372",
    progress: "1.1",
    variant: "primary",
  },
  {
    label: "Answer short question",
    shortcode: "[ASQ]",
    value: "42/1496",
    progress: "2.8",
    variant: "primary",
  },
];

const writingItems = [
  {
    label: "Summarize written text",
    shortcode: "[SWT]",
    value: "39/293",
    progress: "13.31",
    variant: "danger",
  },
  {
    label: "Write essay",
    shortcode: "[WE]",
    value: "27/248",
    progress: "10.89",
    variant: "danger",
  },
];

const readingItems = [
  {
    label: "R&W, Fill in the blanks",
    shortcode: "[RWFIB]",
    value: "65/681",
    progress: "9.54",
    variant: "success",
  },
  {
    label: "MC, choose multiple answers",
    shortcode: "",
    value: "39/95",
    progress: "41.05",
    variant: "success",
  },
  {
    label: "Re-order paragraphs",
    shortcode: "",
    value: "143/467",
    progress: "30.62",
    variant: "success",
  },
  {
    label: "R, Fill in the blanks",
    shortcode: "[RFIB]",
    value: "13/725",
    progress: "1.8",
    variant: "success",
  },
  {
    label: "MC, choose single answer",
    shortcode: "",
    value: "28/116",
    progress: "24.14",
    variant: "success",
  },
];

const listeningItems = [
  {
    label: "Summarize spoken text",
    shortcode: "[SST]",
    value: "4/755",
    progress: "0.5",
    variant: "warning",
  },
  {
    label: "MC, choose multiple answers",
    shortcode: "",
    value: "10/85",
    progress: "11.76",
    variant: "warning",
  },
  {
    label: "Fill in the blanks",
    shortcode: "[LFIB]",
    value: "18/265",
    progress: "6.7",
    variant: "warning",
  },
  {
    label: "Highlight correct summary",
    shortcode: "",
    value: "1/67",
    progress: "1.5",
    variant: "warning",
  },
  {
    label: "MC, choose single answer",
    shortcode: "",
    value: "10/94",
    progress: "10.64",
    variant: "warning",
  },
  {
    label: "Select missing words",
    shortcode: "",
    value: "4/113",
    progress: "3.5",
    variant: "warning",
  },
  {
    label: "Highlight incorrect words",
    shortcode: "",
    value: "21/389",
    progress: "5.4",
    variant: "warning",
  },
  {
    label: "Write from dictation",
    shortcode: "[WFD]",
    value: "9/2709",
    progress: "0.3",
    variant: "warning",
  },
];

const SummaryCard = ({ title, icon, score, percentage, color }) => {
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: color,
        borderRadius: "6px",
        padding: "20px",
        color: "white",
      }}
    >
      <div className="d-flex align-items-center">
        {icon}
        <div className="ms-2">
          <h3 className="mb-0" style={{ color: "white", fontWeight: "bold" }}>
            {score}
          </h3>
          <div className="text-uppercase" style={{ fontSize: "0.8rem" }}>
            {title}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar
          now={parseFloat(percentage)}
          style={{
            height: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
          }}
          variant="light"
        />
      </div>
    </div>
  );
};

const SkillSection = ({ title, items }) => {
  return (
    <div className="mb-4">
      <h5 style={{ marginBottom: "15px" }}>{title}</h5>
      {items.map((item, index) => (
        <div key={index} className="mb-3">
          <div
            className="d-flex justify-content-between"
            style={{ marginBottom: "5px" }}
          >
            <span>
              {item.label}{" "}
              <span style={{ opacity: 0.7 }}>{item.shortcode}</span>
            </span>
            <span>{item.value}</span>
          </div>
          {parseFloat(item.progress) > 0 && (
            <ProgressBar
              now={parseFloat(item.progress)}
              style={{
                height: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: "3px",
              }}
              variant={item.variant}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const CardSection = () => {
  return (
    <div className="row mb-4">
      {cardData.map((card, index) => (
        <div key={index} className="col-12 col-md-3 col-lg-3 col-xl-3">
          <div
            className="d-flex align-items-center bg-white"
            style={{
              height: "70px",
              border: "1px solid #f0f0f0",
            }}
          >
            <div
              className="h-100 d-flex align-items-center justify-content-center px-3"
              style={{
                width: "70px",
                backgroundColor: card.leftColor,
              }}
            >
              {card.icon}
            </div>
            <div className="flex-grow-1 px-3 text-center">
              <h3
                className="mb-0 fw-bold"
                style={{
                  color: card.textColor,
                  fontSize: "24px",
                }}
              >
                {card.score}
              </h3>
              <small
                className="text-uppercase"
                style={{
                  color: card.textColor,
                  opacity: 0.7,
                }}
              >
                {card.label}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProfileSection = () => {
  return (
    <div
      className="profile-section mb-4 p-3 rounded"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
      }}
    >
      <div className="d-flex align-items-center mb-3">
        <UserCircle size={64} color="#6c757d" />
        <div className="ms-3">
          <h4 className="mb-1">Darshan Patel</h4>
          <p className="text-muted mb-1">ascdarshan@gmail.com</p>
          <div className="">
            <div>Subscription status : Active</div>
            <div>Expiration : 2025-06-09 23:59:59</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <small>Remaining days :</small>
          <div className="fw-bold">+23</div>
        </div>
        <div>
          <small>Available scored Mock tests :</small>
          <div className="fw-bold">0</div>
        </div>
        <div>
          <button className="btn btn-outline-primary btn-sm">
            Edit Profile
          </button>
          <button className="btn btn-primary btn-sm ms-2">
            Upgrade to VIP
          </button>
        </div>
      </div>
    </div>
  );
};

const LeaderboardTable = () => {
  const studentID = JSON.parse(localStorage.getItem("StudentID"));
  const courseID = JSON.parse(localStorage.getItem("course"))?.course_id;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/gamification/points/summary/?course_id=${courseID}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setTableData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseID]);

  return (
    <div
      className="leaderboard-section mb-4 p-3 rounded"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
      }}
    >
      <h5 className="mb-3 d-flex align-items-center">
        <Trophy size={24} className="me-2" /> Top Student -{" "}
        {moment().format("LLLL")}
      </h5>
      <div
        className="dashboard__table table-responsive"
        style={{ maxHeight: "264px" }}
      >
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Practice</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => {
              const { student_name, total_points, student_id } = item;
              const rowClass = index % 2 === 0 ? "" : "dashboard__table__row";
              const textClass = studentID === student_id ? "text-success" : "";
              return (
                <tr key={index} className={rowClass}>
                  <td className={textClass}>{index + 1}.</td>
                  <td className={textClass}>{student_name}</td>
                  <td className={textClass}>{total_points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PTEDashboard = () => {
  
  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/dashboard/pte/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          console.log("---PTE--Dashboard--Report--->", response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="container mt-4">
                  <CardSection />
                  <ProfileSection />
                  <LeaderboardTable />
                  <div className="row">
                    {summaries.map((summary, index) => (
                      <div className="col-md-6 col-lg-3" key={index}>
                        <SummaryCard
                          title={summary.title}
                          score={summary.score}
                          percentage={summary.percentage}
                          color={summary.color}
                          icon={summary.icon}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-lg-3">
                      <SkillSection title="Speaking" items={speakingItems} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection title="Writing" items={writingItems} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection title="Reading" items={readingItems} />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection title="Listening" items={listeningItems} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTEDashboard;

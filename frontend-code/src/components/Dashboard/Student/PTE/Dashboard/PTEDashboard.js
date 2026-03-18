import React, { useEffect, useState } from "react";
import { Mic, PenTool, Book, Headphones } from "lucide-react";
import SummaryCard from "./SummaryCard";
import CardSection from "./CardSection";
import SkillSection from "./SkillSection";
import Loading from "../../../../UI/Loading";
import ProfileSection from "./ProfileSection";
import LeaderboardTable from "./LeaderboardTable";
import ajaxCall from "../../../../../helpers/ajaxCall";

export const calculateTotals = (data) => {
  const totals = {
    reading: { total: 0, given: 0 },
    writing: { total: 0, given: 0 },
    speaking: { total: 0, given: 0 },
    listening: { total: 0, given: 0 },
  };

  // Process mock_test data
  data.mock_test.forEach((section) => {
    if (section.type === "R") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.reading.total += item.total;
          totals.reading.given += item.given || 0;
        }
      });
    } else if (section.type === "W") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.writing.total += item.total;
          totals.writing.given += item.given || 0;
        }
      });
    } else if (section.type === "L") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.listening.total += item.total;
          totals.listening.given += item.given || 0;
        }
      });
    }
  });

  // Process speaking_mock_test data
  data.speaking_mock_test.forEach((section) => {
    if (section.type === "S") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.speaking.total += item.total;
          totals.speaking.given += item.given || 0;
        }
      });
    }
  });

  // Process pt data
  data.pt.forEach((section) => {
    if (section.type === "R") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.reading.total += item.total;
          totals.reading.given += item.given || 0;
        }
      });
    } else if (section.type === "W") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.writing.total += item.total;
          totals.writing.given += item.given || 0;
        }
      });
    } else if (section.type === "S") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.speaking.total += item.total;
          totals.speaking.given += item.given || 0;
        }
      });
    } else if (section.type === "L") {
      Object.values(section).forEach((item) => {
        if (typeof item === "object" && item.total !== undefined) {
          totals.listening.total += item.total;
          totals.listening.given += item.given || 0;
        }
      });
    }
  });

  return totals;
};

const getCategoryItems = (data, category) => {
  const items = [];

  // Helper function to add items
  const addItems = (sectionData, source) => {
    sectionData.forEach((section) => {
      if (section.type === category) {
        Object.entries(section).forEach(([key, value]) => {
          if (typeof value === "object" && value.total !== undefined) {
            const label = getLabelForShortcode(key);
            if (label) {
              items.push({
                label,
                shortcode: `[${key}]`,
                value: `${value.given || 0}/${value.total}`,
                progress:
                  value.total > 0
                    ? (((value.given || 0) / value.total) * 100).toFixed(1)
                    : "0",
                variant: getVariantForCategory(category),
                source,
              });
            }
          }
        });
      }
    });
  };

  // Process mock_test and speaking_mock_test as "Mock Test"
  addItems(data.mock_test, "Mock Test");
  addItems(data.speaking_mock_test, "Mock Test");

  // Process pt as "Practice Test"
  addItems(data.pt, "Practice Test");

  return items;
};

const getLabelForShortcode = (shortcode) => {
  const labels = {
    RWFIB: "R&W, Fill in the blanks",
    CMA: "MC, choose multiple answers",
    CSA: "MC, choose single answer",
    RFIB: "R, Fill in the blanks",
    ROP: "Re-order paragraphs",
    SWT: "Summarize written text",
    WE: "Write essay",
    RA: "Read aloud",
    RS: "Repeat sentence",
    DI: "Describe image",
    RL: "Re-tell lecture",
    ASQ: "Answer short question",
    SST: "Summarize spoken text",
    WFD: "Write from dictation",
    LFIB: "Fill in the blanks",
    HCS: "Highlight correct summary",
    HIW: "Highlight incorrect words",
    SMW: "Select missing words",
    SGD: "Summarize group discussion",
    RTS: "Retell seminar",
  };
  return labels[shortcode] || null;
};

const getVariantForCategory = (category) => {
  switch (category) {
    case "R":
      return "success";
    case "W":
      return "danger";
    case "S":
      return "primary";
    case "L":
      return "warning";
    default:
      return "primary";
  }
};

const PTEDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

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
          setDashboardData(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  if (!dashboardData) {
    return <Loading />;
  }

  const totals = calculateTotals(dashboardData);

  const summaries = [
    {
      title: "Speaking",
      score: totals.speaking.given,
      percentage:
        totals.speaking.total > 0
          ? ((totals.speaking.given / totals.speaking.total) * 100).toFixed(1)
          : "0",
      color: "#4B9DFF",
      icon: <Mic size={28} color="white" />,
    },
    {
      title: "Writing",
      score: totals.writing.given,
      percentage:
        totals.writing.total > 0
          ? ((totals.writing.given / totals.writing.total) * 100).toFixed(1)
          : "0",
      color: "#E76565",
      icon: <PenTool size={28} color="white" />,
    },
    {
      title: "Reading",
      score: totals.reading.given,
      percentage:
        totals.reading.total > 0
          ? ((totals.reading.given / totals.reading.total) * 100).toFixed(1)
          : "0",
      color: "#4CAF50",
      icon: <Book size={28} color="white" />,
    },
    {
      title: "Listening",
      score: totals.listening.given,
      percentage:
        totals.listening.total > 0
          ? ((totals.listening.given / totals.listening.total) * 100).toFixed(1)
          : "0",
      color: "#FFC107",
      icon: <Headphones size={28} color="white" />,
    },
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="container mt-4">
                  <CardSection data={dashboardData} />
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
                      <SkillSection
                        title="Speaking"
                        items={getCategoryItems(dashboardData, "S")}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection
                        title="Writing"
                        items={getCategoryItems(dashboardData, "W")}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection
                        title="Reading"
                        items={getCategoryItems(dashboardData, "R")}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <SkillSection
                        title="Listening"
                        items={getCategoryItems(dashboardData, "L")}
                      />
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

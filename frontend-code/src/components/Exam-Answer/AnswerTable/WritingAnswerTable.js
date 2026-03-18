import React, { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";

const WritingAnswerTable = ({ data }) => {
  const [blockDataMap, setBlockDataMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlockData = async () => {
      if (!data || data.length === 0) {
        setLoading(false);
        return;
      }

      const blockIds = [...new Set(data.map(item => item.block_id).filter(Boolean))];
      const blockDataPromises = blockIds.map(async (blockId) => {
        try {
          const response = await ajaxCall(
            `/exam/block/${blockId}/`,
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
            return { blockId, data: response.data };
          }
        } catch (error) {
          console.error(`Error fetching block ${blockId}:`, error);
        }
        return { blockId, data: null };
      });

      const results = await Promise.all(blockDataPromises);
      const blockMap = {};
      results.forEach(({ blockId, data }) => {
        if (data) {
          blockMap[blockId] = data;
        }
      });
      setBlockDataMap(blockMap);
      setLoading(false);
    };

    fetchBlockData();
  }, [data]);

  return (
    <div className="row">
      <div className="writing__exam">
        <div className="dashboard__section__title">
          <h4 className="sidebar__title">Questions & AI Assessment</h4>
        </div>
        {loading ? (
          <div className="text-center">
            <p>Loading questions...</p>
          </div>
        ) : data?.filter((item) => item.ai_assessment?.trim()).length > 0 ? (
          data
            ?.filter((item) => item.ai_assessment?.trim())
            .map((item, index) => {
              const blockData = blockDataMap[item.block_id];
              return (
                <div key={index} className="mb-4 border-bottom pb-4">
                  <h4>Question {index + 1}</h4>
                  
                  {blockData?.passage && (
                    <div className="mb-3">
                      <h5 className="text-primary">Question/Passage:</h5>
                      <div 
                        className="border p-3 bg-light rounded"
                        dangerouslySetInnerHTML={{ __html: blockData.passage }}
                      />
                    </div>
                  )}

                  {item.answers && item.answers[0]?.answer_text && (
                    <div className="mb-3">
                      <h5 className="text-info">Your Answer:</h5>
                      <div className="border p-3 rounded">
                        <p>{item.answers[0].answer_text}</p>
                      </div>
                    </div>
                  )}

                  <div className="gptResponse">
                    <h5 className="text-success">AI Assessment:</h5>
                    <div dangerouslySetInnerHTML={{ __html: item.ai_assessment }} />
                  </div>
                </div>
              );
            })
        ) : (
          <h5 className="text-center text-danger">
            No AI Assessment Available
          </h5>
        )}
      </div>
      <div className="writing__exam">
        <div className="dashboard__section__title">
          <h4 className="sidebar__title">Tutor Assessment</h4>
        </div>
        {data?.some((item) => item.tutor_assessment) ? (
          data?.map((item, index) => (
            <div key={index}>
              <div className="gptResponse">
                ({index + 1}). {item.tutor_assessment}
              </div>
              <br />
            </div>
          ))
        ) : (
          <h5 className="text-center text-danger">
            Assessment By Tutor Will Be Displayed Here
          </h5>
        )}
      </div>
    </div>
  );
};

export default WritingAnswerTable;

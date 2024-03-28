import React from "react";
import LRClassCard from "../Classes/LRClassCard";

const LiveClassList = ({ liveClasses, joinNow, isWithin5Minutes }) => {
  if (liveClasses?.length === 0) {
    return (
      <h5 className="text-center text-danger">No LiveClasses Available !!</h5>
    );
  }

  return (
    <div className="row">
      {liveClasses?.map(
        ({
          id,
          start_time,
          end_time,
          meeting_title,
          meeting_description,
          zoom_meeting_id,
        }) => {
          return (
            <LRClassCard
              key={id}
              start_time={start_time}
              end_time={end_time}
              meeting_title={meeting_title}
              meeting_description={meeting_description}
              zoom_meeting_id={zoom_meeting_id}
              joinNow={joinNow}
              isWithin5Minutes={isWithin5Minutes}
            />
          );
        }
      )}
    </div>
  );
};

export default LiveClassList;
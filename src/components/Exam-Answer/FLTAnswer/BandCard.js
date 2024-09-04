import React from "react";
import { getBackgroundColor } from "../../../utils/background/background";

const BandCard = ({ counts, averageBand }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
      <div
        className="flt-band-card"
        style={{
          backgroundColor: getBackgroundColor(counts?.reading?.band),
        }}
      >
        <div className="text-center">Reading</div>
        <div className="text-center">{counts?.reading?.band}</div>
      </div>
      <div
        className="flt-band-card"
        style={{
          backgroundColor: getBackgroundColor(counts?.writing?.band),
        }}
      >
        <div className="text-center">Writing</div>
        <div className="text-center">{counts?.writing?.band}</div>
      </div>
      <div
        className="flt-band-card"
        style={{
          backgroundColor: getBackgroundColor(counts?.listening?.band),
        }}
      >
        <div className="text-center">Listening</div>
        <div className="text-center">{counts?.listening?.band}</div>
      </div>
      <div
        className="flt-band-card"
        style={{
          backgroundColor: getBackgroundColor(counts?.speaking?.band),
        }}
      >
        <div className="text-center">Speaking</div>
        <div className="text-center">{counts?.speaking?.band}</div>
      </div>
      <div
        className="flt-band-card"
        style={{
          backgroundColor: "#dcdcdc",
        }}
      >
        <div className="text-center">Over All</div>
        <div className="text-center">{averageBand}</div>
      </div>
    </div>
  );
};

export default BandCard;
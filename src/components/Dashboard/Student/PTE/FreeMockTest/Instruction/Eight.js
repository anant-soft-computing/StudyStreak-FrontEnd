import React from "react";
import p1 from "../../../../../../img/service/p1.jpg";
import p2 from "../../../../../../img/service/p2.jpg";
import p3 from "../../../../../../img/service/p3.jpg";
import s1 from "../../../../../../img/service/s1.jpg";
import s2 from "../../../../../../img/service/s2.jpg";
import s3 from "../../../../../../img/service/s3.jpg";

const Eight = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">
        Speaking and Listening Instruction
      </h3>
      <div className="instruction-content">
        Some questions require you to first listen to an audio clip and then
        record your answer by speaking clearly into the microphone.
      </div>

      <h5 className="instruction-content">Listening</h5>
      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> The current status shows how long
            you have until the audio clips starts.
          </li>
        </ul>

        <div>
          <img
            src={p1}
            alt="P1"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "1px solid #01579b",
            }}
          />
        </div>

        <ul className="mt-3">
          <li>
            <i className="icofont-check"></i> A blue bar shows the progress of
            audio clip when it reaches right hand side the audio clip will stop
            playing.
          </li>
        </ul>

        <div className="d-flex flex-wrap gap-3">
          <div>
            <img
              src={p2}
              alt="P2"
              className="lv-instruction-image"
              style={{
                borderRadius: "6px",
                border: "1px solid #01579b",
              }}
            />
          </div>

          <div>
            <img
              src={p3}
              alt="P3"
              className="lv-instruction-image"
              style={{
                borderRadius: "6px",
                border: "1px solid #01579b",
              }}
            />
          </div>
        </div>

        <h5 className="instruction-content mt-3">Speaking</h5>
        <ul>
          <li>
            <i className="icofont-check"></i> The current status shows how long
            you have until the microphone opens. Start speaking when status
            changes
          </li>
        </ul>

        <div>
          <img
            src={s1}
            alt="S1"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "1px solid #01579b",
            }}
          />
        </div>

        <ul className="mt-3">
          <li>
            <i className="icofont-check"></i> You must finish before the
            progress bar reaches the right hand side. If you remain slient for
            longer than 3 seconds the recording will stop. You will not able to
            re-record.
          </li>
        </ul>

        <div className="d-flex flex-wrap gap-3">
          <div>
            <img
              src={s2}
              alt="S2"
              className="lv-instruction-image"
              style={{
                borderRadius: "6px",
                border: "1px solid #01579b",
              }}
            />
          </div>

          <div>
            <img
              src={s3}
              alt="S3"
              className="lv-instruction-image"
              style={{
                borderRadius: "6px",
                border: "1px solid #01579b",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eight;

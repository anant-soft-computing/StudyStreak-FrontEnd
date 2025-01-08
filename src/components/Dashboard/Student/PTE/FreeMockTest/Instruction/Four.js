import React from "react";
import microphone from "../../../../../../img/service/microphone.png";

const Four = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Microphone Check </h3>
      <div className="instruction-content">
        This is an opportunity to check that your microphone is working
        correctly.
      </div>

      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> Make sure your headset is on and
            the microphone is in the downward position near your mouth.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> When you are ready. click on the{" "}
            <b className="text-danger">Record</b> button and say "Testing,
            testing, one, two, three" into the microphone.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> After you have spoken, click on
            the <b className="text-danger">Stop</b> button. your recording is
            now complete.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> Now click on the{" "}
            <b className="text-danger">Playback</b> button. You should clearly
            hear yourself speaking.
          </li>
        </ul>

        <ul>
          <li>
            <i className="icofont-check"></i> If you can not hear your voice,
            please raise your hand to get the attention of the Test
            Administrator
          </li>
        </ul>

        <div
          style={{
            margin: "10px",
            padding: "10px",
            border: "1px solid #01579b",
            borderRadius: "10px",
          }}
        >
          <span>Status : Click Play To Begin</span>
          <audio className="mt-3" controls></audio>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <button className="default__button">
              <i className="icofont-record"></i> Record
            </button>
            <button className="default__button">
              <i className="icofont-play-alt-1"></i> Playback
            </button>
            <button className="default__button">
              <i className="icofont-stop"></i> Stop
            </button>
          </div>
        </div>

        <ul>
          <li>
            <i className="icofont-check"></i> During the test you will not have{" "}
            <b className="text-danger">Play, Playback</b> and{" "}
            <b className="text-danger">Stop</b> buttons. The voice recording
            will start automatically.
          </li>
        </ul>

        <div>
          <img
            src={microphone}
            alt="Micro Phone"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "1px solid #01579b",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Four;

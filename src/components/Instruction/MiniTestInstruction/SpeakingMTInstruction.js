import React from "react";
import cpuJack from "../../../img/service/img.png";

function SpeakingMTInstruction({ startTest }) {
  return (
    <div className="instruction-card mb-5 pb-5">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">Mini Speaking Test - Instructions</div>
      <div className="d-flex justify-content-between gap-5 mx-4 flex-column flex-md-row">
        <div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              1. Microphone Testing :
            </span>
            <ul>
              <div className="instruction-content">
                1. Before starting the test, ensure your microphone is
                functioning properly
              </div>
              <div className="instruction-content">
                2. Click on the microphone test button provided on the LMS.
              </div>
              <div className="instruction-content">
                3. Record a short sample (e.g., say "Testing 1, 2, 3") and play
                it back to confirm the audio is clear.
              </div>
              <div className="instruction-content">
                4. Adjust microphone settings or switch devices if needed to
                ensure optimal audio quality.
              </div>
            </ul>
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              2. Preparation Time :{" "}
            </span>
            You will have 1-2 minutes to prepare your answers for Part 2 of the
            test.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              3. Introduction and Interview :{" "}
            </span>
            You will be asked general questions about yourself and various
            familiar topics such as home, family, work, studies, and interests.
            Respond with clear, concise answers in 1-2 sentences.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              4. Long Turn (Cue Card) :{" "}
            </span>
            You will receive a topic to speak about for 1-2 minutes. Use the
            1-minute preparation time to organize your thoughts. Aim for a
            coherent and detailed response.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              5. Discussion :{" "}
            </span>
            This will involve a more abstract discussion of the topics from Part
            2. Provide well-structured answers and justify your opinions where
            applicable.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              6. Time Limit :{" "}
            </span>
            Ensure you finish each part within the allocated time, as this
            simulates the real IELTS exam.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              7. Recording :{" "}
            </span>
            Record your responses directly on the LMS using the provided
            recording tool. Ensure good audio quality and speak clearly.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              8. Feedback :{" "}
            </span>
            Your recordings will be evaluated by a tutor, and detailed feedback
            will be provided on pronunciation, fluency, coherence, and grammar.
          </div>
          <p className="instruction-wishes">Good Luck!</p>
        </div>
        <div className="mb-4 mb-md-0 d-flex d-md-block justify-content-center">
          <img
            src={cpuJack}
            alt="Mic & Headphone Jack"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "none",
            }}
          />
        </div>
      </div>

      <div className="instruction-attention text-center">
        Do not click 'start test' until you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("speaking")}>
        Start test
      </button>
    </div>
  );
}

export default SpeakingMTInstruction;

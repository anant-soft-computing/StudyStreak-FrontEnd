import React from "react";

const InstructionsPage = ({ Instruction, setInstruction }) => {
  return (
    <div className="gmat-paper-container gmat-paper-container-1">
      <h1 className="text-center gmat-text">THE GMAT SIMULATION TEST</h1>
      <div className="gmat-paper">
        {Instruction === 1 && (
          <div className="instruction">
            <h4 className="text-center gmat-text">Instruction</h4>
            <div className="gmat-border"></div>
            <span className="welcome-info">
              Welcome to the GMAT Tutor Free Simulation Test!. This test
              simulates the Graduate Management Admission Test™.
            </span>

            <h4 className="tutorial">Tutorial</h4>
            <p>
              Each question on the Quantitative and Verbal sections is a
              multiple-choice question with five answer choices. You must solve
              the question and choose one of the answer choices by clicking the
              radio button next to it.
            </p>
            <p>
              To move on to the next question click on the 'Next' button at the
              bottom right corner of the screen. You will be asked to confirm
              your answer.
            </p>
            <p>
              You cannot proceed without choosing an answer choice and
              confirming your answer. Also, it is impossible to return to a
              previous question on the GMAT, so do not click Back on your
              browser.
            </p>
            <p>
              The number of the current question out of the total number of
              questions in the section is shown on the top right corner of the
              screen, next to the timer.
            </p>

            <h4>Timing and Schedule</h4>
            <p>
              On the GMAT, the Quantitative and Verbal sections are each 75
              minutes long, and one must take both sections (even if you don't
              need the score for one of them, in which case you can just click
              through it). Between the sections, you are entitled to a 10-minute
              break.
            </p>
            <p>
              On this simulation test you may opt for a full test just like the
              real GMAT or for a shorter version. For the shorter version, you
              may choose which sections to take, and select either a mini- or
              micro- version, which are shorter.
            </p>
            <p>
              While you are taking a section of the test, a timer will show the
              remaining time on the top right corner of the screen. During the
              break the timer will show the remaining time at the center of the
              screen.
            </p>
            <p>
              If you have not answered all the questions of a section when the
              time is up, you incur a penalty to your score, which increases for
              every question left unanswered.
            </p>
            <p>
              Once the test has begun, the timer cannot be stopped or paused and
              the test must be completed.
            </p>

            <h4>What can I use during the test?</h4>
            <p>
              On the real GMAT, you are not allowed to use written materials,
              the Internet, calculators, or any other devices - not even your
              watch. Food and beverages are also not allowed, but a water cooler
              will be available to you. For this simulation test, it's important
              not to use a calculator or any other calculating aid or source of
              information.
            </p>
            <p>
              The only thing you may use on the real test is an erasable
              noteboard and a marker which will be provided to you by the test
              center. Hence, you may use something to write on for this
              simulation test.
            </p>

            <h4>Copyright</h4>
            <p>
              All questions on this test are proprietary materials of GMAT Tutor
              and are protected by international copyright laws.
            </p>
          </div>
        )}

        {Instruction === 2 && (
          <div className="instruction">
            <div className="info-wrapper">
              <strong className="test-info questions">5</strong> Questions
              <span className="spacer">|</span>
              <strong className="test-info time">10</strong> Minutes
            </div>
            <span className="info">
              The GMAT quantitative section contains two types of multiple
              choice questions:
            </span>

            <div>
              <div className="content-size-wrapper">
                <h4>1. Problem Solving</h4>
                <p>
                  To tackle a Problem Solving question, solve the problem, then
                  select the answer that most closely matches your result.
                </p>
              </div>
            </div>

            <div className="content-size-wrapper-right">
              <h4>2. Data Sufficiency</h4>
              <p>
                Each Data Sufficiency problem consists of a question and two
                statements, (1) and (2), that contain data. To solve it,
                determine whether or not statements (1) and (2) are sufficient
                for answering the question, either on their own or jointly.
              </p>
            </div>

            <div className="clear-fix"></div>

            <div className="example">
              <button className="example-title">Example</button>
              <div className="example-content">
                <strong className="example-center">
                  What is the value of x?
                </strong>
                <div>
                  <strong className="example-center example-center-1">
                    <em>(1)</em> x is an integer
                  </strong>
                  <strong className="example-center">
                    <em>(2)</em> 2 &lt; x &lt; 4
                  </strong>
                </div>
              </div>
              <div className="content">
                <h4>Explanation:</h4>
                <p>
                  According to statement (1), x can be any integer: 2, 3, 4, or
                  10,000. Since x can have more than one value, you cannot
                  answer the question using statement (1) alone.
                </p>
                <p>
                  According to statement (2) x can be any number between 2 and
                  4. However, from considering statement (2) alone, you do not
                  know that x is an integer. Thus x can be a fraction, such as
                  2.5, 2.8, or 3.5. You cannot determine a single value for x
                  from statement (2) alone.{" "}
                </p>
                <p>
                  Using both statements together you can find a single value for
                  x: x must be an integer between 2 and 4, and only 3 meets
                  these criteria. Thus, BOTH statements (1) and (2) TOGETHER are
                  sufficient to answer the question asked, but NEITHER statement
                  ALONE is sufficient to answer the question asked.
                </p>
              </div>
            </div>

            <div className="content-wrapper">
              <h4>3. Figures</h4>
              <p>
                For Problem Solving questions, figures are drawn as accurately
                as possible, except where noted.
              </p>
              <p>
                For Data Sufficiency questions, figures are not drawn to scale,
                and may not agree with the data in the statements.
              </p>
            </div>
          </div>
        )}
        <button
          className="gmat-button gmat-button-1"
          onClick={() => setInstruction(Instruction + 1)}
        >
          Start the Test
        </button>
      </div>
    </div>
  );
};

export default InstructionsPage;

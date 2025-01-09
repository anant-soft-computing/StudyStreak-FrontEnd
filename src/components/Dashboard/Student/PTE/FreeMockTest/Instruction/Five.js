import React from "react";
import keyboard from "../../../../../../img/service/keyboard.png";

const Five = () => {
  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <h3 className="instruction-content">Keyboard Check</h3>
      <div className="instruction-content">
        This is an opportunity to check that your have the correct keyboard.
      </div>
      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> Look at the top row of letters on
            the keyboard.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> The letters should appear in this
            order Q W E R T Y
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> If you don't have a QWERTY
            keyboard, raise your hand to get the attention of the Test
            Administrator
          </li>
        </ul>
        <div>
          <img src={keyboard} alt="Keyboard" className="lv-instruction-image" />
        </div>
      </div>
    </div>
  );
};

export default Five;

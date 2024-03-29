import React from "react";
import { Link } from "react-router-dom";
import ielts from "../../img/brand/ielts.png";
import duolingo from "../../img/brand/duolingo.png";
import output from "../../img/brand/output.png";
import tofel from "../../img/brand/tofel.png";
import gre from "../../img/brand/gre.png";
import gmat from "../../img/brand/gmat.png";

const BrandSection = () => {
  return (
    <div className="brandarea__2">
      <div className="container">
        <div className="row">
          <div className="brandarea__wraper brandarea__wraper__2">
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={ielts} alt="ielts" />
              </Link>
            </div>
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={tofel} alt="tofel" />
              </Link>
            </div>
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={output} alt="output" />
              </Link>
            </div>
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={duolingo} alt="duolingo" />
              </Link>
            </div>
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={gre} alt="gre" />
              </Link>
            </div>
            <div className="brandarea__img">
              <Link to="/">
                <img className="exam" src={gmat} alt="gmat" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSection;

import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <li>
        <Link className="headerarea__has__dropdown">
          Dashboard
          <i className="icofont-rounded-down"></i>
        </Link>
        <ul className="headerarea__submenu headerarea__submenu--third--wrap">
          <li>
            <Link>
              Admin <i className="icofont-rounded-right"></i>
            </Link>
            <ul className="headerarea__submenu--third">
              <li>
                <Link to="/admin-dashboard">Dashboard</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link>
              Student <i className="icofont-rounded-right"></i>
            </Link>
            <ul className="headerarea__submenu--third">
              <li>
                <Link to="/studentDashboard">Dashboard</Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  );
};

export default Dashboard;

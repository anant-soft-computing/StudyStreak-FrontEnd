const tableData = [
  {
    id: 1,
    name: "Amish Patel",
    score: "1240 pts",
  },
  {
    id: 2,
    name: "Rohini Chaudhary",
    score: "1100 pts",
  },
  {
    id: 3,
    name: "Sweety Gill",
    score: "879 pts",
  },

  {
    id: 4,
    name: "Amiraj Solanki",
    score: "800 pts",
  },
  {
    id: 5,
    name: "Krina Patel",
    score: "432 pts",
  },
];
const LeaderBoard = () => (
  <div className="dashboard__inner card-background">
    <div className="dashboard__nav__title">
      <h6>Leaderboard</h6>
    </div>
    <hr />
    <div className="dashboard__table table-responsive">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ id, name, score }, index) => (
            <tr
              key={id}
              className={index % 2 === 0 ? "" : "dashboard__table__row"}
            >
              <th>{id}</th>
              <td>{name}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default LeaderBoard;
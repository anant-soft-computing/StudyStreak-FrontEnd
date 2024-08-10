const StatusItem = ({ color, text }) => (
  <div className="d-flex gap-2 align-items-center">
    <i className="icofont-ui-press" style={{ color }} />
    <div>{text}</div>
  </div>
);

const StatusBox = () => (
  <div
    style={{
      marginTop: "20px",
      border: "1px solid #01579b",
      padding: "10px",
      borderRadius: "5px",
    }}
  >
    <div className="row">
    <div className="col-md-6">
        <StatusItem color="red" text="Selected" />
      </div>
      <div className="col-md-6 mb-3 mb-md-0">
        <StatusItem color="#01579b" text="Today's Date" />
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-md-6 mb-3 mb-md-0">
        <StatusItem color="green" text="Available" />
      </div>
      <div className="col-md-6">
        <StatusItem color="gray" text="Not Available" />
      </div>
    </div>
  </div>
);

export default StatusBox;

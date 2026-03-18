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
      <div className="col-6 col-md-6 d-flex justify-content-center justify-content-md-start">
        <StatusItem color="red" text="Selected" />
      </div>
      <div className="col-6 col-md-6 d-flex justify-content-center justify-content-md-end">
        <StatusItem color="#01579b" text="Today's Date" />
      </div>
    </div>
    <div className="row">
      <div className="col-6 col-md-6 d-flex justify-content-center justify-content-md-start">
        <StatusItem color="green" text="Available" />
      </div>
      <div className="col-6 col-md-6 d-flex justify-content-center justify-content-md-end">
        <StatusItem color="gray" text="Not Available" />
      </div>
    </div>
  </div>
);

export default StatusBox;

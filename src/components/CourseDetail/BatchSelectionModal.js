import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";

const BatchSelection = (props) => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const navigate = useNavigate();

  const {
    packageId,
    show,
    onHide,
    courseId,
    courseType,
    courseName,
    packageName,
    packagePrice,
  } = props;

  const getCourseBatches = async () => {
    try {
      const response = await ajaxCall(
        `/filterbatches/${packageId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setBatches(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCourseBatches();
  }, [packageId]);

  const handleEnrollButton = () => {
    navigate("/checkout", {
      state: {
        courseId,
        packageId,
        selectedBatchIds,
        courseName,
        packageName,
        packagePrice,
        courseType,
      },
    });
  };

  const handleModalClose = () => {
    setSelectedBatchIds("");
    onHide();
  };

  return (
    <Modal {...props} show={show} size="lg" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Preferred Batch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {batches?.length >= 1 ? (
          <div className="row">
            {batches?.map((batchItem) => (
              <div
                className="dashboard__recent__course__single"
                key={batchItem?.id}
              >
                <div className="me-3">
                  <input
                    type="checkbox"
                    checked={selectedBatchIds.includes(batchItem?.id)}
                    name="batchSelection"
                    className="w-10 batch__radio__input"
                    onChange={() => {
                      const batchId = batchItem?.id;
                      setSelectedBatchIds((prev) => {
                        if (prev.includes(batchId)) {
                          return prev.filter((id) => id !== batchId);
                        } else {
                          return [...prev, batchId];
                        }
                      });
                    }}
                  />
                </div>
                <div className="dashboard__recent__course__content">
                  <div className="dashboard__recent__course__heading">
                    <h3>{batchItem?.batch_name}</h3>
                  </div>
                  <div className="dashboard__recent__course__meta text-xl-center">
                    <ul className="ps-0">
                      <li>
                        <i className="icofont-calendar"></i> <b>Date</b>:{" "}
                        {batchItem?.batch_startdate && batchItem?.batch_enddate
                          ? `${batchItem?.batch_startdate} To ${batchItem?.batch_enddate}`
                          : "N/A"}
                      </li>
                      <li>
                        <i className="icofont-clock-time"></i> <b>Time</b>:{" "}
                        {batchItem?.batch_start_timing &&
                        batchItem?.batch_end_timing
                          ? `${batchItem?.batch_start_timing} To ${batchItem?.batch_end_timing}`
                          : "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h5 className="text-center text-danger">No Batches Available !!</h5>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          className="default__button"
          onClick={() => handleEnrollButton()}
          disabled={selectedBatchIds?.length === 0}
        >
          Enroll Package
        </button>
        <button
          onClick={() => handleModalClose()}
          className="btn-secondary default__button"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BatchSelection;

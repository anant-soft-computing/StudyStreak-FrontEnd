import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";

const BatchSelection = ({
  open,
  onClose,
  packageId,
  courseId,
  courseType,
  courseName,
  packageName,
  packagePrice,
}) => {
  const [batches, setBatches] = useState([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const navigate = useNavigate();

  const getCourseBatches = useCallback(async () => {
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
        console.log("Error fetching batches");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }, [packageId]);

  useEffect(() => {
    getCourseBatches();
  }, [getCourseBatches, packageId]);

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

  const handleBatchSelect = (batchId) => {
    setSelectedBatchIds((prev) =>
      prev?.includes(batchId)
        ? prev?.filter((id) => id !== batchId)
        : [...prev, batchId]
    );
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-2xl font-semibold text-neutral-800">
              {packageName}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mt-4">
            {batches.length > 0 ? (
              <div className="space-y-4">
                {batches.map((batch) => (
                  <div
                    key={batch.id}
                    className="flex items-center p-4 border rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBatchIds.includes(batch.id)}
                      onChange={() => handleBatchSelect(batch.id)}
                      className="w-5 h-5 text-primary-600 rounded border-gray-300"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">
                        {batch.batch_name}
                      </h3>
                      <p className="text-gray-600">
                        <strong>Date:</strong>{" "}
                        {batch.batch_startdate && batch.batch_enddate
                          ? `${moment(batch.batch_startdate).format(
                              "DD-MM-YYYY"
                            )} to ${moment(batch.batch_enddate).format(
                              "DD-MM-YYYY"
                            )}`
                          : "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <strong>Time:</strong>{" "}
                        {batch.batch_start_timing && batch.batch_end_timing
                          ? `${moment(
                              batch.batch_start_timing,
                              "HH:mm:ss"
                            ).format("hh:mm A")} to ${moment(
                              batch.batch_end_timing,
                              "HH:mm:ss"
                            ).format("hh:mm A")}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-red-500 mt-4">
                No Batches Available!
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full font-medium transition-colors duration-300"
            >
              Close
            </button>
            <button
              onClick={handleEnrollButton}
              disabled={selectedBatchIds.length === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                selectedBatchIds.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              Proceed to Enroll
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BatchSelection;

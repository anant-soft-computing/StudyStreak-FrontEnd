import React, { useState } from "react";
import BatchSelection from "./BatchSelectionModal";
import { useNavigate } from "react-router-dom";
import image1 from "../../img/icon/price__3.png";

const PackageDetails = ({
  courseType,
  courseId,
  packages,
  showBatchSelection,
  setShowBatchSelection,
  courseName,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const navigate = useNavigate();

  const handleEnroll = (packageId, packageName, packagePrice) => {
    if (courseType === "TAUGHT") {
      setPackageName(packageName);
      setPackagePrice(packagePrice);
      setSelectedPackageId(packageId);
      setShowBatchSelection(true);
    } else {
      navigate("/checkout", {
        state: {
          courseId,
          packageId,
          courseName,
          packageName,
          packagePrice,
          courseType,
        },
      });
    }
  };

  const handleBatchSelectionModalClose = () => {
    setSelectedPackageId("");
    setShowBatchSelection(false);
  };

  const renderListItem = (condition, text, count) => {
    return condition || count > 0 ? (
      <li>
        <i className="icofont-check" />
        {count > 0 ? `${text} (${count})` : text}
      </li>
    ) : null;
  };

  const renderPackage = (
    {
      package_id,
      package_name,
      package_price,
      speaking_test,
      speaking_test_count,
      writing_evaluation,
      writing_evaluation_count,
      practice_test,
      practice_test_count,
      full_length_test,
      full_length_test_count,
      speaking_practice,
      speaking_practice_count,
      tutor_support,
      tutor_support_count,
      webinar,
      webinar_count,
      counselling,
      counselling_count,
      group_doubt_solving,
      group_doubt_solving_count,
      one_to_one_doubt_solving,
      one_to_one_doubt_solving_count,
    },
    index
  ) => (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" key={index}>
      <div className="pricingarea__content__wraper">
        <div className="pricingarea__heading">
          <div className="pricingarea__plan__type">
            <h6>{package_name}</h6>
            <img src={image1} alt="" />
          </div>
          <div className="pricingarea__number">
            <h1>
              <i className="icofont-rupee"></i>
              <span className="price__currency">{package_price}</span>
              <span className="price__durition" />
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3">
          {courseType === "TAUGHT" && (
            <div
              className="pricingarea__list__content p-2"
              style={{ backgroundColor: "#20ad20", borderRadius: "10px" }}
            >
              Live Classes Available
            </div>
          )}
          <div
            className="pricingarea__list__content p-2"
            style={{ backgroundColor: "#20ad20", borderRadius: "10px" }}
          >
            Lessons Available
          </div>
        </div>
        <div className="pricingarea__list">
          <div className="pricingarea__list__content">Tests</div>
          <ul className="mt-4">
            {renderListItem(
              speaking_test,
              "Speaking Test",
              speaking_test_count
            )}
            {renderListItem(
              writing_evaluation,
              "Writing Evaluation",
              writing_evaluation_count
            )}
            {renderListItem(
              practice_test,
              "Practice Test",
              practice_test_count
            )}
            {renderListItem(
              full_length_test,
              "Full Length Test",
              full_length_test_count
            )}
          </ul>
          <div className="pricingarea__list__content">Classes</div>
          <ul className="mt-4">
            {renderListItem(
              speaking_practice,
              "Speaking Practice",
              speaking_practice_count
            )}
            {renderListItem(
              tutor_support,
              "Tutor Support",
              tutor_support_count
            )}
            {renderListItem(webinar, "Webinar", webinar_count)}
            {renderListItem(counselling, "Counselling", counselling_count)}
            {renderListItem(
              group_doubt_solving,
              "Group Doubt Solving",
              group_doubt_solving_count
            )}
            {renderListItem(
              one_to_one_doubt_solving,
              "One To One Doubt Solving",
              one_to_one_doubt_solving_count
            )}
          </ul>
        </div>
        <div className="pricingarea__button">
          <div className="course__summery__button mt-2">
            <button
              type="button"
              className="default__button"
              onClick={() =>
                handleEnroll(package_id, package_name, package_price)
              }
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="pricingarea">
        <div className="container px-0">
          <div className="row">{packages?.map(renderPackage)}</div>
        </div>
        <BatchSelection
          show={showBatchSelection}
          onHide={handleBatchSelectionModalClose}
          courseId={courseId}
          packageId={selectedPackageId}
          courseName={courseName}
          packageName={packageName}
          packagePrice={packagePrice}
          courseType={courseType}
        />
      </div>
    </>
  );
};

export default PackageDetails;

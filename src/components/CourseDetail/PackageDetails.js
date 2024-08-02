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

  const handleEnrollButtonClick = (packageId, packageName, packagePrice) => {
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

  return (
    <>
      <div className="pricingarea">
        <div className="container px-0">
          <div className="row">
            {packages?.map((packageItem, index) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                key={index}
              >
                <div className="pricingarea__content__wraper">
                  <div className="pricingarea__heading">
                    <div className="pricingarea__plan__type">
                      <h6>{packageItem?.package_name}</h6>
                      <img src={image1} alt="" />
                    </div>
                    <div className="pricingarea__number">
                      <h1>
                        <i className="icofont-rupee"></i>
                        <span className="price__currency">
                          {packageItem?.package_price}
                        </span>
                        <span className="price__durition" />
                      </h1>
                    </div>
                  </div>
                  <div className="pricingarea__list">
                    <div className="pricingarea__list__content">Tests</div>
                    <ul className="mt-4">
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.speaking_test
                          ? packageItem?.speaking_test_count > 0
                            ? `Speaking Test (${packageItem?.speaking_test_count})`
                            : "Speaking Test"
                          : packageItem?.speaking_test_count > 0
                          ? `Speaking Test (${packageItem?.speaking_test_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.writing_evaluation
                          ? packageItem?.writing_evaluation_count > 0
                            ? `Writing Evaluation (${packageItem?.practice_test_count})`
                            : "Writing Evaluation"
                          : packageItem?.writing_evaluation_count > 0
                          ? `Writing Evaluation (${packageItem?.writing_evaluation_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.practice_test
                          ? packageItem.practice_test_count > 0
                            ? `Practice Test (${packageItem?.practice_test_count})`
                            : "Practice Test"
                          : packageItem?.practice_test_count > 0
                          ? `Practice Test (${packageItem?.practice_test_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.full_length_test
                          ? packageItem?.full_length_test_count > 0
                            ? `Full Length Test (${packageItem?.full_length_test_count})`
                            : "Full Length Test"
                          : packageItem?.full_length_test_count > 0
                          ? `Full Length Test (${packageItem?.full_length_test_count})`
                          : null}
                      </li>
                    </ul>
                    <div className="pricingarea__list__content">Classes</div>
                    <ul className="mt-4">
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.speaking_practice
                          ? packageItem?.speaking_practice_count > 0
                            ? `Speaking Practice (${packageItem?.speaking_practice_count})`
                            : "Speaking Practice"
                          : packageItem?.speaking_practice_count > 0
                          ? `Speaking Practice (${packageItem?.speaking_practice_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.tutor_support
                          ? packageItem?.tutor_support_count > 0
                            ? `Tutor Support (${packageItem?.tutor_support_count})`
                            : "Tutor Support"
                          : packageItem?.tutor_support_count > 0
                          ? `Tutor Support (${packageItem?.tutor_support_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.webinar
                          ? packageItem?.webinar_count > 0
                            ? `Webinar (${packageItem?.webinar_count})`
                            : "Webinar"
                          : packageItem?.tutor_support_count > 0
                          ? `Webinar (${packageItem?.webinar_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.counselling
                          ? packageItem?.counselling_count > 0
                            ? `Counselling (${packageItem?.counselling_count})`
                            : "Counselling"
                          : packageItem?.tutor_support_count > 0
                          ? `Counselling (${packageItem?.counselling_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.group_doubt_solving
                          ? packageItem?.group_doubt_solving_count > 0
                            ? `Group Doubt Solving (${packageItem?.group_doubt_solving_count})`
                            : "Group Doubt Solving"
                          : packageItem?.group_doubt_solving_count > 0
                          ? `Group Doubt Solving (${packageItem?.group_doubt_solving_count})`
                          : null}
                      </li>
                      <li>
                        <i className="icofont-check" />
                        {packageItem?.one_to_one_doubt_solving
                          ? packageItem?.one_to_one_doubt_solving_count > 0
                            ? `One To One Doubt Solving (${packageItem?.one_to_one_doubt_solving_count})`
                            : "One To One Doubt Solving"
                          : packageItem?.one_to_one_doubt_solving_count > 0
                          ? `One To One Doubt Solving (${packageItem?.one_to_one_doubt_solving_count})`
                          : null}
                      </li>
                    </ul>
                  </div>
                  <div className="pricingarea__button">
                    <div className="course__summery__button mt-2">
                      <button
                        type="button"
                        className="default__button"
                        onClick={() =>
                          handleEnrollButtonClick(
                            packageItem?.package_id,
                            packageItem?.package_name,
                            packageItem?.package_price
                          )
                        }
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BatchSelection
          show={showBatchSelection}
          onHide={() => handleBatchSelectionModalClose()}
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

import React, { useState } from "react";
import BatchSelection from "./BatchSelectionModal";
import { useNavigate } from "react-router-dom";
import image1 from "../../img/icon/price__3.png";

export const checkIcon = () => {
  return (
    <i className="icofont-check-circled text-success icofont-md icofont-bold"></i>
  );
};

export const cancelIcon = () => {
  return (
    <i className="icofont-close-circled text-danger icofont-md icofont-bold"></i>
  );
};

const PackageDetails = (props) => {
  const {
    courseType,
    courseId,
    packages,
    showBatchSelection,
    setShowBatchSelection,
    courseName,
  } = props;

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
                class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                key={index}
              >
                <div class="pricingarea__content__wraper">
                  <div class="pricingarea__heading">
                    <div class="pricingarea__plan__type">
                      <h6>{packageItem?.package_name}</h6>
                      <img src={image1} alt="" />
                    </div>
                    <div class="pricingarea__number">
                      <h1>
                        <i className="icofont-rupee"></i>
                        <span class="price__currency">
                          {packageItem?.package_price}
                        </span>
                        <span class="price__durition">/ month</span>
                      </h1>
                    </div>
                    <p>Perfect for startup</p>
                  </div>
                  <div class="pricingarea__list">
                    <ul>
                      <li>
                        <i class="icofont-check"></i> Duration{" "}
                        <b>{packageItem?.duration} Mins </b>
                      </li>
                      <li>
                        {packageItem?.full_length_test ? (
                          <i class="icofont-check"></i>
                        ) : (
                          <i class="icofont-close close__button"></i>
                        )}
                        ({packageItem?.full_length_test_count || 0}) Full Length
                        Test
                      </li>
                      <li>
                        {packageItem?.practice_test ? (
                          <i class="icofont-check"></i>
                        ) : (
                          <i class="icofont-close close__button"></i>
                        )}
                        ({packageItem?.practice_test_count || 0}) Practice Test
                      </li>
                      <li>
                        {packageItem?.speaking_test ? (
                          <i class="icofont-check"></i>
                        ) : (
                          <i class="icofont-close close__button"></i>
                        )}
                        ({packageItem?.speaking_test_count || 0}) Speaking
                        Practice Classes
                      </li>
                      <li>
                        {packageItem?.group_doubt_solving ? (
                          <i class="icofont-check"></i>
                        ) : (
                          <i class="icofont-close close__button"></i>
                        )}
                        ({packageItem?.group_doubt_solving_count || 0}) Group
                        Doubt Solving
                      </li>
                      <li>
                        {packageItem?.one_to_one_doubt_solving ? (
                          <i class="icofont-check"></i>
                        ) : (
                          <i class="icofont-close close__button"></i>
                        )}
                        ({packageItem?.one_to_one_doubt_solving_count || 0}) One
                        To One Doubt Solving
                      </li>
                    </ul>
                  </div>
                  <div class="pricingarea__button">
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
        />
      </div>
    </>
  );
};

export default PackageDetails;

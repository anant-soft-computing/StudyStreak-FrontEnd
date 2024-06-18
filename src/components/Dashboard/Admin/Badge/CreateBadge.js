import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SingleSelection from "../../../UI/SingleSelect";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";

const initialBadgeData = {
  title: "",
  description: "",
  points_required: 0,
  next_badge: "",
  gamification_items: [],
  gamification_items_id: [],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerBadge = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialBadgeData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (badgeData, setFormError) => {
  if (!badgeData.title) {
    setFormError("Badge Name is Required");
    return false;
  }
  if (!badgeData.description) {
    setFormError("Badge Description is Required");
    return false;
  }
  if (!badgeData.points_required) {
    setFormError("Points is Required");
    return false;
  }
  if (!badgeData.gamification_items.length > 0) {
    setFormError("Gamification Items is Required");
    return false;
  }
  return true;
};

const CreateBadge = ({ setActiveTab }) => {
  const [badgeData, dispatchBadge] = useReducer(reducerBadge, initialBadgeData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [gItems, setGItems] = useState([]);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchBadge({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  useEffect(() => {
    const fetchGItems = async () => {
      try {
        const response = await ajaxCall(
          `/gamification/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setGItems(response.data);
        } else {
          console.log("Error fetching gamification items");
        }
      } catch (error) {
        console.error("Error fetching gamification items:", error);
      }
    };
    if (authData?.accessToken) {
      fetchGItems();
    }
  }, [authData?.accessToken]);

  const createBadge = async (e) => {
    e.preventDefault();
    if (!validateForm(badgeData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    const data = {
      title: badgeData.title,
      description: badgeData.description,
      points_required: badgeData.points_required,
      next_badge: badgeData.next_badge,
      gamification_items: badgeData.gamification_items.map((item) => item.id),
    };
    try {
      const response = await ajaxCall(
        "/gamification/badges/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Badge");
        toast.success("Badge Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  const addedSelectVal = (field, proField, isSingle, val) => {
    let totalPoints = 0;
    val.forEach((selectedItem) => {
      const items = gItems.find(
        (item) => item.id === selectedItem.id
      );
      if (items) {
        totalPoints += items.points;
      }
    });
    dispatchBadge({ type: field, value: val });
    dispatchBadge({ type: proField, value: val.map((item) => item.id) });
    dispatchBadge({ type: "points_required", value: totalPoints });
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Badge Name</label>
                <input
                  type="text"
                  placeholder="Badge Name"
                  value={badgeData.title}
                  onChange={(e) =>
                    dispatchBadge({ type: "title", value: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Badge Points</label>
                <input
                  type="number"
                  placeholder="Badge Points"
                  value={badgeData.points_required}
                  onChange={(e) =>
                    dispatchBadge({
                      type: "points_required",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Gamification</span>
            </div>
            <div className="dashboard__selector">
              <SelectionBox
                value={badgeData.gamification_items}
                onSelect={addedSelectVal.bind(
                  null,
                  "gamification_items",
                  "gamification_items_id",
                  false
                )}
                url="/gamification/"
                name="name"
                objKey={["name"]}
                multiple={true}
              />
            </div>
          </div>
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Next Badge</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={badgeData?.next_badge}
                onChange={(val) => {
                  dispatchBadge({
                    type: "next_badge",
                    value: val,
                  });
                }}
                url="/gamification/badges/"
                objKey={["title"]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Description</label>
                <textarea
                  type="text"
                  placeholder="Description"
                  value={badgeData.description}
                  onChange={(e) =>
                    dispatchBadge({
                      type: "description",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-12 text-center">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Loading color="primary" text="Creating Badge..." />
              ) : (
                <button
                  className="default__button"
                  onClick={createBadge}
                  disabled={formStatus.isSubmitting}
                >
                  Create Badge
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBadge;
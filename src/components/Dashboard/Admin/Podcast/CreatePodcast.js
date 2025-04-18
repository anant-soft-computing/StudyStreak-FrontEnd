import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const initialPodcastData = {
  title: "",
  description: "",
  host: "",
  date: "",
  duration: "",
  audio: null,
  image_thumbnail: null,
  listened_count: "",
  category: "Study Abroad",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerPodcast = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialPodcastData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (podcastData, setFormError) => {
  if (!podcastData.title.trim()) {
    setFormError("Title is Required");
    return false;
  }
  if (!podcastData.description.trim()) {
    setFormError("Description is Required");
    return false;
  }
  if (!podcastData.host.trim()) {
    setFormError("Host is Required");
    return false;
  }
  if (!podcastData.date) {
    setFormError("Date is Required");
    return false;
  }
  if (!podcastData.duration.trim()) {
    setFormError("Duration is Required");
    return false;
  }
  if (!podcastData.audio) {
    setFormError("Audio File is Required");
    return false;
  }
  if (!podcastData.image_thumbnail) {
    setFormError("Image is Required");
    return false;
  }
  if (!podcastData.listened_count || isNaN(podcastData.listened_count)) {
    setFormError("Listens must be a valid number");
    return false;
  }
  return true;
};

const formatDuration = (duration) => {
  // Simple duration formatting - adjust as needed based on API requirements
  // Converts "1:30:00" to "01:30:00" format
  const parts = duration.split(":");
  if (parts.length === 3) {
    return parts.map((part) => part.padStart(2, "0")).join(":");
  }
  return duration;
};

const CreatePodcast = ({ setActiveTab }) => {
  const [podcastData, dispatchPodcast] = useReducer(
    reducerPodcast,
    initialPodcastData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchPodcast({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createPodcast = async (e) => {
    e.preventDefault();
    if (!validateForm(podcastData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    try {
      const formData = new FormData();

      formData.append("title", podcastData.title);
      formData.append("description", podcastData.description);
      formData.append("host", podcastData.host);
      formData.append("date", podcastData.date);
      formData.append("duration", formatDuration(podcastData.duration));
      formData.append("listened_count", Number(podcastData.listened_count));
      formData.append("category", podcastData.category);

      formData.append("audio", podcastData.audio);
      formData.append("image_thumbnail", podcastData.image_thumbnail);

      const response = await ajaxCall(
        "/podcast/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Podcast");
        toast.success("Podcast Created Successfully");
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

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={podcastData.title}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "title",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={podcastData.description}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "description",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Host</label>
                <input
                  type="text"
                  placeholder="Host"
                  value={podcastData.host}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "host",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Date</label>
                <input
                  type="date"
                  placeholder="Date"
                  value={podcastData.date}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "date",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Duration (HH:MM:SS)</label>
                <input
                  type="text"
                  placeholder="Example: 1:30:00"
                  value={podcastData.duration}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "duration",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Audio File (MP3)</label>
                <input
                  type="file"
                  accept="audio/mp3"
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "audio",
                      value: e.target.files[0],
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "image_thumbnail",
                      value: e.target.files[0],
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Category</label>
                <select
                  className="form-select"
                  value={podcastData.category}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "category",
                      value: e.target.value,
                    });
                  }}
                >
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="IELTS Preparation">IELTS Preparation</option>
                  <option value="Career Insights">Career Insights</option>
                  <option value="Student Stories">Student Stories</option>
                  <option value="University Spotlights">
                    University Spotlights
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Listens Count</label>
                <input
                  type="number"
                  placeholder="Example: 100"
                  value={podcastData.listened_count}
                  onChange={(e) => {
                    dispatchPodcast({
                      type: "listened_count",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="dashboard__form__button text-center mt-4">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            {formStatus.isSubmitting ? (
              <Spinner animation="border" style={{ color: "#01579b" }} />
            ) : (
              <button
                className="default__button"
                onClick={createPodcast}
                disabled={formStatus.isSubmitting}
              >
                Create Podcast
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePodcast;

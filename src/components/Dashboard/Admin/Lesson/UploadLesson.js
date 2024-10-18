import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialData = {
  fileName: null,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerData = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || reducerData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (uploadData, setFormError) => {
  const fileName = uploadData?.fileName?.name;

  if (!uploadData.fileName) {
    setFormError("Upload File is Required");
    return false;
  }

  const fileExtension = fileName?.split(".")?.pop()?.toLowerCase();
  if (fileExtension !== "mp4") {
    setFormError("Only .mp4 video files are allowed");
    return false;
  }

  return true;
};

const UploadLesson = () => {
  const [uploadData, dispatchUploadData] = useReducer(reducerData, initialData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const uploadLessonFile = async (e) => {
    e.preventDefault();

    if (!validateForm(uploadData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const data = JSON.stringify({
      fileName: uploadData?.fileName?.name,
      fileType: uploadData?.fileName?.type,
    });

    try {
      const response = await ajaxCall(
        "/s3-presigned-url/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: data,
        },
        8000
      );

      if (response.status === 200) {
        const presignedUrl = response?.data?.presignedUrl;

        await fetch(presignedUrl, {
          method: "PUT",
          body: uploadData.fileName,
          headers: {
            "Content-Type": uploadData.fileName.type,
            "x-amz-acl": "public-read",
          },
        });

        toast.success("File uploaded successfully!");
      } else {
        setFormStatus({
          isError: true,
          errMsg: "Failed to get presigned URL",
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some problem occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  return (
    <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Upload File</label>
            <input
              type="file"
              onChange={(e) =>
                dispatchUploadData({
                  type: "fileName",
                  value: e.target.files[0],
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="col-xl-12 text-center">
        <div className="dashboard__form__button text-center">
          {formStatus.isError && (
            <div className="text-danger mb-2">{formStatus.errMsg}</div>
          )}
          {formStatus.isSubmitting ? (
            <Spinner animation="border" style={{ color: "#01579b" }} />
          ) : (
            <button
              className="default__button"
              onClick={uploadLessonFile}
              disabled={formStatus.isSubmitting}
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadLesson;

import React, { useReducer, useState } from 'react';
import SingleSelection from '../../../UI/SingleSelect';

const initialLiveClassData = {
  batch: '',
  meeting_title: '',
  meeting_description: null,
  start_time_0: '',
  start_time_1: '',
  end_time_0: '',
  end_time_1: '',
  zoom_meeting_id: '',
  zoom_meeting_password: '',
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerCreateLiveClass = (state, action) => {
  if (action.type === 'reset') {
    return action.payload || initialLiveClassData;
  }
  return { ...state, [action.type]: action.value };
};

const CreateLiveClass = () => {
  const [createLiveClassData, dispatchCreateLiveClass] = useReducer(
    reducerCreateLiveClass,
    initialLiveClassData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!createLiveClassData.meeting_title) {
      setFormError('Meeting title is Required');
      return false;
    }
    if (!createLiveClassData.meeting_description) {
      setFormError('Meeting description Required');
      return false;
    }
    if (!createLiveClassData.start_time_0) {
      setFormError('Start date is Required');
      return false;
    }
    if (!createLiveClassData.start_time_1) {
      setFormError('Start time is Required');
      return false;
    }
    if (!createLiveClassData.end_time_0) {
      setFormError('End date is Required');
      return false;
    }
    if (!createLiveClassData.end_time_1) {
      setFormError('End time is Required');
      return false;
    }

    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const resetReducerForm = () => {
    dispatchCreateLiveClass({
      type: 'reset',
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const createLiveClass = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;
    //API integration
  };

  return (
    <div className='row'>
      <div className='col-xl-12'>
        <div className='row'>
          <div className='col-xl-6'>
            <div className='dashboard__select__heading'>
              <span>Batch</span>
            </div>
            <div className='dashboard__selector'>
              <SingleSelection
                value={createLiveClass?.batch}
                onChange={(val) => {
                  dispatchCreateLiveClass({
                    type: 'batch',
                    value: val,
                  });
                }}
                url='/levelView/'
                objKey={['name']}
              />
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Meeting Title</label>
                <input
                  type='text'
                  placeholder='Meeting Title'
                  value={createLiveClassData?.meeting_title}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'meeting_title',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Start Date</label>
                <input
                  type='date'
                  value={createLiveClassData?.start_time_0}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'start_time_0',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Start Time</label>
                <input
                  type='time'
                  value={createLiveClassData?.start_time_1}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'start_time_1',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>End Date</label>
                <input
                  type='date'
                  value={createLiveClassData?.end_time_0}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'end_time_0',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>End Time</label>
                <input
                  type='time'
                  value={createLiveClassData?.end_time_1}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'end_time_1',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Meeting ID</label>
                <input
                  type='text'
                  placeholder='Meeting ID'
                  value={createLiveClassData?.zoom_meeting_id}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'zoom_meeting_id',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Meeting Password</label>
                <input
                  type='text'
                  placeholder='Meeting Password'
                  value={createLiveClassData?.zoom_meeting_password}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'zoom_meeting_password',
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-xl-12'>
            <div className='dashboard__form__wraper'>
              <div className='dashboard__form__input'>
                <label for='#'>Meeting Description</label>
                <textarea
                  id=''
                  cols='10'
                  rows='3'
                  value={createLiveClassData?.meeting_description}
                  onChange={(e) => {
                    dispatchCreateLiveClass({
                      type: 'meeting_description',
                      value: e.target.value,
                    });
                  }}
                >
                  Meeting Description
                </textarea>
              </div>
            </div>
          </div>
          <div className='col-xl-12'>
            <div className='dashboard__form__button'>
              {formStatus.isError ? (
                <div className='text-danger mb-2'>{formStatus.errMsg}</div>
              ) : (
                <div className='text-success mb-2'>{formStatus.errMsg}</div>
              )}
              <button className='default__button' onClick={createLiveClass}>
                Create Live Class
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLiveClass;

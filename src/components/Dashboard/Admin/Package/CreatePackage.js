import React, { useReducer, useState } from 'react';
import SingleSelection from '../../../UI/SingleSelect';

const initialPackageData = {
  package_name: '',
  package_price: '',
  duration: null,
  PackageType: '',
  select_course: '',
  coupon_code: '',
  soft_copy: false,
  hard_copy: false,
  full_length_test: false,
  full_length_test_count: 0,
  practice_test: false,
  practice_test_count: 0,
  speaking_test: false,
  speaking_test_count: 0,
  writing_evaluation: false,
  live_classes_membership: false,
  online_membership: false,
  offline_membership: false,
  group_doubt_solving: false,
  group_doubt_solving_count: 0,
  one_to_one_doubt_solving: false,
  one_to_one_doubt_solving_count: 0,
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerCreatePackage = (state, action) => {
  if (action.type === 'reset') {
    return action.payload || initialPackageData;
  }
  return { ...state, [action.type]: action.value };
};

const CreatePackage = () => {
  const [createPackageData, dispatchCreatePackage] = useReducer(
    reducerCreatePackage,
    initialPackageData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const validateForm = () => {
    if (!createPackageData.PackageType) {
      setFormError('Package Type is Required');
      return false;
    }
    if (!createPackageData.select_course) {
      setFormError('Course is Required');
      return false;
    }
    if (!createPackageData.coupon_code) {
      setFormError('Coupon code is Required');
      return false;
    }
    if (!createPackageData.full_length_test_count) {
      setFormError('Full length test count is Required');
      return false;
    }
    if (!createPackageData.practice_test_count) {
      setFormError('Practice test count is Required');
      return false;
    }
    if (!createPackageData.speaking_test_count) {
      setFormError('Speaking test count is Required');
      return false;
    }

    if (!createPackageData.group_doubt_solving_count) {
      setFormError('Group doubt solving count is Required');
      return false;
    }

    if (!createPackageData.one_to_one_doubt_solving_count) {
      setFormError('One to one doubt solving count is Required');
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
    dispatchCreatePackage({
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

  const createPackage = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;
    //API integration
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div
            className='col-xl-8 col-lg-8 col-md-12 col-12'
            style={{ width: '-webkit-fill-available' }}
          >
            <div className='create__course__accordion__wraper'>
              <div className='accordion' id='accordionExample'>
                <div className='accordion-item w-auto'>
                  <h2 className='accordion-header' id='headingOne'>
                    <button
                      className='accordion-button'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseOne'
                      aria-expanded='true'
                      aria-controls='collapseOne'
                    >
                      Package
                    </button>
                  </h2>
                  <div
                    id='collapseOne'
                    className='accordion-collapse collapse show'
                    aria-labelledby='headingOne'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='become__instructor__form'>
                        <div className='row'>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Package Name</label>
                                <input
                                  type='text'
                                  placeholder='Package Name'
                                  value={createPackageData?.package_name}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'package_name',
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Package Price</label>
                                <input
                                  type='text'
                                  placeholder='Package Price'
                                  value={createPackageData?.package_price}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'package_price',
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Duration</label>
                                <input
                                  type='number'
                                  placeholder='In Months'
                                  value={createPackageData?.duration}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'duration',
                                      value: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12 mb-4'>
                            <div className='dashboard__select__heading'>
                              <span>Package Type</span>
                            </div>
                            <div className='dashboard__selector'>
                              <SingleSelection
                                value={createPackageData?.PackageType}
                                onChange={(val) => {
                                  dispatchCreatePackage({
                                    type: 'PackageType',
                                    value: val,
                                  });
                                }}
                                url='/levelView/'
                                objKey={['name']}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12 mb-4'>
                            <div className='dashboard__select__heading'>
                              <span>Course</span>
                            </div>
                            <div className='dashboard__selector'>
                              <SingleSelection
                                value={createPackageData?.select_course}
                                onChange={(val) => {
                                  dispatchCreatePackage({
                                    type: 'select_course',
                                    value: val,
                                  });
                                }}
                                url='/levelView/'
                                objKey={['name']}
                              />
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12 mb-4'>
                            <div className='dashboard__select__heading'>
                              <span>Coupon Code</span>
                            </div>
                            <div className='dashboard__selector w-100'>
                              <SingleSelection
                                value={createPackageData?.coupon_code}
                                onChange={(val) => {
                                  dispatchCreatePackage({
                                    type: 'coupon_code',
                                    value: val,
                                  });
                                }}
                                url='/levelView/'
                                objKey={['name']}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingTwo'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseTwo'
                      aria-expanded='false'
                      aria-controls='collapseTwo'
                    >
                      Materials
                    </button>
                  </h2>
                  <div
                    id='collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingTwo'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='become__instructor__form'>
                        <div className='d-flex gap-4'>
                          <div className='form__check'>
                            <label>Soft Copy</label>{' '}
                            <input
                              type='checkbox'
                              value={createPackageData?.soft_copy}
                              onChange={(e) => {
                                dispatchCreatePackage({
                                  type: 'soft_copy',
                                  value: e.target.checked,
                                });
                              }}
                            />
                          </div>
                          <div className='form__check'>
                            <label>Hard Copy</label>{' '}
                            <input
                              type='checkbox'
                              value={createPackageData?.hard_copy}
                              onChange={(e) => {
                                dispatchCreatePackage({
                                  type: 'hard_copy',
                                  value: e.target.checked,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingFour'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseFour'
                      aria-expanded='false'
                      aria-controls='collapseFour'
                    >
                      Tests
                    </button>
                  </h2>
                  <div
                    id='collapseFour'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingFour'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='become__instructor__form'>
                        <div className='row'>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Full Length Test Count</label>
                                <input
                                  type='number'
                                  placeholder='Full Length Test Count'
                                  value={
                                    createPackageData.full_length_test_count
                                  }
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'full_length_test_count',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                              <div className='form__check'>
                                <label>Full Length Test</label>{' '}
                                <input
                                  type='checkbox'
                                  value={createPackageData?.full_length_test}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'full_length_test',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Practice Test Count</label>
                                <input
                                  type='number'
                                  placeholder='Practice Test Count'
                                  value={createPackageData?.practice_test_count}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'practice_test_count',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                              <div className='form__check'>
                                <label>Practice Test</label>{' '}
                                <input
                                  type='checkbox'
                                  value={createPackageData?.practice_test}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'practice_test',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12 mt-4'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Specking Test Count</label>
                                <input
                                  type='number'
                                  placeholder='Specking Test Count'
                                  value={createPackageData?.speaking_test_count}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'speaking_test_count',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                              <div className='d-flex gap-4'>
                                <div className='form__check'>
                                  <label>Specking Test</label>{' '}
                                  <input
                                    type='checkbox'
                                    value={createPackageData?.speaking_test}
                                    onChange={(e) => {
                                      dispatchCreatePackage({
                                        type: 'speaking_test',
                                        value: e.target.checked,
                                      });
                                    }}
                                  />
                                </div>
                                <div className='form__check'>
                                  <label>Writing Evaluation</label>{' '}
                                  <input
                                    type='checkbox'
                                    value={
                                      createPackageData?.writing_evaluation
                                    }
                                    onChange={(e) => {
                                      dispatchCreatePackage({
                                        type: 'writing_evaluation',
                                        value: e.target.checked,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingFive'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseFive'
                      aria-expanded='false'
                      aria-controls='collapseFive'
                    >
                      Membership
                    </button>
                  </h2>

                  <div
                    id='collapseFive'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingFive'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='become__instructor__form'>
                        <div className='d-flex gap-4'>
                          <div className='form__check'>
                            <label>Live Classes Membership</label>{' '}
                            <input
                              type='checkbox'
                              value={createPackageData?.live_classes_membership}
                              onChange={(e) => {
                                dispatchCreatePackage({
                                  type: 'live_classes_membership',
                                  value: e.target.checked,
                                });
                              }}
                            />
                          </div>
                          <div className='form__check'>
                            <label>Online Membership</label>{' '}
                            <input
                              type='checkbox'
                              value={createPackageData?.online_membership}
                              onChange={(e) => {
                                dispatchCreatePackage({
                                  type: 'online_membership',
                                  value: e.target.checked,
                                });
                              }}
                            />
                          </div>
                          <div className='form__check'>
                            <label>Offline Membership</label>{' '}
                            <input
                              type='checkbox'
                              value={createPackageData?.offline_membership}
                              onChange={(e) => {
                                dispatchCreatePackage({
                                  type: 'offline_membership',
                                  value: e.target.checked,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='headingSix'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseSix'
                      aria-expanded='false'
                      aria-controls='collapseSix'
                    >
                      Doubt Solving
                    </button>
                  </h2>
                  <div
                    id='collapseSix'
                    className='accordion-collapse collapse'
                    aria-labelledby='headingSix'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      <div className='become__instructor__form'>
                        <div className='row'>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>Group Doubt Solving Count</label>
                                <input
                                  type='number'
                                  placeholder='Group Doubt Solving Count'
                                  value={
                                    createPackageData.group_doubt_solving_count
                                  }
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'group_doubt_solving_count',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                              <div className='form__check'>
                                <label>Group Doubt Solving</label>{' '}
                                <input
                                  type='checkbox'
                                  value={createPackageData?.group_doubt_solving}
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'group_doubt_solving',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                            <div className='dashboard__form__wraper'>
                              <div className='dashboard__form__input'>
                                <label>One To One Doubt Solving Count</label>
                                <input
                                  type='number'
                                  placeholder='One To One Doubt Solving Count'
                                  value={
                                    createPackageData.one_to_one_doubt_solving_count
                                  }
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'one_to_one_doubt_solving_count',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                              <div className='form__check'>
                                <label>One To One Doubt Solving</label>{' '}
                                <input
                                  type='checkbox'
                                  value={
                                    createPackageData.one_to_one_doubt_solving
                                  }
                                  onChange={(e) => {
                                    dispatchCreatePackage({
                                      type: 'one_to_one_doubt_solving',
                                      value: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xl-8 col-lg-8 col-md-6 col-12'>
                <div className='create__course__bottom__button'>
                  {formStatus.isError ? (
                    <div className='text-danger mb-2'>{formStatus.errMsg}</div>
                  ) : (
                    <div className='text-success mb-2'>{formStatus.errMsg}</div>
                  )}
                  <button className='default__button' onClick={createPackage}>
                    Create Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePackage;

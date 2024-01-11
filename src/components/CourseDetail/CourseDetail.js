import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';
import NavBar from '../NavBar/NavBar';
import ajaxCall from '../../helpers/ajaxCall';
import { useSelector } from 'react-redux';
import PackageDetails from './PackageDetails';
import { toast } from 'react-toastify';
import { useCheckAuth } from '../../hooks/useCheckAuth';

const CourseDetail = () => {
  const { courseId } = useParams();
  const authData = useSelector((state) => state.authStore);

  const [courseDetail, setCouresDetail] = useState();
  const [coursePackages, setCoursePackages] = useState();
  const [courseBatches, setCourseBatches] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showBatchSelection, setShowBatchSelection] = React.useState(false);
  const [batchFormSubmitting, setBatchFormSubmitting] = React.useState(false);

  const navigate = useNavigate();

  const { checkAuth } = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [authData]);

  const startDate = courseDetail?.EnrollmentStartDate
    ? new Date(courseDetail?.EnrollmentStartDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const endDate = courseDetail?.EnrollmentEndDate
    ? new Date(courseDetail?.EnrollmentEndDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const getCourseDetail = async () => {
    try {
      const response = await ajaxCall(
        `/courseretupddelview/${courseId}/`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'PATCH',
        },
        8000
      );
      if (response.status === 200) {
        setCouresDetail(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getCoursePackages = async () => {
    try {
      const response = await ajaxCall(
        `/course/${courseId}/packages/`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'GET',
        },
        8000
      );
      if (response.status === 200) {
        setCoursePackages(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getCourseBatches = async () => {
    try {
      const response = await ajaxCall(
        `/batchview/`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'GET',
        },
        8000
      );
      if (response.status === 200) {
        setCourseBatches(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    if (!courseId || isNaN(courseId)) {
      toast.error('Please select a valid course');
      navigate('/');
      return;
    }
    getCourseDetail();
    getCoursePackages();
    getCourseBatches();
  }, [courseId]);

  const handleEnrollNow = async (packageId, batchId) => {
    if (!authData.loggedIn) {
      navigate('/login');
      return;
    }
    setBatchFormSubmitting(true);
    const data = JSON.stringify({
      package_id: packageId,
      batch_id: batchId,
      course_id: parseInt(courseId),
    });
    try {
      const response = await ajaxCall(
        `/enroll-package/`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'POST',
          body: data,
        },
        8000
      );
      if (response.status === 201) {
        setShowBatchSelection(false);
        setBatchFormSubmitting(false);
        toast.success(response?.data?.msg);
      } else if (response.status === 200) {
        toast.error(response?.data?.msg);
        setBatchFormSubmitting(false);
      } else if (response.status === 404 && response.isError) {
        toast.error(response?.data?.error);
        setBatchFormSubmitting(false);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      setBatchFormSubmitting(false);
      console.log('Error:', error);
    }
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='theme__shadow__circle'></div>
          <div className='theme__shadow__circle shadow__right'></div>
          <div className='blogarea__2 sp_top_100 sp_bottom_100'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-12 col-lg-12'>
                  <div
                    className='blogarae__img__2 course__details__img__2'
                    data-aos='fade-up'
                  >
                    <div className='row'>
                      <div className='col-xl-6 col-lg-6'>
                        <img src={courseDetail?.Course_Thumbnail} alt='blog' />
                        <div className='registerarea__content course__details__video'>
                          <div className='registerarea__video'>
                            {/* <div className='video__pop__btn'>
                              <Link
                                className='video-btn'
                                to='https://www.youtube.com/watch?v=vHdclsdkp28'
                              >
                                <img src={video} alt='' />
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div
                        className='course__details__wraper col-xl-6 col-lg-6'
                        data-aos='fade-up'
                      >
                        <ul>
                          <li>
                            Instructor :
                            <span>
                              {courseDetail?.primary_instructor?.username}
                            </span>
                          </li>
                          <li>
                            Category :
                            <span>{courseDetail?.Category?.name}</span>
                          </li>
                          <li>
                            Start Date :
                            <span className='sb_content'>{startDate}</span>
                          </li>
                          <li>
                            End Date :
                            <span className='sb_content'>{endDate}</span>
                          </li>
                        </ul>
                        <ul>
                          <li>
                            Course level :
                            <span>{courseDetail?.Level?.name}</span>
                          </li>
                          <li>
                            Language :
                            <span>{courseDetail?.Language?.name}</span>
                          </li>

                          <li>
                            Max Enroll :
                            <span>{courseDetail?.max_enrollments || 0}</span>
                          </li>
                          <li>
                            Total Duration :
                            <span className='sb_content'>
                              {courseDetail?.lessons.reduce(
                                (totalDuration, lesson) =>
                                  totalDuration +
                                  parseInt(lesson?.Lesson_Duration),
                                0
                              )}{' '}
                              Minutes
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='blog__details__content__wraper'>
                    <div className='course__button__wraper' data-aos='fade-up'>
                      <div className='course__button'>
                        {courseDetail?.Category?.name && (
                          <Link to=''>{courseDetail?.Category?.name}</Link>
                        )}
                        {/* <Link className='course__2' to=''>
                          Ux Design
                        </Link> */}
                      </div>
                      <div className='course__date'>
                        <div className='course__details__date'>
                          <i className='icofont-book-alt'></i>{' '}
                          {courseDetail?.lessons?.length} Lessons
                        </div>
                      </div>
                    </div>
                    <div
                      className='course__details__heading'
                      data-aos='fade-up'
                    >
                      <h3>{courseDetail?.Course_Title}</h3>
                    </div>
                    <div
                      className='course__details__paragraph'
                      data-aos='fade-up'
                    >
                      <p>{courseDetail?.Short_Description}</p>
                    </div>
                    {/* <div className='course__details__wraper' data-aos='fade-up'>
                      <ul>
                        <li>
                          Instructor :
                          <span>
                            {courseDetail?.primary_instructor?.username}
                          </span>
                        </li>
                        <li>
                          Category :<span>{courseDetail?.Category?.name}</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          Course level :<span>{courseDetail?.Level?.name}</span>
                        </li>
                        <li>
                          Language : <span>{courseDetail?.Language?.name}</span>
                        </li>
                      </ul>
                    </div> */}
                    <h4 className='sidebar__title' data-aos='fade-up'>
                      Packages
                    </h4>
                    <div data-aos='fade-up' className='mb-4'>
                      {coursePackages?.packages?.length >= 1 ? (
                        <PackageDetails
                          showBatchSelection={showBatchSelection}
                          setShowBatchSelection={setShowBatchSelection}
                          packages={coursePackages?.packages}
                          handleEnrollNow={handleEnrollNow}
                          courseBatches={courseBatches}
                          batchFormSubmitting={batchFormSubmitting}
                        />
                      ) : (
                        // coursePackages?.packages?.map((name, index) => (
                        // <li key={index}>
                        //   <div className='course__details__populer__img'>
                        //     <img src={blogDetail7} alt='populer' />
                        //   </div>
                        //   <div className='course__details__populer__content'>
                        //     <span>$32,000</span>
                        //     <h6>
                        //       <Link to=''>{name?.package_name}</Link>
                        //     </h6>
                        //   </div>
                        // </li>
                        // ))
                        <div
                          // className='course__details__wraper'
                          data-aos='fade-up'
                        >
                          <div className='sp_20 col--30'>
                            {'No packages available'}
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className='course__details__tab__wrapper'
                      data-aos='fade-up'
                    >
                      <div className='row'>
                        <div className='col-xl-12'>
                          <ul
                            className='nav  course__tap__wrap'
                            id='myTab'
                            role='tablist'
                          >
                            <li className='nav-item' role='presentation'>
                              <button
                                className='single__tab__link active'
                                data-bs-toggle='tab'
                                data-bs-target='#projects__two'
                                type='button'
                              >
                                <i className='icofont-book-alt'></i>Curriculum
                              </button>
                            </li>
                            <li className='nav-item' role='presentation'>
                              <button
                                className='single__tab__link'
                                data-bs-toggle='tab'
                                data-bs-target='#projects__one'
                                type='button'
                              >
                                <i className='icofont-paper'></i>Description
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className='tab-content tab__content__wrapper'
                        id='myTabContent'
                      >
                        <div
                          className='tab-pane fade  active show'
                          id='projects__two'
                          role='tabpanel'
                          aria-labelledby='projects__two'
                        >
                          <div
                            className='accordion content__cirriculum__wrap'
                            id='accordionCourseContent'
                          >
                            {courseDetail?.lessons?.map((lessonItem, index) => (
                              <div className='accordion-item' key={index}>
                                <h2
                                  className='accordion-header'
                                  id={`lesson-${index}`}
                                >
                                  <button
                                    className={`accordion-button ${
                                      activeIndex !== index ? 'collapsed' : ''
                                    }`}
                                    type='button'
                                    data-bs-toggle='collapse'
                                    data-bs-target={`#collapseOne-${index}`}
                                    aria-expanded={
                                      activeIndex === index ? 'true' : 'false'
                                    }
                                    aria-controls={`#collapseOne-${index}`}
                                    onClick={() => setActiveIndex(index)}
                                  >
                                    {lessonItem?.Lesson_Title}
                                    <span>{lessonItem?.Lesson_Duration}</span>
                                  </button>
                                </h2>
                                <div
                                  id={`collapseOne-${index}`}
                                  className={`accordion-collapse collapse ${
                                    activeIndex === index ? 'show' : ''
                                  }`}
                                  aria-labelledby={`lesson-${index}`}
                                  data-bs-parent='#accordionCourseContent'
                                >
                                  <div className='accordion-body'>
                                    <div className='scc__wrap'>
                                      <div
                                        className='scc__info align-items-center'
                                        style={{
                                          wordWrap: 'break-word',
                                          width: '100%',
                                          maxWidth: '600px',
                                        }}
                                      >
                                        <i className='icofont-video-alt'></i>
                                        <h5>
                                          <div role='button'>
                                            <span>
                                              {lessonItem?.Lesson_Description}
                                            </span>
                                          </div>
                                        </h5>
                                      </div>
                                      <div className='scc__meta'>
                                        <span>
                                          <i className='icofont-lock'></i>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {/* <div className='accordion-item'>
                              <h2 className='accordion-header' id='headingOne'>
                                <button
                                  className='accordion-button'
                                  type='button'
                                  data-bs-toggle='collapse'
                                  data-bs-target='#collapseOne'
                                  aria-expanded='true'
                                  aria-controls='collapseOne'
                                >
                                  Course content
                                </button>
                              </h2>
                              <div
                                id='collapseOne'
                                className='accordion-collapse collapse show'
                                aria-labelledby='headingOne'
                                data-bs-parent='#accordionExample'
                              >
                                <div className='accordion-body'>
                                  <div className='scc__wrap'>
                                    <div className='scc__info'>
                                      <i className='icofont-video-alt'></i>
                                      <h5>
                                        <span>Video :</span>
                                      </h5>
                                    </div>
                                    <div className='scc__meta'>
                                      <Link
                                        to={courseDetail?.Course_Overview_URL}
                                      >
                                        <span className='question'>
                                          <i className='icofont-eye'> </i>
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div
                          className='tab-pane fade'
                          id='projects__one'
                          role='tabpanel'
                          aria-labelledby='projects__one'
                        >
                          <div className='experence__heading'>
                            <h5>Experience Description</h5>
                          </div>
                          <div className='experence__description'>
                            <p
                              className='description__1'
                              style={{ whiteSpace: 'pre-line' }}
                            >
                              {courseDetail?.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='course__list__wraper' data-aos='fade-up'>
                      <div className='blog__details__heading__2'>
                        <h5>Why course is important ?</h5>
                      </div>
                      <div
                        className='aboutarea__list__2 blog__details__list__2'
                        data-aos='fade-up'
                      >
                        <ul className='ps-0'>
                          <li>
                            <p style={{ whiteSpace: 'pre-line ' }}>
                              {courseDetail?.faqs}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className='col-xl-4 col-lg-4'>
                  <div className='course__details__sidebar'>
                    <div className='event__sidebar__wraper' data-aos='fade-up'>
                      <div
                        className='blogarae__img__2 course__details__img__2'
                        data-aos='fade-up'
                      >
                        <img src={blog7} alt='blog' />
                        <div className='registerarea__content course__details__video'>
                          <div className='registerarea__video'>
                            <div className='video__pop__btn'>
                              <Link
                                className='video-btn'
                                to='https://www.youtube.com/watch?v=vHdclsdkp28'
                              >
                                <img src={video} alt='' />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className='course__summery__button'>
                        <Link className='default__button'>Enroll Now</Link>
                      </div> */}
                {/* <div className='course__summery__lists'>
                        <ul>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Instructor:</span>
                              <span className='sb_content'>
                                <Link>
                                  {courseDetail?.primary_instructor?.username}
                                </Link>
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Start Date</span>
                              <span className='sb_content'>{startDate}</span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>End Date</span>
                              <span className='sb_content'>{endDate}</span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Total Duration</span>
                              <span className='sb_content'>
                                {courseDetail?.lessons.reduce(
                                  (totalDuration, lesson) =>
                                    totalDuration +
                                    parseInt(lesson?.Lesson_Duration),
                                  0
                                )}{' '}
                                Mins
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Max Enroll</span>
                              <span className='sb_content'>
                                {courseDetail?.max_enrollments || 0}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Skill Level</span>
                              <span className='sb_content'>
                                {courseDetail?.Level?.name}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className='course__summery__item'>
                              <span className='sb_label'>Language</span>
                              <span className='sb_content'>
                                {courseDetail?.Language?.name}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */}
                {/* <div
                    className='blogsidebar__content__wraper__2'
                    data-aos='fade-up'
                  >
                    <h4 className='sidebar__title'>Packages</h4>
                    <ul className='course__details__populer__list'>
                      {coursePackages?.packages?.map((name, index) => (
                        <li key={index}>
                          <div className='course__details__populer__img'>
                            <img src={blogDetail7} alt='populer' />
                          </div>
                          <div className='course__details__populer__content'>
                            <span>$32,000</span>
                            <h6>
                              <Link to=''>{name.package_name}</Link>
                            </h6>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;

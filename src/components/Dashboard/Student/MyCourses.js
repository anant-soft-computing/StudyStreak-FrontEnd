import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../TopBar/TopBar';
import NavBar from '../../NavBar/NavBar';
import ajaxCall from '../../../helpers/ajaxCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyCourses = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseLessons, setCourseLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const authData = useSelector((state) => state.authStore);

  const getCourseLessons = async () => {
    try {
      const response = await ajaxCall(
        `/courseretupddelview/${courseId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: 'GET',
        },
        8000
      );

      if (response.status === 200) {
        setCourseLessons(response?.data?.lessons);
        setActiveLesson(response?.data?.lessons[0]);
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
    if (!authData.authLoading && !authData.loggedIn) {
      toast.error('You are not authorized to access this location');
      navigate('/login');
      return;
    }
    getCourseLessons();
  }, [courseId, authData]);

  return (
    <>
      <TopBar />
      <NavBar />
      <div className='body__wrapper'>
        <div className='main_wrapper overflow-hidden'>
          <div className='theme__shadow__circle'></div>
          <div className='theme__shadow__circle shadow__right'></div>
          <div className='tution sp_bottom_100 sp_top_50'>
            <div className='container-fluid full__width__padding'>
              <div className='row'>
                <div
                  className='col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12'
                  data-aos='fade-up'
                >
                  <div
                    className='accordion content__cirriculum__wrap'
                    id='accordionLessons'
                  >
                    {courseLessons?.map((lessonItem, index) => (
                      <div className='accordion-item' key={index}>
                        <h2 className='accordion-header' id={`lesson-${index}`}>
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
                          </button>
                        </h2>
                        <div
                          id={`collapseOne-${index}`}
                          className={`accordion-collapse collapse ${
                            activeIndex === index ? 'show' : ''
                          }`}
                          aria-labelledby={`lesson-${index}`}
                          data-bs-parent='#accordionLessons'
                        >
                          <div className='accordion-body'>
                            <div className='scc__wrap'>
                              <div
                                className='scc__info align-items-center'
                                style={{
                                  wordWrap: 'break-word',
                                  width: '100%',
                                  maxWidth: '240px',
                                }}
                              >
                                <i className='icofont-video-alt'></i>
                                <h5>
                                  <div
                                    role='button'
                                    onClick={() => setActiveLesson(lessonItem)}
                                  >
                                    <Link to=''>
                                      <span>
                                        {lessonItem?.Lesson_Description}
                                      </span>
                                    </Link>
                                  </div>
                                </h5>
                              </div>
                              <div className='scc__meta'>
                                <strong>{lessonItem?.Lesson_Duration}</strong>
                              </div>
                            </div>
                            <div className='scc__wrap'>
                              <div className='scc__info'>
                                <i className='icofont-audio text-muted'></i>
                                <h5 className='text-muted'>
                                  <span>Quiz (Coming Soon)</span>
                                </h5>
                              </div>
                            </div>
                            <div className='scc__wrap'>
                              <div className='scc__info'>
                                <i className='icofont-audio text-muted'></i>
                                <h5 className='text-muted'>
                                  <span>Assignment (Coming Soon)</span>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingTwo'>
                        <button
                          className='accordion-button collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#collapseTwo'
                          aria-expanded='false'
                          aria-controls='collapseTwo'
                        >
                          Lesson #02
                        </button>
                      </h2>
                      <div
                        id='collapseTwo'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingTwo'
                        data-bs-parent='#accordionLessons'
                      >
                        <div className='accordion-body'>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>3.27</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>5.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>7.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-audio'></i>
                              <h5>
                                <Link to=''>
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Assignment</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header' id='headingThree'>
                        <button
                          className='accordion-button collapsed'
                          type='button'
                          data-bs-toggle='collapse'
                          data-bs-target='#collapseThree'
                          aria-expanded='false'
                          aria-controls='collapseThree'
                        >
                          Lesson #03
                        </button>
                      </h2>
                      <div
                        id='collapseThree'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingThree'
                        data-bs-parent='#accordionLessons'
                      >
                        <div className='accordion-body'>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>3.27</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>5.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>7.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-audio'></i>
                              <h5>
                                <Link to=''>
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Assignment</span>
                                </Link>
                              </h5>
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
                          Lesson #04
                        </button>
                      </h2>
                      <div
                        id='collapseFour'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingFour'
                        data-bs-parent='#accordionLessons'
                      >
                        <div className='accordion-body'>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>3.27</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>5.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>7.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-audio'></i>
                              <h5>
                                <Link to=''>
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Assignment</span>
                                </Link>
                              </h5>
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
                          Lesson #05
                        </button>
                      </h2>
                      <div
                        id='collapseFive'
                        className='accordion-collapse collapse'
                        aria-labelledby='headingFive'
                        data-bs-parent='#accordionLessons'
                      >
                        <div className='accordion-body'>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>3.27</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>5.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-video-alt'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className='scc__meta'>
                              <strong>7.00</strong>
                              <Link to=''>
                                <span className='question'>
                                  <i className='icofont-eye'></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-audio'></i>
                              <h5>
                                <Link to=''>
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className='scc__wrap'>
                            <div className='scc__info'>
                              <i className='icofont-file-text'></i>
                              <h5>
                                <Link to=''>
                                  <span>Assignment</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div
                  className='col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12'
                  data-aos='fade-up'
                >
                  <div className='lesson__content__main'>
                    <div className='lesson__content__wrap'>
                      <h3>{activeLesson?.Lesson_Title}</h3>
                      {/* <span>
                        <Link to=''>Close</Link>
                      </span> */}
                    </div>
                    <div className='plyr__video-embed rbtplayer'>
                      <iframe
                        src={activeLesson?.Lesson_Video?.replace(
                          'watch?v=',
                          'embed/'
                        )}
                        allow='autoplay'
                        allowFullScreen
                        title='YouTube video player'
                        frameborder='0'
                        // allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        className='video'
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourses;

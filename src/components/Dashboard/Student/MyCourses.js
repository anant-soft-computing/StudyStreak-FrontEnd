import React, { useEffect, useState } from 'react';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import TopBar from '../../TopBar/TopBar';
import NavBar from '../../NavBar/NavBar';
import { useSelector } from 'react-redux';
import ajaxCall from '../../../helpers/ajaxCall';

const MyCourses = () => {
  const [lessonList, setLessonList] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const authData = useSelector((state) => state.authStore);

  const extractVideoId = (videoUrl) => {
    const match = videoUrl?.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(selectedLesson?.Lesson_Video);

  const getLessons = async () => {
    try {
      const response = await ajaxCall(
        `/courseretupddelview/23/`,
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
        setLessonList(response.data?.lessons);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('-----Error---->', error);
    }
  };

  const handleLessonClick = (index) => {
    setSelectedLesson(lessonList[index]);
  };

  useEffect(() => {
    getLessons();
  }, []);

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
                    id='accordionExample'
                  >
                    {lessonList.map((lesson, index) => (
                      <div className='accordion-item' key={index}>
                        <h2
                          className='accordion-header'
                          id={`heading${index + 1}`}
                        >
                          <button
                            className='accordion-button'
                            type='button'
                            onClick={() => handleLessonClick(index)}
                            data-bs-toggle='collapse'
                            data-bs-target={`#collapse${index + 1}`}
                            aria-expanded={index === 0 ? 'true' : 'false'}
                            aria-controls={`collapse${index + 1}`}
                          >
                            Lesson #{index + 1}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index + 1}`}
                          className={`accordion-collapse collapse ${
                            index === 0 ? 'show' : ''
                          }`}
                          aria-labelledby={`heading${index + 1}`}
                          data-bs-parent='#accordionExample'
                        >
                          <div className='accordion-body'>
                            <div className='scc__wrap'>
                              <div className='scc__info'>
                                <i className='icofont-video-alt'></i>
                                <h5>
                                  <Link>
                                    <span>{lesson?.Lesson_Title}</span>
                                  </Link>
                                </h5>
                              </div>
                              <div className='scc__meta'>
                                <strong>{lesson?.Lesson_Duration}</strong>
                                <Link>
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
                                  <Link>
                                    <span>Course Materials</span>
                                  </Link>
                                </h5>
                              </div>
                            </div>
                            <div className='scc__wrap'>
                              <div className='scc__info'>
                                <i className='icofont-file-text'></i>
                                <h5>
                                  <Link>
                                    <span>Assignment</span>
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className='col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12'
                  data-aos='fade-up'
                >
                  <div className='lesson__content__main'>
                    <div className='lesson__content__wrap'>
                      <h3>
                        {selectedLesson &&
                          `Video Content ${selectedLesson?.Lesson_Title}`}
                      </h3>
                    </div>
                    <div className='plyr__video-embed rbtplayer'>
                      {videoId && (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          allowFullScreen
                          allow='autoplay'
                          title='UniqueTitleHere'
                          className='video'
                        ></iframe>
                      )}
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

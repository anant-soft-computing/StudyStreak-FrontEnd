import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gridImg1 from '../../img/grid/grid_1.png';
import logo from '../../img/logo/Logo.png';
import ajaxCall from '../../helpers/ajaxCall';
import { useSelector } from 'react-redux';

const CourseListItem = () => {
  const [courseList, setCouresList] = useState([]);

  const authData = useSelector((state) => state.authStore);

  const getCourses = async () => {
    try {
      const response = await ajaxCall(
        `/courselistview/`,
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
        setCouresList(response.data);
      } else {
        console.log('---error---->');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className='row'>
      {courseList.map((course) => (
        <div
          className='col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12'
          data-aos='fade-up'
          key={course.id}
        >
          <div className='gridarea__wraper gridarea__wraper__2'>
            <div className='gridarea__img'>
              <Link to={`/course-detail/${course?.id}`}>
                <img
                  src={course?.Course_Thumbnail}
                  alt={course?.Course_Title}
                />
              </Link>
            </div>
            <div className='gridarea__content'>
              <div className='gridarea__list'>
                <ul className='ps-0'>
                  <li>
                    <i className='icofont-book-alt'></i>{' '}
                    {course?.lessons?.length} Lessons
                  </li>
                  <li>
                    <i className='icofont-clock-time'></i>{' '}
                    {course?.lessons.reduce(
                      (totalDuration, lesson) =>
                        totalDuration + parseInt(lesson?.Lesson_Duration),
                      0
                    )}{' '}
                    Mins
                  </li>
                </ul>
              </div>
              <div className='gridarea__heading'>
                <h3>
                  <Link to={`/course-detail/${course?.id}`}>
                    {course?.Course_Title}
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CourseListItem;

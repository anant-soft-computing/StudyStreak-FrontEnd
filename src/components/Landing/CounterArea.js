import React from 'react';
import counter1 from '../../img/counter/counter__1.png';
import counter2 from '../../img/counter/counter__2.png';
import counter3 from '../../img/counter/counter__3.png';
import counter4 from '../../img/counter/counter__4.png';

const CounterArea = () => {
  return (
    <div className='counterarea sp_bottom_50 sp_top_50 mt-4'>
      <div className='container'>
        <div className='row'>
          <div
            className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6'
            data-aos='fade-up'
          >
            <div className='counterarea__text__wraper'>
              <div className='counter__img'>
                <img src={counter1} alt='counter' />
              </div>
              <div className='counter__content__wraper'>
                <div className='counter__number'>
                  <span className='counter'>27</span>+
                </div>
                <p>Total Achievement</p>
              </div>
            </div>
          </div>
          <div
            className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6'
            data-aos='fade-up'
          >
            <div className='counterarea__text__wraper'>
              <div className='counter__img'>
                <img src={counter2} alt='counter' />
              </div>
              <div className='counter__content__wraper'>
                <div className='counter__number'>
                  <span className='counter'>145</span>+
                </div>
                <p>Total Students</p>
              </div>
            </div>
          </div>
          <div
            className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6'
            data-aos='fade-up'
          >
            <div className='counterarea__text__wraper'>
              <div className='counter__img'>
                <img src={counter3} alt='counter' />
              </div>
              <div className='counter__content__wraper'>
                <div className='counter__number'>
                  <span className='counter'>10</span>k
                </div>
                <p>Total Instructors</p>
              </div>
            </div>
          </div>
          <div
            className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6'
            data-aos='fade-up'
          >
            <div className='counterarea__text__wraper'>
              <div className='counter__img'>
                <img src={counter4} alt='counter' />
              </div>
              <div className='counter__content__wraper'>
                <div className='counter__number'>
                  <span className='counter'>214</span>+
                </div>
                <p>OVER THE WORLD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterArea;

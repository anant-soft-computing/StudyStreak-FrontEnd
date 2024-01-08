import React from 'react';
import blogDetail7 from '../../img/blog-details/blog-details__7.png';

// const packageDetails = {
//   full_length_test: 'Full Length Test',
//   full_length_test_count: 'Full Length Test',
//   group_doubt_solving: 'Full Length Test',
//   group_doubt_solving_count: 'Full Length Test',
//   hard_copy: 'Full Length Test',
//   live_classes_membership: 'Full Length Test',
//   offline_membership: 'Full Length Test',
//   one_to_one_doubt_solving: 'Full Length Test',
//   one_to_one_doubt_solving_count: 'Full Length Test',
//   online_membership: 'Full Length Test',
//   practice_test: 'Full Length Test',
//   practice_test_count: 'Full Length Test',
//   soft_copy: 'Full Length Test',
//   speaking_test: 'Full Length Test',
//   speaking_test_count: 'Full Length Test',
//   validity: 'Full Length Test',
//   writing_evaluation: 'Full Length Test',
// };

const checkIcon = () => {
  return (
    <i class='icofont-check-circled text-success icofont-md icofont-bold'></i>
  );
};

const cancelIcon = () => {
  return (
    <i class='icofont-close-circled text-danger icofont-md icofont-bold'></i>
  );
};

const PackageDetails = (props) => {
  const { packages, handleEnrollNow } = props;

  return (
    <div className='pricingarea'>
      <div className='container px-0'>
        <div className='row'>
          {packages?.map((packageItem, index) => (
            <div
              key={packageItem.id}
              className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 aos-init aos-animate'
            >
              <div className='pricingarea__content__wraper p-3'>
                <div className='pricingarea__heading d-flex justify-content-start mb-1'>
                  <h6 className='text-bold dd mb-0'>
                    <b>{packageItem?.package_name}</b>
                  </h6>
                </div>
                <div className='pricingarea__plan__type d-flex justify-content-start align-items-center align-content-center mb-1'>
                  <h3 className='text-primary pricingarea__number'>
                    <i class='icofont-rupee'></i>
                    <b>{`${packageItem?.package_price}`}</b>
                  </h3>
                </div>
                <div className='gridarea__img mb-2'>
                  <img
                    src={blogDetail7}
                    alt='grid'
                    height={150}
                    width={'100%'}
                  />
                </div>
                <div className='gridarea__content'>
                  <div
                    className='gridarea__list overflow-auto h-100'
                    style={{
                      maxHeight: '400px',
                    }}
                  >
                    <div className='gridarea__list package_list_item '>
                      Duration&nbsp;<b>{packageItem?.duration} Mins </b>
                    </div>
                    <div className='gridarea__list package_list_item'>
                      {packageItem?.full_length_test
                        ? checkIcon()
                        : cancelIcon()}
                      &nbsp;Full Length Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.full_length_test_count || cancelIcon()}
                      </b>
                      &nbsp;Number of Full Length Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.group_doubt_solving
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Group Doubt Solving
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.group_doubt_solving_count || cancelIcon()}
                      </b>
                      &nbsp;Number of Group Doubt Solving
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.hard_copy ? checkIcon() : cancelIcon()}
                      </b>
                      &nbsp;Hard Copy
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.live_classes_membership
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Live Class Membership
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.offline_membership
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Offline Membership
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.one_to_one_doubt_solving
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;One to One Doubt Solving
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.one_to_one_doubt_solving_count ||
                          cancelIcon()}
                      </b>
                      &nbsp;Number of One to One Doubt Solving
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.online_membership
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Online Membership
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.practice_test
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Practice Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>{packageItem?.practice_test_count || cancelIcon()}</b>
                      &nbsp;Total Practice Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.soft_copy ? checkIcon() : cancelIcon()}
                      </b>
                      &nbsp;Soft Copy
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.speaking_test
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Speaking Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>{packageItem?.speaking_test_count || cancelIcon()}</b>
                      &nbsp;Total Speaking Test
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>{packageItem?.validity || '0'}</b>
                      &nbsp;Validity
                    </div>
                    <div className='gridarea__list package_list_item'>
                      <b>
                        {packageItem?.writing_evaluation
                          ? checkIcon()
                          : cancelIcon()}
                      </b>
                      &nbsp;Writing Evaluation
                    </div>
                  </div>
                  <div className='course__summery__button mt-2'>
                    <div
                      role='button'
                      className='default__button'
                      onClick={() => handleEnrollNow(index)}
                    >
                      Enroll Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

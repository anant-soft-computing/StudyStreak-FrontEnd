import React, { useEffect, useState } from 'react';
import ajaxCall from '../../../../helpers/ajaxCall';

const columns = [
  'No.',
  'Package name',
  'Package price',
  'PackageType',
  'Selected course',
  'Soft copy',
  'Hard copy',
  'Full length test',
  'Practice test',
  'Speaking test',
  'Writing evaluation',
  'Live classes membership',
  'Group doubt solving',
  'One to one doubt solving',
];

export const checkIcon = () => {
  return (
    <i className='icofont-check-circled text-success icofont-md icofont-bold'></i>
  );
};

export const cancelIcon = () => {
  return (
    <i className='icofont-close-circled text-danger icofont-md icofont-bold'></i>
  );
};

const ViewPackages = ({ search, selectedCategory, selectedLevel }) => {
  const [packageList, setPackageList] = useState([]);

  const getPackages = async () => {
    try {
      const response = await ajaxCall(
        `/packagelistview`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        },
        8000
      );

      if (response?.status === 200) {
        setPackageList(response?.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [search, selectedCategory, selectedLevel]);

  const renderItemAvailable = (value) => {
    return value ? checkIcon() : cancelIcon();
  };

  return (
    <div className='dashboard__table table-responsive'>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packageList?.map((packageItem, index) => (
            <tr
              key={index + 1}
              className={`${index % 2 === 0 ? '' : 'dashboard__table__row'}`}
            >
              <th>
                <div>{index + 1}.</div>
              </th>
              <td>{packageItem?.package_name}</td>
              <td>
                <div className='dashboard__table__star'>
                  {packageItem?.package_price}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {packageItem?.PackageType?.name}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {packageItem?.select_course?.Course_Title}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.soft_copy)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.hard_copy)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.full_length_test)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.practice_test)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.speaking_test)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.writing_evaluation)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.live_classes_membership)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.group_doubt_solving)}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {renderItemAvailable(packageItem?.one_to_one_doubt_solving)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewPackages;

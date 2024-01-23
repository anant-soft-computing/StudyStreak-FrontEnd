import React, { useEffect, useState } from 'react';
import ajaxCall from '../../../../helpers/ajaxCall';

const columns = [
  'No.',
  'Meeting Title',
  'Start Time',
  'End Time',
  'Selected course',
  'Meeting Id',
  'Meeting Password',
];

const ViewLiveClasses = ({ search, selectedCategory, selectedLevel }) => {
  const [liveClassList, setLiveClassList] = useState([]);

  const getLiveClassesList = async () => {
    try {
      const response = await ajaxCall(
        `/liveclassviewas`,
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
        setLiveClassList(response?.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getLiveClassesList();
  }, [search, selectedCategory, selectedLevel]);

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
          {liveClassList?.map((liveClassListItem, index) => (
            <tr
              key={index + 1}
              className={`${index % 2 === 0 ? '' : 'dashboard__table__row'}`}
            >
              <th>
                <div>{index + 1}.</div>
              </th>
              <td>{liveClassListItem?.package_name}</td>
              <td>
                <div className='dashboard__table__star'>
                  {liveClassListItem?.package_price}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {liveClassListItem?.PackageType?.name}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {liveClassListItem?.select_course?.Course_Title}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {liveClassListItem?.soft_copy}
                </div>
              </td>
              <td>
                <div className='dashboard__table__star'>
                  {liveClassListItem?.hard_copy}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ViewLiveClasses;

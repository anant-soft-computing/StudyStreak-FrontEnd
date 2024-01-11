import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const BatchSelection = (props) => {
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const {
    courseBatches,
    handleEnrollNow,
    packageId,
    show,
    onHide,
    batchFormSubmitting,
  } = props;

  const handleEnrollButton = () => {
    handleEnrollNow(packageId, selectedBatchId);
  };

  const handleModalClose = () => {
    setSelectedBatchId('');
    onHide();
  };

  return (
    <Modal
      {...props}
      show={show}
      size='lg'
      keyboard={false}
      backdrop='static'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Select Preferred Batch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {courseBatches?.length >= 1 ? (
          <div className='row'>
            {courseBatches?.map((batchItem) => (
              <div
                className='dashboard__recent__course__single'
                key={batchItem?.id}
              >
                <div className='me-3'>
                  <input
                    type='radio'
                    checked={selectedBatchId === batchItem?.id}
                    name='batchSelection'
                    className='w-10 batch__radio__input'
                    onChange={(event) => {
                      setSelectedBatchId(batchItem?.id);
                    }}
                  />
                </div>
                <div
                  className='dashboard__recent__course__content'
                  style={{ width: '80%' }}
                >
                  <div className='dashboard__recent__course__heading'>
                    <h3>{batchItem?.batch_name}</h3>
                  </div>
                  <div className='dashboard__recent__course__meta text-xl-center'>
                    <ul className='ps-0'>
                      <li>
                        <i className='icofont-calendar'></i> <b>Date</b>:{' '}
                        {batchItem?.batch_startdate && batchItem?.batch_enddate
                          ? `${batchItem?.batch_startdate} To ${batchItem?.batch_enddate}`
                          : 'N/A'}
                      </li>
                      <li>
                        <i className='icofont-clock-time'></i> <b>Time</b>:{' '}
                        {batchItem?.batch_start_timing &&
                        batchItem?.batch_end_timing
                          ? `${batchItem?.batch_start_timing} To ${batchItem?.batch_end_timing}`
                          : 'N/A'}
                      </li>

                      <li>
                        <i className='icofont-group-students'></i>{' '}
                        <b>Students</b>: {batchItem?.batchuser}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Batches Available</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          className='default__button'
          onClick={() => handleEnrollButton()}
          disabled={!selectedBatchId || batchFormSubmitting}
        >
          {batchFormSubmitting && (
            <Spinner
              animation='border'
              role='status'
              size='sm'
              className='me-2'
            >
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          )}
          Enroll Package
        </button>
        <button
          onClick={() => handleModalClose()}
          className='btn-secondary default__button'
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default BatchSelection;

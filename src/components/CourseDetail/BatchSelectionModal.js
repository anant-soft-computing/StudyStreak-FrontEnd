import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BatchSelection = (props) => {
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const { courseBatches, handleEnrollNow, packageId, show, onHide } = props;

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
                  <div className='dashboard__recent__course__meta'>
                    <ul className='ps-0'>
                      <li>
                        <i className='icofont-calendar'></i> Date:{' '}
                        {batchItem?.batch_startdate && batchItem?.batch_enddate
                          ? `${batchItem?.batch_startdate} To ${batchItem?.batch_enddate}`
                          : 'N/A'}
                      </li>
                      <li>
                        <i className='icofont-clock-time'></i> Time:{' '}
                        {batchItem?.batch_start_timing &&
                        batchItem?.batch_end_timing
                          ? `${batchItem?.batch_start_timing} To ${batchItem?.batch_end_timing}`
                          : 'N/A'}
                      </li>

                      <li>
                        <i className='icofont-group-students'></i> Students:{' '}
                        {batchItem?.batchuser}
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
        <Button
          className='default__button'
          onClick={() => handleEnrollButton()}
          disabled={!selectedBatchId}
        >
          Enroll Package
        </Button>
        <Button onClick={() => handleModalClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BatchSelection;

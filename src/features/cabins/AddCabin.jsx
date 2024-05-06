import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpenModal(!isOpenModal)}
        variation='primary'
        size='medium'>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal
          onClose={() => {
            setIsOpenModal(!isOpenModal);
          }}>
          <CreateCabinForm
            onCloseModal={() => {
              setIsOpenModal(!isOpenModal);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
export default AddCabin;

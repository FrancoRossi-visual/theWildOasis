import Button from "../../ui/Button";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import { useState } from "react";
import Modal from "../../ui/Modal";

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button
//         onClick={() => setIsOpenModal(!isOpenModal)}
//         variation='primary'
//         size='medium'
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.open>

      <Modal.window name='cabin-form'>
        <CreateCabinForm />
      </Modal.window>

      {/* <Modal.open opens='table'>
        <Button>Show table</Button>
      </Modal.open>

      <Modal.window name='table'>
        <CreateCabinForm />
      </Modal.window> */}
    </Modal>
  );
}

export default AddCabin;

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useSingleBooking } from './useSingleBooking';
import { useCheckOut } from '../check-in-out/useCheckOut';

import BookingDataBox from './BookingDataBox';

import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteBooking from './useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useSingleBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

          {status === 'checked-in' && (
            <Button icon={<HiArrowUpOnSquare />} onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
              Check out
            </Button>
          )}

          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>

          <Button variation='secondary' onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name='delete'>
          <ConfirmDelete
            resourceName='booking'
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId, { onSettled: () => navigate(-1) });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;

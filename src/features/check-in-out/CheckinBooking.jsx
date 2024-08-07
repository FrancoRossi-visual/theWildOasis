import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBookings } from '../bookings/useBookings';
import { useSingleBooking } from '../bookings/useSingleBooking';
import Spinner from '../../ui/Spinner';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckIn';
import { useSettings } from '../settings/useSettings';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { deleteBooking } from '../../services/apiBookings';
import Menus from '../../ui/Menus';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useSingleBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            disabled={isCheckingIn}
            id='breakfast'>
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => {
            setConfirmPaid((confirm) => !confirm);
          }}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'>
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )})`}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

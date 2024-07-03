import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoadingStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingStays || isLoadingBookings || isLoadingCabins) return <Spinner />;

  // console.log(bookings);
  // console.log(stays);

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <div>Today&apos;s Activity</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

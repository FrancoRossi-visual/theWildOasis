import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1 number of bookings
  const numBookings = bookings.length;

  // 2 total sells
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3 total check ins
  const checkIns = confirmedStays.length;

  // 4 Occupancy rate
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns} />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}
export default Stats;

import { FC } from 'react';
import BoatItem from '../BoatItem/BoatItem';
import './BoatsBoard.scss';
import Boat from '@/models/Boat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface BoatsBoardProps {
  boats: Boat[];
}

const BoatsBoard: FC<BoatsBoardProps> = ({ boats }) => {
  const filterState = useSelector((state: RootState) => state.filters);

  const filteredBoats = boats?.filter((boat: Boat) => {
    if (
      filterState.searchedPhrase &&
      !(
        boat.name.toLowerCase().includes(filterState.searchedPhrase.toLowerCase()) ||
        boat.model?.toLowerCase().includes(filterState.searchedPhrase.toLowerCase())
      )
    ) {
      return false;
    }

    if (filterState.passengersNumber >= 2 && boat.passengers !== filterState.passengersNumber) {
      return false;
    }

    const priceFrom = filterState.priceFrom || 0;
    const priceTo = filterState.priceTo || Number.MAX_SAFE_INTEGER;

    if (boat.pricePerDay !== undefined) {
      const boatPrice = Number(boat.pricePerDay);
      if (boatPrice < priceFrom || boatPrice > priceTo) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="boats-board">
      {filteredBoats?.map((boat: Boat) => (
        <BoatItem key={boat.id} boat={boat} />
      ))}
    </div>
  );
};

export default BoatsBoard;

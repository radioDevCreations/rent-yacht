import { FC } from 'react';
import BoatItem from '../BoatItem/BoatItem';
import './BoatsBoard.scss';
import Boat from '@/models/Boat';

interface BoatsBoardProps {
  boats: Boat[];
}

const BoatsBoard: FC<BoatsBoardProps> = ({ boats }) => {
  return (
    <>
      <div className="boats-board">
        {boats.map((boat: Boat) => (
          <BoatItem key={boat.id} boat={boat} />
        ))}
      </div>
    </>
  );
};

export default BoatsBoard;

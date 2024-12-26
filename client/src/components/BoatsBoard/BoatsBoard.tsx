import { FC } from 'react';
import BoatItem from '../BoatItem/BoatItem';
import './BoatsBoard.scss';

export interface BoatDto {
  id: number;

  // Required fields
  name: string;
  model: string;
  type: string;
  pricePerDay: number;

  // Optional fields
  description?: string;
  harbourId: number;
  harbourName?: string;
}

interface BoatsBoardProps {
  boats: BoatDto[];
}

const BoatsBoard: FC<BoatsBoardProps> = ({ boats }) => {
  return (
    <>
      <div className="boats-board">
        {boats.map((boat: BoatDto) => (
          <BoatItem key={boat.id} boat={boat} />
        ))}
      </div>
    </>
  );
};

export default BoatsBoard;

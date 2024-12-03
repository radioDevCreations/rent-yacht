import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import ButtonType from '@/utilities/ButtonType';
import './BoatItem.scss';
import { BoatDto } from '../BoatsBoard/BoatsBoard';
import { FC } from 'react';
import BoatifyGoTo from '@/utilities/BoatifyGoTo';

interface BoatItemProps {
  boat: BoatDto;
}

const BoatItem: FC<BoatItemProps> = ({ boat }) => {
  return (
    <div className="boat-item">
      <div className="boat-item__picture"></div>
      <div className="boat-item__model">
        <p>{boat.model}</p>
      </div>
      <div className="boat-item__featured-details"></div>
      <div className="boat-item__button-section">
        <BoatifyButton
          value="Details"
          type={ButtonType.button}
          classModifier="boatify-button--boat-item"
          onClick={() => BoatifyGoTo(`/details/boat/${boat.id}`)}
        />
        <BoatifyButton
          value="Rent"
          type={ButtonType.button}
          classModifier="boatify-button--boat-item"
        />
      </div>
    </div>
  );
};

export default BoatItem;

import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import ButtonType from '@/utilities/ButtonType';
import './BoatItem.scss';
import { FC } from 'react';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Boat from '@/models/Boat';
import Image from 'next/image';
import Captions from '@/captions/captions';

interface BoatItemProps {
  boat: Boat;
}

const BoatItem: FC<BoatItemProps> = ({ boat }) => {
  return (
    <div className="boat-item">
      <div className="boat-item__picture">
        <Image
          src={`${boat.mainImageUrl}`}
          width={132}
          height={132}
          alt={`${boat.name} image`}
          unoptimized={process.env.NEXT_PUBLIC_UNOPTIMIZED === 'true'}
          priority 
          style={{
            borderRadius: "5px",
          }}
        />
      </div>
      <div className="boat-item__info">
        <span className="boat-item__info-tag">{boat.model}</span>
        <span className="boat-item__info-tag">{boat.pricePerDay} {Captions.PLN}</span>
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
          onClick={() => BoatifyGoTo(`/reservation/${boat.id}`)}
        />
      </div>
    </div>
  );
};

export default BoatItem;

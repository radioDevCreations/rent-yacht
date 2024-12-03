import Captions from '@/captions/captions';
import './Step1__ReservationBoat.scss';
import Image from 'next/image';

const Step1__ReservationBoat = (data: any) => {
  return (
    <div className="reservation-summary__boat-data boat-data">
      <Image
        src="https://iqboatlifts.com/wp-content/uploads/2018/06/Yacht-vs-Boat-Whats-the-Difference-Between-the-Two.jpg"
        alt="boat"
        className="featured-card__image"
        height={500}
        width={500}
      />
      <div className="boat-data__margin"></div>
      <h2 className="boat-data__item boat-data__model">{data.boat.model}</h2>
      <h3 className="boat-data__item boat-data__name">{data.boat.name}</h3>
      <p className="boat-data__item boat-data__type">
        {Captions.Type}
        {data.boat.type}
      </p>
      <p className="boat-data__item boat-data__description">
        {data.boat.description}
      </p>
    </div>
  );
};

export default Step1__ReservationBoat;

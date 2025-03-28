import Captions from '@/captions/captions';
import './Step1__ReservationBoat.scss';
import Image from 'next/image';

const Step1__ReservationBoat = (data: any) => {
  return (
    <div className="reservation-summary__boat-data boat-data">
      <div className="reservation-summary__image">
                {data.boat?.mainImageUrl && (
                <>
                  <Image
                    src={data.boat.mainImageUrl}
                    width={352}
                    height={352}
                    alt={`${data.boat.name} image`}
                    unoptimized={process.env.NEXT_PUBLIC_UNOPTIMIZED === 'true'}
                    priority 
                    style={{
                      borderRadius: "8px",
                    }}
                  />
                </>
                )}
              </div>
      <div className="boat-data__margin"></div>
      <h2 className="boat-data__item boat-data__model">{data.boat.model}</h2>
      <h3 className="boat-data__item boat-data__name">{data.boat.name}</h3>
      <p className="boat-data__item boat-data__type">
        {Captions.Type}
        {data.boat.type}
      </p>
      <p className="boat-data__item boat-data__type">
        {Captions.PricePerDay}
        {data.boat.pricePerDay} {Captions.PLN}
      </p>
      <p className="boat-data__item boat-data__description">
        {data.boat.description}
      </p>
    </div>
  );
};

export default Step1__ReservationBoat;

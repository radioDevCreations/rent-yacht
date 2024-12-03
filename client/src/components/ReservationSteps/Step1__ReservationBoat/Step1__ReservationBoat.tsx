import Captions from '@/captions/captions';
import './Step1__ReservationBoat.scss';
import Image from "next/image";

const Step1__ReservationBoat = () => {
    return ( <div className="reservation-summary__boat-data boat-data">
        <Image src="https://iqboatlifts.com/wp-content/uploads/2018/06/Yacht-vs-Boat-Whats-the-Difference-Between-the-Two.jpg"
                alt="boat"
                className="featured-card__image"
                height={500}
                width={500}/>
        <div className="boat-data__margin"></div>
        <h2 className="boat-data__item boat-data__model">
            Boat Model
        </h2>
        <h3 className="boat-data__item boat-data__name">
            Boat Name
        </h3>
        <p className="boat-data__item boat-data__type">
            {Captions.Type}Boat Type
        </p>
        <p className="boat-data__item boat-data__description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
    </div> );
}
 
export default Step1__ReservationBoat;
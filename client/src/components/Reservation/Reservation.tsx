'use client';
import './Reservation.scss';
import { useDispatch, useSelector } from 'react-redux';
import BoatifyStepper from '@/boatify-components/BoatifyStepper/BoatifyStepper';
import Pages, { Steps } from '../Pages/Pages';
import Step1__ReservationBoat from '../ReservationSteps/Step1__ReservationBoat/Step1__ReservationBoat';
import Step2__ReservationTime from '../ReservationSteps/Step2__ReservationTime/Step2__ReservationTime';
import Step3__ReservationSummary from '../ReservationSteps/Step3__ReservationSummary/Step3__ReservationSummary';
import Step4__ReservationPayment from '../ReservationSteps/Step4__ReservationPayment/Step4__ReservationPayment';
import { FC, useEffect, useState } from 'react';
import DataLoader from '@/dataLoaders/DataLoader';
import SortDirection from '@/utilities/SortDirection';
import Captions from '@/captions/captions';

interface ReservationProps {
  boatId: number | undefined;
}

const Reservation: FC<ReservationProps> = ({ boatId }) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const new_ReservationPage = useSelector(
    (state: any) => state.reservation.new_ReservationPage
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await DataLoader.selectBoatById(boatId);
        const data: any[] = response;
        setData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const steps = [
    Captions.Step1Label,
    Captions.Step2Label,
    Captions.Step3Label,
    Captions.Step4Label,
  ];

  const handleSubmit = () => {
    console.log('payment successful')
  }

  const stepsComponents: Steps = {
    step1: <Step1__ReservationBoat boat={data}></Step1__ReservationBoat>,
    step2: <Step2__ReservationTime boat={data}></Step2__ReservationTime>,
    step3: <Step3__ReservationSummary boat={data}></Step3__ReservationSummary>,
    step4: <Step4__ReservationPayment></Step4__ReservationPayment>,
  };
  return (
    <form className="reservation" onSubmit={handleSubmit}>
      <section className="reservation__board">
        <BoatifyStepper steps={steps} currentPosition={new_ReservationPage}>
          <Pages
            currentPosition={new_ReservationPage}
            steps={stepsComponents}
          />
        </BoatifyStepper>
      </section>
    </form>
  );
};

export default Reservation;

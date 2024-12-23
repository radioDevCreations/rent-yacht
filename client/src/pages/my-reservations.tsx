import './my-reservations.scss';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import MyReservations from '@/components/MyReservations/MyReservations';
import { useState, useEffect } from 'react';
import DataLoader from '@/dataLoaders/DataLoader';
import Reservation from '@/models/Reservation';
import { SystemBoolean } from '@/utilities/System';

//import { useDispatch, useSelector } from "react-redux";
//import { setMyReservations, getMyReservations } from "@/redux/slices/reservationSlice";

const MyOrdersPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const response = await DataLoader.selectUserReservations(2);
        const data: Reservation[] = await response;
        setReservations(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservations');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MainLayout onlyForLogged>
      <MyReservations reservations={reservations} />
    </MainLayout>
  );
};

export default MyOrdersPage;

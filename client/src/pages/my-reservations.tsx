import "./my-reservations.scss";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import MyReservations from "@/components/MyReservations/MyReservations";
import { useState, useEffect } from "react";
import DataLoader from "@/dataLoaders/DataLoader";
import Reservation from "@/models/Reservation";

//import { useDispatch, useSelector } from "react-redux";
//import { setMyReservations, getMyReservations } from "@/redux/slices/reservationSlice";

const MyOrdersPage = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReservations = async () => {
		  try {
			setLoading(true);
			setError(null);
			const response = await DataLoader.selectUserReservations(2);
			const data: Reservation[] = await response;
			setReservations(data);
		  } catch (err: any) {
			setError(err.message || "Failed to fetch reservations");
		  } finally {
			setLoading(false);
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
		<MainLayout>
			<MyReservations reservations={reservations} />
		</MainLayout>
	);
};

export default MyOrdersPage;

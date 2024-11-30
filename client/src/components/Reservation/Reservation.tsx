"use client";
import "./Reservation.scss";
import { useDispatch, useSelector } from "react-redux";
import BoatifyStepper from "@/boatify-components/BoatifyStepper/BoatifyStepper";
import Pages, { Steps } from "../Pages/Pages";
import Step1__ReservationBoat from "../ReservationSteps/Step1__ReservationBoat/Step1__ReservationBoat";
import Step2__ReservationTime from "../ReservationSteps/Step2__ReservationTime/Step2__ReservationTime";
import Step4__ReservationSummary from "../ReservationSteps/Step4__ReservationSummary/Step4__ReservationSummary";
import Step5__ReservationPayment from "../ReservationSteps/Step5__ReservationPayment/Step5__ReservationPayment";

const Reservation = () => {
	const dispatch = useDispatch();
	const registerState = useSelector((state: any) => state.forms.register);
	const orderPage = useSelector((state: any) => state.order.orderPage);
	
	const steps = ["Reservation Boat", "Reservation Time", "Order", "Summary", "Payment"];
	const stepsComponents: Steps = {
		step1: <Step1__ReservationBoat></Step1__ReservationBoat>,
		step2: <Step2__ReservationTime></Step2__ReservationTime>,
		step4: <Step4__ReservationSummary></Step4__ReservationSummary>,
		stepFinal: <Step5__ReservationPayment></Step5__ReservationPayment>
	};
	return (
		<form className="reservation">
			<section className="reservation__board">
				<BoatifyStepper steps={steps} currentPosition={orderPage}>
					<Pages currentPosition={orderPage} steps={stepsComponents} />
				</BoatifyStepper>
			</section>
		</form>
	);
};

export default Reservation;

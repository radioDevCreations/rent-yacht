import BoatifyButton from "@/boatify-components/BoatifyButton/BoatifyButton";
import "./MyReservations.scss";
import {FC} from "react";
import ButtonType from "@/utilities/ButtonType";
import BoatifyGoTo from "@/utilities/BoatifyGoTo";

const TABLE_BORDER_COLOR = "#122c78";

export interface ReservationDto {
  id: number;
  boatId: number;
  userId: number;
  totalPrice: number;
  reservationStatusId: number;
  startDate: string;
  endDate: string;
  reservationStatusName: string;
}

interface MyReservationsProps {
  reservations: ReservationDto[];
}

const MyReservations: FC<MyReservationsProps> = ({ reservations }) => {
  return (
    <section className="my-reservations">
        <header className="my-reservations__header">
            <h2 className="my-reservations__heading-text">Reservations</h2>
        </header>
      <table className="my-reservations__table">
        <thead>
          <tr>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>ID</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>Boat ID</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>User ID</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>Total Price</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>Reservation Status</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>Start Date</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>End Date</th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>{reservation.id}</td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>{reservation.boatId}</td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>{reservation.userId}</td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>${reservation.totalPrice.toFixed(2)}</td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>
                {reservation.reservationStatusName}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>
                {new Date(reservation.startDate).toLocaleDateString()}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>
                {new Date(reservation.endDate).toLocaleDateString()}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: "8px" }}>
              <BoatifyButton
					value="Details"
					type={ButtonType.button}
					classModifier="boatify-button--details"
                    onClick={() => BoatifyGoTo(`/details/reservation/${reservation.id}`)}
				/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MyReservations;
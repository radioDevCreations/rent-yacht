import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import './MyReservations.scss';
import { FC, useEffect } from 'react';
import ButtonType from '@/utilities/ButtonType';
import { BoatifyGoTo, BoatifyGoToInBlank } from '@/utilities/BoatifyGoTo';
import Reservation from '@/models/Reservation';

const TABLE_BORDER_COLOR = '#122c78';

interface MyReservationsProps {
  reservations: Reservation[];
}

const MyReservations: FC<MyReservationsProps> = ({ reservations }) => {
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('token');
    if (!jwtToken?.length) BoatifyGoTo('/');
  }, []);

  return (
    <section className="my-reservations">
      <header className="my-reservations__header">
        <h2 className="my-reservations__heading-text">Reservations</h2>
      </header>
      <table className="my-reservations__table">
        <thead>
          <tr>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              ID
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              Boat ID
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              User ID
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              Total Price
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              Reservation Status
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              Start Date
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              End Date
            </th>
            <th
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {reservation.id}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {reservation.boatId}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {reservation.userId}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                ${reservation.totalPrice.toFixed(2)}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {reservation.reservationStatusName}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {new Date(reservation.startDate).toLocaleDateString()}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {new Date(reservation.endDate).toLocaleDateString()}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                <BoatifyButton
                  value="Details"
                  type={ButtonType.button}
                  classModifier="boatify-button--details"
                  onClick={() =>
                    BoatifyGoToInBlank(`/details/reservation/${reservation.id}`)
                  }
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

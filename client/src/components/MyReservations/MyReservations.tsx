import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import './MyReservations.scss';
import { FC, useEffect, useState } from 'react';
import ButtonType from '@/utilities/ButtonType';
import { BoatifyGoToInBlank, BoatifyWindowReload } from '@/utilities/BoatifyGoTo';
import Reservation from '@/models/Reservation';
import DataLoader from '@/dataLoaders/DataLoader';
import { SystemBoolean } from '@/utilities/System';
import Captions from '@/captions/captions';
import ReservationStatus from '@/utilities/ReservationStatus';
import SelfReservation from '@/models/SelfReservation';

const TABLE_BORDER_COLOR = '#122c78';

const MyReservations: FC = () => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selfReservations, setSelfReservations] = useState<SelfReservation[]>([]);

  useEffect(() => {
    const fetchSelfReservations = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = await DataLoader.selectUserSelfReservations(token);
        const data: SelfReservation[] = await response;
        setSelfReservations(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservations');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };
    const fetchReservations = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = await DataLoader.selectUserReservations(token);
        const data: Reservation[] = await response;
        setReservations(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch reservations');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchSelfReservations();
    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
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
                {reservation.totalPrice.toFixed(2)} {Captions.PLN}
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
                {new Date(reservation.startDate).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}
              </td>
              <td
                style={{
                  border: `1px solid ${TABLE_BORDER_COLOR}`,
                  padding: '8px',
                }}
              >
                {new Date(reservation.endDate).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}
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
                  onClick={async () =>
                     BoatifyGoToInBlank(`/details/reservation/${reservation.id}`)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    <section className="my-self-reservations">
    <header className="my-self-reservations__header">
      <h2 className="my-self-reservations__heading-text">Self-reservations</h2>
    </header>
    <table className="my-self-reservations__table">
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
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {selfReservations.map((selfReservation) => (
          <tr key={selfReservation.id}>
            <td
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              {selfReservation.id}
            </td>
            <td
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              {selfReservation.boatId}
            </td>
            <td
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              {new Date(selfReservation.startDate).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}
            </td>
            <td
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              {new Date(selfReservation.endDate).toLocaleDateString("pl-PL", {day: "2-digit", month: '2-digit', year: 'numeric'})}
            </td>
            <td
              style={{
                border: `1px solid ${TABLE_BORDER_COLOR}`,
                padding: '8px',
              }}
            >
              <BoatifyButton
                value="Delete"
                type={ButtonType.button}
                classModifier="boatify-button--details"
                onClick={async () => {
                  const token = sessionStorage.getItem('token');
                  await DataLoader.deleteSelfReservation(token, selfReservation.id)
                  BoatifyWindowReload();
                }
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
  </>
  );
};

export default MyReservations;

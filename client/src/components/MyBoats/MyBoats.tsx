import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import './MyBoats.scss';
import { FC, useEffect, useState } from 'react';
import ButtonType from '@/utilities/ButtonType';
import { BoatifyGoTo, BoatifyGoToInBlank } from '@/utilities/BoatifyGoTo';
import Boat from '@/models/Boat';
import DataLoader from '@/dataLoaders/DataLoader';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { SystemBoolean } from '@/utilities/System';

const TABLE_BORDER_COLOR = '#122c78';

const MyBoats: FC = () => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [boats, setBoats] = useState<Boat[]>([]);
  
  let applicationState = useSelector((state: RootState) => state.application);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = token && await DataLoader.selectUserBoats(token);
        const data: Boat[] = await response;
        setBoats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch boats');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchBoats();
  }, []);
  
  if (loading) {
    return <div>Loading boats...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="my-boats">
      <header className="my-boats__header">
        <h2 className="my-boats__heading-text">My Boats</h2>
      </header>
      <table className="my-boats__table">
        <thead>
          <tr>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              ID
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Name
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Description
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Model
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Type
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Price Per Day
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Harbour Name
            </th>
            <th style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {boats.map((boat) => (
            <tr key={boat.id}>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.id}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.name}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.description}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.model}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.type}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                ${boat.pricePerDay.toFixed(2)}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                {boat.harbourName || 'N/A'}
              </td>
              <td style={{ border: `1px solid ${TABLE_BORDER_COLOR}`, padding: '8px' }}>
                <BoatifyButton
                  value="Details"
                  type={ButtonType.button}
                  classModifier="boatify-button--details"
                  onClick={() => BoatifyGoToInBlank(`/details/boat/${boat.id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MyBoats;

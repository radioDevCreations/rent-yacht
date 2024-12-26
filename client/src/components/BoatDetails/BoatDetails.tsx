import { useEffect, useState } from 'react';
import './BoatDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import User from '@/models/User';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import Boat from '@/models/Boat';

interface BoatDetailsProps{
    boatId: string;
}

const BoatDetails: React.FC<BoatDetailsProps> = ({ boatId }) => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [boat, setBoat] = useState<Boat | null>(null);

  const [editableUser, setEditableUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const response = await DataLoader.selectBoatById(Number(boatId));
        const data: Boat = await response;
        console.log(data)
        setBoat(data);
        setEditableUser(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch boat data');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="boat-details">
      <button className="boat-details__return" onClick={() => BoatifyGoTo(`/boats`)}>
        <FaRegArrowAltCircleLeft />
      </button>

      <div className="boat-details__name">
        <h2 className="boat-details__name-field-text">
            {boat?.name}
        </h2>

        {/* {isEditing ? (
          <button className="boat-details__edit" onClick={saveChanges}>
            <GiConfirmed />
          </button>
        ) : (
          <button className="boat-details__edit" onClick={() => setIsEditing(SystemBoolean.True)}>
            <FaEdit />
          </button>
        )} */}
      </div>
      <div className="boat-details__field">
        <span className="boat-details__field-name">{Captions.BOAT_DESCRIPTION}</span>
        <span className="boat-details__field-text">{boat?.description}</span>
      </div>
      <div className="boat-details__field">
        <span className="boat-details__field-name">{Captions.BOAT_MODEL}</span>
        <span className="boat-details__field-text">{boat?.model}</span>
      </div>
      <div className="boat-details__field">
        <span className="boat-details__field-name">{Captions.BOAT_TYPE}</span>
        <span className="boat-details__field-text">{boat?.type}</span>
      </div>
      <div className="boat-details__field">
        <span className="boat-details__field-name">{Captions.BOAT_PRICE_PER_DAY}</span>
        <span className="boat-details__field-text">{boat?.pricePerDay} {Captions.PLN}</span>
      </div>
      <div className="boat-details__field">
        <span className="boat-details__field-name">{Captions.BOAT_CURRENT_LOCATION}</span>
        <span className="boat-details__field-text">{boat?.harbourName}</span>
      </div>
    </div>
  );
};

export default BoatDetails;

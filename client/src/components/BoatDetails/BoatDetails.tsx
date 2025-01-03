import { useEffect, useState } from 'react';
import './BoatDetails.scss';
import { SystemBoolean } from '@/utilities/System';
import DataLoader from '@/dataLoaders/DataLoader';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import Captions from '@/captions/captions';
import Boat from '@/models/Boat';
import Harbour from '@/models/Harbour';
import Image from 'next/image';
import ButtonType from '@/utilities/ButtonType';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import User from '@/models/User';
import Role from '@/utilities/Role';

interface BoatDetailsProps{
    boatId: string;
}

const BoatDetails: React.FC<BoatDetailsProps> = ({ boatId }) => {
  const [loading, setLoading] = useState<boolean>(SystemBoolean.True);
  const [error, setError] = useState<string | null>(null);
  const [boat, setBoat] = useState<Boat | null>(null);
  const [harbour, setHarbour] = useState<Harbour | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
  
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const token = sessionStorage.getItem('token');
        const response = await DataLoader.getCurrentUserData(token);
        const data: User = await response;
        setCurrentUserRole(data.role as Role);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user role.');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    const fetchUser = async () => {
      try {
        setLoading(SystemBoolean.True);
        setError(null);
        const responseBoat = await DataLoader.selectBoatById(Number(boatId)); 
        const responseHarbour = await DataLoader.selectHarbour(responseBoat.harbourId); 
        setBoat(responseBoat);
        setHarbour(responseHarbour);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch boat data');
      } finally {
        setLoading(SystemBoolean.False);
      }
    };

    fetchCurrentUserRole();
    fetchUser();
  }, [boatId]);

  if (loading) {
    return <div>Loading boat...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="boat-details">
        <button className="boat-details__return" onClick={() => BoatifyGoTo(`/boats`)}>
            <FaRegArrowAltCircleLeft />
        </button>
        <div className="boat-details__info">
            <div className="boat-details__name">
                <h2 className="boat-details__name-field-text">
                    {boat?.name}
                </h2>
            </div>
            <div className="boat-details__field">
                <span className="boat-details__field-descrition">{Captions.BOAT_DESCRIPTION}</span>
                <span className="boat-details__field-descrition-text">{boat?.description}</span>
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
                <span className="boat-details__field-name">{Captions.BOAT_PASSENGERS_NUMBER}</span>
                <span className="boat-details__field-text">{boat?.passengers}</span>
            </div>
            <div className="boat-details__field">
                <span className="boat-details__field-name">{Captions.BOAT_CURRENT_LOCATION}</span>
                <span className="boat-details__field-text">{harbour?.name}</span>
            </div>
            <div className="boat-details__buttons">
                {currentUserRole === Role.Client &&<BoatifyButton
                    value="Rent this boat"
                    type={ButtonType.button}
                    onClick={() => {
                      if(!!token) BoatifyGoTo(`/reservation/${boatId}`);
                      else BoatifyGoTo(`/login`);
                    }}
                    classModifier='boatify-button__boat-details'
                    isLongButton
                />}
                {currentUserRole === Role.Shipowner && <BoatifyButton
                    value="Self reserve"
                    type={ButtonType.button}
                    onClick={() => {
                      if(!!token) BoatifyGoTo(`/reservation/self/${boatId}`);
                      else BoatifyGoTo(`/login`);
                    }}
                    classModifier='boatify-button__boat-details'
                    isLongButton
                />}
            </div>
        </div>
        <div className="boat-details__image">
            {boat?.mainImageUrl && (
            <>
              <Image
                src={boat.mainImageUrl}
                width={352}
                height={352}
                alt={`${boat.name} image`}
                unoptimized={process.env.NEXT_PUBLIC_UNOPTIMIZED === 'true'}
                priority 
                style={{
                  borderRadius: "8px",
                }}
              />
            </>
            )}
        </div>
    </div>
  );
};

export default BoatDetails;

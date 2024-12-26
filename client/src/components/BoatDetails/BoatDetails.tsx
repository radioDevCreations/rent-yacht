import './BoatDetails.scss';

interface BoatDetailsProps{
    boatId: string;
}

const BoatDetails: React.FC<BoatDetailsProps> = ({ boatId }) => {
  return (
    <p>boatId: {boatId}</p>
  );
};

export default BoatDetails;

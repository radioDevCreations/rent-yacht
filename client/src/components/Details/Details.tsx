import Children from '@/utilities/Children';
import './Details.scss';

interface DetailsProps extends Children {}

const Details: React.FC<DetailsProps> = ({ children }) => {
  return (
    <section className="details">
      <div className="details__board">{children}</div>
    </section>
  );
};

export default Details;

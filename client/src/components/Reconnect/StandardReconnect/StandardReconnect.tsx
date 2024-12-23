import { useEffect } from 'react';
import './StandardReconnect.scss';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';

const StandardReconnect: React.FC = () => {
    useEffect(() => {
      BoatifyGoTo('/');
    }, []);
  
  
  return (
    <div className="standard-reconnect">
     
    </div>
  );
};

export default StandardReconnect;

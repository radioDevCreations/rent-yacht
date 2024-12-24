import { useEffect } from 'react';
import './LogoutReconnect.scss';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const LogoutReconnect: React.FC = () => {
    useEffect(() => {
      sessionStorage.removeItem("token");
      BoatifyGoTo('/');
    }, []);
  
  
  return (
    <LoadingSpinner />
  );
};

export default LogoutReconnect;

import { useEffect } from 'react';
import './FailedReconnect.scss';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import Captions from '@/captions/captions';
import ButtonType from '@/utilities/ButtonType';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import BoatifyFailed from '@/boatify-components/BoatifyFailed/BoatifyFailed';

interface FailedReconnectProps {
  message: string;
  url?: string;
  buttonMessage?: string;
}

const FailedReconnect: React.FC<FailedReconnectProps> = ({message, url, buttonMessage}: FailedReconnectProps) => {
  const handleClick = () => {
    BoatifyGoTo(url ? url : '/');
  }
  
  
  return (
    <div className="failed-reconnect">
      <div className="failed-reconnect__icon">
        <BoatifyFailed />
      </div>
      <div className="failed-reconnect__message">
        <span className="message">
        {message}
        </span>
      </div>
     <BoatifyButton
            value={buttonMessage ? buttonMessage : Captions.Next}
            type={ButtonType.button}
            classModifier="boatify-button--stepper-prev"
            onClick={handleClick}
          />
    </div>
  );
};

export default FailedReconnect;

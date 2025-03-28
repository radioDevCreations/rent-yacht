import { useEffect } from 'react';
import './SuccessReconnect.scss';
import { BoatifyGoTo } from '@/utilities/BoatifyGoTo';
import BoatifyButton from '@/boatify-components/BoatifyButton/BoatifyButton';
import ButtonType from '@/utilities/ButtonType';
import Captions from '@/captions/captions';
import BoatifySuccess from '@/boatify-components/BoatifySuccess/BoatifySuccess';

interface SuccessReconnectProps {
  message: string;
  url?: string;
  buttonMessage?: string;
}

const SuccessReconnect: React.FC<SuccessReconnectProps> = ({
  message,
  url,
  buttonMessage,
}: SuccessReconnectProps) => {
  const handleClick = () => {
    BoatifyGoTo(url ? url : '/');
  };

  return (
    <div className="success-reconnect">
      <div className="success-reconnect__icon">
        <BoatifySuccess />
      </div>
      <div className="success-reconnect__message">
        <span className="message">{message}</span>
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

export default SuccessReconnect;

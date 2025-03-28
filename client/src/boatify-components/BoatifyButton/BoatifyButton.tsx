import './BoatifyButton.scss';
import ButtonType from '@/utilities/ButtonType';
import BoatifyButtonVariant from './BoatifyButtonVariant';
import { SystemBoolean } from '@/utilities/System';

interface BoatifyButtonProps {
  value: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
  disabled?: boolean;
  classModifier?: string;
  variant?: BoatifyButtonVariant;
  isLongButton?: boolean;
}

const BoatifyButton = ({
  value,
  onClick,
  type = ButtonType.submit,
  disabled,
  classModifier,
  variant,
  isLongButton = SystemBoolean.False,
}: BoatifyButtonProps) => {
  let variantClass = '';
  switch (variant) {
    case BoatifyButtonVariant.orangeSTD:
      variantClass = 'boatify-button--orange';
  }

  return (
    <button
      type={type}
      className={`boatify-button ${classModifier ? classModifier : ''} 
			${variantClass ? variantClass : ''} ${isLongButton ? 'boatify-button--long' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default BoatifyButton;

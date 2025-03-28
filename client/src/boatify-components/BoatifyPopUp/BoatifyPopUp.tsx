import React from "react";
import "./BoatifyPopUp.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BoatifyWindowReload } from "@/utilities/BoatifyGoTo";
import ButtonType from "@/utilities/ButtonType";
import BoatifyButton from "../BoatifyButton/BoatifyButton";
import { IBoatifyPopupCommand } from "./Commands/IBoatifyPopupCommand";

interface BoatifyPopUpProps {
  message: string;
  confirmCommand: IBoatifyPopupCommand;
  cancelCommand: IBoatifyPopupCommand;
  isOpen: boolean;
}

const BoatifyPopUp: React.FC<BoatifyPopUpProps> = ({
  message,
  confirmCommand,
  cancelCommand,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="boatify-popup-overlay" onClick={() => cancelCommand.execute()}>
      <div
        className="boatify-popup-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          className="reservation-details__navigation-switch"
          onClick={() => BoatifyWindowReload()}
        >
          <IoMdCloseCircleOutline />
        </button>
        <p className="boatify-popup-message">{message}</p>
        <div className="boatify-popup-actions">
          <BoatifyButton value="Confirm" type={ButtonType.button} onClick={() => confirmCommand.execute()} />
          <BoatifyButton value="Cancel" type={ButtonType.button} onClick={() => cancelCommand.execute()} />
        </div>
      </div>
    </div>
  );
};

export default BoatifyPopUp;

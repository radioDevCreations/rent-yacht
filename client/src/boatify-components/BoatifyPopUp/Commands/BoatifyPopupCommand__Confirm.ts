import { IBoatifyPopupCommand } from "./IBoatifyPopupCommand";

export class BoatifyPopupCommand__Confirm implements IBoatifyPopupCommand {
  private action: () => void;

  constructor(action: () => void) {
    this.action = action;
  }

  execute() {
    this.action();
  }
}
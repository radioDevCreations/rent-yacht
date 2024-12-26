export default interface Reservation {
  id: number;
  boatId: number;
  userId: number;
  totalPrice: number;
  reservationStatusId: number;
  startDate: string;
  endDate: string;
  reservationStatusName: string;
}

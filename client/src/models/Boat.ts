export default interface Boat {
  id: number;
  name: string;
  description: string;
  model: string;
  type: string;
  pricePerDay: number;
  harbourId: number;
  harbourName?: string | null;
}

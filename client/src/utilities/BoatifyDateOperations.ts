abstract class BoatifyDateOperations {
  static getMonthAbbreviationFromISOString = (isoString: string): string => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid ISO string format');
    }
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[date.getMonth()];
  };
  static getDayFromISOString = (isoString: string): number => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid ISO string format');
    }
    return date.getDate();
  };
}

export default BoatifyDateOperations;

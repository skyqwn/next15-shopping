export default function betweenWeeks(
  dateToCheck: Date,
  betweenDate1: number,
  betweenDate2: number,
) {
  const dateObj =
    typeof dateToCheck === "string" ? new Date(dateToCheck) : dateToCheck;

  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", dateToCheck);
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate1 = new Date(today);
  const targetDate2 = new Date(today);

  targetDate1.setDate(targetDate1.getDate() - betweenDate1);
  targetDate2.setDate(targetDate2.getDate() - betweenDate2);

  return dateObj >= targetDate1 && dateObj <= targetDate2;
}

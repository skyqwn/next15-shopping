export default function checkDate(dateToCheck: string | Date, daysAgo: number) {
  const dateObj =
    typeof dateToCheck === "string" ? new Date(dateToCheck) : dateToCheck;

  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", dateToCheck);
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(today);
  targetDate.setDate(targetDate.getDate() - daysAgo);

  return (
    dateObj.getDate() === targetDate.getDate() &&
    dateObj.getMonth() === targetDate.getMonth() &&
    dateObj.getFullYear() === targetDate.getFullYear()
  );
}

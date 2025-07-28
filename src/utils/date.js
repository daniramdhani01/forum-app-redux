export function calculateDate(date){
  const today = new Date();
  const oldDate = new Date(date);
  const millisecondsDiff = today - oldDate;
  const SecoundsDiff = Math.floor(millisecondsDiff / 1000);
  const MinutesDiff = Math.floor(SecoundsDiff / 60);
  const HoursDiff = Math.floor(MinutesDiff / 60);
  const DaysDiff = Math.floor(HoursDiff / 60);

  if (DaysDiff > 0) return `${DaysDiff} hari lalu`;
  if (HoursDiff > 0) return `${HoursDiff} jam lalu`;
  if (MinutesDiff > 0) return `${MinutesDiff} menit lalu`;

  return 'Baru saja';
}
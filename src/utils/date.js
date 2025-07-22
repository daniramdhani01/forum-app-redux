export function calculateDate(date){
  const today = new Date();
  const oldDate = new Date(date);
  const marginMs = today - oldDate;
  const marginDay = Math.floor(marginMs / (1000 * 60 * 60 * 24));
  return marginDay;
}
import dayjs from 'dayjs';
function longDateHelper(date: any): string {
  const formattedDate = dayjs(date).format('MMMM,DD YYYY');

  return formattedDate;
}
export default longDateHelper;

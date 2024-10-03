import moment from 'moment';

const formatDate = (dateString) => {
  moment.locale('fr'); // Set locale to French for month names
  return moment.utc(dateString).format('D MMMM YYYY [at] HH:mm:ss');
};
const getCurrentDate = () => {
  return moment().utc(1);
}

export { 
  formatDate,
  getCurrentDate
};
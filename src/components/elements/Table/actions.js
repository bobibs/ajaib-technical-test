import moment from 'moment';
import { capitalizeFirstLetter, textTruncate } from '../../../utils/format';

export const convertData = (data) => {
  return data.map((i) => [
    {
      text: textTruncate(i.username, 20),
      key: 'username',
    },
    { text: textTruncate(i.name, 20), key: 'name' },
    { text: textTruncate(i.email, 20), key: 'email' },
    { text: capitalizeFirstLetter(i.gender), key: 'gender' },
    {
      text: moment(i.registeredDate).format('DD/MM/YYYY'),
      key: 'registeredDate',
    },
  ]);
};

export const sortAsc = (key) => (a, b) => a[key] > b[key] ? 1 : -1;

export const sortDesc = (key) => (a, b) => a[key] < b[key] ? 1 : -1;

export const sortData = (data, sortBy, sortFormat) => {
  const filterData = data.results.map((i) => ({
    username: `${i.name.title.toLowerCase()}${i.name.first.toLowerCase()}`,
    name: `${i.name.first} ${i.name.last}`,
    email: i.email,
    gender: i.gender,
    registeredDate: i.registered.date,
  }));

  if (sortFormat === 'asc') {
    return filterData.sort(sortAsc(sortBy));
  } else if (sortFormat === 'desc') {
    return filterData.sort(sortDesc(sortBy));
  } else {
    return filterData;
  }
};

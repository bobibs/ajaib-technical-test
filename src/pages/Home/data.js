import moment from 'moment';
import { capitalizeFirstLetter, textTruncate } from '../../utils/format';

export const filterGenderList = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export const convertData = (data) => {
  return data.results.map((i) => [
    {
      text: textTruncate(
        `${i.name.title.toLowerCase()}${i.name.first.toLowerCase()}`,
        20,
      ),
      key: 'username',
    },
    { text: textTruncate(`${i.name.first} ${i.name.last}`, 20), key: 'name' },
    { text: textTruncate(i.email, 20), key: 'email' },
    { text: capitalizeFirstLetter(i.gender), key: 'gender' },
    {
      text: moment(i.registered.date).format('DD/MM/YYYY'),
      key: 'registeredDate',
    },
  ]);
};

export const listTableHead = [
  {
    title: 'Username',
    key: 'username',
  },
  {
    title: 'Name',
    key: 'name',
    ascDesc: true,
    handleAsc: () => console.log('asc'),
    handleDesc: () => console.log('desc'),
  },
  {
    title: 'Email',
    key: 'email',
    ascDesc: true,
    handleAsc: () => console.log('asc'),
    handleDesc: () => console.log('desc'),
  },
  {
    title: 'Gender',
    key: 'gender',
    ascDesc: true,
    handleAsc: () => console.log('asc'),
    handleDesc: () => console.log('desc'),
  },
  {
    title: 'Registered Date',
    key: 'registeredDate',
    ascDesc: true,
    handleAsc: () => console.log('asc'),
    handleDesc: () => console.log('desc'),
  },
];

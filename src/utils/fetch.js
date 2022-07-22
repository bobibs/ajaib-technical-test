import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api';

const BEARER_AUTH = {
  Accept: 'application/json',
};

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getUsers = async (value) =>
  fetch(
    `${BASE_URL}/?page=${value.page}&results=10&gender=${value.gender}&nat=us`,
    'get',
    {
      headers: BEARER_AUTH,
    },
  );

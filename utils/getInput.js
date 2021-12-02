import axios from 'axios';

// get input data from advent of code using auth session cookie
export const getInput = async (url, cookie) => {
  const req = axios.get(url, {
    headers: {
      Cookie: `session=${cookie}`,
    },
  });

  const res = await req;
  return res.data;
};

export const tidyInput = (input) => {
  const tidiedInput = input.filter((x) => !Number.isNaN(+x));
  return tidiedInput;
};

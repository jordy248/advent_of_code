import axios from 'axios';
import 'dotenv/config';

// get AOC cookie from .env
let { AOC_COOKIE } = process.env;
// make sure cookie does not contain 'session='
AOC_COOKIE = AOC_COOKIE.replace(/session=/i, '');

// get input data from advent of code
export const getInput = async (url) => {
  const req = axios.get(url, {
    headers: {
      Cookie: `session=${AOC_COOKIE}`,
    },
  });

  const res = await req;
  return res.data;
};

export const tidyInput = (input) => {
  const tidiedInput = input.filter((x) => !Number.isNaN(+x));
  return tidiedInput;
};

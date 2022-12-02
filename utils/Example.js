import axios from 'axios';
import { JSDOM } from 'jsdom';

// get input data from advent of code using auth session cookie
export const getExample = async (url, cookie, selector) => {
  const req = axios.get(url, {
    headers: {
      Cookie: `session=${cookie}`,
    },
  });

  const res = await req;

  // convert res.data into dom element that can be queried
  const dom = new JSDOM(res.data);
  const exampleData = dom.window.document.querySelector(selector).textContent;

  return exampleData;
};

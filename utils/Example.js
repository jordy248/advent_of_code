import axios from 'axios';
import { JSDOM } from 'jsdom';

// get input data from advent of code using auth session cookie
export const getExampleInput = async (url, cookie, selector) => {
  const req = axios.get(url, {
    headers: {
      Cookie: cookie.indexOf('session=') === -1 ? `session=${cookie}` : cookie,
    },
  });

  const res = await req;

  // convert res.data into dom element that can be queried
  const dom = new JSDOM(res.data);
  const exampleData = dom.window.document.querySelector(selector).textContent;

  return exampleData;
};

// get example answer
export const getExampleAnswer = async (url, cookie, part) => {
  const req = axios.get(url, {
    headers: {
      Cookie: cookie.indexOf('session=') === -1 ? `session=${cookie}` : cookie,
    },
  });

  const res = await req;

  // convert res.data into dom element that can be queried
  const dom = new JSDOM(res.data);

  // get part's last em > code or code > em containing a number
  const boldCodeEls = dom.window.document.querySelectorAll(
    `
      main > article:nth-of-type(${part}) > p > em:last-of-type > code,
      main > article:nth-of-type(${part}) > p > code:last-of-type > em
    `
  );

  if (boldCodeEls.length === 0) return null;

  // get last bold code el containing number
  const numberEls = Array.from(boldCodeEls).filter((el) => {
    const elText = el.textContent;
    return /\d+/.test(elText);
  });

  // get last number el
  const numberEl = numberEls[numberEls.length - 1];

  return numberEl.textContent;
};

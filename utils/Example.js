import axios from 'axios';
import { JSDOM } from 'jsdom';

// get input data from advent of code using auth session cookie

// >>> [ function to get example input by selector ] >>>
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
// <<< [ function to get example input by selector ] <<<

// >>> [ function to try automatically getting example answer ] >>>
export const getExampleAnswer = async (url, cookie, part, type = 'number') => {
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

  // get last bold code el containing number or text
  let answer;
  if (type.toLowerCase() === 'number') {
    const answerEls = Array.from(boldCodeEls).filter((el) => {
      const elText = el.textContent;
      return /\d+/.test(elText);
    });

    // get last number el
    const answerEl = answerEls[answerEls.length - 1];
    answer = +answerEl.textContent;
  } else {
    const answerEls = Array.from(boldCodeEls).filter((el) => {
      const elText = el.textContent;
      return /\w+/.test(elText);
    });

    // get last number el
    const answerEl = answerEls[answerEls.length - 1];
    answer = answerEl.textContent;
  }

  return answer;
};
// <<< [ function to try automatically getting example answer ] <<<

// >>> [ function to get example answer by selector ] >>>
export const getExampleAnswerBySelector = async (
  url,
  cookie,
  selector,
  type = 'number'
) => {
  const req = axios.get(url, {
    headers: {
      Cookie: cookie.indexOf('session=') === -1 ? `session=${cookie}` : cookie,
    },
  });

  const res = await req;

  // convert res.data into dom element that can be queried
  const dom = new JSDOM(res.data);
  const exampleAnswer = dom.window.document.querySelector(selector).textContent;

  if (type.toLowerCase() === 'number') return +exampleAnswer;

  return exampleAnswer;
};
// <<< [ function to get example answer by selector ] <<<

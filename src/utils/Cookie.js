import 'dotenv/config';

// get AOC cookie from .env
const { AOC_COOKIE } = process.env;
// make sure cookie does not contain 'session='
export const cookie = AOC_COOKIE.replace(/session=/i, '');

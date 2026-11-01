import { promisify } from 'node:util';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password, passwordHash) {
  if (typeof passwordHash !== 'string') return false;
  const [salt, storedHash] = passwordHash.split(':');
  if (!salt || !storedHash || !/^[a-f\d]{128}$/i.test(storedHash)) return false;

  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  const expected = Buffer.from(storedHash, 'hex');
  return timingSafeEqual(derivedKey, expected);
}

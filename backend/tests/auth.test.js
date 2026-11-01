import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from '../services/authService.js';

describe('account password hashing', () => {
  test('verifies passwords without storing the original password', async () => {
    const password = 'correct-horse-battery';
    const passwordHash = await hashPassword(password);

    assert.notEqual(passwordHash, password);
    assert.equal(await verifyPassword(password, passwordHash), true);
    assert.equal(await verifyPassword('incorrect-password', passwordHash), false);
  });

  test('rejects malformed hashes', async () => {
    assert.equal(await verifyPassword('password', 'not-a-hash'), false);
  });
});

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildEmailIndex, collectUniqueUsers } = require('../src/userCatalog.js');

test('buildEmailIndex lowers and normalizes every email once', () => {
  const users = [
    { email: 'Alice@example.com' },
    { email: 'alice@example.com' },
    { email: '  bob@example.com ' },
  ];

  assert.deepEqual([...buildEmailIndex(users)], [
    'alice@example.com',
    'bob@example.com',
  ]);
});

test('keeps only unique users and ignores excluded emails', () => {
  const users = [
    { email: 'ALICE@example.com', name: 'Alice' },
    { email: 'alice@example.com', name: 'Alice duplicate' },
    { email: 'bob@example.com', name: 'Bob' },
    { email: 'carol@example.com', name: 'Carol' },
    { email: 'dave@example.com', name: 'Dave' },
    { email: 'dave@example.com', name: 'Dave duplicate' },
  ];

  const excludedUsers = [
    { email: 'bob@example.com' },
    { email: 'carol@example.com' },
  ];

  assert.deepEqual(collectUniqueUsers(users, excludedUsers), [
    { email: 'ALICE@example.com', name: 'Alice' },
    { email: 'dave@example.com', name: 'Dave' },
  ]);
});

test('returns an empty list when every user is excluded or duplicated', () => {
  const users = [
    { email: 'one@example.com', name: 'One' },
    { email: 'one@example.com', name: 'One duplicate' },
    { email: 'two@example.com', name: 'Two' },
  ];

  const excludedUsers = [
    { email: 'one@example.com' },
    { email: 'two@example.com' },
  ];

  assert.deepEqual(collectUniqueUsers(users, excludedUsers), []);
});

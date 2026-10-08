function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function collectUniqueUsers(users, excludedUsers = []) {
  const excludedEmails = new Set(
    excludedUsers.map(user => normalizeEmail(user && user.email))
  );

  const seen = new Set();
  const result = [];

  for (const user of users) {
    const email = normalizeEmail(user && user.email);

    if (!email || seen.has(email) || excludedEmails.has(email)) {
      continue;
    }

    seen.add(email);
    result.push(user);
  }

  return result;
}

module.exports = { collectUniqueUsers, normalizeEmail };

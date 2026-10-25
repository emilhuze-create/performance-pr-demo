function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

function buildEmailIndex(users) {
  const emailIndex = new Set();

  for (const user of users) {
    const email = normalizeEmail(user && user.email);
    if (email) {
      emailIndex.add(email);
    }
  }

  return emailIndex;
}

function collectUniqueUsers(users, excludedUsers = []) {
  const excludedEmails = buildEmailIndex(excludedUsers);
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

module.exports = { buildEmailIndex, collectUniqueUsers, normalizeEmail };

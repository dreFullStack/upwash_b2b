const { db } = require('../../utils/db');

function createNewSupportRequest(title, message, userId) {
  return db.supportRequest.create({
    data: {
      title,
      message,
      userId
    }
  });
}

module.exports = { createNewSupportRequest };

const { createUser } = require('../../utils/createUser');

async function main() {
  await createUser('test1@123.com', '123456');
  await createUser('test2@123.com', '123456');
  await createUser('test3@123.com', '123456');
}

module.exports = {
  main,
};

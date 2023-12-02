const getISOTime = (offset = 0) => {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  const localISOTime = (new Date(Date.now() - tzoffset + offset)).toISOString().slice(0, -1);

  return localISOTime;
};

module.exports = getISOTime;

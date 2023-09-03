// Define message.
const msgs = {
  // replace: {0}: Specified/Starting/Ending, {1}: greater/less, {2}: 0/1/maxInt
  errNumericRange: '{0} number must be {1} than or equal to {2}.',
};

// Get messages.
const getMsg = (key, repArr = null) => {
  const msg = msgs[key];
  return repArr ? msg.replace(/{(\d+)}/g, (match, i) => {
    return repArr[i] !== undefined ? repArr[i] : match;
  }) : msg;
};

module.exports = { getMsg };

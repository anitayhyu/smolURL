function isValidHttpUrl(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "([\\da-z.-]+)\\." +
      "([a-z.]{2,6})(\\:[0-9]{1,5})?" +
      "(\\/([\\w#!:.?+=&%@!\\-\\/])*)?" +
      "(\\?[\\w#!:.?+=&%@!\\-\\/]+)?" +
      "(\\#([\\w#!:.?+=&%@\\-\\/])*)?",
    "i"
  );
  return pattern.test(str);
}

module.exports = { isValidHttpUrl };

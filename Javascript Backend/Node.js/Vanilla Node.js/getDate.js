module.exports.getDate = function getDate() {
  let aestTime = new Date().toLocaleString("en-US", {
    timeZone: "Australia/Brisbane",
  });
  return aestTime;
};
// module.exports associated with Node.js and CommonJs module system vs. ES (ECMA ‘Ek-ma’ script) module syntax (which is associated with import / expor

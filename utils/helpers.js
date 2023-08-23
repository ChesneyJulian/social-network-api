// helper function to format date
function formatDate (date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`
};

module.exports = { formatDate }
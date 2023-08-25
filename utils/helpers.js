// helper function to format date
function formatDate (date) {
  const formatted = date.toLocaleDateString('en-us');
  return formatted;
};

module.exports = { formatDate }
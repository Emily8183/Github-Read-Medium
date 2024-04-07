const axios = require("axios");
const mediumURL ="https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";

async function getArticlesByUsername(username) {
  try {
    const result = await axios.get(mediumURL + username);
    const filteredResult = result.data.items.filter(
      (item) =>
        item.categories.length > 0
    );
    return filteredResult;
  } catch (error) {
    console.error(error);
    return error;
  }
};

exports.getUserData = getArticlesByUsername;
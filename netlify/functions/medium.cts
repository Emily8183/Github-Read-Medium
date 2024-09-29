// import { firsttest } from "../../test";
// const { parseToMediumCard } = require("../../controller/medium_controller");
const mediumURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";

export default async (request, context) => {
  try {
    const apiresponse = await fetch(mediumURL + "emily.zy.lin");

    // Check if the response is OK (status code 200-299)
    if (!apiresponse.ok) {
      throw new Error(`HTTP error! status: ${apiresponse.status}`);
    }

    const result = await apiresponse.json(); // Convert the response to JSON
    const filteredResult = result.items.filter(
      (item) => item.categories.length > 0
    );

    let res = new Response(JSON.stringify(filteredResult));
    res.headers.append("Content-Type", "image/svg+xml");
    return res;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(error);
  }

  // response.setHeader(
  //   "Cache-Control",
  //   "public, no-cache, no-store, must-revalidate"
  // );
  // response.setHeader("Expires", "-1");
  // response.setHeader("Pragma", "no-cache");
};

export const config = {
  path: "/medium",
};

// import { firsttest } from "../../test";
// const { parseToMediumCard } = require("../../controller/medium_controller");
const mediumURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";

export default async (request, context) => {
  try {
    const response = await fetch(mediumURL + "emily.zy.lin");

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // Convert the response to JSON
    const filteredResult = result.items.filter(
      (item) => item.categories.length > 0
    );

    return new Response(JSON.stringify(filteredResult));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(error);
  }

  // if (!request.query.username) {
  // if (!request.query) {
  // response.write(
  //   JSON.stringify({
  //     error: "username is required",
  //   })
  // );
  // response.end();
  // return new Response("no username");
  // return;

  // const result = await parseToMediumCard(request);

  // response.setHeader(
  //   "Cache-Control",
  //   "public, no-cache, no-store, must-revalidate"
  // );
  // response.setHeader("Expires", "-1");
  // response.setHeader("Pragma", "no-cache");
  // response.writeHead(200, { "Content-Type": "image/svg+xml" });

  // response.write(result);
  // response.end();

  // }
  // catch (error) {
  //   console.log(error);
  //   response.send("Error while fetching the data" + error);
  // }
  return new Response("k");
};

export const config = {
  path: "/medium",
};

// only for running express with frontend

// const { parseToMediumCard } = require("../../controller/medium_controller");

// const express = require("express");
// const serverless = require("serverless-http");

// const api = express();

// const router = express.Router();

// router.get("/hello", (req, res) => res.send("Hello World!"));

// api.use("/api/", router);

// ? represents a query parameter
// Line 10: query.username => key value pair

// router.get("/medium", async (request, response) => {
//   try {
//     if (!request.query.username) {
//       response.write(
//         JSON.stringify({
//           error: "username is required",
//         })
//       );
//       response.end();
//       return;
//     }

//     const result = await parseToMediumCard(request);

//     response.setHeader(
//       "Cache-Control",
//       "public, no-cache, no-store, must-revalidate"
//     );
//     response.setHeader("Expires", "-1");
//     response.setHeader("Pragma", "no-cache");
//     response.writeHead(200, { "Content-Type": "image/svg+xml" });

//     response.write(result);
//     response.end();
//   } catch (error) {
//     console.log(error);
//     response.send("Error while fetching the data" + error);
//   }
// });

// module.exports.handler = serverless(api);

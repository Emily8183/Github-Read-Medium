const mediumURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";

export default async (request, context) => {
  try {
    const query = request.queryStringParameters || {};
    const username = query.username || "emily.zy.lin"; // Default to "emily.zy.lin" if no username is provided
    const offset = query.offset || 0;
    const width = query.width || 400; // Use default width if not provided
    const height = query.height || 200; // Use default height if not provided

    const apiResponse = await fetch(mediumURL + username); // to fetch the data from RSS2JSON (which is also from Medium)

    // Check if the response is OK (status code 200-299)
    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const result = await apiResponse.json(); // Convert the response I fetched to my clients
    const filteredResult = result.items.filter(
      (item) => item.categories.length > 0
    );

    // Only take the first two items for the two cards
    const cardsToDisplay = filteredResult.slice(0, 2);

    // Initialize the SVG string
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" 
    width="${2 * (width + 40)}" height="${height + 40}" 
    version="1.1">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f5f5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ddd;stop-opacity:1" />
    </linearGradient>
  </defs>`;

    // Loop through the filtered results and generate SVG content for each card
    cardsToDisplay.forEach((item, index) => {
      svgContent += `
        <g transform="translate(${index * (width + 40)}, 20)">
          <rect 
            width="${width}" 
            height="${height}" 
            fill="url(#grad)" 
            rx="20" 
            ry="20" 
            style="filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.15));" />
          
          <text x="30" y="50" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#333">
            ${item.title}
          </text>
          
          <text x="30" y="130" font-family="Arial, sans-serif" font-size="12" fill="#555">
            Published on: ${new Date(item.pubDate).toLocaleDateString()}
          </text>

          <rect x="0" y="${
            height - 50
          }" width="${width}" height="50" fill="#f0f0f0" />
          <text x="30" y="${
            height - 20
          }" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0066cc" cursor="pointer">
            Read More
          </text>
        </g>`;
    });

    // Close the SVG tag
    svgContent += `</svg>`;

    // let res = new Response(JSON.stringify(filteredResult));

    // Create the response with the SVG content and appropriate headers
    const res = new Response(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml", // Overwrite Content-Type
      },
    });

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

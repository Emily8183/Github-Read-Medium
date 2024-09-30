const mediumURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@";

export default async (request, context) => {
  try {
    const query = request.queryStringParameters || {};
    const username = query.username || "emily.zy.lin"; // Default to "emily.zy.lin" if no username is provided

    const apiResponse = await fetch(mediumURL + username); // to fetch the data from RSS2JSON (which is also from Medium)

    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const a = await test();
    // Return the response in the format Netlify expects
    return new Response(a);
  } catch (error) {
    console.error("Error fetching articles:", error);

    // Error handling, sending error message back to client
    return new Response(error);
  }
};
export const config = {
  path: "/medium",
};

async function test() {
  console.log("1");
  return "1";
}

//   const result = await apiResponse.json();
//   const filteredResult = result.items.filter(
//     (item) => item.categories.length > 0
//   );

//   const cardsToDisplay = filteredResult.slice(0, 2);

//   const width = query.width || 400;
//   const height = query.height || 280;

//   // Initialize the SVG string
//   let svgContent = `<svg xmlns="http://www.w3.org/2000/svg"
//                        width="${2 * (width + 40)}" height="${height + 40}"
//                        version="1.1">
//                      <defs>
//                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                          <stop offset="0%" style="stop-color:#f5f5f5;stop-opacity:1" />
//                          <stop offset="100%" style="stop-color:#ddd;stop-opacity:1" />
//                        </linearGradient>
//                      </defs>`;

//   cardsToDisplay.forEach((item, index) => {
//     const titleLines = simpleWrapText(item.title, 30); // Change the number to adjust the max line length
//     svgContent += `
//       <g transform="translate(${index * (width + 40)}, 20)">
//         <rect
//           width="${width}"
//           height="${height}"
//           fill="url(#grad)"
//           rx="20"
//           ry="20"
//           style="filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.15));" />

//         ${titleLines
//           .map(
//             (line, lineIndex) => `
//           <text x="30" y="${
//             50 + lineIndex * 30
//           }" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#333">
//             ${line}
//           </text>
//         `
//           )
//           .join("")}

//         <text x="30" y="${
//           90 + titleLines.length * 30
//         }" font-family="Arial, sans-serif" font-size="14" fill="#999">
//           ${item.categories.join(", ")}
//         </text>

//         <text x="30" y="${
//           130 + titleLines.length * 30
//         }" font-family="Arial, sans-serif" font-size="12" fill="#555">
//           Published on: ${new Date(item.pubDate).toLocaleDateString()}
//         </text>

//         <rect x="0" y="${
//           height - 50
//         }" width="${width}" height="50" fill="#f0f0f0" />
//         <text x="30" y="${
//           height - 20
//         }" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0066cc" cursor="pointer">
//           Read More
//         </text>
//       </g>`;
//   });

//   svgContent += `</svg>`;

//   let res = new Response(svgContent);
//   res.headers.append("Content-Type", "image/svg+xml");
//   return res;
// } catch (error) {
//   console.error("Error fetching articles:", error);
//   return new Response(error.message);
// }
// };

// Function to wrap text based on a specified max length
// function simpleWrapText(text, maxLineLength) {
//   const words = text.split(" ");
//   let lines: string[] = [];
//   let currentLine = "";

//   words.forEach((word) => {
//     if ((currentLine + word).length <= maxLineLength) {
//       currentLine += (currentLine ? " " : "") + word;
//     } else {
//       lines.push(currentLine);
//       currentLine = word; // Start new line
//     }
//   });

//   if (currentLine) {
//     lines.push(currentLine); // Add the last line
//   }

//   return lines;
// }

// export const config = {
//   path: "/medium",
// };

// async function parseToMediumCard(request) {
//   const username = request.query.username;
//   const offset = request.query.offset;
//   const width = request.query.width;
//   const height = request.query.height;

//   var resultData = await getUserData(username);
//   const limit =
//     request.query.limit == null
//       ? defaultConfig.default.limit
//       : request.query.limit > resultData.length
//       ? resultData.length
//       : request.query.limit;

//   let result = `<svg>`;

//   result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
//               width="${
//                 (limit == 1 ? width : 2 * width) +
//                 defaultConfig.default.margin_left +
//                 defaultConfig.card.spacing
//               }"
//               version="1.2"
//               height="${
//                 Math.round(limit / 2) * height +
//                 defaultConfig.default.margin_top * 2 +
//                 defaultConfig.card.spacing * Math.floor(limit / 2)
//               }"
//               viewBox="0 0 ${
//                 (limit == 1 ? width : 2 * width) +
//                 defaultConfig.default.margin_left +
//                 defaultConfig.card.spacing
//               } ${
//     Math.round(limit / 2) * height +
//     defaultConfig.default.margin_top * 2 +
//     defaultConfig.card.spacing * Math.floor(limit / 2)
//   }">`;
//   await asyncForEach(
//     resultData.slice(offset, offset + limit),
//     request.query,
//     async (blog, index, settings) => {
//       if (index >= limit) {
//         return;
//       }
//       const mediumCardObj = await mediumCard(blog, settings, index);
//       result += `<g transform="translate(${
//         (index % 2 ? width + defaultConfig.card.spacing : 0) +
//         defaultConfig.default.margin_left
//       }, ${
//         Math.floor(index / 2) * height +
//         defaultConfig.default.margin_top +
//         (index > 1 ? defaultConfig.card.spacing * Math.floor(index / 2) : 0)
//       })">${mediumCardObj}</g>`;
//     }
//   );

//   result += `</svg>`;
//   return result;
// }

// const asyncForEach = async (array, settings, callback) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, settings, array);
//   }
// };

// const mediumCard = async (data, settings, index) => {
//   const firstImageURL = getFirstImageFromHTML(data.content);
//   const result = await imgToDataURL(firstImageURL);
//   const blogImage = "data:image/png;base64," + result.toString("base64");
//   const blogDate = await dateFormat(data.pubDate);
//   const blogLink = data.link;
//   const readingTime = measureReadingTime(data.content);

//   var selected_theme = defaultConfig.themes.default;

//   if (settings.theme && defaultConfig.themes[settings.theme])
//     selected_theme = settings.theme;

//   var border_width = defaultConfig.card.border_width;
//   var border_radius = defaultConfig.card.border_radius + "px";
//   var width = settings.width;
//   var height = settings.height;
//   var bg_color =
//     settings.bg_color || defaultConfig.themes[selected_theme].bg_color;

//   const image_mask = {
//     background:
//       settings.image_background || defaultConfig.card.image_mask.background,
//     height: settings.image_height || defaultConfig.card.image_mask.height,
//     width: settings.image_width || defaultConfig.card.image_mask.width,
//     x: settings.image_x || defaultConfig.card.image_mask.x,
//     y: settings.image_y || defaultConfig.card.image_mask.y,
//   };

//   const image = {
//     height: settings.image_height || defaultConfig.card.image.height,
//     width: settings.image_width || defaultConfig.card.image.width,
//     x: settings.image_x || defaultConfig.card.image.x,
//     y: settings.image_y || defaultConfig.card.image.y,
//   };

//   const title = {
//     color:
//       settings.title_color || defaultConfig.themes[selected_theme].title_color,
//     x: settings.title_x || defaultConfig.card.title.x,
//     y: settings.title_y || defaultConfig.card.title.y,
//   };

//   const subTitle = {
//     color:
//       settings.author_color ||
//       defaultConfig.themes[selected_theme].author_color,
//     x: settings.title_x || defaultConfig.card.sub_title.x,
//     y: settings.title_y || defaultConfig.card.sub_title.y,
//     font_size:
//       settings.author_font_size || defaultConfig.card.sub_title.font_size,
//   };

//   const author = {
//     color:
//       settings.author_color ||
//       defaultConfig.themes[selected_theme].author_color,
//     x: settings.author_x || defaultConfig.card.author.x,
//     y: settings.author_y || defaultConfig.card.author.y,
//     font_size: settings.author_font_size || defaultConfig.card.author.font_size,
//   };

//   const date = {
//     color:
//       settings.date_color || defaultConfig.themes[selected_theme].date_color,
//     x: settings.date_x || defaultConfig.card.date.x,
//     y: settings.date_y || defaultConfig.card.date.y,
//     font_size: settings.date_font_size || defaultConfig.card.date.font_size,
//   };

//   bg_color = defaultConfig.themes[selected_theme].bg_color;
//   border_color = defaultConfig.themes[selected_theme].border_color;

//   let max_characters = 30;
//   let character_tracker = 0;
//   let line_tracker = 0;
//   let max_lines = 2;
//   var array_holder = [];
//   var title_string = "";
//   var sub_title_string =
//     data.description
//       .replace(/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm, "")
//       .substring(0, 35) + "...";
//   var word_array = data.title.split(" ");
//   var total_words = word_array.length;

//   try {
//     word_array.forEach((word, index) => {
//       if (
//         word.length + character_tracker <=
//         max_characters - array_holder.length
//       ) {
//         character_tracker += word.length;
//         array_holder.push(word);
//         if (total_words == index + 1) {
//           title_string += `<tspan x="0" dy="1.2em">${array_holder.join(
//             " "
//           )}</tspan>`;
//         }
//       } else {
//         line_tracker++;
//         title_string += `<tspan x="0" dy="1.2em">${
//           array_holder.join(" ") + (line_tracker == max_lines ? "..." : "")
//         }</tspan>`;
//         if (line_tracker == max_lines) throw "";
//         array_holder = [];
//         character_tracker = 0;
//         character_tracker += word.length;
//         array_holder.push(word);
//         if (total_words == index + 1) {
//           title_string += `<tspan x="0" dy="1.2em">${array_holder.join(
//             " "
//           )}</tspan>`;
//         }
//       }
//     });
//   } catch (_) {}

//   return `
//     <svg xmlns="http://www.w3.org/2000/svg" height="${height}px" width="${width}px">
//     <defs>
//       <!-- define lines for text lies on -->
//       <path id="blogName" d="M0,20 H235 M0,35 H235 M0,50 H240 M0,65 H235">     </path>
//       <path id="blogAuthor" d="M0,85 H230 "></path>
//       <path id="blogDescription" d="M0,55 H230 "></path>
//       <path id="blogDate" d="M0,100 H230 "></path>

//       <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
//         <stop offset="0%" style="stop-color:${bg_color};stop-opacity:1" />
//         <stop offset="100%" style="stop-color:${bg_color};stop-opacity:1" />
//       </linearGradient>
//       <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
//         <stop offset="0%" style="stop-color:${image_mask.background};stop-opacity:1" />
//         <stop offset="100%" style="stop-color:${image_mask.background};stop-opacity:1" />
//       </linearGradient>

//       <clipPath id="clip">
//         <use xlink:href="#rect"/>
//       </clipPath>

//       <pattern id="img${index}" patternUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
//         <image xlink:href="${blogImage}" x="${image.x}" y="${image.y}" height="${image.height}px" width="${image.width}px" />
//       </pattern>
//     </defs>

//     <use xlink:href="#rect" stroke-width="2" stroke="black"/>

//     <a href="${blogLink}" target="_blank">

//     <rect id="rect" x="0" y="0" width="100%" height="100%" style="fill:url(#grad1);ry:${border_radius};stroke-opacity:${border_width};stroke:${border_color}"></rect>

//     <text transform="translate(${title.x},${title.y})" fill="${title.color}" font-size="15" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-weight="bold">
//       ${title_string}
//     </text>

//     <text transform="translate(${subTitle.x},${subTitle.y})" fill="${subTitle.color}" font-size="${subTitle.font_size}" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-weight="bold">
//       <textPath xlink:href="#blogDescription">${sub_title_string}</textPath>
//     </text>

//     <text transform="translate(${author.x},${author.y})" fill="${author.color}" font-size="${author.font_size}" font-family="'Segoe UI', Ubuntu, Sans-Serif">
//       <textPath xlink:href="#blogAuthor">${data.author}</textPath>
//     </text>
//     <text transform="translate(${date.x},${date.y})" fill="${date.color}" font-size="${date.font_size}" font-family="'Segoe UI', Ubuntu, Sans-Serif">
//       <textPath xlink:href="#blogDate">${blogDate} • ${readingTime}</textPath>
//     </text>

//     <rect clip-path="url(#clip)" x="${image_mask.x}" y="${image_mask.y}" height="${image_mask.height}px" width="${image_mask.width}px" style="fill:url(#img${index});"></rect>

//     </a>
//     </svg>
//     `;
// };

// const defaultConfig = {
//   default: {
//     limit: 1,
//     margin_left: 10,
//     margin_top: 10,
//     cache_seconds: {
//       min: 7200,
//       max: 86400,
//     },
//   },
//   card: {
//     width: 375,
//     height: 110,
//     border_width: 2, //stroke-opacity
//     border_radius: 6,
//     spacing: 15,
//     image_mask: {
//       width: 120,
//       height: 101,
//       x: 4,
//       y: 4,
//     },
//     image: {
//       width: 125 * 2,
//       height: 100 * 2,
//       x: -50,
//       y: -57,
//     },
//     title: {
//       x: 135,
//       y: 0,
//     },
//     sub_title: {
//       x: 135,
//       y: 0,
//       font_size: 13,
//     },
//     author: {
//       x: 135,
//       y: 0,
//       font_size: 13,
//     },
//     date: {
//       x: 135,
//       y: 0,
//       font_size: 12,
//     },
//   },
//   themes: {
//     default: "light",
//     light: {
//       title_color: "#2F80ED",
//       author_color: "#333",
//       date_color: "#4C71F2",
//       bg_color: "#FFFEFE",
//       border_color: "#E4E2E2",
//     },
//     dark: {
//       title_color: "#FFF",
//       author_color: "#9F9F9F",
//       date_color: "#79FF97",
//       bg_color: "#151515",
//       border_color: "#E4E2E2",
//     },
//     dracula: {
//       title_color: "#FF6E96",
//       author_color: "#F8F8F2",
//       date_color: "#79DAFA",
//       bg_color: "#282A36",
//       border_color: "#E4E2E2",
//     },
//     radical: {
//       title_color: "#FE428E",
//       author_color: "#A9FEF7",
//       date_color: "#F8D847",
//       bg_color: "#141321",
//       border_color: "#E4E2E2",
//     },
//     merko: {
//       title_color: "#ABD200",
//       author_color: "#68B587",
//       date_color: "#B7D364",
//       bg_color: "#0A0F0B",
//       border_color: "#E4E2E2",
//     },
//     gruvbox: {
//       title_color: "#FABD2F",
//       author_color: "#8EC07C",
//       date_color: "#FE8019",
//       bg_color: "#282828",
//       border_color: "#E4E2E2",
//     },
//     tokyonight: {
//       title_color: "#70A5FD",
//       author_color: "#38BDAE",
//       date_color: "#BF91F3",
//       bg_color: "#1A1B27",
//       border_color: "#E4E2E2",
//     },
//     onedark: {
//       title_color: "#E4BF7A",
//       author_color: "#DF6D74",
//       date_color: "#8EB573",
//       bg_color: "#282C34",
//       border_color: "#E4E2E2",
//     },
//     cobalt: {
//       title_color: "#E683D9",
//       author_color: "#75EEB2",
//       date_color: "#0480EF",
//       bg_color: "#193549",
//       border_color: "#E4E2E2",
//     },
//     synthwave: {
//       title_color: "#E2E9EC",
//       author_color: "#E5289E",
//       date_color: "#EF8539",
//       bg_color: "#2B213A",
//       border_color: "#E4E2E2",
//     },
//     highcontrast: {
//       title_color: "#E7F216",
//       author_color: "#FFF",
//       date_color: "#00FFFF",
//       bg_color: "#000",
//       border_color: "#E4E2E2",
//     },
//     prussian: {
//       title_color: "#BDDFFF",
//       author_color: "#6E93B5",
//       date_color: "#38A0FF",
//       bg_color: "#172F45",
//       border_color: "#E4E2E2",
//     },
//     monokai: {
//       title_color: "#EB1F6A",
//       author_color: "#F1F1EB",
//       date_color: "#E28905",
//       bg_color: "#272822",
//       border_color: "#E4E2E2",
//     },
//     vue: {
//       title_color: "#41B883",
//       author_color: "#273849",
//       date_color: "#41B883",
//       bg_color: "#FFFEFE",
//       border_color: "#E4E2E2",
//     },
//     "vue-dark": {
//       title_color: "#41B883",
//       author_color: "#FFFEFE",
//       date_color: "#41B883",
//       bg_color: "#273849",
//       border_color: "#E4E2E2",
//     },
//     "shades-of-purple": {
//       title_color: "#FAD000",
//       author_color: "#A599E9",
//       date_color: "#B362FF",
//       bg_color: "#2D2B55",
//       border_color: "#E4E2E2",
//     },
//     nightowl: {
//       title_color: "#C792EA",
//       author_color: "#7FDBCA",
//       date_color: "#FFEB95",
//       bg_color: "#011627",
//       border_color: "#E4E2E2",
//     },
//     buefy: {
//       title_color: "#7957D5",
//       author_color: "#363636",
//       date_color: "#FF3860",
//       bg_color: "#FFFFFF",
//       border_color: "#E4E2E2",
//     },
//     "blue-green": {
//       title_color: "#2F97C1",
//       author_color: "#0CF574",
//       date_color: "#F5B700",
//       bg_color: "#040F0F",
//       border_color: "#E4E2E2",
//     },
//     algolia: {
//       title_color: "#00AEFF",
//       author_color: "#FFFFFF",
//       date_color: "#2DDE98",
//       bg_color: "#050F2C",
//       border_color: "#E4E2E2",
//     },
//     "great-gatsby": {
//       title_color: "#FFA726",
//       author_color: "#FFD95B",
//       date_color: "#FFB74D",
//       bg_color: "#000000",
//       border_color: "#E4E2E2",
//     },
//     darcula: {
//       title_color: "#BA5F17",
//       author_color: "#BEBEBE",
//       date_color: "#84628F",
//       bg_color: "#242424",
//       border_color: "#E4E2E2",
//     },
//     bear: {
//       title_color: "#E03C8A",
//       author_color: "#BCB28D",
//       date_color: "#00AEFF",
//       bg_color: "#1F2023",
//       border_color: "#E4E2E2",
//     },
//     "solarized-dark": {
//       title_color: "#268BD2",
//       author_color: "#859900",
//       date_color: "#B58900",
//       bg_color: "#002B36",
//       border_color: "#E4E2E2",
//     },
//     "solarized-light": {
//       title_color: "#268BD2",
//       author_color: "#859900",
//       date_color: "#B58900",
//       bg_color: "#FDF6E3",
//       border_color: "#E4E2E2",
//     },
//     "chartreuse-dark": {
//       title_color: "#7FFF00",
//       author_color: "#FFF",
//       date_color: "#00AEFF",
//       bg_color: "#000",
//     },
//     border_color: "#E4E2E2",

//     nord: {
//       title_color: "#81A1C1",
//       author_color: "#D8DEE9",
//       bg_color: "#2E3440",
//       border_color: "#E4E2E2",
//       date_color: "#88C0D0",
//     },
//     gotham: {
//       title_color: "#2AA889",
//       author_color: "#99D1CE",
//       date_color: "#599CAB",
//       bg_color: "#0C1014",
//       border_color: "#E4E2E2",
//     },
//     "material-palenight": {
//       title_color: "#C792EA",
//       author_color: "#A6ACCD",
//       date_color: "#89DDFF",
//       bg_color: "#292D3E",
//       border_color: "#E4E2E2",
//     },
//     graywhite: {
//       title_color: "#24292E",
//       author_color: "#24292E",
//       date_color: "#24292E",
//       bg_color: "#FFFFFF",
//       border_color: "#E4E2E2",
//     },
//     "vision-friendly-dark": {
//       title_color: "#FFB000",
//       author_color: "#FFFFFF",
//       date_color: "#785EF0",
//       bg_color: "#000000",
//       border_color: "#E4E2E2",
//     },
//     "ayu-mirage": {
//       title_color: "#F4CD7C",
//       author_color: "#C7C8C2",
//       date_color: "#73D0FF",
//       bg_color: "#1F2430",
//       border_color: "#E4E2E2",
//     },
//     "midnight-purple": {
//       title_color: "#9745F5",
//       author_color: "#FFFFFF",
//       date_color: "#9F4BFF",
//       bg_color: "#000000",
//       border_color: "#E4E2E2",
//     },
//     calm: {
//       title_color: "#E07A5F",
//       author_color: "#EBCFB2",
//       date_color: "#EDAE49",
//       bg_color: "#373F51",
//       border_color: "#E4E2E2",
//     },
//     "flag-india": {
//       title_color: "#FF8F1C",
//       author_color: "#509E2F",
//       date_color: "#250E62",
//       bg_color: "#FFFFFF",
//       border_color: "#E4E2E2",
//     },
//     omni: {
//       title_color: "#FF79C6",
//       author_color: "#E1E1E6",
//       date_color: "#E7DE79",
//       bg_color: "#191622",
//       border_color: "#E4E2E2",
//     },
//     react: {
//       title_color: "#61DAFB",
//       author_color: "#FFFFFF",
//       date_color: "#61DAFB",
//       bg_color: "#20232A",
//       border_color: "#E4E2E2",
//     },
//     jolly: {
//       title_color: "#FF64DA",
//       author_color: "#FFFFFF",
//       date_color: "#A960FF",
//       bg_color: "#291B3E",
//       border_color: "#E4E2E2",
//     },
//     maroongold: {
//       title_color: "#F7EF8A",
//       author_color: "#E0AA3E",
//       date_color: "#F7EF8A",
//       bg_color: "#260000",
//       border_color: "#E4E2E2",
//     },
//     yeblu: {
//       title_color: "#FFFF00",
//       author_color: "#FFFFFF",
//       date_color: "#FFFF00",
//       bg_color: "#002046",
//       border_color: "#E4E2E2",
//     },
//     blueberry: {
//       title_color: "#82AAFF",
//       author_color: "#27E8A7",
//       date_color: "#89DDFF",
//       bg_color: "#242938",
//       border_color: "#E4E2E2",
//     },
//   },
// };

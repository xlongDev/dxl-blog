const fs = require("fs");
const path = require("path");

const allPosts = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), ".contentlayer/generated/Post/_index.json"),
    "utf-8"
  )
);

function generatePostsByCategoryCache() {
  try {
    const categories = Array.from(
      new Set(allPosts.map((post) => post.category).filter(Boolean))
    );

    const postsByCategory = categories.reduce((acc, category) => {
      acc[category] = allPosts.filter((post) => post.category === category).length;
      return acc;
    }, {});

    const totalPosts = allPosts.length;

    const cacheData = {
      totalPosts,
      postsByCategory,
    };

    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(cacheDir, "postsByCategory.json"),
      JSON.stringify(cacheData, null, 2),
      "utf-8"
    );

    console.log("Generated postsByCategory cache successfully.");
  } catch (error) {
    console.error("Error generating cache:", error.message);
    process.exit(1);
  }
}

generatePostsByCategoryCache();
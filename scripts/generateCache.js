const fs = require("fs");
const path = require("path");

const allPostsRaw = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), ".contentlayer/generated/Post/_index.json"),
    "utf-8"
  )
);

const allPosts = allPostsRaw.filter((post) => !post.draft);

// 转换为 MinimalPost 格式
const minimalPosts = allPosts.map((post) => {
  const pathSegments = post._raw.flattenedPath.split("/");
  return {
    title: post.title,
    date: post.date,
    description: post.description,
    url: post.url,
    category: pathSegments[0],
    tags: post.tags,
    image: post.image,
    views: post.views,
    likes: post.likes,
  };
});

function generatePostsByCategoryCache() {
  try {
    const categories = Array.from(
      new Set(minimalPosts.map((post) => post.category).filter(Boolean))
    );

    const postsByCategory = categories.reduce((acc, category) => {
      acc[category] = minimalPosts.filter(
        (post) => post.category === category
      ).length;
      return acc;
    }, {});

    const totalPosts = minimalPosts.length;

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
    console.log("Total posts:", totalPosts);
    console.log("Categories:", categories);
  } catch (error) {
    console.error("Error generating postsByCategory cache:", error.message);
    process.exit(1);
  }
}

function generateArticleTreeCache() {
  try {
    const tree = {};

    minimalPosts.forEach((post) => {
      const category = post.category || "未分类";
      if (!tree[category]) {
        tree[category] = {
          name: category,
          posts: [],
          isExpanded: false,
        };
      }
      tree[category].posts.push(post);
    });

    const treeData = Object.values(tree).sort((a, b) => {
      const isAEnglish = /^[A-Za-z]/.test(a.name);
      const isBEnglish = /^[A-Za-z]/.test(b.name);

      if (isAEnglish && !isBEnglish) return -1;
      if (!isAEnglish && isBEnglish) return 1;

      return a.name.localeCompare(b.name);
    });

    const cacheData = {
      treeData,
    };

    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(cacheDir, "articleTree.json"),
      JSON.stringify(cacheData, null, 2),
      "utf-8"
    );

    console.log("Generated articleTree cache successfully.");
  } catch (error) {
    console.error("Error generating articleTree cache:", error.message);
    process.exit(1);
  }
}

function generateTimelineCache() {
  try {
    const sortedPosts = [...minimalPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const timeline = {};

    sortedPosts.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!timeline[year]) {
        timeline[year] = [];
      }
      timeline[year].push(post);
    });

    const timelineData = Object.entries(timeline)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([year, posts]) => ({
        year,
        posts,
      }));

    const cacheData = {
      timelineData,
    };

    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(cacheDir, "timelineData.json"),
      JSON.stringify(cacheData, null, 2),
      "utf-8"
    );

    console.log("Generated timelineData cache successfully.");
  } catch (error) {
    console.error("Error generating timelineData cache:", error.message);
    process.exit(1);
  }
}

function generateTagsCache() {
  try {
    const allTags = Array.from(
      new Set(minimalPosts.flatMap((post) => post.tags || []))
    ).sort();

    const cacheData = {
      allTags,
    };

    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(cacheDir, "tags.json"),
      JSON.stringify(cacheData, null, 2),
      "utf-8"
    );

    console.log("Generated tags cache successfully.");
    console.log("Total tags:", allTags.length);
  } catch (error) {
    console.error("Error generating tags cache:", error.message);
    process.exit(1);
  }
}

generatePostsByCategoryCache();
generateArticleTreeCache();
generateTimelineCache();
generateTagsCache();

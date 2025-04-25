const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

async function generateCache() {
  try {
    console.time("Cache generation");

    // 读取并解析文章数据
    const allPostsRaw = JSON.parse(
      await readFile(
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

    // 创建缓存目录
    const cacheDir = path.join(process.cwd(), "public", "cache");
    if (!fs.existsSync(cacheDir)) {
      await mkdir(cacheDir, { recursive: true });
    }

    // 并行生成所有缓存
    await Promise.all([
      generatePostsByCategoryCache(minimalPosts, cacheDir),
      generateArticleTreeCache(minimalPosts, cacheDir),
      generateTimelineCache(minimalPosts, cacheDir),
      generateTagsCache(minimalPosts, cacheDir),
    ]);

    console.timeEnd("Cache generation");
    console.log("✅ All caches generated successfully");
  } catch (error) {
    console.error("❌ Error generating cache:", error);
    process.exit(1);
  }
}

async function generatePostsByCategoryCache(posts, cacheDir) {
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean))
  );

  const postsByCategory = categories.reduce((acc, category) => {
    acc[category] = posts.filter((post) => post.category === category).length;
    return acc;
  }, {});

  const cacheData = {
    totalPosts: posts.length,
    postsByCategory,
  };

  await writeFile(
    path.join(cacheDir, "postsByCategory.json"),
    JSON.stringify(cacheData, null, 2),
    "utf-8"
  );
}

async function generateArticleTreeCache(posts, cacheDir) {
  const tree = {};

  posts.forEach((post) => {
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

  await writeFile(
    path.join(cacheDir, "articleTree.json"),
    JSON.stringify({ treeData }, null, 2),
    "utf-8"
  );
}

async function generateTimelineCache(posts, cacheDir) {
  const timelineData = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((post) => ({
      title: post.title,
      date: post.date,
      url: post.url,
    }));

  await writeFile(
    path.join(cacheDir, "timeline.json"),
    JSON.stringify({ timelineData }, null, 2),
    "utf-8"
  );
}

async function generateTagsCache(posts, cacheDir) {
  const tags = new Set();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });

  const tagsData = Array.from(tags).sort();

  await writeFile(
    path.join(cacheDir, "tags.json"),
    JSON.stringify({ tags: tagsData }, null, 2),
    "utf-8"
  );
}

generateCache();

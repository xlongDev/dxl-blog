import { allPosts } from "contentlayer/generated";

export function getAllPosts() {
  return allPosts.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    }
    return 1;
  });
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.url === `/posts/${slug}`);
}

import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import Link from "next/link";

type PostsByYear = {
  [key: string]: typeof allPosts;
};

export default function ArchivePage() {
  const postsByYear = allPosts.reduce((acc: PostsByYear, post) => {
    const year = format(new Date(post.date), "yyyy");
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">文章归档</h1>
      {years.map((year) => (
        <div key={year} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{year}年</h2>
          <div className="space-y-4">
            {postsByYear[year]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((post) => (
                <article
                  key={post._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    href={post.url}
                    className="hover:text-blue-500 transition-colors"
                  >
                    <h3 className="font-medium">{post.title}</h3>
                  </Link>
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-500 tabular-nums"
                  >
                    {format(new Date(post.date), "MM-dd")}
                  </time>
                </article>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import { ImageResponse } from '@vercel/og';
import { allPosts } from 'contentlayer/generated';

export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => {
    const pathSegments = post._raw.flattenedPath.split('/');
    return pathSegments[pathSegments.length - 1] === params.slug;
  });

  const title = post?.title || decodeURIComponent(params.slug).split('-').join(' ');
  const description = post?.description || '晓龙的技术博客';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: '#666666',
            textAlign: 'center',
          }}
        >
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

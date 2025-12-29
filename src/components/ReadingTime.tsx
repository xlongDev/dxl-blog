export function getReadingTime(content: string) {
  const wordsPerMinute = 200; // 假设阅读速度为每分钟200字
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

export default function ReadingTime({ content }: { content: string }) {
  const minutes = getReadingTime(content);

  return (
    <span className="text-sm text-gray-500">预计阅读时间：{minutes} 分钟</span>
  );
}

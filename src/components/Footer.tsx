export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p>©2020 - {new Date().getFullYear()} 段晓龙的blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

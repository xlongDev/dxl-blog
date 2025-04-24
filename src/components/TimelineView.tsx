"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, ChevronRight } from "lucide-react";
import { useThemeUtils } from "@/hooks/useThemeUtils";
import { MinimalPost } from "@/types";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineViewProps {
  posts: MinimalPost[];
}

interface TimelineItem {
  year: string;
  posts: MinimalPost[];
  isExpanded?: boolean;
}

interface CachedTimelineData {
  timelineData: TimelineItem[];
}

const TimelinePost = ({ post, accentColor, hoverColorClass }: { post: MinimalPost; accentColor: string; hoverColorClass: string }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`relative pl-4 border-l-2 transition-all duration-200`}>
      {inView ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`absolute left-[-5px] top-2 w-2 h-2 rounded-full ${accentColor.replace(
              "text-",
              "bg-"
            )}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <a
            href={post.url}
            tabIndex={0}
            className={`block ${hoverColorClass} transition-all duration-200 outline-none focus:ring-0`}
          >
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(post.date), "MM月dd日", { locale: zhCN })}
            </time>
            <h4 className="text-base font-medium mt-1">{post.title}</h4>
          </a>
        </motion.div>
      ) : (
        <div className="h-16" />
      )}
    </div>
  );
};

const TimelineView = ({ posts }: TimelineViewProps) => {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);
  const [visibleYears, setVisibleYears] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { theme, getThemeColor } = useThemeUtils();

  const { ref: loadMoreRef, inView: loadMoreInView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch("/cache/timelineData.json");
        if (response.ok) {
          const cachedData = await response.json();
          const dataWithExpand = cachedData.timelineData.map(
            (item: TimelineItem, index: number) => ({
              ...item,
              isExpanded: index === 0,
            })
          );
          setTimelineData(dataWithExpand);
        } else {
          const newTimelineData = buildTimeline(posts);
          setTimelineData(newTimelineData);
        }
      } catch (error) {
        console.error("Failed to load timeline cache:", error);
        const newTimelineData = buildTimeline(posts);
        setTimelineData(newTimelineData);
      }
    };

    fetchTimelineData();
  }, [posts]);

  useEffect(() => {
    if (loadMoreInView && visibleYears < timelineData.length) {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setVisibleYears((prev) => prev + 1);
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [loadMoreInView, visibleYears, timelineData.length]);

  const buildTimeline = (posts: MinimalPost[]): TimelineItem[] => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const timeline: { [key: string]: MinimalPost[] } = {};

    sortedPosts.forEach((post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!timeline[year]) {
        timeline[year] = [];
      }
      timeline[year].push(post);
    });

    return Object.entries(timeline)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([year, posts]) => ({
        year,
        posts,
        isExpanded: false,
      }));
  };

  const toggleYear = (year: string) => {
    setTimelineData((prev) =>
      prev.map((item) =>
        item.year === year ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  const getHoverColorClass = () => {
    const hoverColors = {
      light: "hover:text-blue-600",
      dark: "hover:text-blue-600",
      green: "hover:text-green-600",
      purple: "hover:text-purple-600",
      orange: "hover:text-orange-600",
      blue: "hover:text-blue-600",
      pink: "hover:text-pink-600",
      brown: "hover:text-amber-600",
    };

    return hoverColors[theme as keyof typeof hoverColors] || hoverColors.light;
  };

  const getAccentColor = () => {
    const themeColors = {
      light: "text-blue-500",
      dark: "text-blue-500",
      green: "text-green-500",
      purple: "text-purple-500",
      orange: "text-orange-500",
      blue: "text-blue-500",
      pink: "text-pink-500",
      brown: "text-amber-500",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBgClass = () => {
    const themeColors = {
      light:
        "bg-white/80 dark:bg-gray-800/80 hover:bg-white/90 dark:hover:bg-gray-800/90",
      dark: "bg-gray-800/80 hover:bg-gray-800/90",
      green:
        "bg-green-50/80 dark:bg-green-900/20 hover:bg-green-50/90 dark:hover:bg-green-900/30",
      purple:
        "bg-purple-50/80 dark:bg-purple-900/20 hover:bg-purple-50/90 dark:hover:bg-purple-900/30",
      orange:
        "bg-orange-50/80 dark:bg-orange-900/20 hover:bg-orange-50/90 dark:hover:bg-orange-900/30",
      blue: "bg-blue-50/80 dark:bg-blue-900/20 hover:bg-blue-50/90 dark:hover:bg-blue-900/30",
      pink: "bg-pink-50/80 dark:bg-pink-900/20 hover:bg-pink-50/90 dark:hover:bg-pink-900/30",
      brown:
        "bg-amber-50/80 dark:bg-amber-900/20 hover:bg-amber-50/90 dark:hover:bg-amber-900/30",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const getBorderClass = () => {
    const themeColors = {
      light: "border-gray-200/50 dark:border-gray-700/50",
      dark: "border-gray-700/50",
      green:
        "border-green-200/50 dark:border-green-700/50 hover:border-green-300/70 dark:hover:border-green-600/70",
      purple:
        "border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300/70 dark:hover:border-purple-600/70",
      orange:
        "border-orange-200/50 dark:border-orange-700/50 hover:border-orange-300/70 dark:hover:border-orange-600/70",
      blue: "border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70",
      pink: "border-pink-200/50 dark:border-pink-700/50 hover:border-pink-300/70 dark:hover:border-pink-600/70",
      brown:
        "border-amber-200/50 dark:border-amber-700/50 hover:border-amber-300/70 dark:hover:border-amber-600/70",
    };

    return themeColors[theme as keyof typeof themeColors] || themeColors.light;
  };

  const displayData = timelineData.slice(0, visibleYears);

  const accentColor = getAccentColor();
  const bgClass = getBgClass();
  const borderClass = getBorderClass();
  const hoverColorClass = getHoverColorClass();

  const handleKeyDown = (
    event: React.KeyboardEvent,
    year: string,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleYear(year);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, displayData.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
    }
  };

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div
      className={`w-full max-w-2xl ${bgClass} rounded-lg shadow-lg p-6 group transition-all duration-200 hover:shadow-xl border ${borderClass} backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className={accentColor} />
        <h3 className={`text-lg font-semibold ${accentColor}`}>文章时间线</h3>
      </div>
      <div className="space-y-8 overflow-y-auto max-h-[2100px]">
        {displayData.map(({ year, posts, isExpanded }, index) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              tabIndex={0}
              className={`flex items-center gap-4 mb-4 cursor-pointer outline-none focus:ring-0`}
              onClick={() => toggleYear(year)}
              onKeyDown={(e) => handleKeyDown(e, year, index)}
            >
              <span className={`text-xl font-bold ${accentColor}`}>{year}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className={accentColor} size={20} />
              </motion.div>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 pl-4"
                >
                  {posts.map((post) => (
                    <TimelinePost
                      key={post.url}
                      post={post}
                      accentColor={accentColor}
                      hoverColorClass={hoverColorClass}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {visibleYears < timelineData.length && (
          <div
            ref={loadMoreRef}
            className="h-10 flex justify-center items-center"
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  variants={loadingVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-500">加载中...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
export interface Quote {
  text: string;
  translation: string;
}

export interface Background {
  url: string;
  credit?: string;
}

export const quotes: Quote[] = [
  {
    text: "在平凡的日子里，找到属于自己的星辰大海。",
    translation: "Find your own stars and oceans in ordinary days.",
  },
  {
    text: "只有经历黑夜，才能真正看清星光的模样。",
    translation: "Only by going through the night can you truly see the stars."
  },
  {
    text: "总有些微光，会照亮前行的路。",
    translation: "There will always be a glimmer of light to illuminate the path ahead."
  },
  {
    text: "人生如逆旅，我亦是行人。",
    translation: "Life is like a journey against the current; I am just a traveler.",
  },
  {
    text: "世界很大，但属于你的风景，只有你自己能定义。",
    translation: "The world is vast, but the scenery that belongs to you can only be defined by yourself.",
  },
  {
    text: "在平凡中寻找不平凡，是生活的艺术。",
    translation: "Finding the extraordinary in the ordinary is the art of life.",
  },
  {
    text: "你不需要成为别人，只需要成为更好的自己。",
    translation: "You don't need to become someone else; you just need to become a better version of yourself.",
  },
  // 可以添加更多标语...
];

export const backgrounds: Background[] = [
  {
    url: "/images/hero/1.jpg",
    credit: "Ocean view at sunset",
  },
  {
    url: "/images/hero/2.jpg",
    credit: "Snowy mountain peak",
  },
  {
    url: "/images/hero/3.jpg",
    credit: "Dense forest trail",
  },
  {
    url: "/images/hero/4.jpg",
    credit: "Sunlit forest clearing",
  },
  {
    url: "/images/hero/5.jpg",
    credit: "Misty forest morning",
  },
  {
    url: "/images/hero/6.jpg",
    credit: "Autumn forest colors",
  },
  // 可以添加更多背景图...
];

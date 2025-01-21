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
    text: "世界是一本书，不旅行的人只读了一页。",
    translation: "The world is a book, and those who do not travel read only one page.",
  },
  {
    text: "时间是最好的作者，它总会写出完美的结局。",
    translation: "Time is the best author; it always writes the perfect ending.",
  },
  {
    text: "真正的自由，是在孤独中与自己对话。",
    translation: "True freedom is having a conversation with yourself in solitude.",
  },
  {
    text: "生活不是等待风暴过去，而是学会在雨中跳舞。",
    translation: "Life isn't about waiting for the storm to pass, but learning to dance in the rain.",
  },
  {
    text: "在喧嚣中保持沉默，在沉默中听见自己。",
    translation: "Stay silent in the noise, and hear yourself in the silence.",
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
    text: "在追逐梦想的路上，别忘了看看沿途的风景。",
    translation: "On the way to chasing your dreams, don't forget to enjoy the scenery along the way.",
  },
  {
    text: "生活是一场冒险，而不是一场竞赛。",
    translation: "Life is an adventure, not a race.",
  },
  {
    text: "在平凡中寻找不平凡，是生活的艺术。",
    translation: "Finding the extraordinary in the ordinary is the art of life.",
  },
  {
    text: "你不需要成为别人，只需要成为更好的自己。",
    translation: "You don't need to become someone else; you just need to become a better version of yourself.",
  },
  {
    text: "每一次选择，都是对未来的自己负责。",
    translation: "Every choice is a responsibility to your future self.",
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
  {
    url: "/images/hero/7.jpg",
    credit: "Pine forest landscape",
  },
  {
    url: "/images/hero/8.jpg",
    credit: "Forest river view",
  },
  {
    url: "/images/hero/9.jpg",
    credit: "Forest canopy perspective",
  },
  // 可以添加更多背景图...
];

import React from "react";

// emoji正则表达式
const EMOJI_REGEX =
  /([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}])/u;

export interface SplitTextPart {
  text: string;
  isEmoji: boolean;
}

/**
 * 将包含emoji的文本分割成数组
 * @param text 要分割的文本
 * @returns 分割后的文本数组，每个元素包含文本内容和是否为emoji的标记
 */
export const splitEmojiText = (text: string): SplitTextPart[] => {
  const parts = text.split(EMOJI_REGEX);
  return parts
    .map((part) => ({
      text: part,
      isEmoji: part.match(EMOJI_REGEX) !== null,
    }))
    .filter((part) => part.text.trim().length > 0);
};

/**
 * 渲染带有emoji的文本，可自定义文本和emoji的样式
 * @param text 要渲染的文本
 * @param textClassName 普通文本的className
 * @param emojiClassName emoji的className
 * @returns React节点数组
 */
export const renderEmojiText = (
  text: string,
  textClassName: string = "",
  emojiClassName: string = "text-current"
): React.ReactNode[] => {
  const parts = splitEmojiText(text);
  return parts.map((part, index) => (
    <span key={index} className={part.isEmoji ? emojiClassName : textClassName}>
      {part.text}
    </span>
  ));
};

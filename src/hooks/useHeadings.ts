"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));
    const headingElements = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: parseInt(element.tagName.charAt(1)),
    }));

    setHeadings(headingElements);
  }, []);

  return headings;
}
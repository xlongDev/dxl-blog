export interface MinimalPost {
  url: string;
  title: string;
  date: string;
  description: string;
  category?: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

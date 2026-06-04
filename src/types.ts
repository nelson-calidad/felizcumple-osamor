export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "romance" | "adventure" | "daily" | "milestone";
  emoji: string;
  imageIndex: number; // Index to map to our generated beautiful watercolor images
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string; // Real royalty-free beautiful piano/romantic melodies!
  coverIndex: number;
}

export interface FloatingHeart {
  id: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  text?: string;
}

export interface CuteQuote {
  trigger: string;
  quote: string;
}

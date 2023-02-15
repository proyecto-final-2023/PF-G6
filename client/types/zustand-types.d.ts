import { StateCreator } from "zustand";

export interface Bear {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export interface Fish {
  fishes: number;
  addFish: () => void;
}

export interface Post {
  post: {
    id: number;
    title: string;
    body: string;
  };
  fetchPost: () => void;
}

export type FishCreator = StateCreator<Bear & Fish & Post, [], [], Fish>;

export type BearCreator = StateCreator<Bear & Fish & Post, [], [], Bear>;

export type PostCreator = StateCreator<Bear & Fish & Post, [], [], Post>;

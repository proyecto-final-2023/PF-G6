import { StateCreator } from "zustand";

export interface Post {
  post: {
    id: number;
    title: string;
    body: string;
  };
  fetchPost: () => void;
}

export interface User {
  userData: {
    confirmed: boolean;
    imgURL: string;
    rol: "admin" | "trainee" | "trainer";
    name: string;
  };
  updateConfirmed: (state: boolean) => void;
  updateData: (imgURL: string, rol: string, fullName: string) => void;
}

export type PostCreator = StateCreator<Post & User, [], [], Post>;

export type UserCreator = StateCreator<Post & User, [], [], User>;

import { StateCreator } from "zustand";
import { EventInput } from "@fullcalendar/core";
import create from "zustand";

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

export interface CalendarState {
  events: EventInput[];
  addEvent: (event: EventInput) => void;
  removeEvent: (eventId: string) => void;
  updateEvent: (event: EventInput) => void;
}


export type CalendarCreator = StateCreator<CalendarState>;

export type PostCreator = StateCreator<Post & User, [], [], Post>;

export type UserCreator = StateCreator<Post & User, [], [], User>;

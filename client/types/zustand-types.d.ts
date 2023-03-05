import { StateCreator } from "zustand";
import { EventInput } from "@fullcalendar/core";
import create from "zustand";
import { UserCardT, UserDetailsT } from "./dash/user";

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

// --------------------------------------------
// ? Dashboard stuff
// --------------------------------------------
// * Makes trainnings (trainer)
export interface Trainer {
  trainerBasicsArr: UserCardT[];

  trainerDetails: UserDetailsT;

  fetchTrainerBasicsArr: (page: number) => Promise<void>;

  fetchTrainerDetails: (id: string) => Promise<void>;

  updateTrainerDetails: (data: UserDetailsT) => Promise<void>;
}
// * Does the actual exercise (trainee)
export interface Trainee {
  traineeBasicsArr: UserCardT[];

  traineeDetails: UserDetailsT;

  fetchTraineeBasicsArr: (page: number) => Promise<void>;

  fetchTraineeDetails: (id: string) => Promise<void>;

  updateTraineeDetails: (data: UserDetailsT) => Promise<void>;
}

export type TrainerCreator = StateCreator<Trainer & Trainee, [], [], Trainer>;

export type TraineeCreator = StateCreator<Trainer & Trainee, [], [], Trainee>;

// export type PostCreator = StateCreator<Post & User, [], [], Post>;

// export type UserCreator = StateCreator<Post & User, [], [], User>;

export type CalendarCreator = StateCreator<CalendarState>;

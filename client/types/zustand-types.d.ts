import create from "zustand";
import { StateCreator } from "zustand";
import { EventInput } from "@fullcalendar/core";
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

export interface UserZustand {
  userBasicsArr: UserCardT[];

  userDetails: UserDetailsT;

  fetchUserBasicsArr: (page: number) => Promise<void>;

  fetchUserDetails: (id: string) => Promise<void>;

  updateUserDetails: (data: UserDetailsT) => Promise<void>;
}

export type TrainerCreator = StateCreator<
  Trainer & Trainee & UserZustand,
  [],
  [],
  Trainer
>;

export type TraineeCreator = StateCreator<
  Trainer & Trainee & UserZustand,
  [],
  [],
  Trainee
>;

export type UserCreator = StateCreator<
  Trainer & Trainee & UserZustand,
  [],
  [],
  UserZustand
>;

export type CalendarCreator = StateCreator<CalendarState>;

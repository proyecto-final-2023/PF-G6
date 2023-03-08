import create from "zustand";
import { StateCreator } from "zustand";
import { EventInput } from "@fullcalendar/core";
import { UserCardT, UserDetailsT } from "./dash/user";
import { TraineePlan } from "./dash/trainer";
import { ParsedTrainer } from "@/utils/adminHelpers";
import { ParsedTrainee } from "@/utils/dashboard/traineeHelpers";

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
  trainerBasicsArr: ParsedTrainer[];

  trainerDetails: ParsedTrainer;

  fetchTrainerBasicsArr: (page: number) => Promise<void>;

  fetchTrainerDetails: (id: string) => Promise<void>;

  updateLogo: (logoUrl: string, userId: string) => Promise<Boolean>;

  deactivateAccount: (userId: string) => Promise<Boolean>;

  updatePlanData: (
    planData: TraineePlan,
    planId: string,
    trainerId: string
  ) => Promise<void>;
}

// * Does the actual exercise (trainee)
export interface Trainee {
  traineeBasicsArr: ParsedTrainee[];

  traineeDetails: ParsedTrainee;

  fetchTraineeBasicsArr: (page: number) => Promise<void>;

  fetchTraineeDetails: (id: string) => Promise<void>;

  removeComment: (commentId: string) => Promise<Boolean>;

  deactivateAccount: (userId: string) => Promise<Boolean>;
}

export type TrainerCreator = StateCreator<Trainer & Trainee, [], [], Trainer>;

export type TraineeCreator = StateCreator<Trainer & Trainee, [], [], Trainee>;

export type CalendarCreator = StateCreator<CalendarState>;

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: string | null;
  roles: string[];
  groups: IGroup[];
  answers: IAnswer[];
  messages: IMessage[];
}

// export interface IGroupExercises {
//   id: number;
//   name: string;
//   subject: string;
//   users: IUser[];
// }

export interface IExercise {
  id: number;
  title: string;
  instruction: string;
  subject: string;
  status: number;
  created_at: string;
  published_at: null | string;
  groupExercises: IGroupExercises[];
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  number: number;
  content: string;
  teacherAnswer: string;
  exerciseId: number;
}

export interface IAnswer {
  id: number;
  question_id: number;
  user_id: number;
  student_answer: string;
}

export interface IGroup {
  id: number;
  name: string;
  level: string;
  description: string;
  groupExercises: IGroupExercises[];
  user: IUser[];
}

export interface IMessage {
  id: string;
  author: string;
  picture: string;
  content: string;
}

interface IGroupExercise {
  id: number;
  title: string;
  instruction: string;
  created_at: string;
  published_at: string;
  subject: string;
  group_id: number;
  exercise_id: number;
  status: number;
  user_id: number;
  is_done: number;
}

interface IUserExercise {
  id: number;
  title: string;
  exercise_id: number;
  user_id: number;
  is_done: number;
}

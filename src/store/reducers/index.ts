// Imports individual reducers for different parts of the application
import answerReducer from "./answer.ts";
import chatReducer from "./chat.ts";
import groupReducer from "./group.ts";
import exerciseReducer from "./exercise.ts";
import questionReducer from "./question.ts";
import settingsReducer from "./settings.ts";
import studentReducer from "./student.ts";
import userReducer from "./user.ts";

// Combines all reducers into a single root reducer object
const reducer = {
  answer: answerReducer,
  chat: chatReducer,
  group: groupReducer,
  exercise: exerciseReducer,
  question: questionReducer,
  settings: settingsReducer,
  student: studentReducer,
  user: userReducer,
};

export default reducer;

import { IUser, IGroup, IExercise /* IQuestion */ } from "./types/types";

export const UserData: IUser[] = [
  {
    id: 1,
    firstname: "Jean",
    lastname: "Dujardin",
    email: "jean.dujardin@gmail.com",
    password: "profjean",
    picture: "src/assets/user.png",
    roles: ["enseignant", "user"],
  },
  {
    id: 2,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.com",
    password: "johndoe",
    picture: "src/assets/user.png",
    roles: ["eleve", "user"],
  },
  {
    id: 3,
    firstname: "Alice",
    lastname: "Smith",
    email: "alice.smith@hotmail.com",
    password: "alicesmith",
    picture: "src/assets/user.png",
    roles: ["eleve", "user"],
  },
];

export const ExerciseData: IExercise[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    instruction:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic maiores et rerum reprehenderit fugiat, ipsa, perspiciatis perferendis nisi deleniti, exercitationem dicta tempora labore in voluptatibus?",
    status: 0,
    created_at: "2024-02-10",
    published_at: null,
    groups: [
      {
        id: 3,
        name: "Chocolat",
        subject: "Mathématiques",
        users: [
          {
            id: 1,
            firstname: "Jean",
            lastname: "Dujardin",
            email: "jean.dujardin@gmail.com",
            password: "profjean",
            picture: "src/assets/user.png",
            roles: ["enseignant", "user"],
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@gmail.com",
            password: "johndoe",
            picture: "src/assets/user.png",
            roles: ["eleve", "user"],
          },
          {
            id: 3,
            firstname: "Alice",
            lastname: "Smith",
            email: "alice.smith@hotmail.com",
            password: "alicesmith",
            picture: "src/assets/user.png",
            roles: ["eleve", "user"],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    instruction:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic maiores et rerum reprehenderit fugiat, ipsa, perspiciatis perferendis nisi deleniti, exercitationem dicta tempora labore in voluptatibus?",
    status: 1,
    created_at: "2024-02-10",
    published_at: null,
    groups: [
      {
        id: 6,
        name: "Vanille",
        subject: "Français",
        users: [
          {
            id: 1,
            firstname: "Jean",
            lastname: "Dujardin",
            email: "jean.dujardin@gmail.com",
            password: "profjean",
            picture: "src/assets/user.png",
            roles: ["enseignant", "user"],
          },
          {
            id: 2,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@gmail.com",
            password: "johndoe",
            picture: "src/assets/user.png",
            roles: ["eleve", "user"],
          },
          {
            id: 3,
            firstname: "Alice",
            lastname: "Smith",
            email: "alice.smith@hotmail.com",
            password: "alicesmith",
            picture: "src/assets/user.png",
            roles: ["eleve", "user"],
          },
        ],
      },
    ],
  },
];

export const GroupData: IGroup[] = [
  {
    id: 3,
    name: "Chocolat",
    level: "Terminale",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci est fuga voluptatem!",
    subject: "Mathématiques",
    exercises: [
      {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        subject: "Français",
        status: 0,
      },
    ],
    users: [
      {
        id: 1,
        firstname: "Jean",
        lastname: "Dujardin",
        email: "jean.dujardin@gmail.com",
        password: "profjean",
        picture: "src/assets/user.png",
        roles: ["enseignant", "user"],
      },
      {
        id: 2,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com",
        password: "johndoe",
        picture: "src/assets/user.png",
        roles: ["eleve", "user"],
      },
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice.smith@hotmail.com",
        password: "alicesmith",
        picture: "src/assets/user.png",
        roles: ["eleve", "user"],
      },
    ],
  },
  {
    id: 6,
    name: "Vanille",
    level: "Sixième",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, provident!",
    subject: "Français",
    exercises: [
      {
        id: 2,
        title: "Lorem ipsum dolor sit amet.",
        subject: "Français",
        status: 1,
      },
    ],
    users: [
      {
        id: 1,
        firstname: "Jean",
        lastname: "Dujardin",
        email: "jean.dujardin@gmail.com",
        password: "profjean",
        picture: "src/assets/user.png",
        roles: ["enseignant", "user"],
      },
      {
        id: 2,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com",
        password: "johndoe",
        picture: "src/assets/user.png",
        roles: ["eleve", "user"],
      },
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice.smith@hotmail.com",
        password: "alicesmith",
        picture: "src/assets/user.png",
        roles: ["eleve", "user"],
      },
    ],
  },
];

// will dynamically get the chnage handler with the name
// every input has the same changeHandler (since we use event to handle changes)
import { InputData } from "@/types/components";

const data: InputData[] = [
  {
    label: "First Name",
    name: "first_name",
    type: "text",
  },
  {
    label: "Last Name",
    name: "last_name",
    type: "text",
  },
  {
    label: "Nickname",
    name: "nick_name",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    label: "Mobile Phone Number",
    name: "phone",
    type: "text",
  },
  {
    label: "House Phone Number",
    name: "cell",
    type: "text",
  },
];

export default data;

// first_name: userBot.name.first,
// last_name: userBot.name.last,
// nick_name: userBot.login.username,
// email: userBot.email,
// password: await encPassword(userBot.login.password),
// phone: userBot.phone,
// cell: userBot.cell,

// ? cannot add these here
// imgURL: userBot.picture.large,
// gender: userBot.gender,
// rol: "bot",

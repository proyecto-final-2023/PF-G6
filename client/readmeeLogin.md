import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const photo=user?.photoURL

- do something like this instead, no idea of where it was suposed to go tho
  {user && <Image src={user.photo} alt="hola"/>}

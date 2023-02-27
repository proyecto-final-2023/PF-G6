import axios from "axios";

export default async () => {
  // Check if the user is authenticated by calling an API route

  const { data } = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`);

  // If the user is not authenticated, redirect them to the login page
  if (!data.auth) {
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_FRONT_DEPLOY}/login`,
        permanent: false,
      },
    };
  }

  // If the user is authenticated, render the protected page
  return {
    props: {},
  };
};

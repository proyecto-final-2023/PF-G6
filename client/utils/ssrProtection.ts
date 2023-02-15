import axios from "axios";

export default async () => {
  // Check if the user is authenticated by calling an API route
  const { data } = await axios("http://localhost:3000/api/auth");

  // If the user is not authenticated, redirect them to the login page
  if (!data.auth) {
    return {
      redirect: {
        destination: "http://localhost:3000",
        permanent: false,
      },
    };
  }

  // If the user is authenticated, render the protected page
  return {
    props: {},
  };
};

import Cookies from "universal-cookie";

export const getCookie = (key: string) => {
  const cookies = new Cookies();
  const value = cookies.get(key);

  return value;
};

export const setCookie = (key: string, value: any) => {
  const cookies = new Cookies();
  cookies.set(key, value);
};

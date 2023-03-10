import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";
import { FormEvent, ChangeEvent } from "react";

type UserData = {
  first_name: string;
  last_name: string;
  nickname: string;
  imgURL: string;
  gender: string;
  phone: string;
};

const UpdateUserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    nickname: "",
    imgURL: "",
    gender: "",
    phone: "",
    
  });

  const [imgUrl, setimgUrl] = useState("");
  const [image, setImage] = useState<File>();

  const uploadImage = (image:File) => {
    if (!image) return;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDY_NAME || "no cloud name";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "basic-img-preset");
    data.append("cloud_name", cloudName);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
      .then((res) => {
        setimgUrl(res.data.secure_url);

        setUserData(prev => ({...prev, imgURL: res.data.secure_url,}))
      })
      .catch((err) => console.log(err));
  };

  console.log(userData)
  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      uploadImage(file);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const key = getCookie("token");
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/perfil`,
          "",
          {
            headers: {
              "x-access-token": key
            }
          }
        );
        const { first_name, last_name, nickname, imgURL, phone, gender } = data;
        setUserData({ first_name, last_name, nickname, imgURL, phone, gender });
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const key = getCookie("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/data`,
        userData,
        {
          headers: {
            "x-access-token": key
          }
        }
      );
      alert("Data updated");
      window.history.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-[89.5vh] bg-[url('/tail-imgs/gym-bg.jpg')] bg-no-repeat bg-cover bg-bottom bg-fixed">
      <div className="flex flex-col w-[80%] md:w-[40%] font-semibold bg-[#6f6f70]/80 rounded-lg focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 m-auto text-m p-10">
        <form onSubmit={handleSubmit}>
          <label className="text-white">
            First Name:
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleInputChange}
              className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label>
            Nickname:
            <input
              type="text"
              name="nickname"
              value={userData.nickname}
              onChange={handleInputChange}
              className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imgURL"
              value={userData.imgURL}
              onChange={handleInputChange}
              className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="block w-full h-[1.5rem] my-3 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              className="my-3 ml-2 rounded-md"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <div>
            <div>
              <input
                type="file"
                onChange={updateImage}
                className="text-red-100"
              ></input>
            </div>
            <img src={imgUrl} className='w-20' alt="" />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-xl w-[30vw] md:w-[10rem] hover:text-orange-500 border-4 bg-slate-600 items-center self-center rounded-xl hover:w-60 ease-in-out duration-300 mt-5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;

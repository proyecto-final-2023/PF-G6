import axios from "axios";
import { useState, useEffect } from "react";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import { IoCloudUpload } from "react-icons/io5";

export default function Logo() {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const key = getCookie("token");

  const uploadImage = (): void => {
    if (!image) return;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDY_NAME || "";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "basic-img-preset");
    data.append("cloud_name", cloudName);
    try {
      // subimos la imagen a cloudy
      axios
        .post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          data
        )
        .then((res) => {
          alert("successfully");
          setImgUrl(res.data.secure_url);
          console.log(res.data.secure_url);
          // subimos la url a la base de datos
          axios
            .put(
              `${process.env.NEXT_PUBLIC_API_URL}/trainers/logo`,
              { logo: res.data.secure_url },
              {
                headers: { "x-access-token": key },
              }
            )
            .then((res) => {
              alert("  successfully");
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center bg-[url('/tail-imgs/logo2.png')] bg-no-repeat bg-cover  bg-bottom min-h-screen">
      <label className="flex flex-col items-center justify-center w-80 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <img src={imgUrl} alt="" width={60} height={60}/>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">FIT-U</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF, PNG, JPG or GIF (MAX. 1080x72/0px)
          </p>
        </div>
        <button className="" onClick={uploadImage}>
          <IoCloudUpload />
          Upload
        </button>
      </label>
      <input
        type="file"
        onChange={updateImage}
        placeholder="image"
        className="border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:text-white "
      ></input>
    </div>
  );
}

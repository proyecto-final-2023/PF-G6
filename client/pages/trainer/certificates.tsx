import axios from "axios";
import { useState } from "react";
import { getCookie } from "@/utils/cookieHandler";
import { IoCloudUpload } from "react-icons/io5";

export default function Certificates() {
  const [imgUrl, setimgUrl] = useState("");
  const [image, setImage] = useState<File>();
  const [certi, setCerti] = useState({
    name: "",
    type: "",
    description: "",
    url: ""
  });
  const key = getCookie("token");

  const uploadImage = () => {
    if (!image) return;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDY_NAME || "";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "basic-img-preset");
    data.append("cloud_name", cloudName);
    try {
      // subimos la imagen a cloudy
      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
        .then((res) => {
          alert("successfully");
          setimgUrl(res.data.secure_url);
          setCerti({
            name: "",
            type: "",
            description: "",
            url: res.data.secure_url
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };
  const handleChange = (e) => {
    setCerti({ ...certi, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // subimos la imagen  a la base de datos
      if (certi.url) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/trainers/certificates`,
            certi,
            {
              headers: { "x-access-token": key }
            }
          )
          .then((res) => {
            alert("listo");
            console.log(res.data);
          });
      } else {
        alert("espere");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center bg-[url('/tail-imgs/logo2.png')] bg-no-repeat bg-cover  bg-bottom min-h-screen ">
      <label className="flex flex-col  m-auto h-64 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center  justify-center pt-5 pb-6">
          <img src={imgUrl} alt="" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">FIT-U</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF, PNG, JPG or GIF (MAX. 1080x72/0px)
          </p>
        </div>
        <button onClick={uploadImage}>
          {" "}
          <IoCloudUpload /> <br />
          Upload
        </button>
      </label>
      <label className="flex flex-col  m-auto h-50  mb-2 text-sm font-medium text-gray-900 dark:text-white ">
        <input
          type="file"
          onChange={updateImage}
          placeholder="image"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></input>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={certi.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <input
              type="text"
              name="type"
              value={certi.type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={certi.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            className="text-white  items-center   bg-gray-600 m-10 hover:bg-yellow-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            type="submit"
          >
            Submit
          </button>
        </form>
      </label>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";

export default function BasicCloudy() {
  const [imgUrl, setimgUrl] = useState("");
  const [image, setImage] = useState<File>();

  const uploadImage = () => {
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
      })
      .catch((err) => console.log(err));
  };

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={updateImage}
          className="text-red-100"
        ></input>
        <button onClick={uploadImage}>Upload</button>
      </div>
      <img src={imgUrl} alt="" />
    </div>
  );
}

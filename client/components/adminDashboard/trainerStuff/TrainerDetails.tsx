import axios from "axios";
import { FormEvent, useState } from "react";
import useStore from "@/store/dashStore";

export default function TrainerDetails() {
  const [image, setImage] = useState<File>();
  const trainerDetails = useStore((state) => state.trainerDetails);
  const deactivateTrainer = useStore((state) => state.deactivateAccount);

  const uploadImage = () => {
    if (!image) {
      console.error("No image to upload");
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDY_NAME || "no cloud name";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "basic-img-preset");
    data.append("cloud_name", cloudName);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
      .then((res) => {
        const imgUrl = res.data.secure_url;
        if (!imgUrl || !trainerDetails.user_id) {
          console.error("Could not update logo");
          return;
        }
        // updateLogo(imgUrl, trainerDetails.user_id);
        updateDbLogo(imgUrl);
        window.alert("Updated logo :D");
      })
      .catch((err) => console.error(err));
  };

  const updateDbLogo = async (url: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/logo/${trainerDetails.trainer_id}`,
        { logo: url },
        {
          headers: {
            "x-access-token": process.env.NEXT_PUBLIC_ADMIN_KEY
          }
        }
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadImage();
  };

  const handleDelete = async () => {
    if (!(await deactivateTrainer(trainerDetails.user_id)))
      console.error("Could not delete user");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col relative">
      <p>Name: {trainerDetails.name}</p>
      <p>Role: Trainer</p>

      <div>
        <p>Profile image</p>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0])}
          className="text-red-100"
        ></input>
      </div>

      <button className="py-2 px-3 bg-green-700 rounded">Update</button>

      <button
        type="button"
        onClick={handleDelete}
        className="py-2 px-3 bg-red-700 rounded absolute top-0 right-0"
      >
        Delete
      </button>
    </form>
  );
}

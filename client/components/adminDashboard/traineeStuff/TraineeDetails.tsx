import { FormEvent, useState } from "react";
import useStore from "@/store/dashStore";
import axios from "axios";

export default function TraineeDetails() {
  // make a request to get the user details
  const [image, setImage] = useState<File>();
  const traineeDetails = useStore((state) => state.traineeDetails);
  const deactivateTrainee = useStore((state) => state.deactivateAccount);

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
        if (!imgUrl || !traineeDetails.user_id) {
          console.error("Could not update logo");
          return;
        }

        updateDbLogo(imgUrl).then(() => {
          window.alert("Updated logo :D");
        });
      })
      .catch((err) => console.error(err));
  };

  const updateDbLogo = async (url: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/logo/${traineeDetails.trainee_id}`,
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
    if (!(await deactivateTrainee(traineeDetails.user_id)))
      console.error("Could not delete user");
  };

  // console.log("trainee details", traineeDetails);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col relative">
      <p>Name: {traineeDetails.name}</p>
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

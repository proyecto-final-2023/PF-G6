import { FormEvent, useState } from "react";
import useStore from "@/store/dashStore";
import axios from "axios";

export default function TraineeDetails() {
  const traineeDetails = useStore((state) => state.traineeDetails);
  const deactivateTrainee = useStore((state) => state.deactivateAccount);

  const [image, setImage] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const uploadImage = () => {
    if (!image) {
      console.error("No image to upload");
      return;
    }
    setUploading(true);

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
          setUploading(false);
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
    setUploading(true);
    if (!(await deactivateTrainee(traineeDetails.user_id)))
      console.error("Could not delete user");
    setUploading(false);
  };

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

      <button
        disabled={uploading}
        className="py-2 px-3 bg-green-700 rounded disabled:bg-green-900"
      >
        Update
      </button>

      <button
        type="button"
        disabled={uploading}
        onClick={handleDelete}
        className="py-2 px-3 bg-red-700 disabled:bg-red-900 rounded absolute top-0 right-0"
      >
        Delete
      </button>
    </form>
  );
}

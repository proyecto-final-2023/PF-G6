import useStore from "@/store/dashStore";
import axios from "axios";
import { FormEvent, useState } from "react";

// ? Only be able to change Logo & Plan Details
// changeTrainerDetails: () => void;
// deleteTrainer: () => void;
// updateTrainer: () => void;
export default function TrainerDetails({ user_id }: { user_id: string }) {
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const trainerDetails = useStore((state) => state.trainerDetails);
  const deactivateTrainer = useStore((state) => state.deactivateAccount);
  const updateLogo = useStore((state) => state.updateLogo);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("https://api.cloudinary.com/v1_1/gymapp/image/upload", {
        file: image,
        upload_preset: "basic-img",
        cloud_name: "dfixfnldt"
      })
      .then((res) => {
        setImgUrl(res.data.secure_url);
      });
    updateLogo(imgUrl, trainerDetails.user_id).catch((err) =>
      console.error(err + "could not upload image")
    );
  };

  const handleDelete = async () => {
    if (!(await deactivateTrainer(user_id)))
      console.error("Could not delete user");
  };

  return (
    <form onSubmit={(e) => handleSubmit} className="flex flex-col relative">
      <p>Name: {trainerDetails.name}</p>
      <p>Role: Trainer</p>

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

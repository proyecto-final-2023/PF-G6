import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import useStore from "@/store/dashStore";

export default function TrainerDetails({ user_id }: { user_id: string }) {
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef<HTMLInputElement | null>(null);
  const trainerDetails = useStore((state) => state.trainerDetails);
  const deactivateTrainer = useStore((state) => state.deactivateAccount);
  const updateLogo = useStore((state) => state.updateLogo);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formImage = imgRef.current?.files?.[0];

    await axios
      .post(
        "cloudinary://251359677135396:eKSfHg5oI4Gne4ycURrowN7k3oI@dfixfnldt",
        {
          file: formImage,
          upload_preset: "basic-img",
          cloud_name: "dfixfnldt"
        }
      )
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

  console.log(imgUrl, "imgUrl");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col relative">
      <p>Name: {trainerDetails.name}</p>
      <p>Role: Trainer</p>

      <label>
        Profile image
        <input type="file" ref={imgRef} />
      </label>

      {imgUrl && (
        <img src={imgUrl} alt="profile" className="w-20 h-20 rounded-full" />
      )}

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

import BasicCloudy from "@/components/BasicCloudy";
import { useState } from "react";

export default function Xcloud() {
  const [imgUrl, setImgUrl] = useState("");

  const updateImgUrl = (url: string) => {
    setImgUrl(url);
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <BasicCloudy {...{ imgUrl }} {...{ updateImgUrl }} />
      <h1>{imgUrl}</h1>
    </div>
  );
}

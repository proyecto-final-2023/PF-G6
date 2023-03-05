import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { getCookie } from "@/utils/cookieHandler";

const key = getCookie("token");
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [planStart, setPlanStart] = useState("");
  const [planEnd, setPlanEnd] = useState("");

  useEffect(() => {
    axios
      .post("https://fp-server-cg2b.onrender.com/user/perfil", null, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        console.log(data.data);
        const startDateObj = new Date(data.data.membership.startDate);
        const endDateObj = new Date(data.data.membership.finishDate);
        const currentDateObj = new Date();

        const totalDays = Math.round(
          (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
        );
        const daysElapsed = Math.round(
          (currentDateObj - startDateObj) / (1000 * 60 * 60 * 24)
        );
        const progressPercentage = Math.round((daysElapsed / totalDays) * 100);

        setProgress(progressPercentage);
        setPlanStart(`Plan starting date: ${data.data.membership.startDate}`);
        setPlanEnd(`Plan finishing date: ${data.data.membership.finishDate}`);
      });
  }, []);

  return (
    <div style={{ width: "200px", height: "200px" }}>
      <CircularProgressbar
        className="mt-0 h-[30vh] text-left"
        value={progress}
        text={`Plan progress ${progress}%`}
        styles = {buildStyles({
            textColor: "orange",
            pathColor: "orange",
            trailColor: "white",
            textSize: "10px"
          })}
      />
    </div>
  );
};

export default ProgressBar;
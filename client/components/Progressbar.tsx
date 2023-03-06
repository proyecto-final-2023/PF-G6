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
      .post(`http://localhost:3001/user/perfil`, null, {
        headers: { "x-access-token": key },
      })
      .then((data) => {
        const startDateObj = new Date(data.data.membership.startDate);
        const endDateObj = new Date(data.data.membership.finishDate);
        const currentDateObj = new Date();

        const totalDays = Math.round(
          (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
        );
        const daysElapsed = Math.round(
          (currentDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
        );
        const progressPercentage = (totalDays > 0) ? Math.round((daysElapsed / totalDays) * 100) : 0;

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
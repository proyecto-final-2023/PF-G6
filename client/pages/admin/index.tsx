import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataViewContainer from "@/components/adminDashboard/DataViewContainer";
import GraphContainer from "@/components/adminDashboard/GraphContainer";
import OptionMenu from "@/components/adminDashboard/OptionMenu";
// import CentralContainer from "@/components/adminDashboard/CentralContainer";
import EditableTablePlans from "@/components/adminDashboard/EditablePlans";
import EditableTableUser from "@/components/adminDashboard/EditableUser";
import EditableComments from "@/components/adminDashboard/EditableComments";
import EditableTableTrainees from "@/components/adminDashboard/EditableTrainees";
import EditableTableTrainer from "@/components/adminDashboard/EditableTrainers";
import { getCookie } from "@/utils/cookieHandler";

const returnMapping = {
  user: <EditableTableUser />,
  comments: <EditableComments />,
  planestrainer: <EditableTablePlans />,
  trainees: <EditableTableTrainees />,
  trainers: <EditableTableTrainer />,
  default: <EditableTableUser />
};

export default function AdminIndex() {
  const theCookie = getCookie("token");
  const router = useRouter();

  const [option, setOption] = useState("default");

  const changeOption = (option: string) => {
    setOption(option);
  };

  // check if the user is admin, if not send him to landing page
  useEffect(() => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/perfil`,
          {},
          {
            headers: {
              "x-access-token": theCookie
            }
          }
        )
        .then((res) => {
          if (res.data.role !== "admin") router.replace("/");
        })
        .catch((err) => {
          router.replace("/");
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="mt-20">
      <DataViewContainer />
      <GraphContainer />
      <div className="flex gap-10">
        <OptionMenu optionChanger={changeOption} currSelection={option} />
        <div>{returnMapping[option as keyof typeof returnMapping]}</div>
      </div>
    </div>
  );
}

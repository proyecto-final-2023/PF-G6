import cookie from "cookie";
import { GetServerSideProps } from "next";
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
import axios from "axios";
import { useRouter } from "next/router";

const returnMapping = {
  user: <EditableTableUser />,
  comments: <EditableComments />,
  planestrainer: <EditableTablePlans />,
  trainees: <EditableTableTrainees />,
  trainers: <EditableTableTrainer />,
  default: <EditableTableUser />
};

export default function AdminIndex(props: { isAdmin: boolean }) {
  const router = useRouter();
  if (!props.isAdmin) router.replace("/home");

  const [option, setOption] = useState("default");

  const changeOption = (option: string) => {
    setOption(option);
  };

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get cookie then api call to check if user is admin
  const { req } = context;
  const cookies = cookie.parse(req.headers.cookie || "1313");
  const myCookie = cookies["token"];
  let isAdmin = false;

  try {
    const res: { data: { role: string } } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/perfil`,
      {},
      {
        headers: {
          "x-access-token": myCookie
        }
      }
    );
    isAdmin = res.data.role === "admin";
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      isAdmin
    }
  };
};

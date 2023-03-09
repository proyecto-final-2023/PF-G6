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

export default function AdminIndex(props: { isAdmin: boolean }) {
  const router = useRouter();
  if (!props.isAdmin) router.replace("/home");
  else console.log("Hewo sexy sir Admin uwu~");

  // const [token, setToken] = useState("");
  // const ticcAss = getCookie("token");
  // console.log(ticcAss, "props.myCookie");

  const [option, setOption] = useState("");

  const changeOption = (option: string) => {
    setOption(option);
  };

  // return (
  //   <div className="mt-20">
  //     <DataViewContainer />
  //     <GraphContainer />
  //     <div className="flex gap-10">
  //       <OptionMenu optionChanger={changeOption} currSelection={option} />
  //       <div>
  //         <h1>User</h1>
  //         <EditableTableUser />
  //         <h1>Comentarios</h1>
  //         <EditableComments />
  //         <h1>Planes</h1>
  //         <EditableTablePlans />
  //         <h1>Trainers</h1>
  //         <EditableTableTrainer />
  //         <h1>Trainees</h1>
  //         <EditableTableTrainees />
  //       </div>
  //     </div>
  //   </div>
  // );

  switch (option) {
    case "comments":
      return (
        <div className="mt-20">
          <DataViewContainer />
          <GraphContainer />
          <div className="flex gap-10">
            <OptionMenu optionChanger={changeOption} currSelection={option} />
            <div>
              <h1>Comentarios</h1>
              <EditableComments />
            </div>
          </div>
        </div>
      );
    case "planes trainer":
      return (
        <div className="mt-20">
          <DataViewContainer />
          <GraphContainer />
          <div className="flex gap-10">
            <OptionMenu optionChanger={changeOption} currSelection={option} />
            <div>
              <h1>Planes</h1>
              <EditableTablePlans />
            </div>
          </div>
        </div>
      );
    case "trainees":
      return (
        <div className="mt-20">
          <DataViewContainer />
          <GraphContainer />
          <div className="flex gap-10">
            <OptionMenu optionChanger={changeOption} currSelection={option} />
            <div>
              <h1>Trainees</h1>
              <EditableTableTrainees />
            </div>
          </div>
        </div>
      );
    case "trainers":
      return (
        <div className="mt-20">
          <DataViewContainer />
          <GraphContainer />
          <div className="flex gap-10">
            <OptionMenu optionChanger={changeOption} currSelection={option} />
            <div>
              <h1>Trainers</h1>
              <EditableTableTrainer />
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="mt-20">
          <DataViewContainer />
          <GraphContainer />
          <div className="flex gap-10">
            <OptionMenu optionChanger={changeOption} currSelection={option} />
            <div>
              <h1>User</h1>
              <EditableTableUser />
            </div>
          </div>
        </div>
      );
  }
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

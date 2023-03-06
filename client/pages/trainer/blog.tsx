
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookieHandler";
import Link from "next/link";


interface BlogPost {
  message: string;
  trainee: {
    id_trainee: string;
    membership: {
      id_membership: string;
      user: {
        id: string;
        nickname: string;
        imgURL: string;
      }
    }
  }
}


export default function blog() {
  const [members, setMembers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const key = getCookie("token");

  const fetchInfo = async () => {
    try {
      const response = await axios.get("https://fp-server-cg2b.onrender.com/trainers/comment", {
        headers: { "x-access-token": key }
      });

      const data: BlogPost[] = response.data;
      const newMessages: string[] = data.map((post) => post.message);
      const newMembers: string[] = data.map((post) => post.trainee.membership.user.nickname);

      setMembers(newMembers);
      setMessages(newMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="h-[92vh] bg-[url('/bgs/contact.jpg')]  bg-no-repeat bg-cover ">
      <div className="pt-[82px] ">
        <div className="pt-2 mx-auto flex-initial">
        <Link href='/trainer' className="py-4">
        <button className="mx-auto text-center border border-white bg-black bg-opacity-50 backdrop-blur-md px-2 py-1 hover:text-amber-500"> Back to My Profile</button>
        </Link>
        </div>
        
        <div className="w-[35%] mx-auto py-4">
        {messages.map((message, index) => (
          <div key={index} className="card py-4 ">
            <div className="card-body border text-center mx-32 py-2 backdrop-blur-md bg-black bg-opacity-60">
            <p className="card-text py-2 text-left px-2">Author: {members[index]}</p>
              <h5 className="card-title py-2 border-t">Message: {message}</h5>
              
            </div>
          </div>
        ))}
        </div>
        
      </div>
    </div>
  );
}

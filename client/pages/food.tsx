import React from "react";
import CardList from "@/components/Food";

export default function FoodPage(){
    return(
        <div>
            <CardList />
            <a className="text-lg hover:text-orange-500 border-4 bg-slate-600 items-center w-40 self-center rounded-xl hover:w-60 ease-in-out duration-300" href="javascript:history.back()">Go Back</a>
        </div>
    );
}
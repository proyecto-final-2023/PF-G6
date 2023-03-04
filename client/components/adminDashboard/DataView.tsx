import React from "react";

function DataView({ money, title }: { money?: number, title:string }) {
  return (
    <div >
      <p className="text-xl">{title}</p>
      <p>{money}</p>
    </div>
  );
}

export default DataView;

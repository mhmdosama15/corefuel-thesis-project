import React from "react";

const GridCard = ({ title, picture }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="border border-[#dadada] rounded-lg h-[14rem] w-[18rem] xl:h-[17rem] xl:w-[20rem]">
        <img
          src={picture}
          alt=""
          className="h-full w-full xl:max-h-[17rem] xl:max-w-[20rem] rounded-lg object-cover"
        />
      </div>
      <p className=" text-blue-700 font-bold text-xl">{title}</p>
    </div>
  );
};

export default GridCard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useSelector } from "react-redux";

const Username = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/auth/add-username`,
        {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-10 items-center justify-center px-6 xl:px-0  h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:min-h-[32rem] lg:min-w-[32rem] lg:max-w-[32rem] p-6 border border-[#dadada] justify-between items-center text-center rounded bg-white shadow-md"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Create a username?</h2>
          <p className="text-sm">One gymrat added to the family</p>
          <input
            id="name"
            className="bg-white border border-[#dadada] rounded w-72 mt-6 px-4 py-2"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-6 mt-6">
          <Link
            to={"/signup"}
            className="border border-[#dadada] bg-white text-black px-4 py-2"
          >
            Back
          </Link>
          <button
            type="submit"
            className="border border-[#dadada] bg-white text-black px-4 py-2"
          >
            Finish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Username;

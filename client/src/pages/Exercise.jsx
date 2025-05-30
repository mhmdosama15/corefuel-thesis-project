import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setNoteState } from "../redux/userSlice";
import ExerciseTable from "../components/ExerciseTable";
import axios from "axios";
import { BACKEND_URL } from "../utils";
const Exercise = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [enabled, setEnabled] = useState(false);
  const savedNote = useSelector((state) => state.user.note || "");
  const [note, setNote] = useState(savedNote);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const toggleEdit = () => {
    if (enabled) {
      saveNote();
      dispatch(setNoteState(note));
    }
    setEnabled(!enabled);
  };
  const saveNote = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/save-exercise-note`,
        { content: note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNote = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/get-exercise-notes`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        dispatch(setNoteState(response.data.note.content));
        setNote(response.data.note.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="flex flex-col px-6 lg:px-30 pb-30 gap-6 pt-10 lg:pt-24">
      <div className="flex flex-col lg:flex-row items-start border-b border-b-[#dadada] gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col font-bold gap-4">
          <p>Exercises</p>
          <Link
            to={"/exercise/create"}
            className="border text-nowrap font-bold border-[#dadada] px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white"
          >
            Add Exercise
          </Link>
        </div>
        <ExerciseTable />

        {/* <div className="grid grid-cols-2 text-center gap-1  ">
          <div className="border rounded bg-blue-500 text-white text-center px-4 py-1">
            <p> Minutes</p>
          </div>
          <div className="border rounded bg-blue-500 text-white text-center px-4 py-1">
            <p> Calories Burned</p>
          </div>
          <p className="border px-4 py-1 rounded">1</p>
          <p className="border px-4 py-1 rounded">100</p>
        </div> */}
      </div>
      {/* <div className="flex flex-col lg:flex-row items-start border-b border-b-[#dadada] gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col gap-4">
          <p>Strength Training</p>
          <Link
            to={"/exercise/create"}
            className="border border-[#dadada] px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white"
          >
            Add Exercise
          </Link>
        </div>
        <div className="grid grid-cols-3 text-center  gap-1">
          <div className="border rounded bg-blue-500 text-white text-center px-4 py-1">
            <p> Sets</p>
          </div>
          <div className="border rounded bg-blue-500 text-white text-center px-4 py-1">
            <p> Reps/Set</p>
          </div>
          <div className="border rounded bg-blue-500 text-white text-center px-4 py-1">
            <p> Weight/Set</p>
          </div>
          <p className="border px-4 py-1 rounded">1</p>
          <p className="border px-4 py-1 rounded">100</p>
          <p className="border px-4 py-1 rounded">1</p>
        </div>
      </div> */}
      <div className="flex flex-col font-bold gap-4">
        <p>Exercise Notes</p>
        <div className="flex justify-end">
          <button
            onClick={toggleEdit}
            className="border cursor-pointer border-[#dadada] px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white"
          >
            {enabled ? "Save Note" : "Edit Note"}
          </button>
        </div>
        <div className="border min-h-44 max-h-full border-[#dadada]">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={!enabled}
            className="h-full w-full px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Exercise;

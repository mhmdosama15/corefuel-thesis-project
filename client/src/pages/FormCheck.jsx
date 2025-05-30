import React, { useEffect, useState } from "react";
import PictureTwo from "../assets/images/pic2.jpg";
import AutoCompleteInput from "../components/AutoCompleteInput";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const FormCheck = () => {
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/search-exercise`,
        {
          title: name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        setExerciseData(response.data.search);
        setShowExerciseDetails(true);
        localStorage.setItem(
          "exerciseData",
          JSON.stringify(response.data.search)
        );
        localStorage.setItem("showDetails", true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const storedData = localStorage.getItem("exerciseData");
    const showDetails = localStorage.getItem("showDetails");
    if (storedData) {
      setExerciseData(JSON.parse(storedData));
    }
    if (storedData) {
      setShowExerciseDetails(showDetails);
    }
  }, []);
  return (
    <div className="flex flex-col px-6 lg:px-30 pb-20 lg:pb-30  gap-4 pt-10 lg:pt-24">
      <h2 className="text-3xl font-bold">Form Check</h2>
      <p>Enter the exercise you want to review for form checking.</p>
      <div className="grid xl:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className=" flex  gap-10     ">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="exercise-name" className="text-lg ">
                Exercise Name:
              </label>
              {/* <input
                id="exercise-name"
                placeholder="e.g Chest Press"
                className="bg-white border border-[#dadada] rounded w-72  px-4 py-2"
              /> */}
              <AutoCompleteInput
                id={"exercise-name"}
                placeholder={"e.g Chest press"}
                setName={setName}
                autocompleteValue={autocompleteValue}
                setAutocompleteValue={setAutocompleteValue}
                loading={loading}
              />
            </div>
            {/* <div className="flex flex-col gap-3">
             <label htmlFor="exercise type" className="text-lg font-bold">
               Exercise type:
             </label>
             <select
               id="exericse-type"
               className="bg-white border border-[#dadada] rounded w-72  px-4 py-2"
             >
               <option>Cardio</option>
               <option>Strength</option>
             </select>
           </div> */}
            {/* <div className="flex flex-col gap-3">
             <label htmlFor="mins" className="text-lg font-bold">
               How Long:
             </label>
             <div className="flex items-center gap-2">
               <input
                 id="mins"
                 type="number"
                 className="bg-white border border-[#dadada] rounded  px-4 py-2"
               />
               <span>Minutes</span>
             </div>
           </div> */}
            {/* <div className="flex flex-col gap-3">
             <label htmlFor="calories" className="text-lg font-bold">
               Calories Burned:
             </label>
             <div className="flex items-center gap-2">
               <input
                 id="calories"
                 type="number"
                 className="bg-white border border-[#dadada] rounded  px-4 py-2"
               />
               <span>kcal</span>
             </div>
           </div> */}
         
          </div>
        </form>
     
        {loading ? (
          <p>Loading...</p>
        ) : (
          (exerciseData.length > 0 || showExerciseDetails) &&
          exerciseData.map((data, index) => (
            <React.Fragment key={index}>
              <Link
                to={`https://drive.google.com/file/d/${data.videoUrlID}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-white group shadow-sm border h-96 overflow-hidden border-[#dadada] rounded"
              >
                <img
                   src={`/assets/exercise-thumbnails/${data._id}.PNG`}
                  alt={data.title}
                  className="w-full h-full group-hover:scale-105 transition duration-300 object-cover "
                  loading="lazy"
                />
              </Link>
              <div className="p-6 bg-white shadow-sm hide-scrollbar border h-96 overflow-scroll hide-scrollbar border-[#dadada] rounded">
                <h2 className="text-lg font-semibold">{data.title}</h2>
                <p className="text-gray-600">
                  Category: <span>{data.subCategory}</span>
                </p>

                <h3 className="mt-4 font-medium">Steps:</h3>
                <ul className="list-disc pl-5">
                  {data.description.split(". ").map((step, index) => (
                    <li key={index}>
                      <strong>{step.split(": ")[0]}:</strong>{" "}
                      {step.split(": ")[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default FormCheck;

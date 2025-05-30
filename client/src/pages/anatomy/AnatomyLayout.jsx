import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useSelector } from "react-redux";
const AnatomyLayout = () => {
  const { category } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [exercises, setExercises] = useState([]);
  const subCategories = {
    chest: ["upper pec", "middle pec", "lower pec"],
    legs: ["hamstrings", "quads", "calves"],
    shoulders: ["front delt", "middle delt", "rear delt", "traps"],
    back: ["upper back", "middle back", "lower back"],
    arm: ["triceps", "biceps"],
    core: ["abs", "obliques","hip flexors"],
  };
  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/get-exercises/${category}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        setExercises(response.data.exercisevideos);
        localStorage.setItem(
          "exercises",
          JSON.stringify(response.data.exercisevideos)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [category]);

  return (
    <div className="flex flex-col items-center px-6 lg:px-30 pb-20 lg:pb-30 gap-4 pt-10 lg:pt-24">
      <h2 className="text-2xl pb-10 capitalize">{category} Anatomy</h2>

      {/* Loop through each subcategory */}
      {subCategories[category]?.map((subCategoryName, index) => {
        const filteredExercises = exercises.filter((exercise) =>
          exercise.subCategory
            .toLowerCase()
            .includes(subCategoryName.toLowerCase())
        );

        return (
          <div
            key={index}
            className="w-full flex flex-col  items-center justify-center"
          >
            <h3 className="text-xl font-semibold text-center py-4">
              {subCategoryName.length > 0 ? subCategoryName : "No exercises"}
            </h3>
            <div className="grid grid-cols-1  md:grid-cols-2 w-full lg:grid-cols-3 gap-10">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise._id}
                  className="transition duration-300 ease-linear hover:scale-105 border pb-4 border-[#dadada] text-black text-center lg:w-96 rounded-lg"
                >
                  <div className="mb-2">
                    <img
  src={`/assets/exercise-thumbnails/${exercise._id}.PNG`}
                      alt={exercise.title}
                      className="w-full h-96 object-cover "
                      // loading="lazy"
                    />
                  </div>
                  <div className="px-4">
                    <h2 className="font-semibold pb-4">{exercise.title}</h2>
                    <Link
                      to={`/anatomy/details/${exercise._id}`}
                      className="border px-4 py-2 rounded-lg border-[#dadada] bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      View Exercise details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnatomyLayout;

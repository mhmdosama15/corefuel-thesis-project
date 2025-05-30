import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import exerciseNames from "../exercises.json";
import CoreImage from "../assets/images/core.jpg";  // Import the images
import ChestPressImage from "../assets/images/chest.jpeg";  // Chest Press image
import BackImage from "../assets/images/Back.jpg";  // Back image
import LegsImage from "../assets/images/Legs.jpg";  // Legs image
import ShouldersImage from "../assets/images/shoulders.jpg";  // Shoulders image


const AutoCompleteInput = ({
  theme,
  setName,
  setAutocompleteValue,
  autocompleteValue,
  label,
  placeholder,
  id,
  loading,
  customStyles = {},
}) => {
  const [selectedExerciseImage, setSelectedExerciseImage] = useState(null);

  const baseStyles = {
    width: {
      xs: "90%",
      sm: "80%",
      md: "70%",
      lg: "100%",
    },
    maxWidth: "350px",
  };

  const filterOptions = (options, state) => {
    const inputValue = state.inputValue.toLowerCase();
    const exactMatches = options.filter(
      (option) => option.name.toLowerCase() === inputValue
    );
    const partialMatches = options.filter(
      (option) =>
        option.name.toLowerCase().includes(inputValue) &&
        option.name.toLowerCase() !== inputValue
    );

    const sortedOptions = [...exactMatches, ...partialMatches];
    return sortedOptions.slice(0, 5);
  };


  const imageMap = {
    "V-Ups": CoreImage,
    "Knee to Elbow": CoreImage,
    "Plank": CoreImage,
    "Chest Press": ChestPressImage,
    "Chest Dips": ChestPressImage,
    "Incline Dumbbell Press": ChestPressImage,
    "Machine Chest Press": ChestPressImage,
    "Pec Deck": ChestPressImage,
    "Back-seated lat pull downs": BackImage,
    "Lat Pull Down": BackImage,
    "Lat Push downs": BackImage,
    "Single arm lat pull down": BackImage,
    "Wide grip cable rows": BackImage,
    "Arnold Shoulder Press": ShouldersImage,
    "Barbell Shoulder Press": ShouldersImage,
    "Leaning Reverse Press": ShouldersImage,
    "Leaning Shoulder Curl": ShouldersImage,
    "Shoulder Press": ShouldersImage,
    "Shrugs": ShouldersImage,
    "Calf Raise": LegsImage,
    "Leg Curl": LegsImage,
    "Leg Extensions": LegsImage,
    "Squats": LegsImage,
  };
  

  return (
    <>
      <Autocomplete
        id={id}
        clearOnBlur={false}
        disablePortal
        options={exerciseNames}
        getOptionLabel={(option) => option.name}
        sx={{
          ...baseStyles,
        }}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
            slotProps={{
              inputLabel: {
                style: { color: "#a3a3a3" },
              },
            }}
            sx={{ width: "350px" }}
          />
        )}
        value={autocompleteValue}
        onChange={(event, value) => {
          if (value) {
            setName(value.name);
            setAutocompleteValue(null);
            // Set the image of the selected exercise from the image map
            setSelectedExerciseImage(imageMap[value.name] || null);
          }
        }}
      />
   <button
              type="submit"
              disabled={loading}
              className="px-4 mt-6 py-2 rounded bg-blue-500 text-white w-32"
            >
              Search
            </button>
      {/* Display the image when an exercise is selected */}
      {selectedExerciseImage && (
        <div className="mt-20">
          <img
            src={selectedExerciseImage} // Use the imported image directly
            alt="Exercise"
            className="w-full h-36 object-contain"
          />
        </div>
      )}
    </>
  );
};

export default AutoCompleteInput;

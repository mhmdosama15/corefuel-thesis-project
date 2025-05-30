import React, { useEffect, useState } from "react";

const StepProfile = () => {
  const [gender, setGender] = useState(sessionStorage.getItem("gender") || "");
  const [dob, setDob] = useState(sessionStorage.getItem("dob") || "");
  const [location, setLocation] = useState(
    sessionStorage.getItem("location") || ""
  );

  useEffect(() => {
    sessionStorage.setItem("gender", gender);
  }, [gender]);

  useEffect(() => {
    sessionStorage.setItem("dob", dob);
  }, [dob]);

  useEffect(() => {
    sessionStorage.setItem("location", location);
  }, [location]);

  return (
    <div className="flex flex-col text-center items-center gap-3">
      <h2 className="font-bold">
        Please select which gender we should use to calculate your calorie
        needs.
      </h2>

      <div className="flex flex-col items-center gap-4">
        <p className="font-bold">Gender:</p>
        <div className="flex items-center gap-10">
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ml-2" htmlFor="male">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="ml-2" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="dob" className="font-bold">
            Date of birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border bg-white p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="font-bold">
            Where do you live?
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border bg-white p-2"
            required
          />
        </div>

        <p className="text-sm">
          This information is used to calculate an accurate calorie goal for
          you.
        </p>
      </div>
    </div>
  );
};

export default StepProfile;

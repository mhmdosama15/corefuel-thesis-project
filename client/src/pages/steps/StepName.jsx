import React, { useEffect, useState } from "react";

const StepName = () => {
  const [firstName, setFirstName] = useState(
    sessionStorage.getItem("firstName") || ""
  );
  const handleChange = (e) => {
    setFirstName(e.target.value);
  };
  useEffect(() => {
    sessionStorage.setItem("firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    const storedFirstName = sessionStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">What's your first name?</h2>
      <p className="text-sm">One gymrat added to the family</p>
      <input
        id="name"
        value={firstName}
        onChange={handleChange}
        className="bg-white border border-[#dadada] rounded w-72 mt-6 px-4 py-2"
        required
      />
    </div>
  );
};

export default StepName;

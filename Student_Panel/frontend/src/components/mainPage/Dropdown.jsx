import React from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    navigate(event.target.value);
  };

  return (
    <div className="my-8">
      <select
        onChange={handleChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-xl"
      >
        <option value="/">Select Test</option>
        <option value="/mbti">MBTI</option>
        <option value="/disc">DISC</option>
        <option value="/ocean">OCEAN</option>
        <option value="/riasec">RIASEC</option>
        <option value="/emotional-intelligence">Emotional Intelligence</option>
        <option value="/hiremee">HireMee&#174;</option>
      </select>
    </div>
  );
};

export default Dropdown;

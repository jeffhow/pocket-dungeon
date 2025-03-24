import { useState } from "react";
import DropDown from "../utils/DropDown";
import AbilityPicker from "./AbilityPicker";

export default function NewCharacterForm() {
  const species = [
    { value: "human", label: "Human" },
    { value: "elf", label: "Elf" },
    { value: "dwarf", label: "Dwarf" },
  ];
  const classes = [
    { value: "fighter", label: "Fighter" },
    { value: "wizard", label: "Wizard" },
    { value: "cleric", label: "Cleric" },
  ];

  const [formData, setFormData] = useState({
    charName: "",
    charSpecies: "",
    charClass: "",
    str: 10,
    int: 10,
    wis: 10,
  });

  const [errors, setErrors] = useState("");
  const [pointPool, setPointPool] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      // submit the data
    } else {
      // report errors
      console.log(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // str, int, wis?
    if (name.length < 4) {
      const diff = (value - formData[name]);
      console.log(diff, value, formData[name], name)
      // if (Math.abs(diff) > pointPool) return;
      setPointPool((prevPool) => prevPool - diff);
    }

    // set new state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.charName) {
      errors.charName = "name is required";
    }
    if (pointPool > 0) {
      errors.pointPool = "You must spend all your ability points.";
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="charName"
          >
            Character Name
          </label>
          <input
            className={`appearance-none 
              block w-full bg-gray-200 
              text-gray-700 border  
              rounded py-3 px-4 mb-3 
              leading-tight focus:outline-none 
              focus:bg-white
              ${errors.charName && "border-red-500"}`}
            id="charName"
            type="text"
            placeholder="Strider"
            name="charName"
            value={formData.charName}
            onChange={handleChange}
          />
          {errors.charName && (
            <p className="text-red-500 text-xs italic">{errors.charName}</p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <div className="relative">
            <DropDown
              label="Species"
              id="charSpecies"
              name="charSpecies"
              options={species}
              selected={formData.charSpecies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <div className="relative">
            <DropDown
              label="Class"
              id="charClass"
              name="charClass"
              options={classes}
              selected={formData.charClass}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <div className="relative">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="pointPool"
            >
              Ability Points
            </label>
            <input
              className={`appearance-none 
              block w-full bg-gray-200 
              text-gray-700   
              rounded py-3 px-4 mb-3 
              leading-tight focus:outline-none 
              focus:bg-white
              ${errors.pointPool && "border-red-500"}`}
              id="pointPool"
              type="text"
              name="pointPool"
              value={pointPool}
              onChange={handleChange}
              disabled
            />
            {errors.pointPool && (
              <p className="text-red-500 text-xs italic">{errors.pointPool}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <h2 className="block">Choose your abilities</h2>
          <p className="flex items-center text-xs text-slate-500 mb-3">
            Adjust the numbers using the + and - controls.
          </p>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <AbilityPicker
            name="str"
            id="str"
            label="Strength"
            desc="Strength is useful for weapon attacks."
            value={formData.str}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <AbilityPicker
            name="int"
            id="int"
            label="Intelligence"
            desc="Intelligence is useful for magic attacks."
            value={formData.int}
            onChange={handleChange}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <AbilityPicker
            name="wis"
            id="wis"
            label="Wisdom"
            desc="Wisdom is useful for protection and healing."
            value={formData.wis}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="submit"
      >
        Play
      </button>
    </form>
  );
}

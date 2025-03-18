import { useState } from "react";
import Select from 'react-select';
import DropDown from "../utils/DropDown";

export default function NewCharacterForm() {

  const species = [
    { value: 'human', label: 'Human'},
    { value: 'elf', label: 'Elf' },
    { value: 'dwarf', label: 'Dwarf'}
  ]
  const classes = [
    {value: 'fighter', label: 'Fighter'},
    {value: 'wizard', label: 'Wizard'},
    {value: 'cleric', label: 'Cleric'},
  ]
  
  const [formData, setFormData] = useState({
    charName: "",
    charSpecies: "",
    charClass: "",
    str: "",
  });
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
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
            First Name
          </label>
          <input
            className={ errors.charName ? 
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" :
              "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            }
            id="charName"
            type="text"
            placeholder="Strider"
            name="charName"
            value={formData.charName}
            onChange={handleChange}
          />
          {errors.charName && <p className="text-red-500 text-xs italic">{errors.charName}</p>}

        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="charSpecies"
          >
            Species
          </label>
          <div className="relative">
            <DropDown id="charSpecies" name="charSpecies" options={species} selected={formData.charSpecies} onChange={handleChange}/>
          </div>
          
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="charClass"
          >
            Class
          </label>
          <div className="relative">
            <DropDown id="charClass" name="charClass" options={classes} selected={formData.charClass} onChange={handleChange}/>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="str"
          >
            Strength
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="str"
            type="number"
            placeholder="10"
          />
        </div>
      </div>
      <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
        Sign Up
      </button>
    </form>
  );
}

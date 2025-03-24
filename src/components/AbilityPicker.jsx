import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AbilityPicker({
  label,
  name,
  id,
  value,
  onChange,
  desc,
}) {
  const numInputClasses = `
     [appearance:textfield]
     [&::-webkit-outer-spin-button]:appearance-none 
     [&::-webkit-inner-spin-button]:appearance-none 
     appearance-none 

     inline 
     w-15 
     px-4 py-3
     
     text-center
     `;
  const controlClasses = `
     leading-tight 
     text-gray-700 
     bg-gray-200 
     
     border 
     border-gray-200 
     rounded 
    
     focus:outline-none 
     focus:bg-white 
     focus:border-gray-500"
    `;
  const [min, max] = [8, 18];

  const increaseAbility = () => {
    if (value === max) return;
    onChange({ target: { name, value: value + 1 } });
  };
  const decreaseAbility = () => {
    if (value === min) return;
    onChange({ target: { name, value: value - 1 } });
  };

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <em className="block flex items-center mb-2 text-xs text-slate-500">
        {desc}
      </em>
      <div className="relative flex item-center gap-2">
        <input
          className={`${numInputClasses} ${controlClasses}`}
          id={id}
          type="number"
          placeholder="10"
          value={value}
          name={name}
          onChange={onChange}
          min="8"
          max="18"
        />
        <button
          className={`h-8 w-8 inline my-auto px-2 flex items-center ${controlClasses}`}
          type="button"
          data-name={name}
          data-value={value}
          onClick={decreaseAbility}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
          className={`h-8 w-8 inline my-auto px-2 flex items-center ${controlClasses}`}
          type="button"
          data-name={name}
          data-value={value}
          onClick={increaseAbility}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
}

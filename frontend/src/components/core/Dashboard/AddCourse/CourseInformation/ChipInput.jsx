
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse && course?.tag?.length > 0) {
      setChips(course.tag);
    }

    register(name, {
      required: true,
      validate: (value) => value && value.length > 0,
    });
  }, [register, name, editCourse, course?.tag]);

  useEffect(() => {
    setValue(name, chips, { shouldValidate: true });
  }, [chips, name, setValue]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (index) => {
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#F1F2FF]" htmlFor={name}>
        {label} <sup className="text-[#EF476F]">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-[#9E8006] px-2 py-1 text-sm text-[#F1F2FF]"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
          {label} is required
        </span>
      )}
    </div>
  );
}


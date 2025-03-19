import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import EditCourse from "./../EditCourse/EditCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const { editCourse } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2 flex w-full select-none justify-center ">
        {steps.map((item) => (
          <React.Fragment key={item.id}>
            <div
              className="flex flex-col items-center "
              // key={item.id}
            >
              <div
                className={`grid  aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                    ${
                      step === item.id
                        ? "border-[#FFF970] bg-[#251400] text-[#FFF970]"
                        : "border-[#2C333F] bg-[#161D29] text-[#838894]"
                    }
                    ${step > item.id && "bg-[#FFF970] text-[#FFF970]"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-[#141414]" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {/* dashes  */}
            {item.id !== steps.length && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                  step > item.id ? "border-[#FFF970]" : "border-[#F1F2FF]00"
                } `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className={`sm:min-w-[130px] flex flex-col items-center gap-y-2 ${
              editCourse && "sm:min-w-[270px]"
            }`}
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-[#F1F2FF]" : "text-[#F1F2FF]00"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import Img from "./../../common/Img";

function Course_Card({ course, Height }) {
  
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  // console.log("count............", avgReviewCount)

  return (
    <div className="hover:scale-[1.03] transition-all duration-200 z-50 ">
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <Img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-[#F1F2FF]">{course?.courseName}</p>
            <p className="text-sm text-[#F1F2FF]0">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#FFF970]">{avgReviewCount || 0}</span>
              
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-[#717171]">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-[#F1F2FF]">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Course_Card;

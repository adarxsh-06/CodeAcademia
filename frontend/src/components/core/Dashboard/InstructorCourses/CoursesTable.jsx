import { useSelector } from "react-redux";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import Img from "./../../../common/Img";
import toast from "react-hot-toast";

export default function CoursesTable({
  courses,
  setCourses,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 25;

  // delete course
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
    // console.log("All Course ", courses)
  };

  // Loading Skeleton
  const skItem = () => {
    return (
      <div className="flex border-b border-[#161D29] px-6 py-8 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className="h-[148px] min-w-[300px] rounded-xl skeleton "></div>

          <div className="flex flex-col w-[40%]">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>

            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Table className="rounded-2xl border border-[#161D29] ">
        {/* heading */}
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-[#161D29] px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Actions
            </Th>
          </Tr>
        </Thead>

        {/* loading Skeleton */}
        {loading && (
          <div>
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}

        <Tbody>
          {!loading && courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-[#AFB2BF]">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-[#161D29] px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4 relative">
                  {/* course Thumbnail */}
                  <Img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-[#F1F2FF] capitalize">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-[#838894] ">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>

                    {/* created At */}
                    <p className="text-[12px] text-[#AFB2BF] mt-4">
                      Created: {formatDate(course?.createdAt)}
                    </p>

                    {/* updated At */}
                    <p className="text-[12px] text-[#AFB2BF] ">
                      updated: {formatDate(course?.updatedAt)}
                    </p>

                    {/* course status */}
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-[#2C333F] px-2 py-[2px] text-[12px] font-medium text-[#F37290]">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-[#2C333F] px-2 py-[2px] text-[12px] font-medium text-[#E7C009]">
                        <p className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E7C009] text-[#2C333F]">
                          <FaCheck size={8} />
                        </p>
                        Published
                      </div>
                    )}
                  </div>
                </Td>

                {/* course duration */}
                <Td className="text-sm font-medium text-[#AFB2BF]">
                  2hr 30min
                </Td>
                <Td className="text-sm font-medium text-[#AFB2BF]">
                  ₹{course.price}
                </Td>

                <Td className="text-sm font-medium text-[#AFB2BF] ">
                  {/* Edit button */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-[#05A77B]"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Delete button */}
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

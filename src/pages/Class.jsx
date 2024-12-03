import React, { useState } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import classData from "../json/class.json";

const Class = () => {
  const [selectedClassData, setSelectedClassData] = useState(
    classData[0]?.class || []
  );
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 9; // Max items per page

  const handleClassChange = (event) => {
    const className = Number(event.target.value);
    const selectedClass = classData.find(
      (classItem) => classItem.name === className
    );
    setSelectedClassData(selectedClass ? selectedClass.class : []);
    setCurrentPage(1); // Reset to first page when class changes
  };

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the data for the current page
  const currentItems = selectedClassData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(selectedClassData.length / itemsPerPage);

  return (
    <div className="w-10/12 m-auto mt-11 pt-10">
      <div className="bg-[#fff] rounded-xl p-4 h-[calc(85vh)] overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex justify-end me-4 mb-4 gap-4">
            <select
              onChange={handleClassChange}
              className="px-3 py-2 rounded-lg text-sm text-gray-700 border "
            >
              {classData.map((classItem, index) => (
                <option key={index} value={classItem.name}>
                  {classItem.name} анги
                </option>
              ))}
            </select>
            <button className="px-3 py-2 rounded-lg text-sm flex items-center gap-1 text-[#fff] bg-[#00BFA6]">
              <RiFileExcel2Line className="text-base" />
              Excel нэмэх
            </button>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg">
              <thead className="text-xs text-gray-900 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Нэр
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Нас
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Утасны дугаар
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Төлбөр
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student, studentIndex) => (
                  <tr key={studentIndex} className="bg-white border-b">
                    <td className="px-6 py-4">{`${student.firstName} ${student.lastName}`}</td>
                    <td className="px-6 py-4">{student.age}</td>
                    <td className="px-6 py-4">{student.phoneNumber}</td>
                    <td className="px-6 py-4">{student.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination controls */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2  text-sm disabled:opacity-20"
          >
            Өмнөх
          </button>
          <span className="self-center text-xs">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2  text-sm disabled:opacity-20"
          >
            Дараах
          </button>
        </div>
      </div>
    </div>
  );
};

export default Class;

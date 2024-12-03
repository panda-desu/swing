import React, { useState } from "react";
import dayjs from "dayjs";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import Dotdotdot from "react-dotdotdot";
import { FaTrash } from "react-icons/fa"; // Import trash icon for delete

const Home = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [schedules, setSchedules] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    text: "",
    startTime: "",
    endTime: "",
  });

  const daysInMonth = currentDate.daysInMonth();
  const startDay = (currentDate.startOf("month").day() + 6) % 7;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const changeMonth = (direction) => {
    setCurrentDate((prev) =>
      direction === "next" ? prev.add(1, "month") : prev.subtract(1, "month")
    );
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
    setIsAddingSchedule(false); // Reset to view schedules by default
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
    setNewSchedule({ text: "", startTime: "", endTime: "" });
  };

  const addSchedule = () => {
    if (!newSchedule.text || !newSchedule.startTime || !newSchedule.endTime)
      return;

    setSchedules((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newSchedule],
    }));
    closeModal();
  };

  const deleteSchedule = (scheduleIndex) => {
    setSchedules((prev) => {
      const updatedSchedules = [...prev[selectedDay]];
      updatedSchedules.splice(scheduleIndex, 1);
      return {
        ...prev,
        [selectedDay]: updatedSchedules,
      };
    });
  };

  return (
    <div className="w-10/12 m-auto mt-11 pt-10">
      <div className="p-6 max-w-full h-full mx-auto bg-[#fff] rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => changeMonth("prev")}
            className="w-[100px] py-1 border borer-[#BBD0FF] rounded-md text-[#4E58FF] hover:bg-[#BBD0FF]"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold ">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <button
            onClick={() => changeMonth("next")}
            className="w-[100px] py-1 border borer-[#BBD0FF] rounded-md text-[#4E58FF] hover:bg-[#BBD0FF]"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className={`${
                day === "Sun" || day === "Sat"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={i}></div>
          ))}
          {daysArray.map((day) => (
            <div
              key={day}
              className="w-[122px] h-[66px] flex items-center justify-center border rounded bg-[#fff] text-xl bg-opacity-80 text-[#4E58FF] text-center hover:text-opacity-20 cursor-pointer"
              onClick={() => openModal(day)}
            >
              <div>
                {day}
                <div className="text-sm text-gray-500 max-h-[20px] px-2">
                  {schedules[day] && (
                    <Dotdotdot clamp={1}>
                      {schedules[day]
                        .map((sch) => `${sch.startTime} - ${sch.endTime}`)
                        .join(", ")}
                    </Dotdotdot>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px]">
            <div className="flex items-center justify-between">
              <p className="text-xl mb-4">Schedules for {selectedDay}</p>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            {!isAddingSchedule ? (
              <div>
                <div className="mb-4 max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  {schedules[selectedDay] &&
                  schedules[selectedDay].length > 0 ? (
                    schedules[selectedDay].map((sch, index) => (
                      <div key={index} className="mb-2 flex justify-between">
                        <div>
                          <strong>
                            {sch.startTime} - {sch.endTime}
                          </strong>
                          : {sch.text}
                        </div>
                        <button
                          onClick={() => deleteSchedule(index)}
                          className="text-red-500 ml-2"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No schedules for this day.</p>
                  )}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsAddingSchedule(true)}
                      className="px-3 py-1 border rounded-lg mb-6 flex items-center gap-1 text-[#4E58FF] text-sm"
                    >
                      Хуваарь оруулах
                      <GoPlus className="text-base" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={newSchedule.text}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, text: e.target.value })
                  }
                  className="border p-2 w-full mb-4"
                  placeholder="Enter your schedule"
                />
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={newSchedule.startTime}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        startTime: e.target.value,
                      })
                    }
                    className="border p-2 flex-1"
                  />
                  <input
                    type="time"
                    value={newSchedule.endTime}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        endTime: e.target.value,
                      })
                    }
                    className="border p-2 flex-1"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={() => setIsAddingSchedule(false)}
                    className="px-3 py-1 border rounded-lg mb-6 flex items-center gap-1 text-sm hover:bg-opacity-80"
                  >
                    Back
                  </button>
                  <button
                    onClick={addSchedule}
                    className="px-3 py-1 border border-[#4E58FF] rounded-lg mb-6 flex items-center gap-1 text-[#4E58FF] text-sm hover:bg-opacity-80"
                  >
                    <GoPlus />
                    Нэмэх
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

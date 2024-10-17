import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([
    {
      name: "yasith silshan",
      date: "16-09-2024",
      reg: "FDSC2401",
    },
    {
      name: "ravindu silshan",
      date: "16-09-2024",
      reg: "FDSC2402",
    },
    {
      name: "pathum silshan",
      date: "16-09-2024",
      reg: "FDSC2403",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", date: "", reg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Function to handle adding a student
  const handleAddStudent = () => {
    if (isEditing) {
      // Update existing student
      const updatedStudents = students.map((student, index) =>
        index === editIndex ? newStudent : student
      );
      setStudents(updatedStudents);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new student
      setStudents([...students, newStudent]);
    }
    setNewStudent({ name: "", date: "", reg: "" });
    setShowModal(false);
  };

  // Function to handle deleting a student
  const handleDeleteStudent = (reg) => {
    const filteredStudents = students.filter((student) => student.reg !== reg);
    setStudents(filteredStudents);
  };

  // Function to handle editing a student
  const handleEditStudent = (index) => {
    setNewStudent(students[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition duration-200"
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setNewStudent({ name: "", date: "", reg: "" });
        }}
      >
        <FaPlus />
      </button>

      {/* Student List Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Student List</h1>

        {/* Table Headers */}
        <div className="grid grid-cols-4 bg-gray-200 p-4 rounded-t-lg text-gray-800 font-semibold">
          <div>Registration Number</div>
          <div>Name</div>
          <div>Date</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-4">
          {students.map((std, index) => (
            <div
              key={std.reg}
              className="grid grid-cols-4 justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <div className="text-gray-800 font-medium">{std.reg}</div>
              <div className="text-gray-600">{std.name}</div>
              <div className="text-gray-500">{std.date}</div>
              <div className="flex space-x-3">
                {/* Edit Button */}
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  aria-label="Edit"
                  onClick={() => handleEditStudent(index)}
                >
                  <FaEdit />
                </button>
                {/* Delete Button */}
                <button
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  aria-label="Delete"
                  onClick={() => handleDeleteStudent(std.reg)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding or Editing a Student */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Student" : "Add New Student"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={newStudent.date}
                  onChange={(e) => setNewStudent({ ...newStudent, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700">Registration Number</label>
                <input
                  type="text"
                  value={newStudent.reg}
                  onChange={(e) => setNewStudent({ ...newStudent, reg: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
                onClick={handleAddStudent}
              >
                {isEditing ? "Update Student" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

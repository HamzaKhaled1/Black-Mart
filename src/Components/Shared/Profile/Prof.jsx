import { useState } from "react";
import { deleteUser } from "../../../Helper/Apis/Admin/Users/deleteUser";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
export default function Prof({ name, email, role, flag, userid }) {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState({ userName: name, userEmail: email, userRole: role });
  const [isModified, setIsModified] = useState(false);
  console.log("user id", userid)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleUpdate = async () => {
    try {
      await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User info updated successfully!',
      });
      setIsModified(false); // Reset modified state after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user information. Please try again.',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(userid);
      console.log(response);
      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'User deleted successfully',
        });
        navigator('/login');
        localStorage.removeItem('loginData');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user. Please try again.',
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the account.',
      });
    }
  };

  return (
    <div className={`bg-white p-16 rounded-lg w-96 mb-6 ${flag ? "hidden" : "block"}`}>
      <h2 className="text-3xl font-extrabold mb-6">Profile</h2>
      <div className="space-y-4 h-3/4">
        <div>
          <label className="block text-lg font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="userName"
            value={userInfo.userName}
            className="mt-1 block w-full text-xl font-bold border p-2 rounded-xl"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="userEmail"
            value={userInfo.userEmail}
            className="mt-1 block w-full text-xl font-bold border p-2 rounded-xl"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{userInfo.userRole}</p>
        </div>
      </div>
      <div className="flex gap-5 w-full">
        <button
          onClick={handleUpdate}
          className={`bg-blue-100 text-white py-1 px-9 rounded-3xl text-xl hover:bg-blue-400 cursor-pointer ${isModified ? "block" : "hidden"}`}
        >
          Update
        </button>
        <button
          className="bg-red-100 text-white px-9 py-1 w-40 rounded-3xl text-xl hover:bg-red-400 cursor-pointer"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getAllUsers } from "../../Helper/Apis/Admin/Users/getAllUsers";
import style from "../../assets/CSS/Admin/OrderTables.module.css";
import { getEmail } from "../../Helper/Funcation/LocalStorage/GetEmail";
import { deleteUser } from "../../Helper/Apis/Admin/Users/deleteUser";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { blockUser } from "../../Helper/Apis/Admin/Users/blockUser";
import { unBlockUser } from "../../Helper/Apis/Admin/Users/unBlockUser";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await deleteUser(userId);
        if (response.status === 200) {
          toast.success("User has been deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBlock = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await blockUser(userId);
        if (response.status === 200) {
          toast.success("User has been blocked successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          Swal.fire("Error!", "Failed to block user.", "error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnBlock = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unblock it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await unBlockUser(userId);
        if (response.status === 200) {
          toast.success("User has been unblocked successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          Swal.fire("Error!", "Failed to unblock user.", "error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        let userData = await getAllUsers();
        console.log(userData.data.users);
        setUsers(userData.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [users]);
  return (
    <div className={style.ordertables}>
      <div className="title">Users List</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              {user.email === getEmail() ? (
                <td className={style.current}>
                  {" "}
                  <p>Current User</p>{" "}
                </td>
              ) : (
                <td className={style.actions}>
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleUnBlock(user._id)}
                      className={style.unblock}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user._id)}
                      className={style.block}
                    >
                      Block
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className={style.delete}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

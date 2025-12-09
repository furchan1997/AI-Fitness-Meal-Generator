import { useEffect } from "react";
import { useAuth } from "../../../context/auth.context";

function AdminDeshbored() {
  const { users, getUsersDetalis, tokenAuth } = useAuth();
  useEffect(() => {
    getUsersDetalis(tokenAuth);
  }, []);
  console.log("THR USERS:", users);
  return <div>THIS IS ADMIN DESHBORED</div>;
}

export default AdminDeshbored;

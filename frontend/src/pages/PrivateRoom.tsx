/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Outlet , Navigate } from "react-router-dom";

export default function PrivateRoom() {
    const currentUser = useSelector((state: any) => state.user.currentUser);
    return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
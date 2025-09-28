import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!token) return null; // show nothing if not logged in

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <User size={25} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 md:w-48">
         <DropdownMenuItem
          onClick={() => navigate("/account")}
          className="hover:bg-gray-50 transition"
        >
          {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/account")}
          className="hover:bg-gray-50 transition"
        >
          Account
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:bg-gray-50 transition"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

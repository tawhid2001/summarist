"use client";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";
import Image from "next/image";
import Logo from "../../../public/assets/logo.png";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("logout failed: ", error);
    }
  };
  return (
    <nav className="h-20">
      <div className="mx-auto flex h-full w-full max-w-[1070px] items-center justify-between px-6">
        <figure className="max-w-[200px]">
          <Image src={Logo} alt="Summarist logo" className="h-auto w-full" />
        </figure>

        <ul className="flex gap-6">
          {user ? (
            <li
              onClick={handleLogout}
              className="text-primary hover:text-accent cursor-pointer transition-colors duration-100"
            >
              Logout
            </li>
          ) : (
            <li
              onClick={() => dispatch(openAuthModal())}
              className="text-primary hover:text-accent cursor-pointer transition-colors duration-100"
            >
              Login
            </li>
          )}
          <li className="text-primary hidden cursor-not-allowed min-[577px]:block">
            About
          </li>
          <li className="text-primary hidden cursor-not-allowed min-[577px]:block">
            Contact
          </li>
          <li className="text-primary hidden cursor-not-allowed min-[577px]:block">
            Help
          </li>
        </ul>
      </div>
    </nav>
  );
}

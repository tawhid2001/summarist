"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";

import {
  FiHome,
  FiBookmark,
  FiEdit3,
  FiSearch,
  FiSettings,
  FiHelpCircle,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    {
      label: "For you",
      href: "/for-you",
      icon: FiHome,
    },
    {
      label: "My Library",
      href: "/library",
      icon: FiBookmark,
    },
    {
      label: "Highlights",
      href: null,
      icon: FiEdit3,
    },
    {
      label: "Search",
      href: null,
      icon: FiSearch,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-dvh w-[196px] shrink-0 flex-col overflow-y-scroll bg-[#f1f6f4] md:flex">
      {/* Logo */}
      <div className="p-4">
        <Image
          src="/assets/logo.png"
          alt="Summarist logo"
          width={160}
          height={40}
          className="h-auto w-full max-w-[160px]"
        />
      </div>

      {/* Top Navigation */}
      <nav className="mt-6 flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = item.href !== null && pathname === item.href;

          if (!item.href) {
            return (
              <div
                key={item.label}
                className="text-primary h-14 flex cursor-not-allowed border-l-[5px] border-transparent items-center gap-3 px-5 py-4"
              >
                <Icon className="text-2xl" />
                <span>{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`text-primary h-14 hover:bg-gray-200 flex items-center gap-3 border-l-2 px-5 py-4  ${
                isActive ? "border-accent border-l-[5px]" : "border-transparent"
              }`}
            >
              <Icon className="text-2xl" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto flex flex-col pb-6">
        <Link
          href="/settings"
          className={`text-primary h-14 hover:bg-gray-200 flex border-l-[5px] items-center gap-3 px-5 py-4 ${
            pathname === "/settings"
              ? "border-accent"
              : "border-transparent"
          }`}
        >
          <FiSettings className="text-2xl" />
          <span>Settings</span>
        </Link>
        <div className="text-primary h-14 flex cursor-not-allowed border-l-[5px] border-transparent items-center gap-3 px-5 py-4">
          <FiHelpCircle className="text-2xl" />
          <span>Help & Support</span>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-primary h-14 w-full  border-l-[5px] border-transparent hover:bg-gray-200 flex items-center gap-3 px-5 py-4"
          >
            <FiLogOut className="text-2xl" />
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={() => dispatch(openAuthModal())}
            className="text-primary h-14 w-full  border-l-[5px] border-transparent hover:bg-gray-200 flex items-center gap-3 px-5 py-4"
          >
            <FiLogIn className="text-2xl" />
            <span>Login</span>
          </button>
        )}
      </div>
    </aside>
  );
}

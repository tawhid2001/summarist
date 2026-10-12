"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";
import { setFontSize } from "@/redux/features/readerSlice";

import SidebarLogo from "../../../public/assets/logo.png";

import { RiFontSize } from "react-icons/ri";

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

type SidebarProps = {
  mobile?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isPlayerPage = pathname.startsWith("/player/");

  const user = useSelector((state: RootState) => state.auth.user);

  const fontSizes = [
    {
      size: 16,
      className: "text-base",
    },
    {
      size: 18,
      className: "text-lg",
    },
    {
      size: 20,
      className: "text-xl",
    },
    {
      size: 24,
      className: "text-2xl",
    },
  ];

  const fontSize = useSelector((state: RootState) => state.reader.fontSize);

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
    <aside
      className={`top-0 flex shrink-0 flex-col overflow-y-auto bg-[#f1f6f4] ${
        mobile
          ? "h-dvh w-full"
          : `sticky hidden w-[196px] md:flex ${
              isPlayerPage ? "h-[calc(100dvh-92px)]" : "h-dvh"
            }`
      }`}
    >
      {/* Logo */}
      <div className="p-4">
        <Image
          src={SidebarLogo}
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
              onClick={mobile ? onClose : undefined}
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

      {isPlayerPage && (
        <div className="flex items-center justify-center gap-4 px-4 mx-auto">
          {fontSizes.map((option) => {
            const isSelected = fontSize === option.size;

            return (
              <div
                key={option.size}
                onClick={() => dispatch(setFontSize(option.size))}
                className={`text-primary relative pb-2 font-medium w-full ${option.className} ${
                  isSelected &&
                  "after:bg-accent after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-[22px] after:-translate-x-1/2 after:content-['']"
                }`}
              >
                <RiFontSize />
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-auto flex flex-col pb-6">
        <Link
          href="/settings"
          onClick={mobile ? onClose : undefined}
          className={`text-primary h-14 hover:bg-gray-200 flex border-l-[5px] items-center gap-3 px-5 py-4 ${
            pathname === "/settings" ? "border-accent" : "border-transparent"
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

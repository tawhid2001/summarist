"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "@/redux/features/authModalSlice";
import { IoCloseOutline } from "react-icons/io5";
import { RootState } from "@/redux/store";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { FaCircleNotch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AuthModal() {
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register" | "reset">("login");
  const [loadingType, setLoadingType] = useState<
    "submit" | "guest" | "google" | "forgot" | null
  >(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isOpen = useSelector((state: RootState) => state.authModal.isOpen);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    setLoadingType("submit");
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      dispatch(closeAuthModal());
      router.push("/for-you");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;

          case "auth/weak-password":
            setError("Password must be at least 6 characters.");
            break;

          case "auth/email-already-in-use":
            setError("An account already exists with this email.");
            break;

          case "auth/invalid-credential":
            setError("Invalid email or password.");
            break;

          default:
            setError("Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoadingType(null);
    }
  };

  const handleGuestLogin = async () => {
    setLoadingType("guest");
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        "summarist.guest@gmail.com",
        "guest123",
      );

      dispatch(closeAuthModal());
      router.push("/for-you");
    } catch (error) {
      console.error(error);
      setError("Guest login failed. Please try again.");
    } finally {
      setLoadingType(null);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingType("google");
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(closeAuthModal());
      router.push("/for-you");
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setLoadingType(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    setLoadingType("forgot");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);

      setSuccess("Password reset email sent. Check your inbox and spam folder.");
    } catch (error) {
      console.error(error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;

          default:
            setError("Unable to send reset email. Please try again.");
        }
      }
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-[300px] rounded bg-white">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-3 right-3 text-3xl font-light"
        >
          <IoCloseOutline />
        </button>
        {mode === "reset" ? (
          <>
            <div className="px-6 py-10 pb-4">
              <h2 className="text-primary mb-4 text-center text-base font-semibold">
                Reset your password
              </h2>

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-5 h-11 w-full rounded border border-gray-400 px-4 outline-none focus:border-accent"
              />

              {error && (
                <p className="mb-3 rounded border bg-red-100 p-3 text-center text-xs text-red-500">
                  {error}
                </p>
              )}

              {success && (
                <p className="mb-3 rounded border bg-green-100 p-3 text-center text-xs text-green-600">
                  {success}
                </p>
              )}

              <button
                onClick={handleForgotPassword}
                disabled={loadingType !== null}
                className="bg-accent hover:bg-accent-hover text-primary flex h-11 w-full items-center justify-center rounded text-base disabled:opacity-60"
              >
                {loadingType === "forgot" ? (
                  <FaCircleNotch className="animate-spin text-xl mx-auto" />
                ) : (
                  <>Send reset password link</>
                )}
              </button>
            </div>

            <button
              className="w-full bg-[#f1f6f4] py-2 text-xs text-blue-500"
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
            >
              Go to login
            </button>
          </>
        ) : (
          <>
            <div className="px-6 py-10 pb-4">
              {/* Title */}
              <h2 className="text-primary mb-4 text-center text-base font-semibold">
                {mode === "login"
                  ? "Log in to Summarist"
                  : "Sign up to Summarist"}
              </h2>
              {/* Guest Button */}
              {mode === "login" && (
                <>
                  <button
                    onClick={handleGuestLogin}
                    disabled={loadingType !== null}
                    className="mb-4 flex h-8 w-full items-center rounded bg-[#4267b2] text-sm text-white"
                  >
                    {loadingType === "guest" ? (
                      <FaCircleNotch className="mx-auto text-xl animate-spin" />
                    ) : (
                      <>
                        <div className="flex h-full w-8 items-center justify-center text-xl">
                          <FaUser />
                        </div>

                        <div className="flex-1 text-center font-medium">
                          Login as a Guest
                        </div>
                      </>
                    )}
                  </button>

                  <Divider />
                </>
              )}

              {/* Google login */}

              <button
                onClick={handleGoogleLogin}
                disabled={loadingType !== null}
                className="my-4 rounded p-1 flex h-8 w-full items-center bg-[#4285f4] text-sm text-white"
              >
                {loadingType === "google" ? (
                  <FaCircleNotch className="animate-spin text-xl mx-auto" />
                ) : (
                  <>
                    <div className="flex rounded h-full w-8 items-center justify-center bg-white">
                      <FcGoogle className="text-xl" />
                    </div>
                    <span className="flex-1 text-center font-medium">
                      {mode === "login"
                        ? "Login with Google"
                        : "Sign up with Google"}
                    </span>
                  </>
                )}
              </button>

              <Divider />

              <form>
                {/* Email */}

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-4 mb-3 h-8 w-full rounded border border-gray-400 px-3 text-xs outline-none focus:border-accent"
                />

                {/* Password */}

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3 h-8 w-full rounded border border-gray-400 px-3 text-xs outline-none focus:border-accent"
                />

                {/* Login */}
                {error && (
                  <p className="mb-3 text-center text-xs bg-red-200 border rounded p-3 text-red-500">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loadingType !== null}
                  className="bg-accent hover:bg-accent-hover text-primary h-8 w-full rounded text-sm"
                >
                  {loadingType === "submit" ? (
                    <FaCircleNotch className="mx-auto text-xl animate-spin" />
                  ) : mode === "login" ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              {/* Forgot password */}
              {mode === "login" && (
                <button
                  onClick={() => {
                    setMode("reset");
                    setError("");
                    setSuccess("");
                  }}
                  className="mt-4 w-full text-center text-xs text-blue-500"
                >
                  Forgot your password?
                </button>
              )}
            </div>

            {/* Bottom Switch */}
            <button
              onClick={() =>
                setMode((prev) => (prev === "login" ? "register" : "login"))
              }
              className="w-full bg-[#f1f6f4] py-2 text-xs text-blue-500"
            >
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200"></div>
      <span className="text-xs text-gray-700">or</span>
      <div className="h-px flex-1 bg-gray-200"></div>
    </div>
  );
}

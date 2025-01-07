"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OtpVerification from "@/components/OtpVerification/OtpVerification";
import axios from "axios";
import useInventoryStore from "@/components/store/store";

const Page = () => {
  const { updateVerifyEmail } = useInventoryStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      console.log(status);
      router.push("/not-found");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    let response;
    try {
      // Check if the email exists in the database
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email`,
        { email }
      );

      if (response.data.status === 200) {
        setShowModal(true);
        updateVerifyEmail(email);
      } else {
        const errorMessage = response.data.message;
        console.log(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything while checking authentication status
  if (status === "loading") {
    return null;
  }

  // Only render the page content when not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all hover:scale-105">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Checking...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-8 m-4 max-w-xl w-full animate-fade-in-down">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <OtpVerification />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Page;

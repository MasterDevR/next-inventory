"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import FormModal from "../modal/form-modal";
import useInventoryStore from "@/components/store/store";
import { useQueryClient } from "@tanstack/react-query";

const CreateUserForm = () => {
  const queryClient = useQueryClient();
  const { token, updateSuccessModal, updateModalMessage, updateStatuss } =
    useInventoryStore();
  const [role, setRole] = useState();
  const [requestorTypes, setRequestorTypes] = useState([]);
  const [selectedRequestorType, setSelectedRequestorType] = useState("");
  const [invalidateFlag, setInvalidateFlag] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const fetchRequestorTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-requestor-type`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequestorTypes(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRequestorTypes();
  }, [token]);

  useEffect(() => {
    if (invalidateFlag) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setInvalidateFlag(false);
    }
  }, [invalidateFlag, queryClient]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("role", role);
      formData.set("requestor_type", selectedRequestorType);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/create-user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateSuccessModal(true);
      updateModalMessage(response.data.message);
      updateStatuss(response.data.status);
      setInvalidateFlag(true);
      const itemListTable = document.getElementById(`success`);
      if (itemListTable) {
        itemListTable.showModal();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <FormModal id="create-user" modalRef={modalRef}>
      <div className="w-full max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Information */}
          <div className="lg:sticky lg:top-4 bg-gray-50 p-6 rounded-xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Create User
                </h1>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  Important: Fill in all required details to create a new user
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Create a new user account by providing the required information
                below. Please ensure all fields are filled correctly.
              </p>
            </div>

            {/* Additional Guidelines */}
            <div className="space-y-4 text-sm text-gray-600">
              <div className="p-4 bg-white rounded-lg border border-gray-100">
                <h3 className="font-medium mb-2">Required Information:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Department ID and Code</li>
                  <li>Valid email address</li>
                  <li>Secure password</li>
                  <li>Profile image (optional)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <form className="space-y-4" onSubmit={submitHandler}>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Department ID
                  </label>
                  <input
                    name="department_id"
                    type="text"
                    required
                    placeholder="Enter department ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Department Code
                  </label>
                  <input
                    name="department_code"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Department
                  </label>
                  <input
                    name="department"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    name="Email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Optional: Leave blank if email is not available
                  </p>
                </div>
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    defaultValue="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Profile Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Requestor Type
                  </label>
                  <select
                    value={selectedRequestorType}
                    onChange={(e) => setSelectedRequestorType(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="">Select Requestor Type</option>
                    {requestorTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`mt-6 w-full px-4 py-2.5 text-white rounded-md
                  bg-blue-600 hover:bg-blue-700 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                `}
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormModal>
  );
};

export default CreateUserForm;

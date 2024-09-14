"use client";
import React, { useRef, useState } from "react";
import SelectRole from "../select/select-user-role";
import axios from "axios";
import FormModal from "../modal/form-modal";
import Input from "../input/Input";
import useInventoryStore from "@/components/store/store";
const CreateUserForm = () => {
  const { token, updateSuccessModal, updateModalMessage, updateStatuss } =
    useInventoryStore();
  const [role, setRole] = useState();
  const modalRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("role", role);
      console.log(role);
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
      <div className="modal-action flex flex-col">
        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <Input name="username" title={"UserName"} type={"text"} />
          <Input name="department_id" title={"Department ID"} type={"text"} />
          <Input
            name="department_code"
            title={"Department Code"}
            type={"text"}
          />
          <Input name="department" title={"Department"} type={"text"} />
          <Input name="Email" title={"Email"} type={"text"} />
          <Input
            name="password"
            title={"Password"}
            type={"text"}
            defaultValue={"password"}
          />

          <Input name="image" type={"file"} />

          <SelectRole setRole={setRole} />
          <button
            className="btn btn-success mt-5 w-full font-bold text-white"
            type="submit"
          >
            Create User
          </button>
        </form>
      </div>
    </FormModal>
  );
};

export default CreateUserForm;

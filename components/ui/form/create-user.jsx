"use client";
import React, { useRef, useState } from "react";
import SelectRole from "../select/select-user-role";
import styles from "@/public/style/modal-form.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import HideModal from "../button/hide-modal";
import FormModal from "../modal/form-modal";
const CreateUserForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const session = useSession();
  const modalRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const form = e.currentTarget;

      const token = session.data?.user.accessToken;
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

      console.log(response.data);
      setIsSuccess(true);
      setmessage(response.data.message);
      setStatus(response.data.status);
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
        <form
          className="flex w-full flex-wrap justify-around items-end gap-5"
          onSubmit={submitHandler}
        >
          <div className={`${styles.inputGroup} `}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              name="username"
              placeholder="username (optional)"
            />
            <label className={styles.userLabel} htmlFor="userInput">
              UserName
            </label>
          </div>
          <div className={`${styles.inputGroup} `}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              name="department_id"
              required
            />
            <label className={styles.userLabel} htmlFor="userInput">
              Department ID
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              name="department_code"
              required
            />
            <label className={styles.userLabel} htmlFor="userInput">
              Department Code
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              name="department"
              required
            />
            <label className={styles.userLabel} htmlFor="userInput">
              Department
            </label>
          </div>
          <div className={`${styles.inputGroup} `}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              name="email"
              placeholder="Email (optional)"
            />
            <label className={styles.userLabel} htmlFor="userInput">
              Email
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="userInput"
              className={styles.input}
              defaultValue={"password"}
              name="password"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="file"
              id="userInput"
              className="file-input file-input-bordered w-full max-w-xs"
              name="image"
              accept="image/jpeg, image/png"
            />
          </div>
          <div className={`${styles.inputGroup} relative`}>
            <SelectRole />
          </div>
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

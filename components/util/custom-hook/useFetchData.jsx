"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchData = async (path, token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const useFetchData = ({ path, token, key }) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(path, token),
    enabled: !!token, // Optional: ensure query runs only if token is available
  });
};

export default useFetchData;

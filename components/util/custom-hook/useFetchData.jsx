"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (path) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const useFetchData = ({ path, key }) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(path),
  });
};

export default useFetchData;

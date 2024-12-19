import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../../apis/projects";

export const useGetAllProjects = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: () => getAllProjects(),
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
};
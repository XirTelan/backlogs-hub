import { BacklogDTO, BacklogItemDTO } from "@/types";
import { useEffect, useState } from "react";

const useBacklogData = (userName: string, backlog: string, search: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBacklog, setCurrentBacklog] = useState<BacklogDTO>();
  const [categoriesMap, setCategoriesMap] = useState<Map<string, string>>();
  const [backlogData, setBacklogData] = useState<BacklogItemDTO[]>([]);

  const updateBacklogData = () => {
    if (!currentBacklog) return;
    getBacklogData({
      id: currentBacklog._id,
      search,
      setBacklogData,
      setIsLoading,
    });
  };

  useEffect(() => {
    if (!userName || !backlog) return;
    const getBacklogInfo = async () => {
      try {
        const data = await fetch(
          `/api/backlogs?userName=${userName}&backlog=${backlog}`,
        ).then((data) => data.json());
        setCurrentBacklog(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBacklogInfo();
  }, [userName, backlog]);

  useEffect(() => {
    if (!currentBacklog) return;

    const getCategories = () => {
      const categoriesMap = new Map();
      currentBacklog.categories.forEach((category) => {
        categoriesMap.set(category.name.toLowerCase(), category.color);
      });
      setCategoriesMap(categoriesMap);
    };

    getBacklogData({
      id: currentBacklog._id,
      search,
      setBacklogData,
      setIsLoading,
    });
    getCategories();
  }, [currentBacklog, search]);

  return {
    currentBacklog,
    categoriesMap,
    backlogData,
    isLoading,
    updateBacklogData,
  };
};

const getBacklogData = async ({
  id,
  search,
  setBacklogData,
  setIsLoading,
}: getBacklogDataProps) => {
  try {
    setIsLoading(true);
    const res = await fetch(`/api/backlogs/${id}/items${search}`);
    const data: BacklogItemDTO[] = await res.json();
    setBacklogData(data);
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export default useBacklogData;

type getBacklogDataProps = {
  id: string;
  search: string;
  setBacklogData: (data: BacklogItemDTO[]) => void;
  setIsLoading: (state: boolean) => void;
};

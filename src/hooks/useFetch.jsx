import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const customId = "custom-id-yes";

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json(); // Corrected from res.json to res.json()
      setData(data);
    } catch (error) {
      toast.error(`${error.message} while getting data`, {
        position: "top-center",
        toastId: customId,
        draggablePercent: 60,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading };
};

export default useFetch;

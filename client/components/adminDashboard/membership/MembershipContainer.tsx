import NavigationBtns from "@/components/trainterLibraries/NavigationBtns";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * todo: list :D
 * handles backend call to fetch memberships
 * handles search (may add later)
 */
type Membership = {
  
export default function MembershipsContainer() {
  const [page, setPage] = useState(1);
  const [memshi, setMemshi] = useState([])

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: [] } = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}/plans/trainers?page=${page}`
      );
      setPlans(data);
    };
    fetchData();
  }, [page]);

  return (
    <div>
      <h2 className="text-xl text-center">Memberships Container</h2>
      <NavigationBtns currentPage={page} {...{ nextPage }} {...{ prevPage }} />
      <p></p>
    </div>
  );
}

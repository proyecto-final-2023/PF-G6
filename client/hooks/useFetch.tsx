import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function useFetch(url: string, deps?: any[]) {
  const [data, setData] = useState<[] | {}>([]);
  const isMounted = useRef(true);
  // dev mode in REACT18 buggy so we need to use this
  const hasMountedOnce = useRef(true);

  const cancel = () => {
    isMounted.current = false;
  };

  useEffect(() => {
    if (!hasMountedOnce.current) return;

    const fetchData = async () => {
      const { data } = await axios(url);

      if (isMounted) {
        setData(data);
      }
    };

    fetchData();

    hasMountedOnce.current = false;
    return () => {
      cancel();
    };
  }, deps);

  return { data, setData, cancel };
}

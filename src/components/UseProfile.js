import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setData(data);
        setIsAdmin(data.admin);
        setLoading(false);
      });
    });
  }, []);
  return { loading, data, isAdmin };
}

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const session = useSession();
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((response) => {
          // Check if response is successful
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          // Parse response JSON
          return response.json();
        })
        .then((data) => {
          // Update user state with fetched data
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
          setLoading(false);
        })
        .catch((error) => {
          // Handle fetch error
          console.error("Error fetching profile data:", error);
          setLoading(false);
        });
    }
  }, [session, status]);

  return { loading, user, isAdmin, profileFetched, setProfileFetched, status };
}

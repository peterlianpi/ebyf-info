import { UsersProvider } from "@/components/UsersContext";
import UserListPage from "./UserList/page";

export default function Home() {
  return (
    <>
      <UsersProvider>
        <UserListPage />
      </UsersProvider>
    </>
  );
}

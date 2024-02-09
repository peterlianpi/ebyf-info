import UserItem from "@/components/UserItem";
import { UsersProvider } from "@/components/UsersContext";

export default function Home() {
  return (
    <>
      <UsersProvider>
        <UserItem />
      </UsersProvider>
    </>
  );
}

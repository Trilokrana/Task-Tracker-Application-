import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const authOptions = {
    secret: "process.env.NEXTAUTH_SECRET", 
    session: {
      strategy: "jwt",
    }, 
  };
  return (
    <main>
      <Login />
    </main>
  );
}

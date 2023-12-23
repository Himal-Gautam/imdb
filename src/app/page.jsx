import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <LoginForm />
    </main>
  );
}

import { getUser } from "@/actions/getUser";

export default async function Page() {
  const session = await getUser();

  console.log(session);
  return <div>{session?.user?.email}</div>;
}

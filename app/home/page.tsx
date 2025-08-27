import { getUser } from "@/actions/getUser";

export default async function Page() {
  const session = await getUser();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}

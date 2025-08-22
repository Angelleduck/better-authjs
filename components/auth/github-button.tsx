import { githubSignIn } from "@/actions/OAuth";
import GitHubIcon from "../icons/github-icon";

export function GithubButton() {
  async function githubLogin() {
    await githubSignIn();
  }

  return (
    <button
      onClick={githubLogin}
      className="flex flex-1 border rounded-md items-center justify-center py-2 hover:bg-black/5 transition"
    >
      <GitHubIcon className="h-5 w-5" />
    </button>
  );
}

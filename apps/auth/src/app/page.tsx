import { RedirectType, redirect } from "next/navigation";

export default function Index() {
	redirect("/sign-in", RedirectType.replace);
}

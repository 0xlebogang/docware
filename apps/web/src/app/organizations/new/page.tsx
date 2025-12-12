import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { Building, ChevronLeft, Link } from "lucide-react";

export default function NewOrganization() {
	return (
		<section className="flex min-h-screen bg-background px-4 dark:bg-transparent">
			<form className="max-w-92 m-auto h-fit w-full">
				<div className="p-6 h-[calc(100vh-66px)] flex flex-col justify-center">
					<Button asChild variant="link" className="absolute top-6 left-6">
						<Link href={process.env.NEXT_PUBLIC_SITE_URL || "#link"}>
							<ChevronLeft />
							<span>Back to Home</span>
						</Link>
					</Button>
					<div className="mb-8">
						<Building />
						<h1 className="mb-1 mt-4 text-xl font-semibold">
							Add Organization
						</h1>
						<p>Create a new organization</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<div className="flex justify-between w-full">
								<Label htmlFor="name" className="block text-sm">
									Name
								</Label>
							</div>
							<Input type="text" required name="name" id="name" />
						</div>
						<div className="space-y-2">
							<div className="flex justify-between w-full">
								<Label htmlFor="description" className="block text-sm">
									Description
								</Label>
							</div>
							<Textarea
								placeholder="A description for your new organization..."
								name="description"
								id="description"
							/>
						</div>

						<Button className="w-full flex justify-center items-center gap-2">
							Continue
						</Button>
					</div>
				</div>
			</form>
		</section>
	);
}

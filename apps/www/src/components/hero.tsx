import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export default function HeroSection() {
	return (
		<main className="overflow-hidden">
			<section className="relative">
				<div className="relative py-24 lg:py-28">
					<div className="mx-auto max-w-7xl px-6 md:px-12">
						<div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
							<a
								href="/features"
								className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
							>
								<span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
									New
								</span>
								<span className="text-sm">
									The future of project documentation
								</span>
								<span className="bg-(--color-border) block h-4 w-px"></span>

								<ArrowRight className="size-4" />
							</a>

							<h1 className="mt-8 text-4xl font-semibold md:text-5xl xl:text-5xl xl:leading-[1.125]">
								All the docs you need,
								<br />
								<span className="text-muted-foreground">
									in one browser tab.
								</span>
							</h1>
							<p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
								A unified documentation solution that consolidates all your
								project's documentation, both internal and external, into a
								single, convenient interface.
							</p>
							<p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
								A unified documentation solution that consolidates all your
								project's documentation into a single interface.
							</p>

							<div className="mt-8">
								<Button size="lg" asChild>
									<a href={import.meta.env.PUBLIC_SIGN_UP_URL} className="px-6">
										<span className="text-nowrap">Get started</span>
										<ChevronRight className="relative size-4" />
									</a>
								</Button>
							</div>
						</div>
						<div className="x-auto relative mx-auto mt-8 max-w-lg sm:mt-12">
							<div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_98%,--theme(--color-gray-200/75%)_98%),linear-gradient(to_right,transparent_94%,--theme(--color-gray-200/75%)_94%)] bg-size-[16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
							<div className="absolute inset-x-0 top-12 -z-1z mx-auto h-1/3 w-2/3 rounded-full bg-blue-300 blur-3xl dark:bg-white/20"></div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

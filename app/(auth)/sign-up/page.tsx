import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import GoogleButton from "@/components/google-button";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  return (
    <form action="" className="max-w-92 m-auto h-fit w-full">
      <div className="p-6">
        <div>
          <Link href="/" aria-label="go home">
            <LogoIcon />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">
            Create a Docware Account
          </h1>
          <p>Welcome! Create an account to get started</p>
        </div>

        <div className="mt-6">
          <GoogleButton />
        </div>

        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <hr className="border-dashed" />
          <span className="text-muted-foreground text-xs">
            Or continue With
          </span>
          <hr className="border-dashed" />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="block text-sm">
                First Name
              </Label>
              <Input type="text" required name="firstName" id="firstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="block text-sm">
                Last Name
              </Label>
              <Input type="email" required name="lastName" id="lastName" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">
              Email
            </Label>
            <Input type="email" required name="email" id="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="block text-sm">
              Password
            </Label>
            <Input type="password" required name="password" id="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="block text-sm">
              Confirm password
            </Label>
            <Input
              type="password"
              required
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>

          <Button className="w-full">Continue</Button>
        </div>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?
        <Button asChild variant="link" className="px-2">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </p>
    </form>
  );
}

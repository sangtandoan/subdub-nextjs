"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	email: z.email("Must be a valid email"),
	password: z
		.string()
		.min(6, "must be at least 6 characters long")
		.regex(
			/[A-Z]/,
			"must contain at least 1 uppercase, lowercase, number and special character",
		)
		.regex(
			/[a-z]/,
			"must contain at least 1 uppercase, lowercase, number and special character",
		)
		.regex(
			/[0-9]/,
			"must contain at least 1 uppercase, lowercase, number and special character",
		)
		.regex(
			/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/,
			"must contain at least 1 uppercase, lowercase, number and special character",
		),
});

export default function Login() {
	const [isShowPassword, setIsShowPassword] = useState(false);
	// 1. Define your form
	// Since FormField is using a controlled component, you need to provide a default value for the field.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler
	function onSubmit(values: z.infer<typeof formSchema>) {
		// TODO: send login request with typesave and validated data
		console.log(values);
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Card className="w-full max-w-sm gap-14 border-none py-20 shadow-none">
				<CardHeader className="flex flex-col items-center justify-center">
					<CardTitle className="text-2xl">Sign in with email</CardTitle>
					<CardDescription>Tracking your subscriptions. For free</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							className="flex w-full flex-col gap-6"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<div className="relative">
												<Mail
													className="icon-in-input left-2"
													size={20}
													strokeWidth={1.25}
												/>
												<Input
													className="border-none bg-gray-100 py-6 pl-8"
													placeholder="abc@gmail.com"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<LockKeyhole
													className="icon-in-input left-2"
													size={20}
													strokeWidth={1.25}
												/>
												<Input
													className="border-none bg-gray-100 py-6 pl-8"
													type={!isShowPassword ? "password" : "text"}
													placeholder="Secret@123"
													{...field}
												/>
												{!isShowPassword ? (
													<EyeOff
														onClick={() =>
															setIsShowPassword(!isShowPassword)
														}
														className="icon-in-input right-2"
														size={20}
														strokeWidth={1.25}
													/>
												) : (
													<Eye
														onClick={() =>
															setIsShowPassword(!isShowPassword)
														}
														className="icon-in-input right-2"
														size={20}
														strokeWidth={1.25}
													/>
												)}
											</div>
										</FormControl>
										<FormMessage />
										<div className="mt-1 flex justify-end">
											<Link className="text-sm" href="#">
												Forgot password?
											</Link>
										</div>
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col gap-8">
					<Button className="w-full py-6" type="submit">
						Login
					</Button>
					<div className="my-1 flex w-full items-center text-center">
						<span className="mx-2 flex-grow border border-gray-300 border-b"></span>
						<span className="whitespace-nowrap px-2 text-gray-500 text-sm">OR</span>
						<span className="mx-2 flex-grow border border-gray-300 border-b"></span>
					</div>
					<div className="text-sm">
						<span>Don't have account?</span>
						<Link href="#" className="ml-3 text-blue-700">
							Sign up
						</Link>
					</div>
					<div className="w-full">
						<Button className="w-full bg-transparent py-6 text-black shadow-accent-foreground hover:bg-primary hover:text-white">
							<FcGoogle />
							<span className="text-inherit">Continue with Google</span>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}

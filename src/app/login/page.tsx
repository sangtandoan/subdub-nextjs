"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
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
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="abc@gmail.com" {...field} />
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
								<Input placeholder="Secret@123" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
}

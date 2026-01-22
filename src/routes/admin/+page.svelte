<script lang="ts">
	import Header from "$components/header.svelte";
	import { Badge } from "$ui/badge";
	import { Button } from "$ui/button";
	import * as Card from "$ui/card";
	import * as Table from "$ui/table";
	import { Activity, Database, Shield, Users } from "lucide-svelte";

	let { data } = $props();

	const formatDate = (date: Date | string) => {
		return new Date(date).toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};

	const stats = $derived({
		totalUsers: data.users.length,
		adminUsers: data.users.filter((u) => u.role === "admin").length,
		regularUsers: data.users.filter((u) => u.role === "user").length,
		verifiedEmails: data.users.filter((u) => u.emailVerified).length
	});
</script>

<svelte:head>
	<title>Admin Panel - HAJI UTONG</title>
</svelte:head>

<Header
	menuItems={[
		{ name: "Home", href: "/" },
		{ name: "Store", href: "/store" },
		{ name: "Status", href: "/status" },
		{ name: "Feedback", href: "/feedback" },
		{ name: "Terms & FAQ", href: "/terms" }
	]}
/>

<div class="min-h-screen bg-background pt-20">
	<main class="mx-auto max-w-7xl px-6 py-12">
		<!-- Header -->
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold tracking-tight">Admin Panel</h1>
				<p class="text-muted-foreground">Manage users and system settings</p>
			</div>
			<Badge variant="default" class="flex items-center gap-2">
				<Shield class="size-4" />
				Admin Access
			</Badge>
		</div>

		<!-- Stats Grid -->
		<div class="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Total Users</Card.Title>
					<Users class="size-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{stats.totalUsers}</div>
					<p class="text-xs text-muted-foreground">All registered users</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Admins</Card.Title>
					<Shield class="size-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{stats.adminUsers}</div>
					<p class="text-xs text-muted-foreground">Admin accounts</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Regular Users</Card.Title>
					<Activity class="size-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{stats.regularUsers}</div>
					<p class="text-xs text-muted-foreground">Standard accounts</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Verified Emails</Card.Title>
					<Database class="size-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{stats.verifiedEmails}</div>
					<p class="text-xs text-muted-foreground">Email verified accounts</p>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Users Table -->
		<Card.Root>
			<Card.Header>
				<Card.Title>User Management</Card.Title>
				<Card.Description>View and manage all registered users</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Email</Table.Head>
							<Table.Head>Role</Table.Head>
							<Table.Head>Email Verified</Table.Head>
							<Table.Head>Created At</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.users as user}
							<Table.Row>
								<Table.Cell class="font-medium">
									<div class="flex items-center gap-2">
										{#if user.image}
											<img src={user.image} alt={user.name} class="size-8 rounded-full" />
										{:else}
											<div
												class="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
											>
												{user.name.charAt(0).toUpperCase()}
											</div>
										{/if}
										{user.name}
									</div>
								</Table.Cell>
								<Table.Cell>{user.email}</Table.Cell>
								<Table.Cell>
									{#if user.role === "admin"}
										<Badge variant="default">
											<Shield class="mr-1 size-3" />
											Admin
										</Badge>
									{:else}
										<Badge variant="secondary">User</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell>
									{#if user.emailVerified}
										<Badge variant="default" class="bg-green-600">Verified</Badge>
									{:else}
										<Badge variant="secondary">Not Verified</Badge>
									{/if}
								</Table.Cell>
								<Table.Cell class="text-sm text-muted-foreground"
									>{formatDate(user.createdAt)}</Table.Cell
								>
								<Table.Cell class="text-right">
									<Button variant="ghost" size="sm">Edit</Button>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</main>
</div>

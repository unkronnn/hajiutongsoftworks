<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import * as Avatar from "$components/ui/avatar/index.js";
  import * as DropdownMenu from "$components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$components/ui/sidebar/index.js";
  import { useSidebar } from "$components/ui/sidebar/index.js";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import LogOutIcon from "@lucide/svelte/icons/log-out";
  import ShieldIcon from "@lucide/svelte/icons/shield";
  import type { User } from "better-auth";

  const user = $derived<User>(page.data?.user);
  const sidebar = useSidebar();
  
  // Get user initials from name
  const userInitials = $derived(user?.name?.slice(0, 2).toUpperCase() || "U");
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" {...props}>
            <Avatar.Root class="size-8 rounded-lg">
              {#if user?.image}
                <Avatar.Image src={user.image} alt={user.name} />
              {/if}
              <Avatar.Fallback class="rounded-lg">
                {userInitials}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user?.name}</span>
              <span class="truncate text-xs">{user?.email}</span>
            </div>

            <ChevronsUpDownIcon class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg" side={sidebar.isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar.Root class="size-8 rounded-lg">
              {#if user?.image}
                <Avatar.Image src={user.image} alt={user.name} />
              {/if}
              <Avatar.Fallback class="rounded-lg">
                {userInitials}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user?.name}</span>
              <span class="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        {#if user?.role === "admin"}
          <DropdownMenu.Item>
            {#snippet child({ props })}
              <a href={resolve("/admin")} {...props}>
                <ShieldIcon />
                Admin Panel
              </a>
            {/snippet}
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
        {/if}
        <DropdownMenu.Item>
          {#snippet child({ props })}
            <a href={resolve("/logout")} {...props}>
              <LogOutIcon />
              Log out
            </a>
          {/snippet}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>

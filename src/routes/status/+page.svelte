<script lang="ts">
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Card, CardContent } from "$ui/card";

  // Status types configuration
  const statusTypes = [
    {
      id: "undetected",
      title: "Undetected",
      icon: "✓",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      description: "Safe to use"
    },
    {
      id: "update",
      title: "On Update",
      icon: "↻",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      description: "Updating"
    },
    {
      id: "risk",
      title: "Risk",
      icon: "⚠",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      description: "Use at own risk"
    },
    {
      id: "closed",
      title: "Closed",
      icon: "✕",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      description: "Product disabled"
    }
  ];

  // Game status data
  const games = [
    {
      name: "Apex Legends",
      icon: "🎮",
      products: [
        { name: "Phoenix Pro", status: "undetected", lastUpdate: "2 hours ago" },
        { name: "Mason Elite", status: "undetected", lastUpdate: "5 hours ago" },
        { name: "Stern Plus", status: "update", lastUpdate: "1 day ago" }
      ]
    },
    {
      name: "Valorant",
      icon: "🎯",
      products: [
        { name: "Viper Advanced", status: "undetected", lastUpdate: "1 hour ago" },
        { name: "Reaper Elite", status: "risk", lastUpdate: "3 days ago" },
        { name: "Shadow X", status: "undetected", lastUpdate: "4 hours ago" }
      ]
    },
    {
      name: "Counter Strike 2",
      icon: "🔫",
      products: [
        { name: "Ghost Pro", status: "undetected", lastUpdate: "30 minutes ago" },
        { name: "Phantom", status: "update", lastUpdate: "2 days ago" },
        { name: "Legacy", status: "closed", lastUpdate: "1 week ago" }
      ]
    },
    {
      name: "PUBG",
      icon: "🎲",
      products: [
        { name: "Titan Max", status: "undetected", lastUpdate: "1 hour ago" },
        { name: "Hunter Pro", status: "undetected", lastUpdate: "3 hours ago" }
      ]
    },
    {
      name: "Fortnite",
      icon: "⚡",
      products: [
        { name: "Storm Elite", status: "risk", lastUpdate: "5 days ago" },
        { name: "Thunder Pro", status: "update", lastUpdate: "1 day ago" }
      ]
    }
  ];

  // Get status config by status id
  function getStatusConfig(status: string) {
    return statusTypes.find(s => s.id === status) || statusTypes[0];
  }
</script>

<svelte:head>
  <title>Status - HAJI UTONG</title>
</svelte:head>

<Header
  menuItems={[
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Feedback", href: "/feedback" },
    { name: "Terms & FAQ", href: "/terms" }
  ]} />

<div class="relative isolate">
  <!-- Ambient Green Light Effect -->
  <div class="absolute inset-0 -z-10 size-full">
    <LightRays raysColor="#00BC7D" raysSpeed={1} lightSpread={0.5} rayLength={3} followMouse={false} noiseAmount={0.2} distortion={0.05} />
  </div>

  <main class="overflow-hidden">
    <div class="min-h-screen bg-background pt-24 md:pt-28">
      <div class="mx-auto max-w-7xl px-6 py-8">
        
        <!-- Page Header -->
        <div class="mb-12 text-center">
          <h1 class="text-5xl font-black mb-4">STATUS</h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time operational status of all our products
          </p>
        </div>

        <!-- Status Legend -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6">Status Legend</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#each statusTypes as statusType}
              <div class="group relative">
                <div class="absolute -inset-px rounded-2xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <Card class="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl">
                  <CardContent class="p-6">
                    <div class="flex items-center gap-4 mb-3">
                      <div class="flex h-12 w-12 items-center justify-center rounded-xl {statusType.bgColor} {statusType.color} text-2xl font-bold border {statusType.borderColor}">
                        {statusType.icon}
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-base {statusType.color}">{statusType.title}</h3>
                      </div>
                    </div>
                    <p class="text-sm text-muted-foreground">{statusType.description}</p>
                  </CardContent>
                </Card>
              </div>
            {/each}
          </div>
        </section>

        <!-- Status List by Game -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Product Status</h2>
          <div class="space-y-6">
            {#each games as game}
              <div class="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-900/80 backdrop-blur-sm">
                <!-- Game Header -->
                <div class="border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent p-4">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">{game.icon}</span>
                    <div>
                      <h3 class="text-xl font-bold">{game.name}</h3>
                      <p class="text-xs text-muted-foreground">{game.products.length} products</p>
                    </div>
                  </div>
                </div>

                <!-- Products List -->
                <div class="divide-y divide-white/5">
                  {#each game.products as product}
                    {@const statusConfig = getStatusConfig(product.status)}
                    <div class="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                      <div class="flex-1">
                        <h4 class="font-semibold text-base mb-1">{product.name}</h4>
                        <p class="text-xs text-muted-foreground">Updated {product.lastUpdate}</p>
                      </div>
                      <div>
                        <span class="inline-flex items-center gap-2 rounded-full {statusConfig.bgColor} {statusConfig.color} px-4 py-2 text-sm font-semibold border {statusConfig.borderColor} {product.status === 'undetected' ? 'animate-pulse' : ''}">
                          <span class="text-lg">{statusConfig.icon}</span>
                          {statusConfig.title}
                        </span>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </section>

        <!-- Last Updated Notice -->
        <div class="mt-12 text-center">
          <p class="text-sm text-muted-foreground">
            Status updates automatically every 5 minutes • Last checked: Just now
          </p>
        </div>
      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

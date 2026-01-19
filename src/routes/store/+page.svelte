<script lang="ts">
  import Header from "$components/header.svelte";
  import { Button } from "$ui/button";
  import { Card, CardContent, CardHeader } from "$ui/card";
  import ThemeSelector from "$components/theme-selector.svelte";
  
  let selectedPlatform = $state<string>("Desktop");
  
  const popularProducts = [
    { id: 1, name: "Phoenix Pro", game: "Apex Legends", price: 49.99, image: "🎮", badge: "Best Seller" },
    { id: 2, name: "Mason Elite", game: "Valorant", price: 39.99, image: "🎯", badge: "Best Seller" },
    { id: 3, name: "Stern Plus", game: "CS2", price: 29.99, image: "🔫", badge: "Best Seller" },
    { id: 4, name: "Viper Pro", game: "PUBG", price: 34.99, image: "🎲", badge: "Best Seller" },
    { id: 5, name: "Titan Max", game: "Fortnite", price: 44.99, image: "⚡", badge: "Best Seller" }
  ];
  
  const platforms = ["Desktop", "Android", "iOS"];
  
  const games = {
    Desktop: [
      { id: 1, name: "Apex Legends", slug: "apex-legends", icon: "🎮", productCount: 12 },
      { id: 2, name: "Valorant", slug: "valorant", icon: "🎯", productCount: 15 },
      { id: 3, name: "Counter Strike 2", slug: "cs2", icon: "🔫", productCount: 10 },
      { id: 4, name: "PUBG", slug: "pubg", icon: "🎲", productCount: 8 },
      { id: 5, name: "Fortnite", slug: "fortnite", icon: "⚡", productCount: 14 },
      { id: 6, name: "Call of Duty", slug: "cod", icon: "💥", productCount: 11 }
    ],
    Android: [
      { id: 7, name: "Mobile Legends", slug: "mobile-legends", icon: "🎭", productCount: 20 },
      { id: 8, name: "PUBG Mobile", slug: "pubg-mobile", icon: "📱", productCount: 18 },
      { id: 9, name: "Free Fire", slug: "free-fire", icon: "🔥", productCount: 16 },
      { id: 10, name: "Call of Duty Mobile", slug: "cod-mobile", icon: "🎖️", productCount: 12 }
    ],
    iOS: [
      { id: 11, name: "Mobile Legends", slug: "mobile-legends-ios", icon: "🎭", productCount: 15 },
      { id: 12, name: "PUBG Mobile", slug: "pubg-mobile-ios", icon: "📱", productCount: 14 },
      { id: 13, name: "Brawl Stars", slug: "brawl-stars", icon: "⭐", productCount: 10 }
    ]
  };
  
  const filteredGames = $derived(games[selectedPlatform as keyof typeof games] || []);
</script>

<Header
  menuItems={[
    { name: "Home", href: "/" },
    { name: "Status", href: "/status" },
    { name: "Feedback", href: "/feedback" },
    { name: "Terms & FAQ", href: "/terms" }
  ]} />

<div class="min-h-screen bg-background pt-20">
  <main class="mx-auto max-w-7xl px-6 py-12">
    <!-- Popular Products Section -->
    <section class="mb-16">
      <h2 class="mb-8 text-3xl font-bold">Popular</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {#each popularProducts as product}
          <Card class="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardHeader class="p-0">
              <div class="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-6xl">
                {product.image}
              </div>
            </CardHeader>
            <CardContent class="p-4">
              <div class="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                {product.badge}
              </div>
              <h3 class="mb-1 font-semibold">{product.name}</h3>
              <p class="mb-2 text-sm text-muted-foreground">{product.game}</p>
              <p class="text-lg font-bold text-primary">${product.price}</p>
            </CardContent>
          </Card>
        {/each}
      </div>
    </section>

    <!-- Platform Filter -->
    <section class="mb-12">
      <div class="flex items-center justify-center gap-4">
        {#each platforms as platform}
          <Button
            variant={selectedPlatform === platform ? "default" : "outline"}
            size="lg"
            onclick={() => selectedPlatform = platform}
            class="min-w-32"
          >
            {platform}
          </Button>
        {/each}
      </div>
    </section>

    <!-- Games Catalog -->
    <section>
      <h2 class="mb-8 text-3xl font-bold">Browse by Game</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {#each filteredGames as game}
          <a href={`/store/${game.slug}`} class="group">
            <Card class="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader class="p-0">
                <div class="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-7xl">
                  {game.icon}
                </div>
              </CardHeader>
              <CardContent class="p-4">
                <h3 class="mb-2 text-lg font-semibold group-hover:text-primary">{game.name}</h3>
                <p class="text-sm text-muted-foreground">{game.productCount} products available</p>
              </CardContent>
            </Card>
          </a>
        {/each}
      </div>
    </section>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

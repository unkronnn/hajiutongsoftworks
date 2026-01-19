<script lang="ts">
  import { page } from "$app/state";
  import Header from "$components/header.svelte";
  import { Card, CardContent, CardHeader } from "$ui/card";
  import ThemeSelector from "$components/theme-selector.svelte";
  
  const gameSlug = $derived(page.params.game);
  
  // Game info mapping
  const gameInfo: Record<string, { name: string; icon: string }> = {
    "apex-legends": { name: "Apex Legends", icon: "🎮" },
    "valorant": { name: "Valorant", icon: "🎯" },
    "cs2": { name: "Counter Strike 2", icon: "🔫" },
    "pubg": { name: "PUBG", icon: "🎲" },
    "fortnite": { name: "Fortnite", icon: "⚡" },
    "cod": { name: "Call of Duty", icon: "💥" },
    "mobile-legends": { name: "Mobile Legends", icon: "🎭" },
    "pubg-mobile": { name: "PUBG Mobile", icon: "📱" },
    "free-fire": { name: "Free Fire", icon: "🔥" },
    "cod-mobile": { name: "Call of Duty Mobile", icon: "🎖️" },
    "mobile-legends-ios": { name: "Mobile Legends", icon: "🎭" },
    "pubg-mobile-ios": { name: "PUBG Mobile", icon: "📱" },
    "brawl-stars": { name: "Brawl Stars", icon: "⭐" }
  };
  
  const currentGame = $derived(gameInfo[gameSlug] || { name: "Unknown Game", icon: "❓" });
  
  // Products for this game
  const products = [
    { id: 1, name: "Phoenix Pro", price: 49.99, rating: 4.8, reviews: 234, features: ["ESP", "Aimbot", "Radar"] },
    { id: 2, name: "Mason Elite", price: 39.99, rating: 4.6, reviews: 189, features: ["Wallhack", "No Recoil", "Speed"] },
    { id: 3, name: "Stern Plus", price: 29.99, rating: 4.7, reviews: 156, features: ["Aimbot", "ESP", "Triggerbot"] },
    { id: 4, name: "Viper Advanced", price: 34.99, rating: 4.5, reviews: 142, features: ["ESP", "Radar", "Teleport"] },
    { id: 5, name: "Titan Max", price: 44.99, rating: 4.9, reviews: 278, features: ["Full Package", "Anti-Ban", "Updates"] },
    { id: 6, name: "Shadow X", price: 24.99, rating: 4.4, reviews: 98, features: ["Basic ESP", "Aimbot", "Safe Mode"] },
    { id: 7, name: "Ghost Pro", price: 54.99, rating: 4.8, reviews: 203, features: ["Premium", "VIP Support", "Lifetime"] },
    { id: 8, name: "Reaper Elite", price: 37.99, rating: 4.6, reviews: 167, features: ["Advanced", "Stealth", "Secure"] }
  ];
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
    <!-- Breadcrumb -->
    <div class="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
      <a href="/store" class="hover:text-foreground">Store</a>
      <span>/</span>
      <span class="text-foreground">{currentGame.name}</span>
    </div>

    <!-- Game Header -->
    <div class="mb-12 flex items-center gap-6">
      <div class="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-5xl">
        {currentGame.icon}
      </div>
      <div>
        <h1 class="text-4xl font-bold">{currentGame.name}</h1>
        <p class="mt-2 text-muted-foreground">{products.length} premium products available</p>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {#each products as product}
        <a href={`/store/${gameSlug}/${product.id}`} class="group">
          <Card class="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
            <CardHeader class="p-0">
              <div class="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div class="text-center">
                  <div class="mb-2 text-5xl">🛡️</div>
                  <div class="px-4">
                    {#each product.features as feature}
                      <span class="mb-1 mr-1 inline-block rounded-full bg-primary/20 px-2 py-0.5 text-xs">
                        {feature}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent class="p-4">
              <h3 class="mb-2 text-lg font-semibold group-hover:text-primary">{product.name}</h3>
              <div class="mb-3 flex items-center gap-2 text-sm">
                <div class="flex items-center text-yellow-500">
                  ⭐ {product.rating}
                </div>
                <span class="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <p class="text-xl font-bold text-primary">${product.price}</p>
            </CardContent>
          </Card>
        </a>
      {/each}
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

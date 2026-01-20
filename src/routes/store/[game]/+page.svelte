<script lang="ts">
  import { page } from "$app/state";
  import Header from "$components/header.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Card } from "$ui/card";
  
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
          <div class="group relative">
            <!-- Hover Border Glow -->
            <div class="absolute -inset-px rounded-3xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            
            <!-- Card with Full Bleed Background -->
            <Card class="relative aspect-[3/4] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 border border-white/10 bg-neutral-900 rounded-3xl p-0">
              <!-- Background Image/Gradient (Full Bleed) -->
              <div class="absolute inset-0 w-full h-full">
                <div class="flex w-full h-full items-center justify-center bg-gradient-to-br from-primary/30 via-neutral-800 to-secondary/30">
                  <div class="text-7xl opacity-20">🛡️</div>
                </div>
              </div>
              
              <!-- Feature Tags (Top Right) -->
              <div class="absolute top-3 right-3 flex flex-col gap-1.5">
                {#each product.features.slice(0, 3) as feature}
                  <span class="inline-block rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white border border-white/10">
                    {feature}
                  </span>
                {/each}
              </div>
              
              <!-- Content Overlay with Gradient (Bottom) -->
              <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent p-4 pt-12">
                <h3 class="text-base font-bold text-white group-hover:text-primary transition-colors mb-2">{product.name}</h3>
                
                <!-- Rating -->
                <div class="flex items-center gap-2 text-sm mb-3">
                  <div class="flex items-center text-yellow-400">
                    ⭐ <span class="ml-1">{product.rating}</span>
                  </div>
                  <span class="text-gray-400 text-xs">({product.reviews})</span>
                </div>
                
                <!-- Price -->
                <p class="text-xl font-bold text-primary">${product.price}</p>
              </div>
            </Card>
          </div>
        </a>
      {/each}
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

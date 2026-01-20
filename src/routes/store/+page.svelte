<script lang="ts">
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Button } from "$ui/button";
  import { Card, CardContent } from "$ui/card";
  
  let selectedPlatform = $state<string>("Desktop");
  
  const popularProducts = [
    { id: 1, name: "Phoenix Pro", game: "Apex Legends", price: 49.99, image: "🎮", badge: "Best Seller" },
    { id: 2, name: "Mason Elite", game: "Valorant", price: 39.99, image: "🎯", badge: "Best Seller" },
    { id: 3, name: "Stern Plus", game: "CS2", price: 29.99, image: "🔫", badge: "Best Seller" },
    { id: 4, name: "Viper Pro", game: "PUBG", price: 34.99, image: "🎲", badge: "Best Seller" },
    { id: 5, name: "Titan Max", game: "Fortnite", price: 44.99, image: "⚡", badge: "Best Seller" },
    { id: 6, name: "Dragon Elite", game: "League of Legends", price: 59.99, image: "🐉", badge: "New" },
    { id: 7, name: "Shadow Pro", game: "Overwatch", price: 39.99, image: "👁️", badge: "Popular" }
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

<div class="relative isolate">
  <!-- Ambient Green Light Effect - EXACT MATCH FROM HOME PAGE -->
  <div class="absolute inset-0 -z-10 size-full">
    <LightRays raysColor="#00BC7D" raysSpeed={1} lightSpread={0.5} rayLength={3} followMouse={false} noiseAmount={0.2} distortion={0.05} />
  </div>

  <main class="overflow-hidden">
    <div class="min-h-screen bg-background pt-24 md:pt-28">
      <div class="mx-auto max-w-7xl px-6 py-8">

        <!-- Popular Products Section - Infinite Auto-Scroll Marquee -->
        <section class="mb-16">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-2xl font-bold">Popular</h2>
            <span class="text-xs text-muted-foreground hidden sm:inline">Hover to pause</span>
          </div>
          
          <!-- Marquee Container with Fade Masks -->
          <div class="relative overflow-hidden">
            <!-- Left Fade Gradient -->
            <div class="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            
            <!-- Right Fade Gradient -->
            <div class="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            
            <!-- Scrolling Track (Pause on Hover) -->
            <div class="marquee-track">
              <!-- First Set of Products -->
              <div class="marquee-content">
                {#each popularProducts as product}
                  <div class="marquee-item">
                    <div class="group relative">
                      <div class="absolute -inset-px rounded-lg bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <Card class="relative overflow-hidden transition-all duration-200 hover:shadow-lg border bg-card/50 backdrop-blur-sm h-full">
                        <CardContent class="p-4">
                          <div class="flex items-center gap-4">
                            <!-- Left: Small Square Thumbnail -->
                            <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-3xl">
                              {product.image}
                            </div>
                            
                            <!-- Middle: Product Info -->
                            <div class="flex-1 min-w-0">
                              <div class="mb-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/20 ring-inset">
                                {product.badge}
                              </div>
                              <h3 class="font-bold text-base truncate">{product.name}</h3>
                              <p class="text-sm text-muted-foreground truncate">{product.game}</p>
                            </div>
                            
                            <!-- Right: Price & Button -->
                            <div class="flex flex-col items-end gap-2 flex-shrink-0">
                              <p class="text-lg font-bold text-primary whitespace-nowrap">${product.price}</p>
                              <Button size="sm" class="h-8 rounded-lg px-4 backdrop-blur-lg text-xs">
                                Buy
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                {/each}
              </div>
              
              <!-- Duplicate Set for Seamless Loop -->
              <div class="marquee-content" aria-hidden="true">
                {#each popularProducts as product}
                  <div class="marquee-item">
                    <div class="group relative">
                      <div class="absolute -inset-px rounded-lg bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <Card class="relative overflow-hidden transition-all duration-200 hover:shadow-lg border bg-card/50 backdrop-blur-sm h-full">
                        <CardContent class="p-4">
                          <div class="flex items-center gap-4">
                            <!-- Left: Small Square Thumbnail -->
                            <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-3xl">
                              {product.image}
                            </div>
                            
                            <!-- Middle: Product Info -->
                            <div class="flex-1 min-w-0">
                              <div class="mb-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary ring-1 ring-primary/20 ring-inset">
                                {product.badge}
                              </div>
                              <h3 class="font-bold text-base truncate">{product.name}</h3>
                              <p class="text-sm text-muted-foreground truncate">{product.game}</p>
                            </div>
                            
                            <!-- Right: Price & Button -->
                            <div class="flex flex-col items-end gap-2 flex-shrink-0">
                              <p class="text-lg font-bold text-primary whitespace-nowrap">${product.price}</p>
                              <Button size="sm" class="h-8 rounded-lg px-4 backdrop-blur-lg text-xs">
                                Buy
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
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
                class="min-w-32 rounded-xl px-5 transition-all {selectedPlatform === platform ? 'backdrop-blur-lg' : 'dark:hover:bg-accent'}"
              >
                {platform}
              </Button>
            {/each}
          </div>
        </section>

        <!-- Games Catalog -->
        <section>
          <h2 class="mb-8 text-3xl font-bold">Browse by Game</h2>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {#each filteredGames as game}
              <a href={`/store/${game.slug}`} class="group">
                <div class="group relative">
                  <div class="absolute -inset-px rounded-3xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  
                  <!-- Card with Full Bleed Image -->
                  <Card class="relative aspect-square overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 border border-white/10 bg-neutral-900 rounded-3xl p-0">
                    <!-- Background Image (Full Bleed) -->
                    <div class="absolute inset-0 w-full h-full">
                      <div class="flex w-full h-full items-center justify-center bg-gradient-to-br from-primary/20 via-neutral-800 to-secondary/20 text-6xl">
                        {game.icon}
                      </div>
                    </div>
                    
                    <!-- Text Overlay with Dark Gradient -->
                    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8">
                      <h3 class="text-sm font-bold text-white group-hover:text-primary transition-colors truncate mb-0.5">{game.name}</h3>
                      <p class="text-xs text-gray-400">{game.productCount} products</p>
                    </div>
                  </Card>
                </div>
              </a>
            {/each}
          </div>
        </section>
      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

<style>
  /* Marquee Animation */
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .marquee-track {
    display: flex;
    width: fit-content;
    animation: marquee 30s linear infinite;
  }

  /* Pause animation on hover */
  .marquee-track:hover {
    animation-play-state: paused;
  }

  .marquee-content {
    display: flex;
    flex-shrink: 0;
    gap: 1rem;
    padding-right: 1rem;
  }

  .marquee-item {
    width: 420px;
    flex-shrink: 0;
  }
</style>

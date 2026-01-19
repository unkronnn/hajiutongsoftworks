<script lang="ts">
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Button } from "$ui/button";
  import { Card, CardContent, CardHeader } from "$ui/card";
  import { onMount } from "svelte";
  
  let selectedPlatform = $state<string>("Desktop");
  
  // Auto-scroll carousel state
  let carouselContainer = $state<HTMLDivElement>(null!);
  let isHovering = $state<boolean>(false);
  let autoScrollInterval: number | null = null;
  let currentScrollPosition = $state<number>(0);
  
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
  
  // Auto-scroll logic
  onMount(() => {
    if (!carouselContainer) return;
    
    const startAutoScroll = () => {
      autoScrollInterval = window.setInterval(() => {
        if (!carouselContainer || isHovering) return;
        
        const cardWidth = 300 + 24; // card width (300px) + gap (24px)
        const containerWidth = carouselContainer.scrollWidth;
        const visibleWidth = carouselContainer.clientWidth;
        const maxScroll = containerWidth - visibleWidth;
        
        currentScrollPosition += cardWidth;
        
        // Loop back to start when reaching the end
        if (currentScrollPosition >= maxScroll) {
          currentScrollPosition = 0;
        }
        
        carouselContainer.scrollTo({
          left: currentScrollPosition,
          behavior: 'smooth'
        });
      }, 3000); // Auto-scroll every 3 seconds
    };
    
    startAutoScroll();
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  });
  
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
    <div class="min-h-screen bg-background pt-24 md:pt-36">
      <div class="mx-auto max-w-7xl px-6 py-12">
        
        <!-- Store Header -->
        <div class="mb-16 text-center">
          <h1 class="text-6xl font-black text-balance md:text-7xl lg:text-[5.25rem]">STORE</h1>
          <p class="mx-auto mt-8 max-w-2xl text-lg text-balance text-muted-foreground">Upgrade your gaming experience with our premium DLCs</p>
        </div>

        <!-- Popular Products Section - Auto-Scrolling Carousel -->
        <section class="mb-16">
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-3xl font-bold">Popular</h2>
            <span class="text-sm text-muted-foreground hidden sm:inline">Auto-scrolling • Hover to pause</span>
          </div>
          
          <!-- Horizontal Scrollable Container with Auto-Scroll -->
          <div class="relative -mx-6 px-6">
            <div 
              bind:this={carouselContainer}
              onmouseenter={() => isHovering = true}
              onmouseleave={() => isHovering = false}
              class="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            >
              {#each popularProducts as product}
                <div class="min-w-[300px] snap-center flex-shrink-0">
                  <div class="group relative">
                    <div class="absolute -inset-px rounded-xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                    <Card class="relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border bg-card/50 backdrop-blur-sm">
                      <CardHeader class="p-0">
                        <div class="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-6xl">
                          {product.image}
                        </div>
                      </CardHeader>
                      <CardContent class="p-4">
                        <div class="mb-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20 ring-inset">
                          {product.badge}
                        </div>
                        <h3 class="mb-1 font-semibold text-lg">{product.name}</h3>
                        <p class="mb-2 text-sm text-muted-foreground">{product.game}</p>
                        <p class="text-lg font-bold text-primary">${product.price}</p>
                        <Button size="sm" class="mt-3 w-full rounded-xl px-5 backdrop-blur-lg">
                          Buy Now
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              {/each}
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
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {#each filteredGames as game}
              <a href={`/store/${game.slug}`} class="group">
                <div class="group relative">
                  <div class="absolute -inset-px rounded-xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <Card class="relative h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border bg-card/50 backdrop-blur-sm">
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
  /* Hide scrollbar while keeping scroll functionality */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

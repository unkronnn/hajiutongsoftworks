<script lang="ts">
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Card, CardContent } from "$ui/card";

  // Aggregate rating data
  const aggregateRating = {
    score: 4.9,
    totalReviews: 5620,
    stars: 5
  };

  // Dummy reviews data
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Automatic feedback after 7 days using Phoenix Pro. Absolutely flawless experience, no detection whatsoever. Worth every penny!",
      timestamp: "10 hours ago",
      verified: true
    },
    {
      id: 2,
      rating: 5,
      text: "Been using Mason Elite for Valorant for 3 months now. Clean, safe, and the support team is incredibly responsive. Highly recommend!",
      timestamp: "1 day ago",
      verified: true
    },
    {
      id: 3,
      rating: 5,
      text: "Best purchase I've made. The features are incredible and the anti-detection system is top-notch. 10/10 would buy again.",
      timestamp: "2 days ago",
      verified: true
    },
    {
      id: 4,
      rating: 5,
      text: "Stern Plus has been running perfectly on CS2. No issues at all, updates are quick, and the UI is super intuitive.",
      timestamp: "3 days ago",
      verified: true
    },
    {
      id: 5,
      rating: 5,
      text: "Outstanding product! The team behind this really knows what they're doing. Fast updates, great features, zero bans.",
      timestamp: "5 days ago",
      verified: true
    },
    {
      id: 6,
      rating: 5,
      text: "I was skeptical at first but this exceeded all my expectations. Customer service is amazing and the product works flawlessly.",
      timestamp: "1 week ago",
      verified: true
    },
    {
      id: 7,
      rating: 5,
      text: "Titan Max is worth every cent. Been using it for months without a single issue. The best investment for serious gamers.",
      timestamp: "1 week ago",
      verified: true
    },
    {
      id: 8,
      rating: 5,
      text: "Clean interface, powerful features, and most importantly - completely undetected. This is the real deal.",
      timestamp: "2 weeks ago",
      verified: true
    },
    {
      id: 9,
      rating: 5,
      text: "After trying multiple products, this is hands down the best. Professional, reliable, and the support is exceptional.",
      timestamp: "2 weeks ago",
      verified: true
    }
  ];

  // Generate star icons
  function getStars(rating: number) {
    return Array(5).fill(0).map((_, i) => i < rating ? '★' : '☆');
  }
</script>

<svelte:head>
  <title>Feedback - HAJI UTONG</title>
</svelte:head>

<Header
  menuItems={[
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Status", href: "/status" },
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
        
        <!-- Hero Section - Aggregate Rating -->
        <section class="mb-16 text-center">
          <div class="mb-6">
            <h1 class="text-7xl font-black text-primary mb-4">{aggregateRating.score}</h1>
            <div class="flex items-center justify-center gap-2 mb-3">
              {#each getStars(aggregateRating.stars) as star}
                <span class="text-4xl text-primary">{star}</span>
              {/each}
            </div>
            <p class="text-lg text-muted-foreground">
              Based on <span class="font-semibold text-foreground">{aggregateRating.totalReviews.toLocaleString()}</span> reviews
            </p>
          </div>
          <div class="mt-8">
            <h2 class="text-3xl font-bold mb-2">Customer Feedback</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              Real reviews from verified customers who trust our products
            </p>
          </div>
        </section>

        <!-- Reviews Grid -->
        <section>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each reviews as review}
              <div class="group relative">
                <!-- Hover Glow Effect -->
                <div class="absolute -inset-px rounded-2xl bg-linear-to-b from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                
                <!-- Review Card -->
                <Card class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl h-full">
                  <CardContent class="p-6">
                    <!-- Top Row: Stars + Timestamp -->
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-1">
                        {#each getStars(review.rating) as star}
                          <span class="text-xl text-primary">{star}</span>
                        {/each}
                      </div>
                      <span class="text-xs text-muted-foreground">{review.timestamp}</span>
                    </div>

                    <!-- Review Text -->
                    <p class="text-sm text-foreground/90 leading-relaxed mb-4">
                      {review.text}
                    </p>

                    <!-- Verified Badge -->
                    {#if review.verified}
                      <div class="flex items-center gap-2 pt-4 border-t border-white/5">
                        <div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                          ✓
                        </div>
                        <span class="text-xs font-semibold text-primary">Verified Purchase</span>
                      </div>
                    {/if}
                  </CardContent>
                </Card>
              </div>
            {/each}
          </div>
        </section>

        <!-- Trust Notice -->
        <div class="mt-16 text-center">
          <div class="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary text-xl">
              🛡️
            </div>
            <div class="text-left">
              <p class="font-semibold text-foreground">100% Verified Reviews</p>
              <p class="text-sm text-muted-foreground">All reviews are from actual customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

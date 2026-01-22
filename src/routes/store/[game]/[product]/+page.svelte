<script lang="ts">
  import { page } from "$app/state";
  import Header from "$components/header.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Button } from "$ui/button";
  import { Card, CardContent } from "$ui/card";
  import { Input } from "$ui/input";
  import { Label } from "$ui/label";
  
  const gameSlug = $derived(page.params.game);
  const productId = $derived(page.params.product);
  
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
  
  const products: Record<string, any> = {
    "1": { name: "Phoenix Pro", basePrice: 49.99 },
    "2": { name: "Mason Elite", basePrice: 39.99 },
    "3": { name: "Stern Plus", basePrice: 29.99 },
    "4": { name: "Viper Advanced", basePrice: 34.99 },
    "5": { name: "Titan Max", basePrice: 44.99 },
    "6": { name: "Shadow X", basePrice: 24.99 },
    "7": { name: "Ghost Pro", basePrice: 54.99 },
    "8": { name: "Reaper Elite", basePrice: 37.99 }
  };
  
  const product = $derived(products[productId] || { name: "Unknown Product", basePrice: 0 });
  
  const images = ["🖼️", "📸", "🎨", "🖌️"];
  let selectedImage = $state(0);
  
  const variants = [
    { id: 1, duration: "1 Day", price: product.basePrice * 0.1, stock: 50 },
    { id: 2, duration: "7 Days", price: product.basePrice * 0.5, stock: 45 },
    { id: 3, duration: "30 Days", price: product.basePrice, stock: 30 },
    { id: 4, duration: "Lifetime", price: product.basePrice * 3, stock: 10 }
  ];
  
  let selectedVariant = $state(variants[2]);
  let quantity = $state(1);
  let whatsapp = $state("");
  let selectedCategory = $state<string | null>(null);
  let selectedProvider = $state<string | null>(null);
  let expandedCategory = $state<string | null>(null);
  
  const paymentMethods = [
    {
      id: "ewallet",
      name: "E-Wallet",
      icon: "💳",
      hasSubOptions: true,
      subOptions: [
        { id: "dana", name: "Dana" },
        { id: "shopeepay", name: "ShopeePay" },
        { id: "gopay", name: "GoPay" },
        { id: "ovo", name: "OVO" },
        { id: "linkaja", name: "LinkAja" }
      ]
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "🏦",
      hasSubOptions: true,
      subOptions: [
        { id: "bca", name: "BCA" },
        { id: "bri", name: "BRI" },
        { id: "mandiri", name: "Mandiri" },
        { id: "jago", name: "Bank Jago" },
        { id: "bni", name: "BNI" }
      ]
    },
    {
      id: "qris",
      name: "QRIS",
      icon: "📱",
      hasSubOptions: false
    },
    {
      id: "crypto",
      name: "Crypto",
      icon: "₿",
      hasSubOptions: false
    }
  ];
  
  function handlePaymentClick(method: typeof paymentMethods[0]) {
    if (method.hasSubOptions) {
      // Toggle expansion for methods with sub-options
      expandedCategory = expandedCategory === method.id ? null : method.id;
    } else {
      // Direct selection for methods without sub-options
      selectedCategory = method.id;
      selectedProvider = null;
      expandedCategory = null;
    }
  }
  
  function handleSubOptionClick(categoryId: string, providerId: string) {
    selectedCategory = categoryId;
    selectedProvider = providerId;
  }
  
  const features = [
    "Advanced ESP (Wallhack)",
    "Precision Aimbot",
    "Radar Hack",
    "No Recoil",
    "Speed Hack",
    "Anti-Detection System",
    "Regular Updates",
    "24/7 Support"
  ];
  
  const systemRequirements = [
    "Windows 10/11 (64-bit)",
    "4GB RAM minimum",
    "DirectX 11 compatible GPU",
    "Admin privileges required"
  ];
  
  const subtotal = $derived(selectedVariant.price * quantity);
  const discount = $derived(quantity >= 3 ? subtotal * 0.1 : 0);
  const total = $derived(subtotal - discount);
</script>

<Header
  menuItems={[
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
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
      <a href={`/store/${gameSlug}`} class="hover:text-foreground">{currentGame.name}</a>
      <span>/</span>
      <span class="text-foreground">{product.name}</span>
    </div>

    <!-- Product Title -->
    <h1 class="mb-8 text-4xl font-bold">{product.name} : {currentGame.name}</h1>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Left Column: Media & Info -->
      <div class="lg:col-span-2">
        <!-- Main Image -->
        <Card class="mb-6">
          <CardContent class="p-0">
            <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-9xl">
              {images[selectedImage]}
            </div>
          </CardContent>
        </Card>

        <!-- Thumbnails -->
        <div class="mb-8 flex gap-3">
          {#each images as img, idx}
            <button
              onclick={() => selectedImage = idx}
              class="flex w-20 h-20 aspect-square items-center justify-center rounded-lg border-2 text-2xl transition-all hover:border-primary {selectedImage === idx ? 'border-primary bg-primary/10' : 'border-border bg-muted'}"
            >
              {img}
            </button>
          {/each}
        </div>

        <!-- System Compatibility -->
        <Card class="mb-6">
          <CardContent class="p-6">
            <h3 class="mb-4 text-xl font-semibold">System Compatibility</h3>
            <ul class="space-y-2">
              {#each systemRequirements as req}
                <li class="flex items-start gap-2">
                  <span class="mt-1 text-primary">✓</span>
                  <span class="text-muted-foreground">{req}</span>
                </li>
              {/each}
            </ul>
          </CardContent>
        </Card>

        <!-- Features List -->
        <Card>
          <CardContent class="p-6">
            <h3 class="mb-4 text-xl font-semibold">Features</h3>
            <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {#each features as feature}
                <li class="flex items-start gap-2">
                  <span class="mt-1 text-primary">•</span>
                  <span class="text-muted-foreground">{feature}</span>
                </li>
              {/each}
            </ul>
          </CardContent>
        </Card>
      </div>

      <!-- Right Column: Purchase Form -->
      <div class="lg:col-span-1">
        <Card class="sticky top-24">
          <CardContent class="p-6">
            <!-- Select Variant -->
            <div class="mb-6">
              <Label class="mb-3 block text-base font-semibold">Select Duration</Label>
              <div class="space-y-2">
                {#each variants as variant}
                  <button
                    onclick={() => selectedVariant = variant}
                    class="flex w-full items-center justify-between rounded-lg border-2 p-3 text-left transition-all hover:border-primary {selectedVariant.id === variant.id ? 'border-primary bg-primary/10' : 'border-border'}"
                  >
                    <div>
                      <div class="font-semibold">{variant.duration}</div>
                      <div class="text-sm text-muted-foreground">Stock: {variant.stock}</div>
                    </div>
                    <div class="text-lg font-bold text-primary">${variant.price.toFixed(2)}</div>
                  </button>
                {/each}
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-6">
              <Label class="mb-3 block text-base font-semibold">Quantity</Label>
              <div class="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onclick={() => quantity = Math.max(1, quantity - 1)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  bind:value={quantity}
                  min="1"
                  max={selectedVariant.stock}
                  class="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onclick={() => quantity = Math.min(selectedVariant.stock, quantity + 1)}
                >
                  +
                </Button>
              </div>
              {#if quantity >= 3}
                <p class="mt-2 text-sm text-primary">🎉 10% discount applied for 3+ items!</p>
              {/if}
            </div>

            <!-- Pricing Summary -->
            <div class="mb-6 space-y-2 border-t border-b border-border py-4">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {#if discount > 0}
                <div class="flex justify-between text-sm">
                  <span class="text-muted-foreground">Discount</span>
                  <span class="text-primary">-${discount.toFixed(2)}</span>
                </div>
              {/if}
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="mb-6">
              <Label class="mb-3 block text-base font-semibold">Payment Method</Label>
              <div class="space-y-2">
                {#each paymentMethods as method}
                  <div class="overflow-hidden rounded-xl border-2 bg-white/5 transition-all duration-300 {selectedCategory === method.id ? 'border-primary' : 'border-white/10'}">
                    <!-- Main Payment Category Button -->
                    <button
                      onclick={() => handlePaymentClick(method)}
                      class="flex w-full items-center gap-3 p-3 transition-all hover:bg-white/[0.07] {expandedCategory === method.id ? 'bg-white/[0.05]' : ''}"
                    >
                      <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-xl">
                        {method.icon}
                      </div>
                      <span class="flex-1 text-left font-medium">{method.name}</span>
                      {#if method.hasSubOptions}
                        <div class="text-sm text-primary transition-transform duration-300 {expandedCategory === method.id ? 'rotate-180' : ''}">
                          ▼
                        </div>
                      {/if}
                      {#if !method.hasSubOptions && selectedCategory === method.id}
                        <div class="text-primary text-xl">✓</div>
                      {/if}
                    </button>
                    
                    <!-- Expandable Sub-Options -->
                    {#if method.hasSubOptions && expandedCategory === method.id}
                      <div class="border-t border-white/10 bg-black/20">
                        {#each method.subOptions as subOption}
                          <button
                            onclick={() => handleSubOptionClick(method.id, subOption.id)}
                            class="flex w-full items-center justify-between px-6 py-3 text-left text-sm transition-all hover:bg-white/[0.07] hover:text-primary {selectedProvider === subOption.id ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-300'}"
                          >
                            <span>{subOption.name}</span>
                            {#if selectedProvider === subOption.id}
                              <span class="text-primary text-lg">✓</span>
                            {/if}
                          </button>
                        {/each}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>

            <!-- Contact Info -->
            <div class="mb-6">
              <Label for="whatsapp" class="mb-2 block text-base font-semibold">
                WhatsApp <span class="text-sm font-normal text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+62 812 3456 7890"
                bind:value={whatsapp}
              />
            </div>

            <!-- Purchase Button -->
            <Button class="w-full" size="lg">
              Purchase Now - ${total.toFixed(2)}
            </Button>

            <p class="mt-4 text-center text-xs text-muted-foreground">
              By purchasing, you agree to our Terms of Service
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

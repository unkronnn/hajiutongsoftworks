<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
  import Shield from "@lucide/svelte/icons/shield";
</script>

<section id="developers" class="overflow-hidden bg-muted/30 py-16 md:py-24">
  <div class="mx-auto max-w-6xl px-6">
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <div>
        <div class="mb-4 inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none">Our Store</div>
        <h2 class="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
          Browse Premium <br /> DLCs & Enhancements
        </h2>
        <p class="mb-8 text-lg text-muted-foreground">Discover a wide range of game enhancements, DLCs, and premium features for your favorite games. Safe, secure, and always updated.</p>

        <div class="mb-8 space-y-6">
          <div class="flex gap-4">
            <div class="flex-none">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield class="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 class="mb-1 font-semibold">Secure Payments</h3>
              <p class="text-sm text-muted-foreground">All transactions are protected with industry-standard encryption and secure payment processing.</p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-none">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShoppingCart class="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 class="mb-1 font-semibold">Instant Delivery</h3>
              <p class="text-sm text-muted-foreground">Get immediate access to your purchases. No waiting, no hassle.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <Button href="/store" size="lg" class="gap-2">
            Browse Store <ArrowRight class="h-4 w-4" />
          </Button>
          <Button href="/support" variant="outline" size="lg">Contact Support</Button>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-xl border bg-card shadow-lg">
        <div class="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
          <div class="flex gap-1.5">
            <div class="h-3 w-3 rounded-full bg-red-500/80"></div>
            <div class="h-3 w-3 rounded-full bg-yellow-500/80"></div>
            <div class="h-3 w-3 rounded-full bg-green-500/80"></div>
          </div>
          <div class="ml-2 font-mono text-xs text-muted-foreground">store.hajiutong</div>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span class="font-semibold">Game Enhancement Pack</span>
              <span class="text-primary font-bold">$29.99</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span class="font-semibold">Premium DLC Bundle</span>
              <span class="text-primary font-bold">$49.99</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <span class="font-semibold">Exclusive Features</span>
              <span class="text-primary font-bold">$19.99</span>
            </div>
          </div>
          <div class="pt-4 border-t border-border">
            <p class="text-sm text-muted-foreground text-center">✓ Secure checkout ✓ Instant access ✓ 24/7 support</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

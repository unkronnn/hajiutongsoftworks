<script lang="ts">
  import { Card, CardContent, CardHeader } from "$lib/components/ui/card";
  import { type Icon as IconType } from "@lucide/svelte";
  import Fingerprint from "@lucide/svelte/icons/fingerprint";
  import Globe from "@lucide/svelte/icons/globe";
  import ShieldCheck from "@lucide/svelte/icons/shield-check";
</script>

<section id="users" class="py-16 md:py-24">
  <div class="@container mx-auto max-w-6xl px-6">
    <div class="mb-16 text-center">
      <div class="mb-4 inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none">Features</div>
      <h2 class="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Premium Quality DLCs</h2>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">Experience the best gaming enhancements with our carefully crafted features designed for maximum performance and safety.</p>
    </div>

    <div class="grid gap-8 md:grid-cols-3">
      {@render featureCard({
        title: "Anti-Detection",
        icon: ShieldCheck,
        description: "Our cheats are designed with sophisticated anti-detection systems to keep your account safe."
      })}

      {@render featureCard({
        title: "Regular Updates",
        icon: Globe,
        description: "We provide continuous updates to ensure compatibility with the latest game versions."
      })}

      {@render featureCard({
        title: "24/7 Support",
        icon: Fingerprint,
        description: "Our dedicated support team is available around the clock to assist you with any issues."
      })}
    </div>
  </div>
</section>

{#snippet featureCard({ title, icon: IconComponent, description }: { title: string; icon: typeof IconType; description: string })}
  <div class="group relative">
    <div class="absolute -inset-px rounded-xl bg-linear-to-b from-border to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    <Card class="relative h-full border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader class="pb-2">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 ring-inset">
          <IconComponent class="h-6 w-6" />
        </div>
        <h3 class="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p class="leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  </div>
{/snippet}

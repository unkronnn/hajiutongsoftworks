<script lang="ts">
  import LightRays from "$components/reactbits/LightRays.svelte";
  import { Button } from "$ui/button";
  import PanoramaViewer from "./PanoramaViewer.svelte";

  // Generate random hue rotation value (0-360) on component mount
  let randomHue = $state<number>(Math.floor(Math.random() * 361));
  let viewerReady = $state<boolean>(false);

  // Simulate loading for smooth appearance
  $effect(() => {
    const timer = setTimeout(() => {
      viewerReady = true;
    }, 500);
    return () => clearTimeout(timer);
  });
</script>

<div class="relative isolate">
  <div class="absolute inset-0 -z-10 size-full">
    <LightRays raysColor="#00BC7D" raysSpeed={1} lightSpread={0.5} rayLength={3} followMouse={false} noiseAmount={0.2} distortion={0.05} />
  </div>

  <main class="overflow-hidden">
    <section>
      <div class="relative pt-24 md:pt-36">
        <div class="mx-auto max-w-7xl px-6">
          <div class="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
            <h1 class="mt-8 text-6xl font-black text-balance md:text-7xl lg:mt-16 xl:text-[5.25rem]">HAJI UTONG</h1>
            <p class="mx-auto mt-8 max-w-2xl text-lg text-balance">A wide selection of premium DLCs for your favorite games with our modern and secure platform.</p>

            <div class="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
              <Button href="/store" size="lg" class="rounded-xl px-5 text-base backdrop-blur-lg">
                <span class="text-nowrap">Store</span>
              </Button>

              <Button href="#developers" size="lg" variant="outline" class="rounded-xl px-5 transition-all dark:hover:bg-accent">In Our Shop</Button>
            </div>
          </div>
        </div>

        <div class="relative mt-8 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
          <div class="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-background p-4 shadow-lg inset-shadow-2xs shadow-zinc-950/15 ring-background inset-shadow-white/20">
            <div class="relative w-full aspect-video overflow-hidden rounded-lg">
              {#if !viewerReady}
                <div class="absolute inset-0 animate-pulse rounded-lg border border-border bg-accent"></div>
              {/if}
              
              <!-- Layer 1: 3D Panorama Background (Draggable) -->
              <div class="absolute inset-0">
                <PanoramaViewer imagePath="/assets/images/minecraft-landscape.png" />
              </div>
              
              <!-- Layer 2: Fixed Centered Sheep with Random Color (No Pointer Events) -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img 
                  src="/assets/images/minecraft-sheep.png" 
                  alt="Minecraft Sheep" 
                  class="h-3/4 w-auto object-contain transition-all duration-1000 drop-shadow-2xl"
                  style="filter: hue-rotate({randomHue}deg); transition: filter 0.3s ease;"
                  class:opacity-0={!viewerReady}
                  class:opacity-100={viewerReady}
                />
              </div>

              <!-- Hint text for user interaction -->
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <div class="text-xs text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-opacity duration-1000"
                     class:opacity-0={!viewerReady}
                     class:opacity-100={viewerReady}>
                  Drag to explore • Sheep color: {randomHue}°
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

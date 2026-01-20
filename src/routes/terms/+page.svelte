<script lang="ts">
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Card, CardContent } from "$ui/card";

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "Where do I get my product key?",
      answer: "Your product key will be sent to your registered email address immediately after purchase confirmation. Please check your spam folder if you don't see it in your inbox within 5 minutes. The key will also be available in your account dashboard."
    },
    {
      id: 2,
      question: "Is there a refund policy?",
      answer: "All sales are final. Refunds are only issued in cases where the software is technically incompatible with your system and our support team has been unable to resolve the issue after reasonable attempts. A 10% service fee will be deducted from any approved refunds."
    },
    {
      id: 3,
      question: "Is there a risk of getting banned?",
      answer: "Yes, using any third-party software in online games always carries a risk of account suspension or ban. We implement advanced anti-detection measures and regularly update our products, but we cannot guarantee 100% undetectability. We strongly recommend using our products on alternate accounts only."
    },
    {
      id: 4,
      question: "Can I use my key on a different computer?",
      answer: "Most of our product keys are HWID (Hardware ID) locked to a single computer for security purposes. If you need to transfer your license to a new PC, please contact our support team. Note that frequent HWID resets may result in additional verification steps."
    },
    {
      id: 5,
      question: "Why is the loader detected as a virus by my antivirus?",
      answer: "This is a false positive. Our loaders use code injection and obfuscation techniques that are similar to those used by actual malware, which triggers antivirus heuristics. We guarantee our software is safe and malware-free. You'll need to add an exception in your antivirus software to run our products."
    },
    {
      id: 6,
      question: "Is a Windows Reset/Reinstall required?",
      answer: "Sometimes a fresh Windows installation is recommended for optimal compatibility and to avoid conflicts with other software or previous security measures. While not always required, starting with a clean system can prevent many technical issues and improve performance."
    }
  ];

  let openFaqId = $state<number | null>(null);

  function toggleFaq(id: number) {
    openFaqId = openFaqId === id ? null : id;
  }
</script>

<svelte:head>
  <title>Terms & FAQ - HAJI UTONG</title>
</svelte:head>

<Header
  menuItems={[
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "Status", href: "/status" },
    { name: "Feedback", href: "/feedback" }
  ]} />

<div class="relative isolate">
  <!-- Ambient Green Light Effect -->
  <div class="absolute inset-0 -z-10 size-full">
    <LightRays raysColor="#00BC7D" raysSpeed={1} lightSpread={0.5} rayLength={3} followMouse={false} noiseAmount={0.2} distortion={0.05} />
  </div>

  <main class="overflow-hidden">
    <div class="min-h-screen bg-background pt-24 md:pt-28 pb-16">
      <div class="mx-auto max-w-5xl px-6 py-8">
        
        <!-- Page Header -->
        <div class="mb-12 text-center">
          <h1 class="text-5xl font-black mb-4 text-primary drop-shadow-[0_0_30px_rgba(0,188,125,0.3)]">TERMS & FAQ</h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please read our terms carefully before making a purchase
          </p>
        </div>

        <!-- Section A: Terms of Purchase -->
        <section class="mb-16">
          <Card class="overflow-hidden border border-white/5 bg-neutral-900/80 backdrop-blur-sm rounded-3xl">
            <CardContent class="p-8 space-y-8">
              <div>
                <h2 class="text-2xl font-bold mb-6 text-primary">Terms of Purchase</h2>
              </div>

              <!-- Access Denied -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Access Denied
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  Employees, contractors, and affiliates of anti-cheat companies (including but not limited to EA, Epic Games, Riot Games, Valve, BattlEye, Easy Anti-Cheat, and Vanguard) are strictly prohibited from accessing, purchasing, or using any products or services offered on HAJI UTONG. Any violation will result in immediate termination of service and potential legal action.
                </p>
              </div>

              <!-- Order Acceptance -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Order Acceptance
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  HAJI UTONG reserves the right to refuse or cancel any order at our discretion. This includes but is not limited to orders that appear fraudulent, violate our terms of service, or are from prohibited jurisdictions. We may require additional verification for certain orders.
                </p>
              </div>

              <!-- Pricing and Payment -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Pricing and Payment
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  All prices are listed in IDR (Indonesian Rupiah) and USD (United States Dollar). Prices are subject to change without notice. Payment must be received in full before product delivery. Once a subscription or license period has begun, no refunds will be issued for partial usage or early cancellation.
                </p>
              </div>

              <!-- Payment and Refund -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Payment and Refund Policy
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  <strong class="text-foreground">All sales are final.</strong> Refunds are only issued in exceptional circumstances where the software is technically incompatible with your system and our support team has made reasonable attempts to resolve the issue without success. If a refund is approved, a 10% service fee will be deducted from the refund amount to cover processing costs. Refund requests must be submitted within 48 hours of purchase.
                </p>
              </div>

              <!-- Assumption of Risk -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Assumption of Risk
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  By purchasing and using HAJI UTONG products, you acknowledge and accept that using third-party software in online games carries an inherent risk of account suspension, permanent ban, or other penalties imposed by game developers or publishers. HAJI UTONG is not responsible for any account actions, including but not limited to bans, suspensions, or loss of in-game items or progress. We strongly recommend using our products on alternate accounts only.
                </p>
              </div>

              <!-- Limitation of Liability -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span class="text-primary">•</span> Limitation of Liability
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed pl-4">
                  HAJI UTONG shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of our products and services. Our total liability shall not exceed the amount paid by you for the specific product or service in question.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <!-- Section B: FAQ Accordion -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div class="space-y-4">
            {#each faqs as faq}
              <div class="overflow-hidden border border-white/5 {openFaqId === faq.id ? 'border-primary/30' : ''} bg-neutral-900/80 backdrop-blur-sm rounded-2xl transition-all duration-300">
                <button
                  onclick={() => toggleFaq(faq.id)}
                  class="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <h3 class="text-base font-semibold text-foreground pr-4">{faq.question}</h3>
                  <div class="flex-shrink-0 text-2xl text-primary transition-transform duration-300 {openFaqId === faq.id ? 'rotate-180' : ''}">
                    ▼
                  </div>
                </button>
                
                {#if openFaqId === faq.id}
                  <div class="px-6 pb-6 pt-0 border-t border-white/5">
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </section>

        <!-- Section C: Contact Us -->
        <section>
          <Card class="overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-3xl">
            <CardContent class="p-8 text-center">
              <div class="mb-6">
                <h2 class="text-2xl font-bold mb-2">Need Help?</h2>
                <p class="text-muted-foreground">If you have questions, our support team is here to assist you</p>
              </div>
              
              <div class="flex flex-wrap items-center justify-center gap-6">
                <a href="#" class="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Discord Server
                </a>
                
                <a href="#" class="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Support
                </a>
                
                <a href="mailto:support@hajiutong.com" class="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  support@hajiutong.com
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

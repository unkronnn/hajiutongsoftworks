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
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-primary">Terms of Purchase</h2>
            <p class="text-muted-foreground mt-2">Please review these terms carefully before proceeding with your purchase</p>
          </div>

          <!-- Premium Terms Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Term 01: Access Restrictions -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">01</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">Access Restrictions</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Access is strictly prohibited for employees, contractors, or associates of any anti-cheat organizations (including EA, Epic Games, Riot, Valve, etc.). Any unauthorized access will be met with immediate legal action.
                </p>
              </div>
            </div>

            <!-- Term 02: All Sales Are Final -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">02</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">All Sales Are Final</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Due to the nature of digital software, we do not offer refunds once a license key has been redeemed or used. Exceptions are only made for unresolvable technical incompatibility verified by our support team.
                </p>
              </div>
            </div>

            <!-- Term 03: Usage Risk & Liability -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">03</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">Usage Risk & Liability</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  By purchasing, you acknowledge the inherent risks of using third-party software in online games. HAJI UTONG is not liable for any account suspensions, bans, or loss of in-game progress. Use responsibly on alternative accounts.
                </p>
              </div>
            </div>

            <!-- Term 04: License Termination -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">04</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">License Termination</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  We reserve the right to revoke license access without refund if we detect suspicious activity, chargebacks, attempts to crack/debug our software, or violation of our community guidelines.
                </p>
              </div>
            </div>

            <!-- Term 05: Service Updates -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">05</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">Service Updates</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Software status (Undetected/Updating) can change at any time. Compensation for downtime is provided at our discretion in the form of extra time added to your subscription.
                </p>
              </div>
            </div>

            <!-- Term 06: HWID Lock -->
            <div class="relative bg-white/5 border border-white/5 rounded-2xl p-6 group hover:bg-white/[0.07] transition-all duration-300">
              <div class="absolute top-4 left-4 text-4xl font-bold text-green-500/20 select-none">06</div>
              <div class="mt-8">
                <h3 class="text-white font-semibold text-lg mb-3">HWID Lock</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Keys are locked to your specific Hardware ID (HWID) upon first activation. HWID resets are available but subject to review to prevent account sharing.
                </p>
              </div>
            </div>

          </div>
        </section>

        <!-- Section B: FAQ Accordion -->
        <section class="mb-16 pt-10">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
            <p class="text-muted-foreground mt-2">Everything you need to know about our products and services</p>
          </div>
          
          <div class="space-y-4">
            {#each faqs as faq}
              <div class="overflow-hidden border border-white/5 {openFaqId === faq.id ? 'border-primary/30' : ''} bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-300">
                <button
                  onclick={() => toggleFaq(faq.id)}
                  class="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.07] transition-colors"
                >
                  <h3 class="text-base font-semibold text-white pr-4">{faq.question}</h3>
                  <div class="flex-shrink-0 text-2xl text-primary transition-transform duration-300 {openFaqId === faq.id ? 'rotate-180' : ''}">
                    ▼
                  </div>
                </button>
                
                {#if openFaqId === faq.id}
                  <div class="border-t border-white/5">
                    <div class="p-6 pt-5">
                      <p class="text-sm text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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

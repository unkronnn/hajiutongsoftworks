<script lang="ts">
  import { page } from "$app/state";
  import Header from "$components/header.svelte";
  import LightRays from "$components/reactbits/LightRays.svelte";
  import ThemeSelector from "$components/theme-selector.svelte";
  import { Button } from "$ui/button";
  import { Card, CardContent } from "$ui/card";
  
  const orderId = $derived(page.params.orderId);
  
  // Mock invoice data (PREVIEW MODE - Replace with real database fetch in production)
  const invoice = {
    orderId: orderId || "ORD-20260120-TEST",
    status: "Pending",
    issuedDate: "Jan 20, 2026",
    customer: {
      name: "Syukron Maulana (Preview)",
      email: "syukron@example.com",
      phone: "+62 812 3456 7890"
    },
    product: {
      name: "Phoenix Pro : Apex Legends",
      variant: "30 Days",
      quantity: 1,
      pricePerUnit: 49999 // Rp 49.999
    },
    payment: {
      method: "E-Wallet",
      provider: "DANA",
      accountNumber: "0812-3456-7890",
      accountName: "Admin HAJI UTONG"
    }
  };
  
  const subtotal = invoice.product.pricePerUnit * invoice.product.quantity;
  const uniqueCode = Math.floor(Math.random() * 900) + 100; // Random 3 digits
  const grandTotal = subtotal + uniqueCode;
  
  // Format currency as Rupiah
  function formatRupiah(amount: number) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }
  
  let uploadedFile = $state<File | null>(null);
  let uploadedFileURL = $state<string | null>(null);
  let copySuccess = $state(false);
  let invoiceStatus = $state<'PENDING' | 'VALIDATION'>('PENDING');
  let showSuccessMessage = $state(false);
  
  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      uploadedFile = target.files[0];
      // Create object URL for preview
      uploadedFileURL = URL.createObjectURL(target.files[0]);
    }
  }
  
  function copyAccountNumber() {
    navigator.clipboard.writeText(invoice.payment.accountNumber);
    copySuccess = true;
    setTimeout(() => copySuccess = false, 2000);
  }
  
  function handleConfirmPayment() {
    if (!uploadedFile) {
      alert("Please upload payment proof first");
      return;
    }
    
    // Transition to VALIDATION status
    invoiceStatus = 'VALIDATION';
    
    // Show success message
    showSuccessMessage = true;
    setTimeout(() => showSuccessMessage = false, 5000);
  }
  
  function viewPaymentProof() {
    if (uploadedFileURL) {
      window.open(uploadedFileURL, '_blank');
    }
  }
  
  function handleCancelInvoice() {
    if (confirm("Are you sure you want to cancel this invoice?")) {
      window.location.href = "/store";
    }
  }
  
  // Get payment details based on provider
  function getPaymentDetails() {
    const { method, provider } = invoice.payment;
    
    if (method === "E-Wallet") {
      return {
        title: `${provider} Payment`,
        icon: "💳",
        instructions: [
          `Open your ${provider} app`,
          "Go to Transfer or Send Money",
          "Enter the account number below",
          `Transfer exactly ${formatRupiah(grandTotal)}`,
          "Take a screenshot of the receipt",
          "Upload the screenshot below"
        ]
      };
    } else if (method === "Bank Transfer") {
      return {
        title: `${provider} Bank Transfer`,
        icon: "🏦",
        instructions: [
          `Open your banking app or visit ${provider} ATM`,
          "Select Transfer to Other Account",
          "Enter the account number below",
          `Transfer exactly ${formatRupiah(grandTotal)}`,
          "Keep your transaction receipt",
          "Upload the receipt screenshot below"
        ]
      };
    } else if (method === "QRIS") {
      return {
        title: "QRIS Payment",
        icon: "📱",
        instructions: [
          "Open any QRIS-supported app",
          "Scan the QR code provided",
          `Pay exactly ${formatRupiah(grandTotal)}`,
          "Take a screenshot of the receipt",
          "Upload the screenshot below"
        ]
      };
    } else {
      return {
        title: "Cryptocurrency Payment",
        icon: "₿",
        instructions: [
          "Open your crypto wallet",
          "Send to the wallet address below",
          `Transfer exactly ${formatRupiah(grandTotal)} in USDT`,
          "Wait for confirmation",
          "Upload transaction hash screenshot below"
        ]
      };
    }
  }
  
  const paymentDetails = getPaymentDetails();
</script>

<svelte:head>
  <title>Invoice #{orderId} - HAJI UTONG</title>
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
      <div class="mx-auto max-w-4xl px-6 py-8">
        
        <!-- Invoice Header -->
        <div class="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 class="text-4xl font-black text-white mb-2">Invoice #{orderId}</h1>
            <p class="text-muted-foreground">Issued on {invoice.issuedDate}</p>
          </div>
          
          <!-- Dynamic Status Badge -->
          {#if invoiceStatus === 'PENDING'}
            <div class="rounded-full px-6 py-2 bg-yellow-500/10 border border-yellow-500/30">
              <span class="text-yellow-500 font-semibold text-lg">⏳ Pending</span>
            </div>
          {:else if invoiceStatus === 'VALIDATION'}
            <div class="rounded-full px-6 py-2 bg-blue-500/10 border border-blue-500/30">
              <span class="text-blue-400 font-semibold text-lg">🔍 In Review</span>
            </div>
          {/if}
        </div>
        
        <!-- Success Message Toast -->
        {#if showSuccessMessage}
          <div class="mb-6 rounded-2xl bg-primary/10 border border-primary/30 p-4 animate-pulse">
            <p class="text-primary font-semibold text-center">
              ✓ Payment proof uploaded! Please wait for validation.
            </p>
          </div>
        {/if}

        <!-- Main Invoice Card -->
        <Card class="overflow-hidden border border-green-500/20 bg-neutral-900/90 backdrop-blur-sm rounded-3xl mb-6 shadow-[0_0_30px_rgba(0,188,125,0.15)]">
          <CardContent class="p-8">
            
            <!-- Section 1: Billing Information -->
            <div class="mb-8 pb-8 border-b border-white/10">
              <h2 class="text-2xl font-bold text-primary mb-6">Billing Information</h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p class="text-sm text-gray-400 mb-1">Full Name</p>
                  <p class="text-white font-semibold">{invoice.customer.name}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">Email Address</p>
                  <p class="text-white font-semibold">{invoice.customer.email}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-400 mb-1">Phone Number</p>
                  <p class="text-white font-semibold">{invoice.customer.phone}</p>
                </div>
              </div>
            </div>

            <!-- Section 2: Order Details -->
            <div class="mb-8 pb-8 border-b border-white/10">
              <h2 class="text-2xl font-bold text-primary mb-6">Order Details</h2>
              
              <!-- Product Table -->
              <div class="bg-white/5 rounded-2xl overflow-hidden">
                <!-- Table Header -->
                <div class="grid grid-cols-12 gap-4 p-4 bg-black/30 border-b border-white/10">
                  <div class="col-span-6 text-sm font-semibold text-gray-300">Product</div>
                  <div class="col-span-2 text-sm font-semibold text-gray-300 text-center">Quantity</div>
                  <div class="col-span-2 text-sm font-semibold text-gray-300 text-right">Price</div>
                  <div class="col-span-2 text-sm font-semibold text-gray-300 text-right">Total</div>
                </div>
                
                <!-- Product Row -->
                <div class="grid grid-cols-12 gap-4 p-4">
                  <div class="col-span-6">
                    <p class="text-white font-semibold">{invoice.product.name}</p>
                    <p class="text-sm text-gray-400">{invoice.product.variant}</p>
                  </div>
                  <div class="col-span-2 text-center text-white">{invoice.product.quantity}</div>
                  <div class="col-span-2 text-right text-white">{formatRupiah(invoice.product.pricePerUnit)}</div>
                  <div class="col-span-2 text-right text-white font-semibold">{formatRupiah(subtotal)}</div>
                </div>
              </div>

              <!-- Totals Section -->
              <div class="mt-6 space-y-3">
                <div class="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div class="flex justify-between text-gray-300">
                  <span>Unique Code <span class="text-xs text-gray-500">(for verification)</span></span>
                  <span>+Rp {uniqueCode}</span>
                </div>
                <div class="h-px bg-white/10 my-4"></div>
                <div class="flex justify-between text-2xl font-bold">
                  <span class="text-white">Grand Total</span>
                  <span class="text-primary drop-shadow-[0_0_15px_rgba(0,188,125,0.5)]">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>

            <!-- Section 3: Payment Instructions -->
            <div class="mb-8 pb-8 border-b border-white/10">
              <h2 class="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <span class="text-3xl">{paymentDetails.icon}</span>
                {paymentDetails.title}
              </h2>
              
              <div class="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6">
                <p class="text-white font-semibold mb-4">
                  ⚠️ Please transfer exactly <span class="text-primary text-xl font-bold">{formatRupiah(grandTotal)}</span> to complete your order.
                </p>
                <p class="text-sm text-gray-400">
                  The unique code helps us verify your payment automatically. Do not round the amount!
                </p>
              </div>

              <!-- Account Number Box -->
              <div class="bg-black/40 rounded-xl p-6 border border-white/10">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-sm text-gray-400 mb-1">Account Number / Phone</p>
                    <p class="text-white text-2xl font-bold tracking-wider">{invoice.payment.accountNumber}</p>
                  </div>
                  <button
                    onclick={copyAccountNumber}
                    class="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all"
                  >
                    {#if copySuccess}
                      <span>✓</span>
                      <span class="font-semibold">Copied!</span>
                    {:else}
                      <span>📋</span>
                      <span class="font-semibold">Copy</span>
                    {/if}
                  </button>
                </div>
                <p class="text-sm text-gray-400">Account Name: <span class="text-white font-semibold">{invoice.payment.accountName}</span></p>
              </div>

              <!-- Step-by-Step Instructions -->
              <div class="mt-6">
                <p class="text-white font-semibold mb-3">Payment Steps:</p>
                <ol class="space-y-2">
                  {#each paymentDetails.instructions as instruction, idx}
                    <li class="flex gap-3 text-sm text-gray-300">
                      <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  {/each}
                </ol>
              </div>
            </div>

            <!-- Section 4: Upload Payment Proof / Submitted Status -->
            <div>
              <h2 class="text-2xl font-bold text-primary mb-6">
                {invoiceStatus === 'PENDING' ? 'Upload Payment Proof' : 'Payment Proof Submitted'}
              </h2>
              
              {#if invoiceStatus === 'PENDING'}
                <!-- Custom File Input (PENDING STATE) -->
                <label 
                  class="block border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5 group"
                >
                  <input 
                    type="file" 
                    accept="image/*"
                    onchange={handleFileChange}
                    class="hidden"
                  />
                  
                  {#if uploadedFile}
                    <div class="text-primary">
                      <div class="text-5xl mb-3">✓</div>
                      <p class="text-lg font-semibold text-white">{uploadedFile.name}</p>
                      <p class="text-sm text-gray-400 mt-2">Click to change file</p>
                    </div>
                  {:else}
                    <div class="text-gray-400 group-hover:text-primary transition-colors">
                      <div class="text-5xl mb-3">📤</div>
                      <p class="text-lg font-semibold text-white">Click to Upload Screenshot</p>
                      <p class="text-sm mt-2">Accepted formats: JPG, PNG (Max 5MB)</p>
                    </div>
                  {/if}
                </label>

                <!-- Confirm Payment Button -->
                <Button 
                  onclick={handleConfirmPayment}
                  class="w-full mt-6 bg-primary hover:bg-primary/90 text-black font-bold text-lg py-6 rounded-xl shadow-[0_0_20px_rgba(0,188,125,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,188,125,0.5)]"
                  size="lg"
                >
                  Confirm Payment
                </Button>

                <p class="text-center text-sm text-gray-400 mt-4">
                  Your order will be processed within 5-15 minutes after payment verification
                </p>
                
              {:else if invoiceStatus === 'VALIDATION'}
                <!-- Payment Submitted View (VALIDATION STATE) -->
                <div class="bg-white/5 border border-primary/20 rounded-2xl p-8 text-center">
                  <div class="text-6xl mb-4">✅</div>
                  <h3 class="text-xl font-bold text-white mb-3">Payment Proof Submitted</h3>
                  <p class="text-gray-400 mb-6">
                    Your payment proof is being reviewed by our team. You will receive an email confirmation once verified.
                  </p>
                  
                  <!-- View Proof Button -->
                  {#if uploadedFileURL}
                    <Button
                      onclick={viewPaymentProof}
                      variant="outline"
                      class="border border-white/20 hover:bg-white/5 text-white"
                      size="lg"
                    >
                      <span class="mr-2">👁️</span>
                      View My Proof
                    </Button>
                  {/if}
                  
                  <p class="text-sm text-gray-500 mt-6">
                    Estimated verification time: 5-15 minutes
                  </p>
                </div>
              {/if}
            </div>

          </CardContent>
        </Card>

        <!-- Cancel Invoice Button (Only show in PENDING state) -->
        {#if invoiceStatus === 'PENDING'}
          <div class="text-center">
            <button
              onclick={handleCancelInvoice}
              class="text-red-500 hover:text-red-400 font-semibold border-2 border-red-500/30 hover:border-red-500/50 rounded-xl px-8 py-3 transition-all"
            >
              Cancel Invoice
            </button>
          </div>
        {/if}

      </div>
    </div>
  </main>
</div>

<div class="fixed right-4 bottom-4 rounded-md bg-card">
  <ThemeSelector />
</div>

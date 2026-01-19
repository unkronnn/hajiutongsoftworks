# Auto-Push Script untuk Windows PowerShell
# Jalankan: .\auto-push.ps1

Write-Host "🚀 Auto Git Push Script" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""

# Get commit message from user
$commitMessage = Read-Host "Masukkan commit message (kosongkan untuk 'Auto update')"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "Auto update: $timestamp"
}

Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .

Write-Host "💾 Committing..." -ForegroundColor Yellow
git commit -m "$commitMessage"

Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Done! Changes pushed to GitHub" -ForegroundColor Green

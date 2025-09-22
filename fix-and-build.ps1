# fix-and-build.ps1  (PowerShell-ready)
Set-StrictMode -Version Latest
Write-Host "Running repo fixes and local build checks..." -ForegroundColor Cyan

# Helper to run npm pkg set in a folder
function Set-PkgScript($path, $scriptName, $scriptValue) {
  if (-not (Test-Path $path)) {
    Write-Host "Path not found: $path" -ForegroundColor Yellow
    return
  }
  Push-Location $path
  try {
    Write-Host "Updating $path -> $scriptName = $scriptValue"
    npm pkg set ("scripts." + $scriptName) = $scriptValue
  } catch {
    Write-Host ("Failed to update package.json in {0}: {1}" -f $path, $($_.Exception.Message)) -ForegroundColor Red
  } finally {
    Pop-Location
  }
}

# 1) Update package.json scripts
Set-PkgScript ".\packages\account-service" "start" "node src/index.js"
Set-PkgScript ".\packages\account-service" "build" "tsc"

Set-PkgScript ".\packages\auth-service" "start" "node src/index.js"
Set-PkgScript ".\packages\auth-service" "build" "tsc"

Set-PkgScript ".\packages\bff" "start" "node dist/index.js"
Set-PkgScript ".\packages\bff" "build" "tsc"

Write-Host "Package.json script updates complete." -ForegroundColor Green

# 2) Generate pnpm-lock.yaml for frontend if missing
$frontendPath = ".\frontend"
if (Test-Path $frontendPath) {
  Push-Location $frontendPath
  Write-Host "Generating pnpm lockfile for frontend (if missing)..." -ForegroundColor Cyan
  try {
    corepack enable
    corepack prepare pnpm@latest --activate
    pnpm install --lockfile-only
    Write-Host "pnpm-lock.yaml created/updated in frontend." -ForegroundColor Green
  } catch {
    Write-Host ("pnpm lockfile generation failed: {0}" -f $($_.Exception.Message)) -ForegroundColor Yellow
  } finally {
    Pop-Location
  }
} else {
  Write-Host "frontend folder not found at $frontendPath" -ForegroundColor Yellow
}

# helper to run pnpm install with fallback
function Pnpm-InstallWithFallback {
  param([string]$folder)
  if (-not (Test-Path $folder)) {
    Write-Host "Folder not found: $folder" -ForegroundColor Yellow
    return $false
  }
  Push-Location $folder
  try {
    corepack enable
    corepack prepare pnpm@latest --activate
  } catch {
    Write-Host ("corepack/pnpm enable failed: {0}" -f $($_.Exception.Message)) -ForegroundColor Yellow
  }
  $success = $false
  try {
    Write-Host ("Running: pnpm install --frozen-lockfile in {0}" -f $folder)
    & pnpm install --frozen-lockfile
    $success = $true
  } catch {
    Write-Host ("pnpm --frozen-lockfile failed, trying pnpm install: {0}" -f $($_.Exception.Message)) -ForegroundColor Yellow
    try {
      & pnpm install
      $success = $true
    } catch {
      Write-Host ("pnpm install failed in {0}: {1}" -f $folder, $($_.Exception.Message)) -ForegroundColor Red
      $success = $false
    }
  } finally {
    Pop-Location
  }
  return $success
}

# helper to try build
function Try-Build {
  param([string]$folder)
  if (-not (Test-Path $folder)) {
    Write-Host "Folder not found: $folder" -ForegroundColor Yellow
    return
  }
  Push-Location $folder
  $pkg = $null
  try { $pkg = Get-Content package.json -Raw -ErrorAction Stop } catch {}
  if ($pkg -and $pkg -match '"build"') {
    try {
      Write-Host ("Running pnpm run build in {0}" -f $folder)
      & pnpm run build
      Write-Host ("Build succeeded for {0}" -f $folder) -ForegroundColor Green
    } catch {
      Write-Host ("Build failed for {0}: {1}" -f $folder, $($_.Exception.Message)) -ForegroundColor Red
    }
  } else {
    Write-Host ("No build script found in {0} (skipping build)" -f $folder) -ForegroundColor Yellow
  }
  Pop-Location
}

# 3) Install deps and build each service
$services = @(
  ".\packages\account-service",
  ".\packages\auth-service",
  ".\packages\bff",
  ".\frontend"
)

foreach ($s in $services) {
  Write-Host "-----" -ForegroundColor DarkCyan
  Write-Host ("Installing and building {0}" -f $s) -ForegroundColor Cyan
  $installed = Pnpm-InstallWithFallback -folder $s
  if ($installed) {
    Try-Build -folder $s
  } else {
    Write-Host ("Skipping build because install failed for {0}" -f $s) -ForegroundColor Red
  }
}

# 4) Chatbot: install Python deps (if Python present)
$chatbotPath = ".\Chatbot-service"
if (Test-Path $chatbotPath) {
  Push-Location $chatbotPath
  if (Test-Path "requirements.txt") {
    try {
      Write-Host "Installing Python deps for Chatbot-service..."
      & python -m pip install --upgrade pip
      & python -m pip install -r requirements.txt
      Write-Host "Python deps installed." -ForegroundColor Green
    } catch {
      Write-Host ("Python deps install failed: {0}" -f $($_.Exception.Message)) -ForegroundColor Yellow
    } finally {
      Pop-Location
    }
  } else {
    Pop-Location
    Write-Host "Chatbot-service/requirements.txt not found, skipping Python install." -ForegroundColor Yellow
  }
} else {
  Write-Host "Chatbot-service folder not found, skipping." -ForegroundColor Yellow
}

Write-Host "Local builds complete. Now run smoke tests manually (start each service) to verify they respond." -ForegroundColor Green

# Optional: local Docker builds (uncomment to enable)
<# 
Write-Host "Building Docker images locally (optional)..." -ForegroundColor Cyan
try {
  docker build -t digitalbank/auth-service:local -f packages/auth-service/Dockerfile ./packages/auth-service
  docker build -t digitalbank/account-service:local -f packages/account-service/Dockerfile ./packages/account-service
  docker build -t digitalbank/bff:local -f packages/bff/Dockerfile ./packages/bff
  docker build -t digitalbank/chatbot:local -f Chatbot-service/Dockerfile ./Chatbot-service
  docker build -t digitalbank/frontend:local -f frontend/Dockerfile ./frontend
  Write-Host "Docker images built locally." -ForegroundColor Green
} catch {
  Write-Host ("Docker build failed or Docker not running: {0}" -f $($_.Exception.Message)) -ForegroundColor Yellow
}
#>

Write-Host "Script finished. If something failed earlier please copy/paste the error text and I'll help fix it." -ForegroundColor Cyan

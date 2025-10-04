<#
.SYNOPSIS
    One-shot local setup for ApplyBot on Windows (no Docker).
.DESCRIPTION
    Creates virtual environment, installs dependencies, generates .env (if missing),
    checks PostgreSQL connectivity, initializes tables by hitting startup, and starts server.
.NOTES
    Run in PowerShell:  powershell -ExecutionPolicy Bypass -File .\setup_local.ps1
#>

param(
    [string]$PythonExe = "python",
    [string]$DbUser = "applybot_user",
    [string]$DbPassword = "applybot_pass",
    [string]$DbName = "applybot",
    [string]$DbHost = "localhost",
    [int]$DbPort = 5432,
    [switch]$SkipInstall
)

$ErrorActionPreference = 'Stop'

function Write-Step($msg){ Write-Host "[STEP] $msg" -ForegroundColor Cyan }
function Write-Info($msg){ Write-Host "[INFO] $msg" -ForegroundColor Gray }
function Write-Ok($msg){ Write-Host "[ OK ] $msg" -ForegroundColor Green }
function Write-Warn($msg){ Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg){ Write-Host "[FAIL] $msg" -ForegroundColor Red }

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

Write-Step "Project root: $projectRoot"

# 1. Ensure .env
$envPath = Join-Path $projectRoot ".env"
if (-Not (Test-Path $envPath)) {
    Write-Step "Creating .env"
    $dbUrl = "postgresql://$DbUser:$DbPassword@$DbHost:$DbPort/$DbName"
    @"
PROJECT_NAME=ApplyBot
ENVIRONMENT=development
DEBUG=true
DATABASE_URL=$dbUrl
SECRET_KEY=dev-secret-change-me
BACKEND_CORS_ORIGINS=http://localhost:3000,http://localhost:8000
OPENAI_API_KEY=
GROQ_API_KEY=
REED_API_KEY=
ADZUNA_APP_ID=
ADZUNA_APP_KEY=
"@ | Out-File -FilePath $envPath -Encoding UTF8
    Write-Ok ".env created"
} else {
    Write-Info ".env already exists; skipping creation"
}

# 2. Virtual environment
$venvDir = Join-Path $projectRoot ".venv"
if (-Not (Test-Path $venvDir)) {
    Write-Step "Creating virtual environment (.venv)"
    & $PythonExe -m venv .venv
    Write-Ok "Virtual environment created"
} else { Write-Info "Virtual environment already exists" }

# 3. Activate venv
$activate = Join-Path $venvDir "Scripts/Activate.ps1"
if (-Not (Test-Path $activate)) { Write-Err "Activation script not found"; exit 1 }
. $activate
Write-Ok "Virtual environment activated"

# 4. Install dependencies
if (-Not $SkipInstall) {
    Write-Step "Installing dependencies"
    pip install --upgrade pip > $null
    pip install -r requirements.txt
    Write-Ok "Dependencies installed"
} else { Write-Info "Skipping dependency install (per flag)" }

# 5. Check PostgreSQL connectivity (simple socket test)
Write-Step "Checking PostgreSQL connectivity"
try {
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $iar = $tcpClient.BeginConnect($DbHost, $DbPort, $null, $null)
    $wait = $iar.AsyncWaitHandle.WaitOne(3000, $false)
    if (-Not $wait) { throw "Timeout connecting to $DbHost:$DbPort" }
    $tcpClient.EndConnect($iar)
    $tcpClient.Close()
    Write-Ok "Port $DbPort reachable"
}
catch {
    Write-Warn "Could not reach PostgreSQL at $DbHost:$DbPort. Ensure service is running."
}

# 6. Launch server
Write-Step "Starting FastAPI server (start_server_fixed.py)"
Write-Info "Press Ctrl+C to stop. Logs follow below."
python start_server_fixed.py

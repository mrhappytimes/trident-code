# Push Trident Code to GitHub Repository
# Script: push-to-github.ps1
# Purpose: Commit and push trident-code package to GitHub
# Usage: .\push-to-github.ps1 -Message "Your commit message" -Repository "mrhappytimes/trident-code"

param(
    [string]$Message = "Deploy Trident v2.0 for Claude Code",
    [string]$Repository = "mrhappytimes/trident-code",
    [string]$Branch = "main",
    [switch]$Force = $false,
    [switch]$DryRun = $false
)

# Configuration
$GithubUrl = "https://github.com/$Repository.git"
$RepoDirectory = ".\trident-code"
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Colors for output
$Colors = @{
    Success = "Green"
    Error = "Red"
    Warning = "Yellow"
    Info = "Cyan"
}

Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Info
Write-Host "  Trident Code — GitHub Deployment" -ForegroundColor $Colors.Info
Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Info
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version 2>$null
    if (-not $gitVersion) {
        throw "Git not found"
    }
    Write-Host "✓ Git detected: $gitVersion" -ForegroundColor $Colors.Success
} catch {
    Write-Host "✗ Git not installed or not in PATH" -ForegroundColor $Colors.Error
    Write-Host "  Install from: https://git-scm.com/download/win" -ForegroundColor $Colors.Warning
    exit 1
}

# Check if trident-code directory exists
if (-not (Test-Path $RepoDirectory)) {
    Write-Host "✗ Directory not found: $RepoDirectory" -ForegroundColor $Colors.Error
    exit 1
}

Write-Host "✓ Found trident-code directory" -ForegroundColor $Colors.Success
Write-Host ""

# Navigate to repo directory
Push-Location $RepoDirectory
try {
    # Check git status
    Write-Host "Checking repository status..." -ForegroundColor $Colors.Info

    # Initialize git if needed
    if (-not (Test-Path ".\.git")) {
        Write-Host "  Initializing git repository..." -ForegroundColor $Colors.Info
        git init
        git config user.email "automation@smartstart.io"
        git config user.name "Trident Automation"
    }

    # Check for remote
    $remoteUrl = git config --get remote.origin.url
    if (-not $remoteUrl) {
        Write-Host "  Adding remote origin..." -ForegroundColor $Colors.Info
        git remote add origin $GithubUrl
    } else {
        Write-Host "  Remote already configured: $remoteUrl" -ForegroundColor $Colors.Success
    }

    # Show status
    Write-Host ""
    Write-Host "Repository Status:" -ForegroundColor $Colors.Info
    git status --short | ForEach-Object {
        Write-Host "  $_"
    }

    Write-Host ""

    # Stage all files
    Write-Host "Staging files..." -ForegroundColor $Colors.Info
    git add -A

    $stagedFiles = git diff --cached --name-only
    $stagedCount = ($stagedFiles | Measure-Object).Count
    Write-Host "✓ Staged $stagedCount files" -ForegroundColor $Colors.Success

    # Show what's being committed
    Write-Host ""
    Write-Host "Files to commit:" -ForegroundColor $Colors.Info
    $stagedFiles | ForEach-Object {
        Write-Host "  + $_"
    }

    Write-Host ""

    # Confirm before committing
    Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Info
    Write-Host "Commit Details:" -ForegroundColor $Colors.Info
    Write-Host "  Message: $Message" -ForegroundColor $Colors.Info
    Write-Host "  Branch: $Branch" -ForegroundColor $Colors.Info
    Write-Host "  Repository: $Repository" -ForegroundColor $Colors.Info
    Write-Host "  Timestamp: $Timestamp" -ForegroundColor $Colors.Info
    Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Info
    Write-Host ""

    if ($DryRun) {
        Write-Host "[DRY RUN] Commit would proceed here" -ForegroundColor $Colors.Warning
        Write-Host ""
        Write-Host "To perform actual commit and push, run without -DryRun flag" -ForegroundColor $Colors.Warning
        exit 0
    }

    # Commit
    Write-Host "Creating commit..." -ForegroundColor $Colors.Info
    $commitMessage = @"
$Message

Version: Trident v2.0 (Claude Code Edition)
Timestamp: $Timestamp
Platform: Claude Code CLI
Features: 4 agents (Mirror, Scout, Factory, Auditor), 10 Constitutional Principles, cross-user learning

Agents:
- Mirror: Session observation and signal capture
- Scout: Gap research and discovery
- Factory: Command creation and composition
- Auditor: Continuous governance and health assessment

Configuration:
- Supabase integration (optional, enables team cross-learning)
- Local-first data model (works offline)
- Production-ready installation
"@

    git commit -m $commitMessage
    Write-Host "✓ Commit created" -ForegroundColor $Colors.Success

    # Push to GitHub
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor $Colors.Info

    if ($Force) {
        Write-Host "  [FORCE PUSH]" -ForegroundColor $Colors.Warning
        git push -u origin $Branch --force
    } else {
        git push -u origin $Branch
    }

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Push successful" -ForegroundColor $Colors.Success
        Write-Host ""
        Write-Host "Repository URL: https://github.com/$Repository" -ForegroundColor $Colors.Info
        Write-Host "Branch: $Branch" -ForegroundColor $Colors.Info
    } else {
        Write-Host "✗ Push failed (exit code $LASTEXITCODE)" -ForegroundColor $Colors.Error
        Write-Host ""
        Write-Host "Troubleshooting:" -ForegroundColor $Colors.Warning
        Write-Host "  1. Verify you have write access to $Repository" -ForegroundColor $Colors.Warning
        Write-Host "  2. Check GitHub authentication (git credential manager)" -ForegroundColor $Colors.Warning
        Write-Host "  3. Try again or use manual push: git push -u origin $Branch" -ForegroundColor $Colors.Warning
        exit 1
    }

    Write-Host ""
    Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Success
    Write-Host "✓ DEPLOYMENT COMPLETE" -ForegroundColor $Colors.Success
    Write-Host "═════════════════════════════════════════════════════════════" -ForegroundColor $Colors.Success
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor $Colors.Info
    Write-Host "  1. Share GitHub URL: https://github.com/$Repository" -ForegroundColor $Colors.Info
    Write-Host "  2. Users clone with: git clone $GithubUrl" -ForegroundColor $Colors.Info
    Write-Host "  3. Install with: cd trident-code && claude && /trident-install" -ForegroundColor $Colors.Info
    Write-Host ""

} catch {
    Write-Host "✗ Error: $_" -ForegroundColor $Colors.Error
    exit 1
} finally {
    Pop-Location
}

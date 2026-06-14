# ============================================
# DATABASE MANAGEMENT SCRIPT
# Usage: .\scripts\db.ps1 [command]
# Commands:
#   start     - Start all containers
#   stop      - Stop all containers
#   restart   - Restart all containers
#   status    - Show container status
#   logs      - Show PostgreSQL logs
#   migrate   - Run Flyway migrations
#   repair    - Repair Flyway checksum issues
#   info      - Show migration status
#   clean     - Drop all tables (DEV ONLY)
#   backup    - Backup database to file
#   restore   - Restore from backup file
#   connect   - Connect via psql
#   reset     - Full reset (delete volume + restart)
# ============================================

param(
    [Parameter(Mandatory=$true)]
    [string]$Command,
    [string]$BackupFile = ""
)

$PROJECT_NAME = "clsql"
$DB_NAME = "employee_db"
$DB_USER = "postgres"
$CONTAINER = "clsql_postgres"
$BACKUP_DIR = ".\backups"

function Start-Database {
    Write-Host "Starting database containers..." -ForegroundColor Cyan
    docker compose up -d postgres
    Write-Host "Waiting for PostgreSQL to be healthy..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    docker compose up flyway
    Write-Host "Database started and migrations applied." -ForegroundColor Green
}

function Stop-Database {
    Write-Host "Stopping database containers..." -ForegroundColor Cyan
    docker compose down
    Write-Host "Containers stopped." -ForegroundColor Green
}

function Restart-Database {
    Stop-Database
    Start-Sleep -Seconds 2
    Start-Database
}

function Show-Status {
    Write-Host "Container Status:" -ForegroundColor Cyan
    docker compose ps
}

function Show-Logs {
    Write-Host "PostgreSQL Logs:" -ForegroundColor Cyan
    docker compose logs --tail=100 postgres
}

function Run-Migrations {
    Write-Host "Running Flyway migrations..." -ForegroundColor Cyan
    docker compose run --rm flyway migrate
    Write-Host "Migrations complete." -ForegroundColor Green
}

function Repair-Migrations {
    Write-Host "Repairing Flyway checksums..." -ForegroundColor Yellow
    docker compose run --rm flyway repair
    Write-Host "Repair complete." -ForegroundColor Green
}

function Show-MigrationInfo {
    Write-Host "Migration Status:" -ForegroundColor Cyan
    docker compose run --rm flyway info
}

function Clean-Database {
    Write-Host "WARNING: This will DROP ALL TABLES!" -ForegroundColor Red
    $confirm = Read-Host "Type 'yes' to confirm"
    if ($confirm -eq "yes") {
        docker compose run --rm flyway clean
        Write-Host "Database cleaned." -ForegroundColor Yellow
    } else {
        Write-Host "Aborted." -ForegroundColor Green
    }
}

function Backup-Database {
    if (-not (Test-Path $BACKUP_DIR)) {
        New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
    }
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $filename = "$BACKUP_DIR\${DB_NAME}_backup_${timestamp}.sql"
    Write-Host "Backing up database to $filename..." -ForegroundColor Cyan
    docker exec $CONTAINER pg_dump -U $DB_USER -d $DB_NAME --no-password > $filename
    Write-Host "Backup complete: $filename" -ForegroundColor Green
}

function Restore-Database {
    if ($BackupFile -eq "") {
        Write-Host "ERROR: Specify backup file with -BackupFile parameter" -ForegroundColor Red
        Write-Host "Usage: .\scripts\db.ps1 restore -BackupFile .\backups\filename.sql"
        exit 1
    }
    if (-not (Test-Path $BackupFile)) {
        Write-Host "ERROR: File not found: $BackupFile" -ForegroundColor Red
        exit 1
    }
    Write-Host "Restoring from $BackupFile..." -ForegroundColor Yellow
    $confirm = Read-Host "This will overwrite existing data. Type 'yes' to confirm"
    if ($confirm -eq "yes") {
        Get-Content $BackupFile | docker exec -i $CONTAINER psql -U $DB_USER -d $DB_NAME
        Write-Host "Restore complete." -ForegroundColor Green
    } else {
        Write-Host "Aborted." -ForegroundColor Green
    }
}

function Connect-Database {
    Write-Host "Connecting to PostgreSQL..." -ForegroundColor Cyan
    Write-Host "Database: $DB_NAME | User: $DB_USER" -ForegroundColor Yellow
    docker exec -it $CONTAINER psql -U $DB_USER -d $DB_NAME
}

function Reset-Database {
    Write-Host "WARNING: Full database reset!" -ForegroundColor Red
    Write-Host "This will DELETE the volume and recreate everything." -ForegroundColor Red
    $confirm = Read-Host "Type 'RESET' to confirm"
    if ($confirm -eq "RESET") {
        Write-Host "Stopping containers..." -ForegroundColor Yellow
        docker compose down -v
        Write-Host "Restarting with fresh database..." -ForegroundColor Yellow
        Start-Database
        Write-Host "Reset complete." -ForegroundColor Green
    } else {
        Write-Host "Aborted." -ForegroundColor Green
    }
}

# Command Router
switch ($Command.ToLower()) {
    "start"   { Start-Database }
    "stop"    { Stop-Database }
    "restart" { Restart-Database }
    "status"  { Show-Status }
    "logs"    { Show-Logs }
    "migrate" { Run-Migrations }
    "repair"  { Repair-Migrations }
    "info"    { Show-MigrationInfo }
    "clean"   { Clean-Database }
    "backup"  { Backup-Database }
    "restore" { Restore-Database }
    "connect" { Connect-Database }
    "reset"   { Reset-Database }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host "Valid commands: start, stop, restart, status, logs, migrate, repair, info, clean, backup, restore, connect, reset"
    }
}
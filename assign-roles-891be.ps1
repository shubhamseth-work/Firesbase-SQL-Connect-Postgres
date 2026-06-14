$SA_ROLES = @(
    "roles/cloudsql.client",
    "roles/cloudsql.instanceUser",
    "roles/run.invoker",
    "roles/secretmanager.secretAccessor",
    "roles/artifactregistry.reader",
    "roles/firebase.sdkAdminServiceAgent",
    "roles/datastore.user",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter"
)

$PROJECTS = @(
    "firbaseapplication-891be"
)

foreach ($PROJECT in $PROJECTS) {
  Write-Host "`nCreating Artifact Registry in $PROJECT..." -ForegroundColor Cyan

  gcloud artifacts repositories create firbaseapplication-891be `
    --repository-format=docker `
    --location=us-central1 `
    --description="Docker repository for firbaseapplication-891be" `
    --project=$PROJECT

  Write-Host "Registry created in $PROJECT" -ForegroundColor Green
}
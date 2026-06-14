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
    "cl-firebase-sql-react-sandbox"
)

foreach ($PROJECT in $PROJECTS) {
  Write-Host "`nCreating Artifact Registry in $PROJECT..." -ForegroundColor Cyan

  gcloud artifacts repositories create cl-firebase-sql-react-sandbox `
    --repository-format=docker `
    --location=us-central1 `
    --description="Docker repository for cl-firebase-sql-react-sandbox" `
    --project=$PROJECT

  Write-Host "Registry created in $PROJECT" -ForegroundColor Green
}
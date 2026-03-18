# scripts/sync-template.ps1
#
# Descarga y mergea cambios desde el repositorio template base.
# Requiere tener el remote "template" configurado:
#   git remote add template <URL_DEL_TEMPLATE>
#
# Uso: npm run sync-template
#      o directamente: pwsh -File scripts/sync-template.ps1

$ErrorActionPreference = "Stop"

$TEMPLATE_REMOTE = "template"
$TEMPLATE_BRANCH = "main"
$SYNC_BRANCH     = "template-sync"

Write-Host ""
Write-Host "Sincronizando desde el template base..." -ForegroundColor Cyan

# Verificar que el remote existe
$remotes = git remote
if ($remotes -notcontains $TEMPLATE_REMOTE) {
    Write-Host ""
    Write-Host "ERROR: El remote '$TEMPLATE_REMOTE' no existe." -ForegroundColor Red
    Write-Host ""
    Write-Host "Agregalo primero con:"
    Write-Host "  git remote add template <URL_DEL_TEMPLATE>"
    Write-Host ""
    exit 1
}

# Traer los cambios del template (sin aplicar nada todavia)
Write-Host "Haciendo fetch de ${TEMPLATE_REMOTE}/${TEMPLATE_BRANCH}..." -ForegroundColor Yellow
git fetch $TEMPLATE_REMOTE $TEMPLATE_BRANCH

# Recordar la rama actual
$CURRENT_BRANCH = git branch --show-current

# Crear o resetear la rama de sync
$branchExists = git branch --list $SYNC_BRANCH
if ($branchExists) {
    Write-Host "Reseteando rama existente '$SYNC_BRANCH'..." -ForegroundColor Yellow
    git checkout $SYNC_BRANCH
    git reset --hard $CURRENT_BRANCH
} else {
    Write-Host "Creando rama '$SYNC_BRANCH' desde '$CURRENT_BRANCH'..." -ForegroundColor Yellow
    git checkout -b $SYNC_BRANCH
}

# Mergear el template (--no-commit para poder revisar antes de commitear)
Write-Host "Mergeando cambios del template..." -ForegroundColor Yellow
git merge "$TEMPLATE_REMOTE/$TEMPLATE_BRANCH" --allow-unrelated-histories --no-commit --no-ff 2>&1 | Out-Null

Write-Host ""
Write-Host "Listo. Cambios del template en la rama '$SYNC_BRANCH'." -ForegroundColor Green
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor White
Write-Host "  1. Revisa los cambios:     git diff $CURRENT_BRANCH $SYNC_BRANCH"
Write-Host "  2. Resuelve conflictos si los hay"
Write-Host "  3. Commitea el merge:      git add . ; git commit -m 'chore: sync desde template'"
Write-Host "  4. Volvé a tu rama:        git checkout $CURRENT_BRANCH ; git merge $SYNC_BRANCH"
Write-Host "  5. Eliminá la rama temp:   git branch -d $SYNC_BRANCH"
Write-Host ""

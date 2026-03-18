# scripts/sync-template.ps1
#
# Descarga y mergea cambios desde el repositorio template base.
# Requiere tener el remote "template" configurado:
#   git remote add template <URL_DEL_TEMPLATE>
#
# Uso: npm run sync-template
#      o directamente: pwsh -File scripts/sync-template.ps1

$ErrorActionPreference = "Continue"

$TEMPLATE_REMOTE = "template"
$TEMPLATE_BRANCH = "main"
$SYNC_BRANCH     = "template-sync"

Write-Host ""
Write-Host "Sincronizando desde el template base..." -ForegroundColor Cyan

# Verificar que no haya cambios sin commitear
$uncommitted = git status --porcelain
if ($uncommitted) {
    Write-Host ""
    Write-Host "ERROR: Hay cambios sin commitear en el repositorio." -ForegroundColor Red
    Write-Host ""
    git status --short
    Write-Host ""
    Write-Host "Commitea o descarta los cambios antes de sincronizar:"
    Write-Host "  git add . ; git commit -m 'chore: wip antes de sync'"
    Write-Host "  o bien: git stash"
    Write-Host ""
    exit 1
}

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
# git devuelve exit code 1 con --no-commit incluso cuando el merge fue exitoso; es esperado.
Write-Host "Mergeando cambios del template..." -ForegroundColor Yellow
git merge "$TEMPLATE_REMOTE/$TEMPLATE_BRANCH" --allow-unrelated-histories --no-commit --no-ff
$mergeExit = $LASTEXITCODE

if ($mergeExit -ne 0 -and $mergeExit -ne 1) {
    Write-Host ""
    Write-Host "ERROR: El merge falló con código $mergeExit." -ForegroundColor Red
    exit $mergeExit
}

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

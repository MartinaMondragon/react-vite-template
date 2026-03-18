# Frontend Template

Template frontend listo para producción construido con React 18, Vite 5, TypeScript, TailwindCSS y shadcn/ui. Clonalo y empezá a construir de inmediato — sin configuración manual.

## Stack

| Herramienta | Propósito |
|---|---|
| **React 18** | Librería de UI |
| **Vite 5** | Servidor de desarrollo y bundler |
| **TypeScript 5** | Tipado estricto |
| **TailwindCSS 3** | CSS utility-first |
| **shadcn/ui** | Librería de componentes accesibles |
| **Biome** | Linting y formatting (reemplaza ESLint + Prettier) |
| **Vitest** | Testing unitario y de componentes |
| **Testing Library** | Utilidades para tests de React |
| **Axios** | Cliente HTTP con interceptors |

---

## Inicio rápido

### Requisitos

- Node.js 20+
- npm 10+

### Setup

```bash
git clone <url-de-tu-repo>
cd frontend-template
npm install
cp .env.example .env
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173).

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Type-check + build de producción |
| `npm run preview` | Preview del build de producción en local |
| `npm test` | Tests en modo watch |
| `npm run test:ui` | Interfaz visual de Vitest en el browser |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run lint` | Verificar reglas de lint |
| `npm run lint:fix` | Corregir problemas de lint automáticamente |
| `npm run format` | Formatear todos los archivos con Biome |
| `npm run type-check` | Solo type-check de TypeScript (sin emitir) |
| `npm run sync-template` | Sincronizar cambios del template base con la última versión *(requiere PowerShell)* |
| `npm run sync-template -- -Tag v1.2.0` | Sincronizar con un tag específico del template |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/               # Componentes de shadcn/ui (se agregan con el CLI)
│   ├── layout/           # Header, RootLayout
│   ├── providers/        # ThemeProvider (light/dark)
│   └── ErrorBoundary.tsx # Error boundary global
│
├── features/             # Módulos por funcionalidad (componentes + lógica juntos)
│   └── home/
│       └── HomePage.tsx
│
├── hooks/                # Hooks de React reutilizables
│   └── use-theme.ts
│
├── lib/                  # Utilidades core compartidas en toda la app
│   ├── api.ts            # Instancia de Axios con interceptors
│   └── utils.ts          # Helper cn() para combinar clases de Tailwind
│
├── services/             # Capa de servicios de API (un archivo por recurso)
│   └── user.service.ts
│
├── test/                 # Setup global de Vitest
│   └── setup.ts
│
├── types/                # Interfaces y tipos TypeScript compartidos
│   └── index.ts
│
├── utils/                # Funciones utilitarias puras (sin React)
│   └── formatters.ts
│
├── App.tsx
├── index.css             # Directivas de Tailwind + tema con variables CSS
├── main.tsx
└── vite-env.d.ts         # Variables de entorno tipadas
```

---

## Variables de entorno

Copiá `.env.example` a `.env` y completá con tus valores:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Mi App
```

> Todas las variables **deben** tener el prefijo `VITE_` para ser expuestas al browser.
> Están tipadas en `src/vite-env.d.ts` — agregá nuevas variables ahí cuando las sumes a `.env.example`.

---

## Agregar componentes de shadcn/ui

```bash
npx shadcn@latest add <componente>
```

Ejemplos:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add toast
npx shadcn@latest add table
```

Los componentes se instalan en `src/components/ui/` y están excluidos del lint de Biome (siguen sus propias convenciones).

---

## Tema (claro / oscuro)

El modo oscuro se activa agregando la clase `dark` al elemento `<html>`. El `ThemeProvider` y el hook `use-theme` lo gestionan automáticamente, guardando la preferencia en `localStorage`.

```tsx
import { useThemeContext } from "@/components/providers/ThemeProvider";

function MiComponente() {
  const { resolvedTheme, setTheme } = useThemeContext();
  return <button onClick={() => setTheme("dark")}>{resolvedTheme}</button>;
}
```

---

## Alias de paths

Configurados en `tsconfig.app.json` y `vite.config.ts`:

| Alias | Resuelve a |
|---|---|
| `@/components` | `src/components` |
| `@/features` | `src/features` |
| `@/hooks` | `src/hooks` |
| `@/lib` | `src/lib` |
| `@/services` | `src/services` |
| `@/types` | `src/types` |
| `@/utils` | `src/utils` |

---

## Testing

```bash
npm test                 # modo watch
npm run test:coverage    # ejecución única con reporte HTML en coverage/
npm run test:ui          # interfaz visual interactiva en el browser
```

Los tests viven junto al código que testean en subdirectorios `__tests__/`:

```
src/components/ui/__tests__/button.test.tsx   # test de componente
src/utils/__tests__/formatters.test.ts        # test de lógica pura
```

---

## Capa de API

El cliente Axios pre-configurado en `src/lib/api.ts` se encarga de:

- URL base desde `VITE_API_URL`
- Inyección del header `Authorization: Bearer <token>`
- Redirección automática a `/login` ante un error `401`

Usá los archivos `src/services/*.service.ts` para organizar las llamadas por recurso:

```ts
import { userService } from "@/services/user.service";

const usuarios = await userService.getAll();
```

---

## Sincronización con el template base

Este template está diseñado para usarse como punto de partida de múltiples proyectos. La idea es simple: **este repo es el "padre"** y cada proyecto que creaste a partir de él es un "hijo". Cuando mejorás el template (arreglás algo, agregás una herramienta, actualizás dependencias), podés propagar esas mejoras a todos los proyectos hijos sin perder el trabajo propio de cada uno.

### Cómo funciona el flujo

```
[frontend-template]  ──── remote "template" ────►  [mi-proyecto-a]
        │                                            [mi-proyecto-b]
        │                                            [mi-proyecto-c]
        ▼
  Hacés mejoras acá
  (fix de config, nuevo hook, etc.)
        │
        ▼
  Cada proyecto hijo hace: git fetch template + git merge
  y resuelve solo los conflictos con su código propio
```

El mecanismo de Git que hace esto posible se llama **remote adicional**. Git permite que un repo tenga más de un remote: el `origin` apunta a tu propio repo, y el `template` apunta al template base. Así podés traer commits del template sin mezclar los historiales permanentemente.

---

### PARTE 1 — Si sos el dueño del template (repo padre)

> Esto aplica cuando querés mejorar el template base para que todos los proyectos hijos puedan beneficiarse.

#### Trabajar en el template

1. Cloná o trabajá directamente en este repositorio.
2. Hacé tus cambios: actualizá dependencias, mejorá configuraciones, agregá hooks o utilidades genéricas.
3. Commiteá y mergeá a `main`:

```bash
git checkout -b feat/agrego-use-debounce
git add .
git commit -m "feat: agrego hook useDebounce genérico"
git push 
git checkout main
git merge feat/agrego-use-debounce
```

#### Qué conviene tocar en el template (y qué no)

| Buen candidato para el template | No pertenece al template |
|---|---|
| Configs de herramientas (`biome.json`, `vite.config.ts`, tsconfig) | Lógica de negocio específica de un proyecto |
| Hooks reutilizables (`useDebounce`, `useLocalStorage`, etc.) | Componentes de UI muy específicos |
| Utilidades genéricas (`formatters`, `validators`) | Variables de entorno de producción |
| Setup de CI/CD | Features o páginas propias de cada app |
| Actualizaciones de dependencias base | Estilos o temas propios de cada proyecto |

#### Versionado semántico (recomendado)

Usá tags para marcar versiones estables del template. Esto permite a los proyectos hijos elegir a qué versión sincronizar:

```bash
git tag v1.1.0 -m "feat: agrego useDebounce y mejoro CI"
git push origin v1.1.0
```

---

### PARTE 2 — Si sos el dueño de un proyecto hijo

> Esto aplica cuando creaste tu proyecto a partir de este template y querés recibir las mejoras que se hicieron en el template base.

#### Paso 1 — Configurar el remote del template (solo la primera vez)

Antes de poder sincronizar, Git necesita saber dónde está el template. Esto se hace **una sola vez por proyecto**:

```bash
git remote add template https://github.com/<owner>/frontend-template.git
```

Verificá que quedó bien:

```bash
git remote -v
# origin    https://github.com/tu-usuario/mi-proyecto.git (fetch)
# origin    https://github.com/tu-usuario/mi-proyecto.git (push)
# template  https://github.com/<owner>/frontend-template.git (fetch)
# template  https://github.com/<owner>/frontend-template.git (push)
```

> Este remote **no modifica nada** por sí solo. Solo le dice a Git de dónde puede traer cambios cuando vos se lo pedís explícitamente.

#### Paso 2 — Ver qué cambió en el template antes de mergear

Antes de aplicar cualquier cambio, siempre conviene revisar qué trae el template:

```powershell
# Trae la info del template y sus tags sin aplicar nada todavía
git fetch template main
git fetch template --tags

# Muestra los commits del template que no tenés en tu proyecto
git log HEAD..template/main --oneline

# Muestra exactamente qué archivos cambiaron
git diff HEAD template/main --name-only

# Ver todos los tags disponibles del template
git tag -l
```

#### Paso 3 — Sincronizar con el script de PowerShell

La forma más segura es usar el script incluido, que crea una rama intermedia para que puedas revisar antes de mergear.

**Sincronizar con la última versión de `main`:**

```powershell
npm run sync-template
```

**Sincronizar con un tag específico:**

```powershell
npm run sync-template -- -Tag v1.2.0
```

Si el tag no existe, el script lista los disponibles y aborta.

El script hace esto por vos:

1. Verifica que no haya cambios sin commitear (aborta si los hay, para no perder trabajo).
2. Verifica que el remote `template` exista.
3. Hace `git fetch template main` y `git fetch template --tags`.
4. Si usás `-Tag`, verifica que ese tag exista.
5. Crea una rama `template-sync` desde tu rama actual.
6. Ejecuta el merge en esa rama (sin commitear) para que puedas revisar.
7. Te imprime los próximos pasos a seguir.

Después del script, revisás los cambios y completás:

```powershell
# Revisá qué cambió
git diff main template-sync

# Si todo está bien, commiteás en la rama sync
git add .
git commit -m "chore: sync desde template v1.2.0"

# Mergeás de vuelta a tu rama principal
git checkout main ; git merge template-sync

# Limpiás la rama temporal
git branch -d template-sync
```

#### Paso 3 (alternativa) — Sincronizar manualmente sin el script

Si preferís control total sin ejecutar el script:

```powershell
git fetch template main

# Opción A: mergear todo de una vez
git merge template/main --allow-unrelated-histories

# Opción B: cherry-pick de commits específicos (más quirúrgico)
git cherry-pick <hash-del-commit>
```

#### Paso 4 — Resolver conflictos

Es normal que haya conflictos, especialmente en archivos de configuración. Git va a marcar los conflictos así:

```
<<<<<<< HEAD
// tu versión (la del proyecto hijo)
=======
// versión del template padre
>>>>>>> template/main
```

**Estrategia recomendada para cada tipo de archivo:**

| Archivo | Qué hacer ante un conflicto |
|---|---|
| `biome.json`, `tsconfig*.json` | Quedarte con la versión del template (tiene las últimas mejoras) |
| `vite.config.ts` | Revisar — puede haber alias o plugins propios de tu proyecto |
| `package.json` | Tomar versiones nuevas del template, conservar tus dependencias propias |
| `src/lib/api.ts` | Mezclar: tomás mejoras del template pero conservás tu lógica de auth |
| `src/components/ui/` | Quedarte con la versión del template |
| `src/features/` | **Siempre** quedarte con tu versión (es código de tu proyecto) |
| `.github/workflows/ci.yml` | Quedarte con la versión del template |
| `README.md` | Quedarte con tu versión o mezclar selectivamente |

Una vez resueltos todos los conflictos:

```bash
git add .
git commit -m "chore: sync desde template v1.1.0, resuelvo conflictos"
```

---

### Consejos para que las sincronizaciones sean simples

- **Mantené tu código de negocio en `src/features/`**: es la carpeta que el template nunca toca, así los merges son limpios.
- **No modifiques los archivos de config del template sin necesidad**: si cambiás `biome.json` o `tsconfig.json` sin motivo, cada sync va a generar conflictos ahí.
- **Usá `.env.local` para overrides locales** en lugar de modificar `.env`.
- **Hacé syncs frecuentes y pequeños**: es mucho más fácil resolver 3 commits de diferencia que 50.
- **Etiquetá las versiones del template**: cuando sincronices, anotá en el commit a qué versión sincronizaste (`chore: sync template v1.2.0`).

---

## Contribuciones

1. Forkear el repositorio.
2. Crear una rama de feature: `git checkout -b feat/mi-feature`
3. Commitear los cambios: `git commit -m 'feat: agrego mi feature'`
4. Pushear y abrir un Pull Request.


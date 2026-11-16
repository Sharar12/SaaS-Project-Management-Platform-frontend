# OrbitFlow Frontend — Multi-Company Edition

Next.js 15 + React 19 + TypeScript frontend with demo-mode multi-account registration, login, company creation, company switching, team roles and company-scoped tasks/projects.

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000/register` to create an account and then create a company. The mock backend is stored in browser LocalStorage and is intended only for local demonstration. Use `/login` to sign in.

## Demo accounts

- `amina@orbittech.io` / `password123` — OrbitTech owner
- `liam@orbittech.io` / `password123` — OrbitTech member
- `elena@novastudio.co` / `password123` — Nova Studio owner

## Checks

```powershell
npm run typecheck
npm run lint
npm run build
```

## Switch to Laravel

Replace `src/services/apiService.ts` with the contents of `../backend/integration/apiService.laravel.ts` and set:

```env
NEXT_PUBLIC_API_MODE=laravel
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

The mock backend can then be removed after the Laravel adapter is connected and tested.

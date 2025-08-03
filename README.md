## STEPS

### hooks (webhooks to trigger )

    (example api looks loike - `https://hooks.zapier.com/hooks/catch/17043103/22b8496/`)

1. `npm init -t`, `npx tsc --init`, `src/index.ts`, update `rootDir` `outDir`
2. `npm i express @types/express`
3. `npm i prisma`
4. `npx prisma init` creates `hooks/prisma/schema.prisma` define schema -> [hooks/prisma/schema.prisma](hooks/prisma/schema.prisma)
5. Start DB locally - `docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpass postgres`
6. update `hooks/.env` - `DATABASE_URL="postgres://postgres:mysecretpass@localhost:5432/postgres"`
7. Run - `cd hooks` & `npx prisma migrate dev`
8. Generate prisma client - `npx prisma generate`
9. update `package.josn` script - `"start": "tsc -b && node dist/index.js"`
10. Can check DB - `npx prisma studio`
11. Update some data manually - zap, trigger, action and other
12. run webhook - `npm run start`
13. Try to post on - `http://localhost:3000/hooks/catch/<user_id>/<zap_id>`
14. Check `zapRun` and `ZapRunOutbox` have new entry or not
15. 

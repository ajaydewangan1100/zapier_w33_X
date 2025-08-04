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
15. Create `.gitignore` and ignore files

### processor (Pick ZapRunOutbox and put under queue)

1. `npm init -t`, `npx tsc --init`, `src/index.ts`, update `rootDir` `outDir`
2. `npm i prisma` && `npx prisma init`
3. Copy same Prisma schema - `processor/prisma/schema.prisma`
4. Don't need to migrate just - `npx prisma generate`
5. Run kafka - `docker run -p 9092:9092 apache/kafka:3.7.1`
6. Go to - `docker exec -it fd3ab722c04a /bin/bash` && `cd opt/kafka/bin` (Ref - `https://kafka.apache.org/quickstart`)
7. Create topic - `./kafka-topics.sh --create --topic zap-events --bootstrap-server localhost:9092`
8. If topic created exit from `kafka CLI` and `Docker CLI`
9. `cd processsr` && `npm i kafkajs`
10. Create function with infinite loop to Produce on `kafka` - `processor/src/index.ts`
11. Update `processor/.env` with same DB url and `processor/package.json` with `start` script
12. `cd processor` & `npm run start` 

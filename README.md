# Template Backend GraphQL Postgres

Tech: TS + Express + Node + PostgreSQL + GraphQL

## Run

- `npm i`
- `npm run build`
- `npm start`

## Explain

- `/config`: make cxn to the db
- `/app.ts`: create a GraphQL server based on Apollo lib -> create Express server -> wrap GraphQL server around Express server -> start cxn to DB

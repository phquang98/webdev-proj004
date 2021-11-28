# GraphQL + PostgreSQL Basic Exercise

Tech: TS + Express + Node + PostgreSQL + GraphQL

## Run

- `npm i`
- `npm run build`
- `npm start`

## Explain

- use also MongoDB for storing cookies + sessions
  - `npm i express-session connect-mongo` + `npm i -D @types/express-session`
  - `npm i mongoose@5.13.8` from type-goose docs (pay attention to docs, type-goose only comply with specific mongoose version)

## Note

- 2:25:53: Henry do not ini `req.session`, he only ini `req.session.userId` -> expect TypeErr cannot set prop userId of undefined but his code still works ???

## Resource

This wonderful exercise was done based on [this guy](https://www.youtube.com/watch?v=1UMNUbtzQXk).

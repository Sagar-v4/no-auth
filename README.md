# Motivation

Every application needs Authentication and at some point Authorization, implementing this in each project can be tedious and time consuming. `No Auth` solves this problem for you so, you can focus on other important tasks.

### Features

- Single Sign On(SSO)
- Switch instantly in between loggedin accounts(Multi Tenancy)
- Multi step form for signups, created by drag and drop input components (Next version)
- One time password, Magic link etc via email and whatsapp (Whatsapp next version)
- Create new roles and permissions and authorize your users according to that (Next version)
- Create your own email app for your users communication (Next version)
- Create Templates for messages (Next version)

## Technologies

- Next.js as frontend
- Nest.js as backend
- Zod for schema and type safety
- Nestjs-trpc to generate trpc app router
- tRPC as mode of communication
- Tanstack/React Query as frontend data fetching and state management
- Combining: [Generated tRPC app router](https://www.nestjs-trpc.io/) & [TanStack Query-native](https://trpc.io/docs/client/tanstack-react-query/setup)
- Shadcn/ui for frontend component
- Turborepo

## Flow

![Flow](images/trpc-flow.png)

## Single Sign On

![SSO LG](images/sso-lg.png)
![SSO SM](images/sso-sm.png)

## Folder structure

```
- root
  - apps
    - api
      - src
        - app
        - database
        - env
        - trpc
        - utils
    - web
      - src
        - app
        - components
        - env
        - hooks
        - public
        - trpc
          - routers
        - utils
  - libs
    - trpc
      - @generated
      - schemas
  - packages
    - eslint-config
    - typescript-config
    - ui
```

## Contribution

Open for developers to contribute. Create an issue and addd your findings regarding of bug or new features requests.

your work should be in your own branch created from issues with prefix like fix, bugfix, refactor /{issue-number}-{issue-desc}.
example: `feat/1-add-whatsapp-feature`

You should add commit messages as per [conventional commit rules.](https://www.conventionalcommits.org/)

### Process

1. Install all npm packages
2. Check the `env.example` file and add your env variables
3. All the commands that affects entire repo like `format` or `pnpm install` should be executed from the root
4. To run individual(api or web) go the their path `cd apps/api` or `cd apps/web`
5. For commit use `cz` command or `git cz` for conventional commits
6. Create PR to master and wait for reviews.

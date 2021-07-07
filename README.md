# Verify Employment and Income

**A easy way to verify employment and income from StairCase API**

![Node.js CI](https://github.com/brunobc182/verify-app/workflows/Node.js%20CI/badge.svg)

## Requirements

- NodeJS v12.22.2 or higher.
- An API Key from [StairCase API](https://api.staircase.co/#/getting-started#authorization)

## How to use

To use the application you need to clone this repository and install all dependencies. Follow the steps below:

```bash
git clone git@github.com:brunobc182/verify-app.git
cd verify-app
yarn install
```

And to run it execute:

```bash
yarn start
```

## Production version

To build a production version, just execute:

```bash
yarn build
```

## Run tests

```bash
yarn test
```

## Project strucuture

Inside `src` folder you have our mains folders, `hooks`, `organism`, `pages`, `services` and `utils`. For the presentation layer, we follow
the [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) principle to create our components. Since we have been use Material Design, which
provide components, we just created the Organism and Pages for this initial version.

We have configurated [Husky](https://github.com/typicode/husky), [commitlint](https://github.com/conventional-changelog/commitlint) and [standard-version](https://github.com/conventional-changelog/standard-version) packages. Those packages combined has a nice way to improve our code quality, since we can execute git hooks with Husky to run scripts like, yarn test, yarn lint, yarn typecheck and and yarn commitlint before send it to our remotly repository. Also, with the commitlint and standard-version, we can create automaticly changelogs since we have standardize our commits messages.

```bash
| src
    | hooks                         # Folder to create custom hooks to handle use cases
        index.tsx
        useMyCustomHook.ts
    | organims                      # Folder to create all organims to use on our Pages
        | MyOrganism
            MyOrganism.tsx
            MyOrganism.test.js
            MyOrganism.style.ts
            MyOrganism.types.ts
            index.tsx
    | Pages                         # Folder to create the main pages
        | MyPage
            MyPage.tsx
            MyPage.test.js
            MyPage.style.ts
            MyPage.types.ts
            index.tsx
    | services                       # Folder to create the services to access some API endpoint
        | http                       # Folder with an axios instance add all common configuration for sevices
            http.ts
            types.ts
            index.ts
        myService.ts
        index.ts
    Routes.ts                        # File to add all routes to app
```

## Stack

This project was created using [Create React App](https://create-react-app.dev/docs/getting-started/), but we can name some of the main dependencies:

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- [axios](https://github.com/axios/axios)
- [Material-UI](https://material-ui.com/)
- [react-router-navigation](https://reactrouter.com/web/guides/quick-start)
- [react-hook-form](https://react-hook-form.com/)

## Next steps

- Create E2E tests with [Cypress](https://www.cypress.io/)
- Deploy to [Netlify](https://www.netlify.com/) or some other host
- Add a field on verify form to allow user add his own API KEY
- Add [Storybook](https://storybook.js.org/) to have a better way to develop the main components
- Layout improvements

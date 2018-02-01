# memory-react-test &middot; [![Build Status](https://travis-ci.org/joannahogberg/memory-react-test.svg?branch=master)](https://travis-ci.org/joannahogberg/memory-react-test) [![Coverage Status](https://coveralls.io/repos/github/joannahogberg/memory-react-test/badge.svg?branch=master)](https://coveralls.io/github/joannahogberg/memory-react-test?branch=master)

>Example app built with [`create-react-app`](https://github.com/facebookincubator/create-react-app) for integration and snapshot testing. The app is a memory game that uses `localStorage` so that the user can collect scores. **CSS-framework is [Tailwind](https://tailwindcss.com/)**

The project is set up with all packages to test react components: [**`enzyme`**](http://airbnb.io/enzyme/docs/api/), `enzyme-adapter-react-16`, `react-test-renderer` and `enzyme-to-json` for snapshot testing.

### Live version 
[Play memory](https://joannahogberg.github.io/memory-react-test/)


## CI-server

* [Travis](https://travis-ci.org/)

## E2E Testing

* [cypress.io](https://www.cypress.io/)


## Installation

_with npm_
```bash
git clone https://github.com/joannahogberg/memory-react-test.git
cd jest-react-testing
npm install
```
_with yarn_
```bash
git clone https://github.com/joannahogberg/memory-react-test.git
cd jest-react-testing
yarn
```

## Running tests

```bash
yarn test
```
```bash
npm test
```

## With coverage

```bash
yarn test:coverage
```
```bash
npm test -- --coverage
```



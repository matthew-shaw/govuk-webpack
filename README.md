# GOV.UK Frontend Webpack Demo

This repo demonstrates how to use [Webpack](https://webpack.js.org/) to bundle, compile and minify the CSS, JS, fonts and images needed to render a basic GOV.UK page.

## Prerequisites

- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)

## Get started

1. Install the correct version of [Node.js](https://nodejs.org/en). This is determined by the `.nvmrc` file and is typically the latest LTS release codename.

   ```shell
   nvm install
   ```

2. Install the Node package dependencies from [npm](https://www.npmjs.com/):

   ```shell
   npm install
   ```

## How to

### Use GOV.UK Design System components

The `main.scss` file at `/src/scss` is highly selective about which `components` are imported above the required `base`, `core`, `objects`, `utilities` and `overrides`. Components account for around 70% of the output CSS, so should only be included if they are used in the service, in order to keep distributon file sizes small.

By default, the following components are imported, because they are used in the [default page template](https://design-system.service.gov.uk/styles/page-template/#default):

- [Footer](https://design-system.service.gov.uk/components/footer/)
- [Header](https://design-system.service.gov.uk/components/header/)
- [Skip link](https://design-system.service.gov.uk/components/skip-link/)

Simply comment out, or uncomment, any other components in `main.scss` that you need to exclude or include.

The same approach applies to JS; the `main.mjs` file at `/src/js` only imports and creates the components that are used:

- Header

> **Note**: Although there is JS for the Header component, this is not needed if using the newer [Service navigation](https://design-system.service.gov.uk/components/service-navigation/) component alongside it.

For comparison (using GOV.UK Frontend v5.9.0):

| Asset         | Size (KB) |
| ------------- | --------- |
| All CSS       | 122       |
| Selective CSS | 47 (-61%) |
| All JS        | 46        |
| Selective JS  | 5 (-89%)  |

### Format source code

Use [Prettier](https://prettier.io/), an opinionated code formatter, for consistency:

```shell
npm run format
```

### Build assets

Output compiled CSS, JS, fonts and images to `./dist`:

```shell
npm run build
```

### Watch changes

Rebuild distribution assets automatically when source is changed:

```shell
npm run watch
```

## Run dev server

Start a simple web server with live reloading:

```shell
npm start
```

### Update dependencies

To update Node package dependencies (such as [govuk-frontend](https://www.npmjs.com/package/govuk-frontend)), use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

```shell
ncu -u
```

If you want to be more cautious you can check only for patch or minor level updates:

```shell
ncu --target patch -u
```

```shell
ncu --target minor -u
```

### Support Internet Explorer

Versions of IE below 11 are not supported. IE 11 will not run GOV.UK JavaScript, but its CSS is compatible.

If you need to change which browsers are targeted for JS transpilation, the `.browserslistrc` file contains those supported, taken directly from the GOV.UK supported list. Changing this is _probably_ not a good idea though and should be discouraged, see [GOV.UK Frontend browser support](https://frontend.design-system.service.gov.uk/browser-support/).

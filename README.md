# Foodkit Ionic Starter

## Getting started

## Install Node.js with NPM

If you don't have them installed already, you'll need to install Node.js and NPM.

You can [download](https://nodejs.org/en/download/) from the official Node.js website.

The minimum recommended version of Node.js is 14.15 and NPM 6.14 respectively.

## Install Ionic CLI

The app is built using the Ionic Framework. You can install the Ionic CLI tools to simplify building and running the app.

Do this with the following command:

```bash
npm install -g @ionic/cli
```

The minimum recommended version of Ionic CLI is 6.12.

### Add config parameters

Before you can start the application, you need to set the configuration. These values will be specific to your developer account, and are available under the "Access tokens" page in the Admin panel:

```typescript
// in src/config.ts
export default {
  apiUrl: "https://foodkit-api.hostname.com",
  tenantId: 999,
  brandId: 9999,
  branchId: 99999,
  clientId: "store-front-web-acmecorp",
  clientSecret: "this-is-a-token-for-calls",
  token: "this-is-a-guest-token",
  currency: {
    minorUnitExponent: 2,
    symbol: "$",
  },
};
```

### Starting the app

To run the app in the browser, execute the following command in your terminal:

```bash
ionic serve
```

### Running the app on mobile devices

If you would like to run the app on your iPhone or Android smartphone, please check Ionic documentation related sections for development for [iOS](https://ionicframework.com/docs/developing/ios) and [Android](https://ionicframework.com/docs/developing/android).

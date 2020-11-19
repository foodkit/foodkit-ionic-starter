# Foodkit Ionic Starter

## Getting started

### Add config parameters

Before you can start the application, you need to set the configuration. These values will be specific to your developer and account:

```json
// in src/config.ts
export default {
  apiUrl: "https://foodkit-api.hostname.com",
  tenantId: 999,
  brandId: 9999,
  branchId: 99999,
  clientId: "store-front-web-acmecorp",
  clientSecret: "this-is-a-token-for-calls",
  guestToken: "this-is-a-guest-token",
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

# aussie-date-formatter

A typescript/javascript date formatter for Australians.

## Test

```sh
yarn test
```

## Usage

```js
date = new Date('2021-08-03T14:15:16Z')
formatter = new DateFormatter(date, 'Australia/Sydney')
formatter.toDateTimeTz()
// 4/2/2021 1:15:16 AM AEDT
formatter.toIsoDateTime()
// 2021-02-04T01:15:16+11:00
```

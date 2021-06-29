# aussie-date-formatter

A typescript/javascript date formatter for Australians that works how an Aussie would expect.

Works with default node setup (usually only the en-US locale is available).

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

formatter.toDate()
// 4/2/2021

formatter.toIsoDate()
// 2021-04-02

formatter.toTime()
// 1:15:16 PM

formatter.toTime('2-digit')
// 01:15:16 PM

formatter.toTime('24')
// 01:15:16
```

## Caveats

It should mostly work with other time zones too but won't work correctly with US time zones because there is no way of obtaining the time zone offset (AFIAK).
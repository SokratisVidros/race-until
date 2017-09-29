# race-until
[![](https://travis-ci.org/SokratisVidros/race-until.svg?branch=master)](https://travis-ci.org/SokratisVidros/race-until)
[![](https://badge.fury.io/js/race-until.svg)](https://www.npmjs.com/package/race-until)

Race a promise against a time bomb promise.

```js
const {raceUntil} = require('race-until');
raceUntil(promise, timeout = 3000, timeoutResponse = 'timeout')
```

# Usage

Please have a look at project's tests.

# License
The MIT License (MIT)

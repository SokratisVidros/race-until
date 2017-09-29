function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function' &&
    typeof obj.catch === 'function'
  );
}

export function timebomb(timeout = 3000, timeoutResponse = 'Timeout') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeoutResponse instanceof Error) {
        reject(timeoutResponse);
      } else {
        resolve(timeoutResponse);
      }
    }, timeout);
  });
}

export function raceUntil(p, timeout = 3000, timeoutResponse = 'Timeout') {
  if (!isPromise(p)) {
    throw new Error('Missing promise option');
  }
  return Promise.race([p, timebomb(timeout, timeoutResponse)]);
}

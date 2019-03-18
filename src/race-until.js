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
  return Promise.race([Promise.resolve(p), timebomb(timeout, timeoutResponse)]);
}

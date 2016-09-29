function isPromise(obj) {
  return !!obj
    && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function'
    && typeof obj.catch === 'function';
}

export function timebomb(timeout = 3000, softReject = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (softReject) {
        resolve();
      } else {
        reject(new Error('Timed out'));
      }
    }, timeout);
  });
}

export default function raceUntil(p, timeout = 3000, softReject = true) {
  if (!isPromise(p)) {
    throw new Error('Missing promise option');
  }
  return Promise.race([p, timebomb(timeout, softReject)]);
}

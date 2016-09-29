import { expect } from 'chai';
import { default as raceUntil, timebomb } from '../src/raceUntil';

describe('raceUntil', () => {
  it('throws error if promise is not provided', () => {
    expect(raceUntil).to.throw(Error, 'Missing promise option');
  });

  context('when promised is resolved before the timebomb detonates', () => {
    it('returns the value of the resolved promise', (done) => {
      raceUntil(Promise.resolve('Success'))
        .then((result) => {
          expect(result).to.eq('Success');
          done();
        });
    });
  });

  context('when timebomb goes off', () => {
    context('and soft rejection is enabled', () => {
      it('returns an empty value to the promise chain', (done) => {
        raceUntil(timebomb(20), 10)
          .then((result) => {
            expect(result).to.be.empty;
            done();
          });
      });
    });

    context('and soft rejection is disabled', () => {
      it('throws a timeout error', (done) => {
        raceUntil(timebomb(20), 10, false)
          .catch((err) => {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.eq('Timed out');
            done();
          });
      });
    });
  });
});

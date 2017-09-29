import { expect } from 'chai';
import { raceUntil, timebomb } from '../src/race-until';

describe('raceUntil', () => {
  it('throws error if promise is not provided', () => {
    expect(raceUntil).to.throw(Error, 'Missing promise option');
  });

  context('when promised is resolved before the timebomb detonates', () => {
    it('returns the value of the resolved promise', done => {
      raceUntil(Promise.resolve('Success')).then(result => {
        expect(result).to.eq('Success');
        done();
      });
    });
  });

  context('when timebomb goes off', () => {
    context('and soft rejection is enabled', () => {
      it('returns an empty value to the promise chain', done => {
        raceUntil(timebomb(20), 10, 'response').then(result => {
          expect(result).to.eq('response');
          done();
        });
      });
    });

    context('and soft rejection is disabled', () => {
      it('throws a timeout error', done => {
        raceUntil(timebomb(20), 10, new Error('test error')).catch(err => {
          expect(err).to.be.an.instanceOf(Error);
          expect(err).to.eql(new Error('test error'));
          done();
        });
      });
    });
  });
});

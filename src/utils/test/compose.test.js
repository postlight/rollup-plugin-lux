// @flow
import { tap, compose, composeAsync } from '../compose';

describe('util compose', () => {
  describe('.tap()', () => {
    const { log } = console;
    let mockLog;

    beforeEach(() => {
      mockLog = jest.fn();
      // $FlowIgnore
      console.log = mockLog; // eslint-disable-line no-console
    });

    afterEach(() => {
      // $FlowIgnore
      console.log = log; // eslint-disable-line no-console
    });

    it('logs an input and then returns it', () => {
      const val = {};

      expect(tap(val)).toBe(val);
      expect(mockLog.mock.calls[0][0]).toBe(val);
    });
  });

  describe('.compose()', () => {
    it('returns a composed function', () => {
      const shout = compose(
        (str: string) => `${str}!`,
        (str: string) => str.toUpperCase()
      );

      expect([typeof shout, shout.length]).toEqual(['function', 1]);
      expect(shout('hello world')).toBe('HELLO WORLD!');
    });
  });

  describe('.composeAsync()', () => {
    it('returns a composed asyncfunction', () => {
      const shout = composeAsync(
        str => Promise.resolve(`${str}!`),
        str => Promise.resolve(str.toUpperCase())
      );

      expect([typeof shout, shout.length]).toEqual(['function', 1]);
      return shout('hello world').then(str => {
        expect(str).toBe('HELLO WORLD!');
      });
    });
  });
});

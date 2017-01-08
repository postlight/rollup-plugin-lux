// @flow
import path from 'path';

import fs from 'fs-promise';
import { parse } from 'acorn';

import { PARSER_OPTIONS } from '../../constants';
import extendsLux from '../extends-lux';

describe('util extendsLux()', () => {
  describe('with lux sub class', () => {
    let subject;

    beforeEach(() => (
      fs.readFile(
        path.join(__dirname, 'fixtures', 'lux-sub-class.js'),
        'utf8'
      ).then(file => {
        subject = parse(file, PARSER_OPTIONS).body.find(({ type }) => (
          type === 'ClassDeclaration'
        ));
      })
    ));

    it('returns true', () => {
      // $FlowIgnore
      expect(extendsLux(subject)).toBe(true);
    });
  });

  describe('with generic class', () => {
    let subject;

    beforeEach(() => (
      fs.readFile(
        path.join(__dirname, 'fixtures', 'generic-class.js'),
        'utf8'
      ).then(file => {
        subject = parse(file, PARSER_OPTIONS).body.find(({ type }) => (
          type === 'ClassDeclaration'
        ));
      })
    ));

    it('returns false', () => {
      // $FlowIgnore
      expect(extendsLux(subject)).toBe(false);
    });
  });
});

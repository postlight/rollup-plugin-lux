// @flow
import path from 'path';

import fs from 'fs-promise';
import eol from 'eol';

import plugin from '../index';

describe('#transform()', () => {
  describe('with lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let subject;
      let result;

      beforeEach(() => (
        Promise.all([
          fs.readFile(
            path.join(
              __dirname,
              'fixtures',
              'export-default-statement-lux-sub-class.js'
            ),
            'utf8'
          ),
          fs.readFile(
            path.join(
              __dirname,
              'results',
              'export-default-statement-lux-sub-class.js'
            ),
            'utf8'
          )
        ]).then(files => {
          [subject, result] = files;
          subject = eol.auto(subject);
          result = eol.auto(result);
        })
      ));

      it('appends an Object.defineProperty call to the module', () => {
        expect(plugin.transform(subject)).toBe(result);
      });
    });

    describe('export default [ClassExpression]', () => {
      let subject;
      let result;

      beforeEach(() => (
        Promise.all([
          fs.readFile(
            path.join(
              __dirname,
              'fixtures',
              'export-default-expression-lux-sub-class.js'
            ),
            'utf8'
          ),
          fs.readFile(
            path.join(
              __dirname,
              'results',
              'export-default-expression-lux-sub-class.js'
            ),
            'utf8'
          )
        ]).then(files => {
          [subject, result] = files;
          subject = eol.auto(subject);
          result = eol.auto(result);
        })
      ));

      it('appends an Object.defineProperty call to the module', () => {
        expect(plugin.transform(subject)).toBe(result);
      });
    });
  });

  describe('without lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let subject;

      beforeEach(() => (
        fs.readFile(
          path.join(
            __dirname,
            'fixtures',
            'export-default-statement-generic-class.js'
          ),
          'utf8'
        ).then(file => {
          subject = eol.auto(file);
        })
      ));

      it('does not modify the source', () => {
        expect(plugin.transform(subject)).toBe(subject);
      });
    });

    describe('[FunctionDeclaration] export default [Identifier]', () => {
      let subject;

      beforeEach(() => (
        fs.readFile(
          path.join(__dirname, 'fixtures', 'export-default-function.js'),
          'utf8'
        ).then(file => {
          subject = eol.auto(file);
        })
      ));

      it('does not modify the source', () => {
        expect(plugin.transform(subject)).toBe(subject);
      });
    });

    describe('export default [ArrowFunctionExpression]', () => {
      let subject;

      beforeEach(() => (
        fs.readFile(
          path.join(__dirname, 'fixtures', 'export-default-arrow-function.js'),
          'utf8'
        ).then(file => {
          subject = eol.auto(file);
        })
      ));

      it('does not modify the source', () => {
        expect(plugin.transform(subject)).toBe(subject);
      });
    });

    describe('named export', () => {
      let subject;

      beforeEach(() => (
        fs.readFile(
          path.join(__dirname, 'fixtures', 'named-export.js'),
          'utf8'
        ).then(file => {
          subject = eol.auto(file);
        })
      ));

      it('does not modify the source', () => {
        expect(plugin.transform(subject)).toBe(subject);
      });
    });
  });
});

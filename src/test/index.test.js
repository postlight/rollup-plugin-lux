// @flow
import path from 'path';

import fs from 'fs-promise';
import eol from 'eol';

import plugin from '../index';

describe('#transform()', () => {
  const appPath = path.posix.join(__dirname, 'fixtures');

  describe('with lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let id;
      let result;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          'fixtures',
          'export-default-statement-lux-sub-class.js'
        );

        return Promise
          .all([
            fs.readFile(id, 'utf8'),
            fs.readFile(
              path.join(
                __dirname,
                'results',
                'export-default-statement-lux-sub-class.js'
              ),
              'utf8'
            )
          ])
          .then(files => {
            [subject, result] = files;
            subject = eol.auto(subject);
            result = eol.auto(result);
          });
      });

      it('appends an Object.defineProperty call to the module', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(result);
      });
    });

    describe('export default [ClassExpression]', () => {
      let id;
      let result;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          'fixtures',
          'export-default-expression-lux-sub-class.js'
        );

        return Promise
          .all([
            fs.readFile(id, 'utf8'),
            fs.readFile(
              path.join(
                __dirname,
                'results',
                'export-default-expression-lux-sub-class.js'
              ),
              'utf8'
            )
          ])
          .then(files => {
            [subject, result] = files;
            subject = eol.auto(subject);
            result = eol.auto(result);
          });
      });

      it('appends an Object.defineProperty call to the module', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(result);
      });
    });
  });

  describe('without lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let id;
      let result;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          'fixtures',
          'export-default-statement-generic-class.js'
        );

        return Promise
          .all([
            fs.readFile(id, 'utf8'),
            fs.readFile(
              path.join(
                __dirname,
                'results',
                'export-default-statement-generic-class.js'
              ),
              'utf8'
            )
          ])
          .then(files => {
            [subject, result] = files;
            subject = eol.auto(subject);
            result = eol.auto(result);
          });
      });

      it('does not modify the source', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(result);
      });
    });

    describe('[FunctionDeclaration] export default [Identifier]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(__dirname, 'fixtures', 'export-default-function.js');
        return fs.readFile(id, 'utf8').then(file => {
          subject = eol.auto(file);
        });
      });

      it('does not modify the source', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(subject);
      });
    });

    describe('export default [ArrowFunctionExpression]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          'fixtures',
          'export-default-arrow-function.js'
        );

        return fs.readFile(id, 'utf8').then(file => {
          subject = eol.auto(file);
        });
      });

      it('does not modify the source', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(subject);
      });
    });

    describe('named export', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(__dirname, 'fixtures', 'named-export.js');
        return fs.readFile(id, 'utf8').then(file => {
          subject = eol.auto(file);
        });
      });

      it('does not modify the source', () => {
        const { code } = plugin(appPath).transform(subject, id);

        expect(code).toBe(subject);
      });
    });
  });
});

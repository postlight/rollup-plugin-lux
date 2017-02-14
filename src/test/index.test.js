// @flow
import path from 'path';

import fs from 'fs-promise';

import plugin from '../index';

describe('#transform()', () => {
  const appPath = path.posix.join(__dirname, '__fixtures__');

  describe('with lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          '__fixtures__',
          'export-default-statement-lux-sub-class.js'
        );
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('appends an Object.defineProperty call to the module', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });

    describe('export default [ClassExpression]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          '__fixtures__',
          'export-default-expression-lux-sub-class.js'
        );
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('appends an Object.defineProperty call to the module', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });
  });

  describe('without lux sub class', () => {
    describe('[ClassDeclaration] export default [Identifier]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          '__fixtures__',
          'export-default-statement-generic-class.js'
        );
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('does not modify the source', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });

    describe('[FunctionDeclaration] export default [Identifier]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(__dirname, '__fixtures__', 'export-default-function.js');
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('does not modify the source', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });

    describe('export default [ArrowFunctionExpression]', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(
          __dirname,
          '__fixtures__',
          'export-default-arrow-function.js'
        );
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('does not modify the source', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });

    describe('named export', () => {
      let id;
      let subject;

      beforeEach(() => {
        id = path.join(__dirname, '__fixtures__', 'named-export.js');
        return fs
          .readFile(id, 'utf8')
          .then(data => {
            subject = data;
          });
      });

      it('does not modify the source', () => {
        expect(plugin(appPath).transform(subject, id)).toMatchSnapshot();
      });
    });
  });
});

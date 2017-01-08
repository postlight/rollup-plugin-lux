// @flow
import path from 'path';

import fs from 'fs-promise';

import plugin from '../index';

describe('#transform()', () => {
  describe('[ClassDeclaration] export default [Identifier]', () => {
    let subject;
    let result;

    beforeEach(() => (
      Promise.all([
        fs.readFile(
          path.join(__dirname, 'fixtures', 'export-default-statement.js'),
          'utf8'
        ),
        fs.readFile(
          path.join(__dirname, 'results', 'export-default-statement.js'),
          'utf8'
        )
      ]).then(files => {
        [subject, result] = files;
      })
    ));

    it('appends an Object.defineProperty call to the module', () => {
      expect(plugin.transform(subject)).toBe(result);
    });
  });

  describe('export default [ClassExpression]', () => {
    let subject;
    let result;

    beforeEach(() => {
      subject = fs.readFileSync(
        path.join(__dirname, 'fixtures', 'export-default-expression.js'),
        'utf8'
      );
      result = fs.readFileSync(
        path.join(__dirname, 'results', 'export-default-expression.js'),
        'utf8'
      );
    });

    it('appends an Object.defineProperty call to the module', () => {
      expect(plugin.transform(subject)).toBe(result);
    });
  });
});

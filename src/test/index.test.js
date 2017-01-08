// @flow
import fs from 'fs';
import path from 'path';

import plugin from '../index';

describe('#transform()', () => {
  describe('[ClassDeclaration] export default [Identifier]', () => {
    let subject;
    let result;

    beforeEach(() => {
      subject = fs.readFileSync(
        path.join(__dirname, 'fixtures', 'export-default-statement.js'),
        'utf8'
      );
      result = fs.readFileSync(
        path.join(__dirname, 'results', 'export-default-statement.js'),
        'utf8'
      );
    });

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

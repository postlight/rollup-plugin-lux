// @flow
import eol from 'eol';

import type { TransformParams } from './interfaces';

export default function staticName<T: TransformParams>(params: T): T {
  const { code, ast: { body } } = params;
  const defaultExport = body.find(({ type }) => (
    type === 'ExportDefaultDeclaration'
  ));

  if (!defaultExport || defaultExport.type !== 'ExportDefaultDeclaration') {
    return params;
  }

  let classDecl;

  switch (defaultExport.declaration.type) {
    case 'Identifier':
      classDecl = body.find(node => (
        node.type === 'ClassDeclaration'
        && node.id.name === defaultExport.declaration.name
      ));

      if (!classDecl) {
        return params;
      }
      break;

    case 'ClassDeclaration':
      ({ declaration: classDecl } = defaultExport);
      break;

    default:
      return params;
  }

  if (classDecl.type === 'ClassDeclaration') {
    const { id: { name } } = classDecl;

    code.appendRight(classDecl.end, eol.before(eol.before((
      `Object.defineProperty(${name}, 'name', { value: '${name}' });`
    ))));
  }

  return params;
}

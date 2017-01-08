// @flow
import { parse } from 'acorn';

import { PARSER_OPTIONS } from './constants';
import extendsLux from './utils/extends-lux';

export default {
  transform(src: string): string {
    const { body } = parse(src, PARSER_OPTIONS);
    const defaultExport = body.find(({ type }) => (
      type === 'ExportDefaultDeclaration'
    ));

    if (!defaultExport || defaultExport.type !== 'ExportDefaultDeclaration') {
      return src;
    }

    // console.log(JSON.stringify(body, null, 2));

    let classDecl;

    switch (defaultExport.declaration.type) {
      case 'Identifier':
        classDecl = body.find(node => (
          node.type === 'ClassDeclaration'
          && node.id.name === defaultExport.declaration.name
        ));

        if (!classDecl) {
          return src;
        }
        break;

      case 'ClassDeclaration':
        ({ declaration: classDecl } = defaultExport);
        break;

      default:
        return src;
    }

    if (extendsLux(classDecl) && classDecl.type === 'ClassDeclaration') {
      const { id: { name } } = classDecl;

      return [
        src,
        `\nObject.defineProperty(${name}, 'name', { value: '${name}' });\n`
      ].join('');
    }

    return src;
  }
};

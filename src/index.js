// @flow
import { parse } from 'acorn';
import type { ClassDeclaration, ExportDefaultDeclaration } from 'acorn';

const LUX_CLASS_NAMES = new Set([
  'Application',
  'Controller',
  'Serializer',
  'Logger',
  'Model',
  'Lux.Application',
  'Lux.Controller',
  'Lux.Serializer',
  'Lux.Logger',
  'Lux.Model'
]);

const extendsLux = (classDecl: void | ClassDeclaration) => (
  classDecl
  && classDecl.superClass
  && LUX_CLASS_NAMES.has(classDecl.superClass.name)
);

export default {
  transform(src: string): string {
    const { body } = parse(src, {
      sourceType: 'module',
      ecmaVersion: 2017
    });

    // $FlowIgnore
    const defaultExport: void | ExportDefaultDeclaration = (
      body.find(({ type }) => type === 'ExportDefaultDeclaration')
    );

    if (!defaultExport) {
      return src;
    }


    let classDecl: void | ClassDeclaration;

    switch (defaultExport.declaration.type) {
      case 'Identifier':
        // $FlowIgnore
        classDecl = body.find(node => (
          node.type === 'ClassDeclaration'
          && node.id.name === defaultExport.declaration.name
        ));
        break;

      case 'ClassDeclaration':
        ({ declaration: classDecl } = defaultExport);
        break;

      default:
        return src;
    }

    // $FlowIgnore
    if (extendsLux(classDecl)) {
      // $FlowIgnore
      const { id: { name } } = classDecl;

      return (
        src
        + `\nObject.defineProperty(${name}, 'name', { value: '${name}' });\n`
      );
    }

    return src;
  }
};

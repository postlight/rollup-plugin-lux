// @flow
import type { Node } from 'acorn';

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

export default function extendsLux(node: Node): boolean {
  if (node.type === 'ClassDeclaration' && node.superClass) {
    return LUX_CLASS_NAMES.has(node.superClass.name);
  }

  return false;
}

// @flow
declare module 'acorn' {
  declare type Identifier = {
    start: number;
    type: 'Identifier';
    end: number;
    name: string;
  };

  declare type ClassBody = {
    start: number;
    type: 'ClassBody';
    end: number;
    body: Array<Node>;
  };

  declare type ClassDeclaration = {
    start: number;
    type: 'ClassDeclaration';
    end: number;
    id: Identifier;
    superClass: Identifier;
    body: ClassBody;
  };

  declare type ExportDefaultDeclaration = {
    start: number;
    type: 'ExportDefaultDeclaration';
    end: number;
    declaration: Identifier;
  };

  declare type Node =
    | Identifier
    | ClassDeclaration
    | ExportDefaultDeclaration;

  declare type Program = {
    start: number;
    type: 'Program';
    end: number;
    sourceType: string;
    body: Array<Node>;
  };

  declare var exports: {
    parse(source: string, options: { sourceType: string; }): Program;
  };
}

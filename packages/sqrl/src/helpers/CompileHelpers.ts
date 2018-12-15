/**
 * Copyright 2018 Twitter, Inc.
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { LocalFilesystem, Filesystem } from "../api/filesystem";
import { SqrlParserSourceOptions } from "../compile/SqrlParserState";
import { basename, dirname } from "path";
import { parseSqrl } from "../parser/SqrlParse";
import { StatementAst } from "../ast/Ast";
import invariant from "../jslib/invariant";

export function statementsFromString(source: string): StatementAst[] {
  return parseSqrl(source).statements;
}

export function sourceOptionsFromFilesystem(
  filesystem: Filesystem,
  mainFilename: string
) {
  const sourceBuffer = filesystem.tryRead(mainFilename);
  invariant(sourceBuffer, "Could not read main file source: %s", mainFilename);
  const source = sourceBuffer.toString("utf-8");
  const statements = parseSqrl(source, {
    filename: mainFilename
  }).statements;
  return {
    statements,
    source,
    filesystem
  };
}
export function sourceOptionsFromPath(path: string): SqrlParserSourceOptions {
  return sourceOptionsFromFilesystem(
    new LocalFilesystem(dirname(path)),
    basename(path)
  );
}

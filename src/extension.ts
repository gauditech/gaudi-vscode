import { homedir } from "os";
import * as path from "path";
import { ExtensionContext } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(_context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = path.join(
    homedir(),
    "gaudi",
    "gaudi",
    "dist",
    "compiler",
    "languageServer",
    "languageServer.js"
  );

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "gaudi" }],
  };

  // Create the language client and start the client.
  client = new LanguageClient("gaudi", "Gaudi", serverOptions, clientOptions);

  // Start the client. This will also launch the server
  client.start();
}

export async function deactivate() {
  if (!client) {
    return undefined;
  }
  return await client.stop();
}

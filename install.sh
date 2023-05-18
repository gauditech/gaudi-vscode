#!/bin/bash
code --uninstall-extension ./gaudi-vscode-0.0.1.vsix; rm -fr node_modules/@gaudi/ gaudi-vscode-0.0.1.vsix; npm i && npm run build && code --install-extension gaudi-vscode-0.0.1.vsix

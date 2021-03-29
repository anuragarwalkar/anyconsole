import * as vscode from "vscode";

type supportedLang = "ts" | "js" | "dart";

const getLogStatementByLang = (lang: supportedLang, textVar: any) => {
  let statement = "";

  switch (lang) {
    case "js":
    case "ts": {
      //   if (str.indexOf('\'') >= 0 && str.indexOf('"') >= 0) {
      //     //do something
      //  }
      statement = `console.log('${textVar}',${textVar});`;
    }
  }

  return statement;
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerTextEditorCommand(
    "anyconsole.log",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      let sel = editor.selection;
      let doc = editor.document;
      const [ext] = doc.fileName.split(".").splice(-1);

      if (ext) {
        let ran = new vscode.Range(sel.start, sel.end);

        const text = editor.document.getText(editor.selection);

        editor.edit((edit) => {
          edit.replace(
            editor.selection,
            getLogStatementByLang(ext as supportedLang, text)
          );
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

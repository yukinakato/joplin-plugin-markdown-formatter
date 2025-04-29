import type { EditorView } from '@codemirror/view'
import type { ContentScriptContext, MarkdownEditorContentScriptModule } from 'api/types'
import * as markdownPlugin from 'prettier/plugins/markdown'
import * as prettier from 'prettier/standalone'

export default (_context: ContentScriptContext): MarkdownEditorContentScriptModule => {
  return {
    plugin: (codeMirrorWrapper) => {
      codeMirrorWrapper.registerCommand('formatMarkdownCommand', async () => {
        const cm: EditorView = codeMirrorWrapper.editor

        const currentDoc = cm.state.doc.toString()
        const currentPos = cm.state.selection.main.head

        const { formatted, cursorOffset: newPos } = await prettier.formatWithCursor(currentDoc, { parser: 'markdown', plugins: [markdownPlugin], cursorOffset: currentPos })

        cm.dispatch({ changes: { from: 0, to: cm.state.doc.length, insert: formatted } })
        cm.dispatch({ selection: { anchor: newPos } })
      })
    },
  }
}

import joplin from 'api'
import { ContentScriptType, MenuItemLocation, ToolbarButtonLocation } from 'api/types'

joplin.plugins.register({
  async onStart() {
    await joplin.contentScripts.register(
      ContentScriptType.CodeMirrorPlugin,
      'joplin-plugin-markdown-formatter',
      './format.js',
    )

    await joplin.commands.register({
      name: 'formatMarkdown',
      label: 'Format Markdown',
      iconName: 'fas fa-code',
      enabledCondition: 'markdownEditorPaneVisible',
      execute: async () => {
        await joplin.commands.execute('editor.execCommand', { name: 'formatMarkdownCommand' })
      },
    })

    await joplin.views.toolbarButtons.create('formatMarkdownButton', 'formatMarkdown', ToolbarButtonLocation.EditorToolbar)
    await joplin.views.menuItems.create('formatMarkdownMenu', 'formatMarkdown', MenuItemLocation.Edit, { accelerator: 'Alt+Shift+F' })
  },
})

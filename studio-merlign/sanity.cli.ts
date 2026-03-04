import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1r5lk62n',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'oopx702kof19ogj55akoqnds',
  }
})

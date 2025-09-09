import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the RichText component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js/ts) when `jss manifest` is run.
 */
export default function RichText(manifest: Manifest): void {
  manifest.addComponent({
    name: 'RichText',
    templateName: 'RichText',
    fields: [
      { name: 'Text', type: CommonFieldTypes.RichText },
    ],
  });
}

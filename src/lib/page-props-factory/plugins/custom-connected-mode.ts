import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { SitecorePageProps } from 'lib/page-props';
import * as fsPath from 'path';
import * as fs from 'fs';
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { pathExtractor } from 'lib/extract-path';

class CustomconnectedModePlugin implements Plugin {
  order = 1; // runs after NormalModePlugin

  async exec(
    props: SitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps> {
    if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) return props;

    // Get normalized path from context
    let pagePath = pathExtractor.extract(context.params); // e.g., "/", "/page1"

    // Handle root page
    if (!pagePath || pagePath === '/') {
      pagePath = 'home'; // use home.json for root
    } else {
      pagePath = pagePath.replace(/^\//, ''); // remove leading slash
    }

    const jsonFilePath = fsPath.join(process.cwd(), 'data', `${pagePath}.json`);

    if (!fs.existsSync(jsonFilePath)) {
      return { ...props, notFound: true };
    }

    const layoutData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    return {
      ...props,
      layoutData,
      notFound: false,
      dictionary: {}, // empty dictionary for disconnected
    };
  }
}

export const customConnectedModePlugin = new CustomconnectedModePlugin();

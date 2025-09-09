import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { Plugin } from '..';
import { SitecorePageProps } from 'lib/page-props';
import { constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { pathExtractor } from 'src/utils/path-extractor';
import { getPageByPath } from 'src/pages/api/page.service';

class CustomConnectedModePlugin implements Plugin {
  order = 1;

  async exec(
    props: SitecorePageProps,
    context: GetServerSidePropsContext | GetStaticPropsContext
  ): Promise<SitecorePageProps> {
    if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) return props;

    let pagePath = pathExtractor.extract(context.params);
    if (!pagePath || pagePath === '/') {
      pagePath = '/';
    } else {
      pagePath = `/${pagePath.replace(/^\//, '')}`;
    }

    const page = await getPageByPath(pagePath);

    if (!page) {
      return { ...props, notFound: true };
    }

    return {
      ...props,
      layoutData: JSON.parse(page.Data),
      notFound: false,
      dictionary: {},
    };
  }
}

export const customConnectedModePlugin = new CustomConnectedModePlugin();

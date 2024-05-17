import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { ValidCollectionCodename } from '../../../lib/types/perCollection';
import { createItemSmartLink } from '../../../lib/utils/smartLinkUtils';
import {
  Article,
  Event,
  Product,
  SEOMetadata,
  WSL_Page,
  WSL_WebSpotlightRoot,
  Course,
} from '../../../models';
import { SiteCodenameProvider } from '../siteCodenameContext';
import { Menu } from './menu';
import { Footer } from './footer';
import { getSeoAndSharingDetails } from '../../../lib/utils/seo-utils';
import { NextSeo } from 'next-seo';
import { useLivePreview } from '../contexts/LivePreview';
import { ResolutionContext, resolveUrlPath } from '../../../lib/routing';
import { IContentItem } from '@kontent-ai/delivery-sdk';
import { parse } from 'node-html-parser';

type AcceptedItem =
  | WSL_WebSpotlightRoot
  | Article
  | Product
  | WSL_Page
  | Event
  | Course;

type Props = Readonly<{
  children: ReactNode;
  siteCodename: ValidCollectionCodename;
  homeContentItem?: WSL_WebSpotlightRoot;
  item: AcceptedItem;
  defaultMetadata: SEOMetadata;
  variants: IContentItem[];
  pageType: 'WebPage' | 'Article' | 'Product' | 'FAQ' | 'Event' | 'Course';
  isPreview: boolean;
}>;

export const AppPage: FC<Props> = ({
  children,
  siteCodename,
  homeContentItem,
  variants,
  item,
  defaultMetadata,
  isPreview }) => {
  const data = useLivePreview({
    item,
    defaultMetadata
  });

  const seoDetails = getSeoAndSharingDetails({
    page: item,
    url: process.env.NEXT_PUBLIC_DOMAIN + resolveUrlPath(
      {
        type: item.system.type,
        slug: item.elements.url?.value
      } as ResolutionContext),
    siteCodename: siteCodename,
  });

  return (
    <SiteCodenameProvider siteCodename={siteCodename}>
      <PageMetadata
        item={item}
        defaultMetadata={defaultMetadata}
        variants={variants}
      />
      <NextSeo
        title={seoDetails.title}
        description={seoDetails.description}
        canonical={seoDetails.canonicalUrl}
        openGraph={seoDetails.openGraph}
        nofollow={seoDetails.nofollow}
        noindex={seoDetails.noindex}
      />
      <div
        className='min-h-full grow flex flex-col items-center'
        {...createItemSmartLink(
          item.system.id,
          item.system.name
        )}
      >
        {item.elements.hide.value.length === 0 || !item.elements.hide.value.find(hide => hide?.codename === "header") ? (
          <Menu
            item={item}
            homeContentItem={homeContentItem}
            isPreview={isPreview}
            variants={variants}
          />
        ) : null}
        <main
          data-kontent-language-codename={item.system.language}
          className='py-24 md:px-6 px-3 sm:px-8 max-w-screen-xl grow h-full w-full'
          {...createItemSmartLink(
            item.system.id,
            item.system.name,
            true
          )}
        >
          <div className='w-full max-w-full pt-16'>{children}</div>
        </main>
        {item.elements.hide.value.length === 0 || !item.elements.hide.value.find(hide => hide?.codename === "footer") ? (
          <Footer item={item} homeContentItem={homeContentItem} />
        ) : null}
      </div>
    </SiteCodenameProvider>
  );
};

AppPage.displayName = 'Page';

const PageMetadata: FC<
  Pick<Props, 'item' | 'defaultMetadata' | 'variants'>
> = ({ item, defaultMetadata, variants }) => {
  const pageMetaKeywords =
    item.elements.seoMetadataKeywords.value ||
    defaultMetadata?.elements?.seoMetadataKeywords.value;


  // Parse the openGraphMetadataOpengraphAdditionalTags value to create meta tags
  const root = parse(item.elements.openGraphMetadataOpengraphAdditionalTags.value);
  const metaTags = root.querySelectorAll('meta');

  const gtmId = "G-Z2978T9M9Z" // Just for testing, in real life, fetch from CMS

  return (
    <Head>
      <link rel='icon' href='/favicon.png'/>
      {pageMetaKeywords &&
          <meta name='keywords' content={pageMetaKeywords}/>
      }
      {variants?.map((variant, index) => (
        <link key={index} rel="alternate" hrefLang={variant.system.language}
              href={process.env.NEXT_PUBLIC_DOMAIN + resolveUrlPath(
                {
                  type: variant.system.type,
                  slug: variant.elements.url?.value
                } as ResolutionContext)}/>
      ))}
      {/* Render the parsed Open Graph meta tags */}
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag.attributes} />
      ))}
      {
        item.elements.seoMetadataN3rdPartyServicesIncluded?.value?.[0]?.codename !== 'no' && (
          <>
            {/* Inline script to initialize GTM */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtmId}');
            `,
              }}
            />
            <script type="text/javascript"
                    dangerouslySetInnerHTML={{
                      __html: `
                  var monetateT = new Date().getTime();
                  (function () {
                    var p = document.location.protocol;
                    if (p == "http:" || p == "https:") {
                    var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "e.monetate.net/js/2/a-b6206def/p/fifthlevelfashion.com/custom.js";
                    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);}
                  })()
      `
                    }}/>
          </>
        )
      }
    </Head>
  );
};

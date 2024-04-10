import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { HeroImage } from '../../../components/landingPage/ui/heroImage';
import { RichTextElement } from '../../../components/shared/richText/RichTextElement';
import {
  getAllArticles,
  getArticleBySlug,
} from '../../../lib/services/kontentClient';
import { formatDate } from '../../../lib/utils/dateTime';
import { defaultEnvId } from '../../../lib/utils/env';
import {
  Article,
} from '../../../models';
import Image from 'next/image';
import {
  getEnvIdFromRouteParams,
  getPreviewApiKeyFromPreviewData,
} from '../../../lib/utils/pageUtils';
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

type Props = Readonly<{
  article: Article;
  language: string;
}>;

const ArticlePage: FC<Props> = ({
  article,
  language
}) => {
  const isAmp = useAmp()

  return (
    <div>
      {isAmp ? (
        <div>
          <amp-img
            width="300"
            height="300"
            src={article.elements.heroImage.value[0]?.url + '?dpr=1&q=1'}
            alt={article.elements.heroImage.value[0]?.description}
            layout="responsive"
          />
          <div
            className={`py-1 px-3 max-w-screen-md md:w-fit text-center mx-auto mb-4`}
          >
            <h1 className={`m-0 text-3xl tracking-wide font-semibold text-white`}>
              {article.elements.title.value}
            </h1>
          </div>
          <div className='text-white p-4 rounded-lg mx-auto'>
            <p className='font-semibold my-0'>
              {article.elements.abstract.value}
            </p>
          </div>
        </div>
      ) : (

        <figure
          className={`relative m-0 w-full h-[32rem]`}
        >
          <Image
            src={article.elements.heroImage.value[0]?.url + '?dpr=1'}
            alt={article.elements.heroImage.value[0]?.description}
            fill
            sizes='100vw, 100vh'
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 h-full flex flex-col items-center md:items-start justify-end pb-16 px-6 mx-10'>
            <div className='backdrop-blur-sm bg-black/50 flex flex-col mx-auto rounded-lg p-4'>
              <div
                className={`py-1 px-3 max-w-screen-md md:w-fit text-center mx-auto mb-4`}
              >
                <h1 className={`m-0 text-3xl tracking-wide font-semibold text-white`}>
                  {article.elements.title.value}
                </h1>
              </div>
              <div className='text-white p-4 rounded-lg mx-auto'>
                <p className='font-semibold my-0'>
                  {article.elements.abstract.value}
                </p>
              </div>
            </div>
          </div>
        </figure>
      )}
      <div className='px-2 max-w-screen-lg m-auto md:px-20 '>
        <div className='flex flex-col md:flex-row w-full mb-16'>
          <div className='w-1/2 mb-16 md:mb-0'>
            {' '}
            <div className='flex flex-col gap-2'>
              <div className='w-fit p-2 font-semibold'>
                {article.elements.publishingDate.value &&
                  formatDate(article.elements.publishingDate.value)}
              </div>
              <div className='flex gap-2'>
                {article.elements.articleType.value.length > 0 &&
                  article.elements.articleType.value.map((type) => (
                    <div
                      key={type.codename}
                      className={`w-fit p-1 text-white`}>
                      {type.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='w-1/2'>
            {article.elements.author.linkedItems[0] && (
              <div
                className='flex items-center'
              >
                {isAmp ? (
                  <div>
                    <amp-img
                      width="100"
                      height="100"
                      src={
                        article.elements.author.linkedItems[0].elements
                          .photograph.value[0]?.url ?? 'missing author image url'
                      }
                      alt={article.elements.heroImage.value[0]?.description}
                      layout="responsive"
                    />
                    <div
                      className={`py-1 px-3 max-w-screen-md md:w-fit text-center mx-auto mb-4`}
                    >
                      <h1 className={`m-0 text-3xl tracking-wide font-semibold text-white`}>
                        {article.elements.title.value}
                      </h1>
                    </div>
                    <div className='text-white p-4 rounded-lg mx-auto'>
                      <p className='font-semibold my-0'>
                        {article.elements.abstract.value}
                      </p>
                    </div>
                  </div>
                ) : (<figure
                  className='relative rounded-full w-20 h-20 overflow-hidden m-0'
                >
                  <Image
                    src={
                      article.elements.author.linkedItems[0].elements
                        .photograph.value[0]?.url ?? 'missing author image url'
                    }
                    alt={`Avatar of author ${article.elements.author.linkedItems[0].elements.firstName.value}${article.elements.author.linkedItems[0].elements.lastName.value}.`}
                    fill
                    sizes='(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw'
                    className='object-cover'
                  />
                </figure>)}
                <div className='flex flex-col pl-4'>
                  <span>
                    <span>
                      {
                        article.elements.author.linkedItems[0].elements
                          .firstName.value
                      }
                    </span>
                    &nbsp;
                    <span>
                      {
                        article.elements.author.linkedItems[0].elements
                          .lastName.value
                      }
                    </span>
                  </span>
                  <em>
                    {
                      article.elements.author.linkedItems[0].elements
                        .occupation.value
                    }
                  </em>
                </div>
              </div>
            )}
          </div>
        </div>

        <RichTextElement
          element={article.elements.content}
          isInsideTable={false}
          language={language}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const slug =
    typeof context.params?.slug === 'string' ? context.params.slug : '';

  if (!slug) {
    return { notFound: true };
  }

  const envId = getEnvIdFromRouteParams(context);
  const previewApiKey = getPreviewApiKeyFromPreviewData(context.previewData);

  const article = await getArticleBySlug(
    { envId, previewApiKey },
    slug,
    !!context.preview,
    context.locale as string
  );
  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
      language: context.locale as string,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles({ envId: defaultEnvId }, false);

  return {
    paths: articles.items.map((a) => ({
      params: {
        slug: a.elements.url.value,
        envId: defaultEnvId,
      },
    })),
    fallback: 'blocking',
  };
};

export default ArticlePage;

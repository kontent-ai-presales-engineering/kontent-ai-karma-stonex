import {Bars3Icon, ChevronDownIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import {NextRouter, useRouter} from 'next/router';
import {FC, useCallback, useEffect, useState} from 'react';
import {contentTypes, WSL_Page, WSL_WebSpotlightRoot} from '../../../models';
import {IContentItem, ITaxonomyTerms} from '@kontent-ai/delivery-sdk';
import {LanguageBar} from './languageBar';
import {PreviewSwitcher} from './previewSwitcher';
import {
  mainColorHoverBorder,
  mainColorBorderClass,
} from '../../../lib/constants/colors';
import {useSiteCodename} from '../siteCodenameContext';
import {
  ResolutionContext,
  reservedListingSlugs,
  resolveUrlPath,
} from '../../../lib/routing';
import {isMultipleChoiceOptionPresent} from '../../../lib/utils/element-utils';
import Search from '../Search';
import {useThemeContext} from '../contexts/ThemeProvider';

type Link = Readonly<WSL_Page>;

type Props = Readonly<{
  item: IContentItem;
  homeContentItem?: WSL_WebSpotlightRoot;
  isPreview: boolean;
  variants?: IContentItem[];
}>;

type MenuListProps = Readonly<{
  items: WSL_Page[];
  activeMenu: string | number;
  smallMenuActive: boolean;
  handleClick: (menuId: string | number) => void;
  isPreview: boolean;
}>;

type DropdownMenuProps = Readonly<{
  links: ReadonlyArray<Link>;
  taxonomies?: ITaxonomyTerms[];
}>;

const isPage = (item: WSL_Page | WSL_WebSpotlightRoot): item is WSL_Page =>
  item.system.type === contentTypes.page.codename;

const isCurrentNavigationItemActive = (
  pageLink: WSL_Page,
  router: NextRouter
) => {
  const pathWithoutQuerystring = router.asPath.replace(/\?.*/, '');
  const pathSegments = pathWithoutQuerystring.split('/');
  const topLevelSegment = pathSegments[1];
  return (
    pageLink &&
    isPage(pageLink) &&
    pageLink.elements.url.value === topLevelSegment
  );
};

const MenuList: FC<MenuListProps> = (props) => {
  const router = useRouter();

  const [taxonomies, setTaxonomies] = useState<ITaxonomyTerms[]>([]);

  const getArticleCategories = useCallback(async () => {
    const response = await fetch(
      `/api/article-categories?preview=${props.isPreview}`
    );
    const articleCategories = await response.json();
    setTaxonomies(articleCategories);
  }, [props.isPreview]);

  useEffect(() => {
    getArticleCategories();
  }, [getArticleCategories]);

  const siteCodename = useSiteCodename();

  return (
    <ul
      className={`${props.smallMenuActive ? 'flex' : 'hidden'
      } flex-col md:flex gap-0 lg:gap-16 font-medium md:flex-row h-full`}
    >
      {props.items.map(
        (link, i) =>
          isMultipleChoiceOptionPresent(
            link.elements.navigationStructures?.value,
            'header'
          ) && (
            <li
              key={i}
              className={`${isCurrentNavigationItemActive(link, router)
                ? ''
                : 'border-l-transparent border-t-transparent'
              }
              ${mainColorBorderClass[siteCodename]
              } border- border-l-8 border-t-0 md:border-t-4 md:border-l-0 h-full group grow`}
              onClick={() => props.handleClick(i)}
            >
              {link.elements.url.value == reservedListingSlugs.articles ||
              link.elements.subpages.value.length > 0 ? (
                <div
                  className={`${i === props.activeMenu ? 'bg-white text-black' : ''
                  } md:hover:bg-white md:hover:text-black h-full`}
                >
                  <DropdownButton item={link} isPreview={props.isPreview}/>
                  <div
                    className={`${i === props.activeMenu ? 'block' : 'hidden'
                    } md:group-hover:block absolute z-50 left-0 shadow-2xl bg-white text-black border-gray-200 w-full `}
                  >
                    <DropdownMenuItems
                      links={link.elements.subpages.linkedItems}
                      taxonomies={
                        link.elements.url.value == reservedListingSlugs.articles
                          ? taxonomies
                          : null
                      }
                    />
                  </div>
                </div>
              ) : (
                <Link
                  rel='noopener noreferrer'
                  className='h-full flex items-center justify-center w-full py-16 px-6 font-medium text-black border-b border-gray-100 md:w-auto md:bg-transparent md:border-0 md:hover:bg-slate-100 md:rounded-2xl duration-100'
                  href={resolveUrlPath(
                    {
                      type: link.system.type,
                      slug: link.elements.url.value,
                    } as ResolutionContext
                  )}
                >
                  {link.elements.title.value}
                </Link>
              )}
            </li>
          )
      )}
    </ul>
  );
};

const DropdownButton: FC<Props> = (props) => {
  return (
    <button
      className='h-full flex items-center justify-between w-full p-16 py-8 font-medium border-b border-gray-100 md:w-auto md:bg-transparent md:border-0'>
      <Link
        rel='noopener noreferrer'
        className='w-full  h-full flex items-center justify-center w-full py-8 font-medium text-black md:bg-transparent md:border-0 md:hover:bg-white hover:text-gray-900'
        href={resolveUrlPath(
          {
            type: props.item.system.type,
            slug: props.item.elements.url.value,
          } as ResolutionContext
        )}
      >
        {props.item.elements.title.value}
        <ChevronDownIcon className='w-4 h-4 ml-1 mt-1'/>
      </Link>
    </button>
  );
};

const DropdownMenuItems: FC<DropdownMenuProps> = (props) => {
  const router = useRouter();
  const siteCodename = useSiteCodename();

  return (
    <ul className='grid gap-8 px-16 py-5 mx-auto text-black sm:grid-cols-2 md:grid-cols-3 md:px-6'>
      {props.taxonomies?.length > 0
        ? props.taxonomies?.slice(0, 6).map((taxonomy) => (
          <li key={taxonomy.codename}>
            <Link
              rel='noopener noreferrer'
              key={taxonomy.codename}
              href={resolveUrlPath({
                type: 'article',
                term: taxonomy.codename,
              } as ResolutionContext)}
              className={`${mainColorHoverBorder[siteCodename]} border-l-transparent block p-3 bg-slate-100 border-l-4 h-full`}
            >
              <div className='font-semibold py-16'>{taxonomy.name}</div>
            </Link>
          </li>
        ))
        : props.links.map(
          (link) =>
            isMultipleChoiceOptionPresent(
              link.elements.navigationStructures?.value,
              'header'
            ) && (
              <li key={link.system.codename}>
                <Link
                  rel='noopener noreferrer'
                  href={resolveUrlPath(
                    {
                      type: link.system.type,
                      slug: link.elements.url?.value,
                    } as ResolutionContext
                  )}
                  className={`${isCurrentNavigationItemActive(link, router)
                    ? 'border-l-gray-500 cursor-default '
                    : `border-l-transparent ${mainColorHoverBorder[siteCodename]}`
                  }
          block p-3 bg-slate-100 border-l-4 h-full`}
                >
                  <div className='font-semibold py-16'>
                    {link.elements.title?.value}
                  </div>
                </Link>
              </li>
            )
        )}
    </ul>
  );
};

export const Menu: FC<Props> = (props) => {
  const [activeMenu, setActiveMenu] = useState<string | number>(-1);
  const [smallMenuActive, setSmallMenuActive] = useState(false);
  const handleMenuClick = (menuId: string | number): void =>
    setActiveMenu(menuId === activeMenu ? -1 : menuId);

  const {themeState} = useThemeContext();

  return (
    <div className={`w-full md:sticky top-0 z-30 p-8 shadow-xl bg-white`}>
      <div className='absolute z-50 rounded-lg opacity-30 hover:opacity-100 top-0 right-0'>
        <PreviewSwitcher isPreview={props.isPreview}/>
      </div>

      <div className='flex w-full items-center px-2 relative z-10'>
        <Link href='/' className='flex items-center h-full w-44 relative' aria-label={"Home"}>
          {props.homeContentItem?.elements.logo.value[0] && (
            <Image
              className='h-auto w-full'
              // fill
              width={props.homeContentItem.elements.logo.value[0].width || "168"}
              height={props.homeContentItem.elements.logo.value[0].height || "56"}
              loading={"eager"}
              src={props.homeContentItem.elements.logo.value[0].url}
              alt={props.homeContentItem.elements.logo.value[0].description || props.homeContentItem.elements.logo.value[0].name}
            />
          )}
          {props.homeContentItem?.elements.name.value && (
            <div className='ml-1 text-white'>
              <div>{props.homeContentItem.elements.name.value}</div>
              <div>{props.homeContentItem.elements.tagline.value}</div>
            </div>
          )}
        </Link>

        <MenuList
          smallMenuActive={smallMenuActive}
          items={props.homeContentItem.elements.subpages.linkedItems}
          handleClick={handleMenuClick}
          activeMenu={activeMenu}
          isPreview={props.isPreview}
        />

        <div className='flex ml-auto'>
          <LanguageBar display='mobile' variants={props.variants}/>
        </div>

        <div className='md:hidden'>
          <button
            type='button'
            className='flex justify-center items-center p-16'
            onClick={() => setSmallMenuActive(!smallMenuActive)}
            aria-label={`Mobile menu`}
          >
            <Bars3Icon className='w-6 h-6'/>
          </button>
        </div>
      </div>

      {!["cityindex", "forex", "stonex"].includes(themeState) &&
          <Search/>
      }
    </div>
  );
};

Menu.displayName = 'Menu';

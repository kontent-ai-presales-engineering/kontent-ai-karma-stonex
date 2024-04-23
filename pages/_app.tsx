import '../styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { LivePreviewProvider } from '../components/shared/contexts/LivePreview';
import {
  SmartLinkProvider,
  useSmartLink,
} from '../components/shared/contexts/SmartLink';
import "../styles/algolia.css";
import "instantsearch.css/themes/satellite.css";
import { ThemeSwitcher } from '../components/shared/ThemeSwitcher';

const App = ({
  Component,
  pageProps,
}: AppProps) => {
  const smartLink = useSmartLink();

  const brandChoice = pageProps.page?.elements?.brandThemeChoice?.value?.[0]?.codename;

  return (
    <LivePreviewProvider smartLink={smartLink}>
      <div className="w-full">
        <Component {...pageProps} />
        <Head>
          <link
            rel="icon"
            href="/favicon.png"
          />
        </Head>
      </div>
      
      {brandChoice && brandChoice !== "default" && (
        brandChoice === "picker" 
        ? <ThemeSwitcher /> 
        : <ThemeSwitcher theme={brandChoice} /> 
      )}
    </LivePreviewProvider>
  );
};

export default function MyApp(props: AppProps) {
  return (
    <SmartLinkProvider>
      <App {...props} />
    </SmartLinkProvider>
  );
}
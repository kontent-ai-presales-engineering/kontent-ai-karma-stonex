import '../styles/globals.scss';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { LivePreviewProvider } from '../components/shared/contexts/LivePreview';
import {
  SmartLinkProvider,
  useSmartLink,
} from '../components/shared/contexts/SmartLink';
import { GoogleTagManager } from '@next/third-parties/google'

const App = ({
  Component,
  pageProps,
}: AppProps) => {
  const smartLink = useSmartLink();

  return (
    <LivePreviewProvider smartLink={smartLink}>
      <div className="w-full h-screen">
        <Component {...pageProps} />
        <GoogleTagManager gtmId="G-Z2978T9M9Z" />
        <Head>
          <link
            rel="icon"
            href="/favicon.png"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var monetateT = new Date().getTime();
                (function() {
                var p = document.location.protocol;
                if (p == "http:" || p == "https:") {
                  var m = document.createElement('script'); m.type = 'text/javascript'; m.async = true; m.src = (p == "https:" ? "https://s" : "http://") + "e.monetate.net/js/2/a-b6206def/p/fifthlevelfashion.com/custom.js";
                  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(m, s);
                }
                })();    
                `,
            }}
          />
        </Head>
      </div>
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
import './global.css';
import Head from 'next/head';
import { Sidebar } from '../components';
import { GlobalContextProvider } from '../context';

export const metadata = {
  title: 'Welcome to Crypto Fund',
  description: 'A decentralized crowdfunding platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <GlobalContextProvider>
          <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
              <Sidebar />
            </div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
              {children}
            </div>
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

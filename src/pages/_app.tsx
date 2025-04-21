import type { AppProps } from "next/app";
import { AppContextProvider } from "../common/context/appContext";
import BaseLayout from "../common/layouts/BaseLayout";
import '../common/styles/globals.css';
import '../common/styles/document.module.css'; 

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </AppContextProvider>
  );
};

export default App;
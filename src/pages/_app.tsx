import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as NexAuthProvider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <NexAuthProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
          <ToastContainer autoClose={2500} />
          <Component {...pageProps} />
      </ChakraProvider>
    </NexAuthProvider>
  )
}

export default MyApp;
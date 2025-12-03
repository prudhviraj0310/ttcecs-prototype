import '../styles/globals.css'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollProgress from '../components/ScrollProgress'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ScrollProgress />
      <Component {...pageProps} />
      <WhatsAppButton />
    </>
  )
}

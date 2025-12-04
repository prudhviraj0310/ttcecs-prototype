import '../styles/globals.css'
import WhatsAppButton from '../components/WhatsAppButton'
import ScrollProgress from '../components/ScrollProgress'
import Chatbot from '../components/Chatbot'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ScrollProgress />
      <Component {...pageProps} />
      <WhatsAppButton />
      <Chatbot />
    </>
  )
}

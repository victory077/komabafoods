import '../styles/globals.css' // 作成したCSSファイルをここでインポート！
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
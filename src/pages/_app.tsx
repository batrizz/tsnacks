import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { Header } from '../components/Header'
import { Registration } from '../components/Registration'
import { Results } from '../components/Results'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
        <Results />
      </main>
      <Registration />
    </div>
  )
}

export default MyApp

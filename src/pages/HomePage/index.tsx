// import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.ethpayContainer}>
      <header className={styles.header}>
        <span className={styles.logo}>EthPay</span>
        <nav className={styles.nav}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#get-started" className={styles.navLink}>Get Started</a>
          <a href="#footer" className={styles.navLink}>Contact</a>
        </nav>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to EthPay</h1>
        <p className={styles.description}>
          EthPay is a decentralized payment platform that allows you to send and receive payments using Ethereum.
        </p>
        <section id="features" className={styles.features}>
          <h2 className={styles.featuresTitle}>Features</h2>
          <ul className={styles.featureList}>
            <li>Fast and secure transactions</li>
            <li>Low fees</li>
            <li>Decentralized and open-source</li>
          </ul>
        </section>
        <section id="get-started" className={styles.getStarted}>
          <h2 className={styles.getStartedTitle}>Get Started</h2>
          <p className={styles.getStartedDescription}>
            To start using EthPay, you need to connect your Ethereum wallet. Click the button below to connect.
          </p>
          <button className={styles.connectButton} onClick={() => navigate('/connect-wallet')}>
            Connect Wallet
          </button>
        </section>
      </main>
      <footer id="footer" className={styles.footer}>
        <p className={styles.footerText}>© {new Date().getFullYear()} EthPay. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <a href="https://twitter.com" aria-label="Twitter"></a>
          <a href="https://github.com" aria-label="GitHub"></a>
          <a href="mailto:support@ethpay.com" aria-label="Email"></a>
        </div>
        <p className={styles.terms}>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};
export default HomePage;

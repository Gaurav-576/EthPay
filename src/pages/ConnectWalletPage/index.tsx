import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

interface EthereumProvider {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isTrust?: boolean;
  request?: (args: { method: string; params?: any[] }) => Promise<any>;
}
declare global {
  interface Window {
    ethereum?: EthereumProvider & { providers?: EthereumProvider[] };
  }
}

// Helper to pick the right injected provider
function getProvider(): EthereumProvider | undefined {
  const { ethereum } = window;
  if (!ethereum) return undefined;

  // If multiple providers injected, pick MetaMask first, then any other
  if (Array.isArray(ethereum.providers)) {
    return (
      ethereum.providers.find((p) => p.isMetaMask) ??
      ethereum.providers[0]
    );
  }

  return ethereum;
}

const WALLET_LIST = [
  {
    name: 'MetaMask',
    icon: '🦊',
    flag: 'isMetaMask' as const,
  },
  {
    name: 'Coinbase Wallet',
    icon: '💙',
    flag: 'isCoinbaseWallet' as const,
  },
  {
    name: 'Trust Wallet',
    icon: '🔵',
    flag: 'isTrust' as const,
  },
];

const ConnectWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const provider = getProvider();
  const availableWallets = provider
    ? WALLET_LIST.filter((w) => Boolean((provider as any)[w.flag]))
    : [];

  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName);
    setError(null);

    try {
      if (window.ethereum && window.ethereum.request) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Navigate to dashboard on successful connection
        navigate('/dashboard');
      } else {
        setError('No compatible wallet extension found.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect.');
      setSelectedWallet(null);
    }
  };

  return (
    <div className={styles.connectWalletContainer}>
      <h1 className={styles.title}>Connect Your Wallet</h1>
      <p className={styles.description}>
        Select a wallet extension to connect to EthPay.
      </p>

      <div className={styles.walletList}>
        {!provider && (
          <div className={styles.noWallets}>
            No injected wallet detected. Please install MetaMask or Coinbase
            Wallet.
          </div>
        )}

        {availableWallets.map((wallet) => (
          <button
            key={wallet.name}
            className={styles.walletButton}
            onClick={() => handleConnect(wallet.name)}
            disabled={selectedWallet === wallet.name}
          >
            <span className={styles.walletIcon}>{wallet.icon}</span>
            <span className={styles.walletName}>{wallet.name}</span>
            {selectedWallet === wallet.name && (
              <span className={styles.connecting}>Connecting…</span>
            )}
          </button>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ConnectWalletPage;
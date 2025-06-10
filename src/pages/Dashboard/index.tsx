import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const Dashboard = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch wallet details if account is not set
    if (account) return;
    const fetchWalletDetails = async () => {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        setError('MetaMask is not installed or not detected.');
        setTimeout(() => navigate('/connectWallet'), 2000);
        return;
      }
      try {
        // Request accounts if not already connected
        const accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          // Fetch balance
          const balanceWei = await window.ethereum.request!({
            method: 'eth_getBalance',
            // @ts-ignore
            params: [accounts[0], 'latest'],
          });
          setBalance((parseInt(balanceWei, 16) / 1e18).toFixed(4));
        } else {
          setError('No account found.');
          setTimeout(() => navigate('/connectWallet'), 2000);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch wallet details.');
        setTimeout(() => navigate('/connectWallet'), 2000);
      }
    };
    fetchWalletDetails();
  }, [navigate, account]);

  const handleLogout = () => {
    setAccount(null);
    setBalance(null);
    setError(null);
    // Remove wallet info from localStorage/sessionStorage if stored
    if (window.ethereum && window.ethereum.isMetaMask) {
      // MetaMask does not provide a direct disconnect, so we clear state only
    }
    // Optionally, force reload to clear any lingering dapp state
    window.location.replace('/connectWallet');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Wallet Dashboard</h1>
      <button onClick={handleLogout} className={styles.logoutButton} style={{alignSelf: 'flex-end', margin: '1rem 2rem 0 0'}}>Logout</button>
      {error && <div className={styles.error}>{error}</div>}
      {!error && (
        <div className={styles.walletDetails}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Account:</span>
            <span className={styles.value}>{account}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Balance:</span>
            <span className={styles.value}>{balance} ETH</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

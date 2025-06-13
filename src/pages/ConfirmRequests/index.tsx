import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

// Simulate getting these from previous step or route params
const USD_AMOUNT = 120.5; // Example value, replace with real data
const VENDOR_UPI = 'vendor1@upi'; // Example value, replace with real data
const ETH_USD_RATE = 3500; // Example rate, replace with real-time fetch if needed

const ConfirmRequestPage = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    // Calculate ETH amount
    setEthAmount((USD_AMOUNT / ETH_USD_RATE).toFixed(6));
    // Fetch wallet balance
    const fetchBalance = async () => {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        setError('MetaMask is not installed or not detected.');
        return;
      }
      try {
        const accounts = await window.ethereum.request!({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          const balanceWei = await window.ethereum.request!({
            method: 'eth_getBalance',
            // @ts-ignore
            params: [accounts[0], 'latest'],
          });
          setBalance(parseInt(balanceWei, 16) / 1e18);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch wallet balance.');
      }
    };
    fetchBalance();
  }, []);

  const handleConfirm = () => {
    setConfirmed(true);
    // Here you would trigger the actual payment logic
  };

  const insufficient = balance !== null && parseFloat(ethAmount) > balance;

  return (
    <div className={styles.confirmContainer}>
      <h1 className={styles.title}>Confirm Payment Request</h1>
      <div className={styles.summaryBox}>
        <div className={styles.summaryRow}><span>Amount to Pay (USD):</span> <span>${USD_AMOUNT.toFixed(2)}</span></div>
        <div className={styles.summaryRow}><span>Vendor UPI ID:</span> <span>{VENDOR_UPI}</span></div>
        <div className={styles.summaryRow}><span>Equivalent ETH:</span> <span>{ethAmount} ETH</span></div>
        <div className={styles.summaryRow}><span>Your Balance:</span> <span>{balance !== null ? balance.toFixed(6) + ' ETH' : '...'}</span></div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {confirmed && <div className={styles.successMsg}>Request confirmed! Please send {ethAmount} ETH to the middleman address.</div>}
      <button
        className={styles.confirmButton}
        onClick={handleConfirm}
        disabled={insufficient || !!error || confirmed}
      >
        Confirm & Pay
      </button>
      {insufficient && <div className={styles.error}>Insufficient balance to complete this payment.</div>}
    </div>
  );
};

export default ConfirmRequestPage;

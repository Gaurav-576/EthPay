import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const MakeRequestPage = () => {
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!amount || !upiId) {
      setError('Please fill in both fields.');
      return;
    }
  };

  return (
    <div className={styles.requestsContainer}>
      <h1 className={styles.title}>Create Payment Request</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>Amount to be paid (USD)</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            className={styles.input}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount in USD"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="upiId" className={styles.label}>Vendor UPI ID</label>
          <input
            id="upiId"
            type="text"
            className={styles.input}
            value={upiId}
            onChange={e => setUpiId(e.target.value)}
            placeholder="Enter vendor's UPI ID"
            required
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button onClick={() => navigate('/confirm-request')} className={styles.submitButton} type="submit">Proceed to make Request</button>
      </form>
      <div className={styles.infoBox}>
        <p>
          <b>How it works:</b> The middleman will see your request, pay the vendor in USD, and you will transfer the equivalent amount in Ethereum to the middleman.
        </p>
      </div>
    </div>
  );
};

export default MakeRequestPage;

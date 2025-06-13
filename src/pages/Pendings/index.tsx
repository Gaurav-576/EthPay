import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const pendingRequests = [
  {
    id: 'REQ-001',
    user: '0xA1B2...C3D4',
    amount: 120.50,
    upiId: 'vendor1@upi',
    status: 'Pending',
    date: '2025-06-09',
  },
  {
    id: 'REQ-002',
    user: '0xE5F6...7890',
    amount: 75.00,
    upiId: 'shopkeeper@upi',
    status: 'Pending',
    date: '2025-06-08',
  },
  {
    id: 'REQ-003',
    user: '0x1234...5678',
    amount: 200.00,
    upiId: 'merchant@upi',
    status: 'Pending',
    date: '2025-06-07',
  },
];

const PendingsPage = () => {
  return (
    <div className={styles.pendingsContainer}>
      <h1 className={styles.title}>Pending Payment Requests</h1>
      <div className={styles.cardsGrid}>
        {pendingRequests.map((req) => (
          <Link
            to={`/pendings/${req.id}`}
            className={styles.cardLink}
            key={req.id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardId}>{req.id}</span>
                <span className={styles.cardStatus}>{req.status}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardRow}><span>User:</span> <span className={styles.cardUser}>{req.user}</span></div>
                <div className={styles.cardRow}><span>Amount:</span> <span className={styles.cardAmount}>${req.amount.toFixed(2)}</span></div>
                <div className={styles.cardRow}><span>Vendor UPI:</span> <span className={styles.cardUpi}>{req.upiId}</span></div>
                <div className={styles.cardRow}><span>Date:</span> <span className={styles.cardDate}>{req.date}</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PendingsPage;

import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './styles.module.scss';

// Example hardcoded data (replace with real fetch logic)
const pendingRequests = [
  {
    id: 'REQ-001',
    user: '0xA1B2...C3D4',
    amount: 120.5,
    upiId: 'vendor1@upi',
    status: 'Pending',
    date: '2025-06-09',
    vendorName: 'Vendor One',
    description: 'Payment for electronics',
  },
  {
    id: 'REQ-002',
    user: '0xE5F6...7890',
    amount: 75.0,
    upiId: 'shopkeeper@upi',
    status: 'Pending',
    date: '2025-06-08',
    vendorName: 'Shopkeeper',
    description: 'Groceries payment',
  },
];

const paymentMethods = [
  { name: 'UPI', description: 'Pay directly to the vendor UPI ID.' },
  { name: 'Bank Transfer', description: 'Transfer to vendor’s bank account.' },
  { name: 'PayPal', description: 'Send USD via PayPal.' },
];

const PendingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const request = pendingRequests.find((req) => req.id === id);

  if (!request) {
    return (
      <div className={styles.pendingDetailsContainer}>
        <h2 className={styles.title}>Request Not Found</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pendingDetailsContainer}>
      <div className={styles.detailsCard}>
        <h1 className={styles.title}>Pending Request Details</h1>
        <div className={styles.infoGrid}>
          <div>
            <div className={styles.label}>Request ID</div>
            <div className={styles.value}>{request.id}</div>
          </div>
          <div>
            <div className={styles.label}>Status</div>
            <div className={`${styles.value} ${styles.status}`}>{request.status}</div>
          </div>
          <div>
            <div className={styles.label}>Date</div>
            <div className={styles.value}>{request.date}</div>
          </div>
          <div>
            <div className={styles.label}>User Address</div>
            <div className={styles.value}>{request.user}</div>
          </div>
          <div>
            <div className={styles.label}>Vendor Name</div>
            <div className={styles.value}>{request.vendorName}</div>
          </div>
          <div>
            <div className={styles.label}>Vendor UPI</div>
            <div className={styles.value}>{request.upiId}</div>
          </div>
          <div>
            <div className={styles.label}>Amount (USD)</div>
            <div className={styles.value}>${request.amount}</div>
          </div>
          <div>
            <div className={styles.label}>Description</div>
            <div className={styles.value}>{request.description}</div>
          </div>
        </div>
        <div className={styles.sectionDivider} />
        <h2 className={styles.subtitle}>Choose Payment Method</h2>
        <div className={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <div className={styles.methodCard} key={method.name}>
              <div className={styles.methodName}>{method.name}</div>
              <div className={styles.methodDesc}>{method.description}</div>
              <button className={styles.payButton}>Process Payment</button>
            </div>
          ))}
        </div>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back to Pendings
        </button>
      </div>
    </div>
  );
};

export default PendingDetails;
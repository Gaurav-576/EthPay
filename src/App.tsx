// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConnectWalletPage from './pages/ConnectWalletPage';
import Dashboard from './pages/Dashboard';
import MakeRequestPage from './pages/MakeRequests';
import ConfirmRequestPage from './pages/ConfirmRequests';
import PendingsPage from './pages/Pendings';
import PendingDetails from './pages/PendingDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/connect-wallet" element={<ConnectWalletPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/make-request" element={<MakeRequestPage />} />
      <Route path="/confirm-request" element={<ConfirmRequestPage />} />
      <Route path="/pendings" element={<PendingsPage />} />
      <Route path="/pendings/:id" element={<PendingDetails />} />
    </Routes>
  );
}

export default App;

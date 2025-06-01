import { useEffect, useState } from 'react';
import InboxList from '../components/InboxList';
import { generateRandomEmail } from '../lib/util';

export default function Home() {
  const [email, setEmail] = useState('');
  const [inbox, setInbox] = useState([]);
  const [customEmail, setCustomEmail] = useState('');
  const [emailHistory, setEmailHistory] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fake_email');
    const history = JSON.parse(localStorage.getItem('email_history') || '[]');
    setEmailHistory(history);

    const genEmail = saved || generateRandomEmail();
    setEmail(genEmail);
    localStorage.setItem('fake_email', genEmail);

    if (saved && !history.includes(saved)) {
      const updatedHistory = [...history, saved];
      setEmailHistory(updatedHistory);
      localStorage.setItem('email_history', JSON.stringify(updatedHistory));
    }

    fetchInbox(genEmail);
  }, []);

  const fetchInbox = (emailAddress) => {
    fetch(`/api/inbox?email=${emailAddress}`)
      .then((res) => res.json())
      .then(setInbox);
  };

  const handleCustomEmail = (e) => {
    e.preventDefault();
    if (!customEmail.includes('@')) {
      alert('Masukkan alamat email yang valid');
      return;
    }
    setEmail(customEmail);
    localStorage.setItem('fake_email', customEmail);

    if (!emailHistory.includes(customEmail)) {
      const updatedHistory = [...emailHistory, customEmail];
      setEmailHistory(updatedHistory);
      localStorage.setItem('email_history', JSON.stringify(updatedHistory));
    }

    fetchInbox(customEmail);
    setCustomEmail('');
    setShowCustomForm(false);
  };

  const switchToEmail = (selectedEmail) => {
    setEmail(selectedEmail);
    localStorage.setItem('fake_email', selectedEmail);
    fetchInbox(selectedEmail);
  };

  const generateNewEmail = () => {
    const newEmail = generateRandomEmail();
    setEmail(newEmail);
    localStorage.setItem('fake_email', newEmail);

    if (!emailHistory.includes(newEmail)) {
      const updatedHistory = [...emailHistory, newEmail];
      setEmailHistory(updatedHistory);
      localStorage.setItem('email_history', JSON.stringify(updatedHistory));
    }

    fetchInbox(newEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <main className="max-w-4xl mx-auto p-8 font-sans">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            📧 Email Sementara
          </h1>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex-1">
                <p className="text-gray-600 mb-2 text-lg">
                  Alamat email Anda saat ini:
                </p>
                <div className="relative group">
                  <code className="block w-full bg-white px-4 py-3 rounded-xl border border-indigo-100 text-lg font-medium text-indigo-600 shadow-sm">
                    {email}
                  </code>
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <button
                onClick={generateNewEmail}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-medium"
              >
                Buat Email Baru
              </button>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 transition-colors"
              >
                {showCustomForm ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Kembali
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Gunakan Email Kustom
                  </>
                )}
              </button>

              {showCustomForm && (
                <form onSubmit={handleCustomEmail} className="mt-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="Masukkan alamat email kustom..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg font-medium"
                    >
                      Gunakan Email Ini
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {emailHistory.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Riwayat Email
              </h3>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-inner max-h-48 overflow-y-auto">
                {emailHistory.map((historyEmail) => (
                  <button
                    key={historyEmail}
                    onClick={() => switchToEmail(historyEmail)}
                    className={`block w-full text-left px-4 py-3 rounded-lg mb-2 last:mb-0 transition-all duration-200 ${
                      email === historyEmail
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                        : 'hover:bg-white/80 text-gray-700 hover:shadow-sm'
                    }`}
                  >
                    {historyEmail}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
          <InboxList emails={inbox} />
        </div>
      </main>
    </div>
  );
}

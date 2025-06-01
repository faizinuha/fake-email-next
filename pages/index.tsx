import { useEffect, useState } from 'react';
import { generateRandomEmail } from '../lib/util';
import InboxList from '../components/InboxList';

export default function Home() {
  const [email, setEmail] = useState('');
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('fake_email');
    const genEmail = saved || generateRandomEmail();
    setEmail(genEmail);
    localStorage.setItem('fake_email', genEmail);

    fetch(`/api/inbox?email=${genEmail}`)
      .then((res) => res.json())
      .then(setInbox);
  }, []);

  return (
    <main className="p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">📧 Fake Email</h1>
      <p className="mb-2">Your random email:</p>
      <code className="bg-gray-100 px-2 py-1 rounded">{email}</code>
      <InboxList emails={inbox} />
    </main>
  );
}

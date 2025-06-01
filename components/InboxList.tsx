import React from 'react';

export default function InboxList({ emails }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📥 Inbox</h2>
      <ul>
        {emails.map((mail) => (
          <li key={mail.id} className="mb-2 p-2 border rounded">
            <div><strong>From:</strong> {mail.from}</div>
            <div><strong>Subject:</strong> {mail.subject}</div>
            <div className="text-xs text-gray-500">{mail.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

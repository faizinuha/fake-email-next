export default function InboxList({ emails }) {
  const safeEmails = Array.isArray(emails) ? emails : [];

  return (
    <div className="card animate-fade-in">
      <h2 className="heading text-2xl mb-6 flex items-center gap-2">
        <span>📥</span> Kotak Masuk Anda
      </h2>

      {safeEmails.length === 0 ? (
        <div className="flex-center flex-col py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-500">Belum ada email yang masuk</p>
          <p className="text-gray-400 mt-2">
            Email yang Anda terima akan muncul di sini
          </p>
        </div>
      ) : (
        <div className="grid-auto">
          {safeEmails.map((mail) => (
            <div
              key={mail._id}
              className="card animate-slide-up hover:shadow-lg"
            >
              <div className="flex-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex-center bg-gradient-to-br from-primary-light to-primary text-white font-medium">
                    {mail.from.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Dari:</div>
                    <div className="font-medium text-gray-900">{mail.from}</div>
                  </div>
                </div>
                <span className="badge badge-primary">Baru</span>
              </div>

              <h3 className="text-lg font-medium mb-2">{mail.subject}</h3>

              <div className="text-xs text-gray-500">
                {new Date(mail.time).toLocaleString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

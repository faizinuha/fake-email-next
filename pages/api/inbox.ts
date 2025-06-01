export default function handler(req, res) {
  const { email } = req.query;

  const fakeEmails = [
    {
      id: '1',
      from: 'admin@example.com',
      subject: 'Selamat Datang!',
      time: '2025-06-01 10:00',
    },
    {
      id: '2',
      from: 'no-reply@fake.com',
      subject: `Email palsu untuk ${email}`,
      time: '2025-06-01 10:10',
    },
  ];

  res.status(200).json(fakeEmails);
}

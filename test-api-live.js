fetch('https://merlign.com/api/analyze', {
  method: 'POST',
  body: JSON.stringify({ url: 'https://example.com' }),
  headers: { 'Content-Type': 'application/json' }
}).then(res => Promise.all([res.status, res.text()])).then(console.log).catch(console.error);

const http = require('http');
const url = 'http://localhost:3000/api/instrutores?local=Belo%20Horizonte';
http.get(url, (res) => {
  console.log('status', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('len', data.length);
    try {
      const parsed = JSON.parse(data);
      console.log('count', parsed.length);
      if (parsed[0]) console.log('first.local=', parsed[0].local);
    } catch (e) {
      console.error('parse error', e.message);
      console.log('body preview:', data.slice(0, 1000));
    }
  });
}).on('error', (e) => console.error('error', e.message));

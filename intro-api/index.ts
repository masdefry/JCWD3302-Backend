// Boilerplate

import http, { IncomingMessage, ServerResponse } from 'http';

const PORT = 8000;

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api' && req.method === 'GET') {
      res.writeHead(200);
      res.write('Welcome to our first API');
      res.end();
    }

    if(req.url === '/api/products' && req.method === 'GET'){
        // Logika untuk handle products
        
        res.writeHead(200);
        res.write('Get products successfull'), 
        res.end();
    }
  }
);

server.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

var http = require('http');
var fs = require('node:fs/promises');
var url = require('node:url');

http.createServer(async function (req, res) {
  var url_ref = url.parse(req.url);
  var fileToServe = '.' + (url_ref.pathname === '/' ? '/index.html' : url_ref.pathname); // Serve index.html if root is requested

  try {
    var data = await fs.readFile(fileToServe);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
  } catch (err) {
    console.error(err);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    try {
      var notFound = await fs.readFile('./404.html');
      res.write(notFound);
    } catch (err) {
      console.error(err);
      res.write('404 - Page Not Found'); // Fallback message if 404.html is not found
    }
  } finally {
    res.end();
  } 
}).listen(8080);

console.log('Server is running on http://localhost:8080');

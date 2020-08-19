const http = require('http')

const server = http.createServer((req, res) => {
  // console.log('req made', req.rawHeaders)
  console.log(req.url, req.method)

  // set header, write content, end response.
  // res.setHeader('Content-Type', 'text/plain')
  // res.write('hello fool')
  // res.end()

  // same as above, with html
  // res.setHeader('Content-Type', 'text/html')
  // res.write('<p>Hello fool</p>')
  // res.write('<p>Hello again</p>')
  // res.end()

  // same as above, with json 
  res.setHeader('Content-Type', 'json')
  res.write(JSON.stringify({ "hello": "fool", "json": true }))
  res.end()

})

server.listen(3030, 'localhost', () => {
  console.log('listening to server requests on port: 3030')
})

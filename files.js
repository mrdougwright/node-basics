const fs = require('fs')

// reading files
fs.readFile('./docs/blog.txt', (err, data) => {
  err ? console.log(err) : console.log(data.toString())
})

// writing files
fs.writeFile('./docs/blog.txt', 'hello, world', () => {
  console.log('file was written')
})

// directories
if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    err ? console.log(err) : console.log('folder created')
  })
} else {
  fs.rmdir('./assets', (err) => {
    err ? console.log(err) : console.log('dir removed.')
  })
}

// deleting files
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    err ? console.log(err) : console.log('file deleted.')
  })
}
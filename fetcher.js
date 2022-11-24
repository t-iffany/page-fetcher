/* 
Implement a node app called fetcher.js
Takes in 2 command line arguments
1) URL
2) local file path
- download the resource at the URL to the local path
- upon completion, print out message
- need to make an http request and wait for the response
- after request complete, take the data received and write it to a file in local filesystem
- file size: 1 character = 1 byte

Tips
- Install and use the request library to make the HTTP request 
- Use Node's fs (file system) module to write the file
- Use the callback based approach we've been learning so far
- Do not use the pipe function
- Do not use synchronous functions (see warning above)
*/

// command line arguments
const args = process.argv.slice(2);


// make HTTP request for HTML of the website homepage
const request = require('request');
// use Node fs (file system) module to write the file
const fs = require('fs');

const fetcher = (url, localFilePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error('error:', error); // Print the error if one occurred
      process.exit();
    };

    if (!error) {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the website homepage.
      dataToFile(body, localFilePath);  // Run dataToFile function to write data into new file
    };
  });
};

// takes data received and writes it to a file in local filesystem
const dataToFile = (content, localFilePath) => {
  fs.writeFile(localFilePath, content, err => {
    if (err) {
      console.error(err);
      process.exit();
    }
    // file written successfully
    const fileSize = content.length;
    console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
  });
};

// run node fetcher app using node fetcher URL localFilePath
fetcher(args[0], args[1]);
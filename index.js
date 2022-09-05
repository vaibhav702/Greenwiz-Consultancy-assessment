// **********************************Import the Module required for this project***************************************//
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
var Stream = require('stream').Transform;
const download = require('node-image-downloader')
//request module
request("https://www.growpital.com/", function (err, res, body) {
  if (err) {
    res.status(500).send("request unsuccessfull"); //if error in link
  } else {
    let arr = [];

    let $ = cheerio.load(body);
    $("img").each((index, image) => {
      let img = $(image).attr("src");

      let link = img;
      console.log(link);

      if (arr.indexOf(link) == -1) {
        arr.push(`\n${link}`);
      }
      //download the image and save
      download({
          imgs:[
            {
                uri:img
            }
          ],
          dest:'./dataDownload'
      })
      .then((info)=>{
        console.log("download complete")

      })
    
      // saving data in data.txt file
      fs.writeFileSync("data.txt", arr.toString(), function (err) {
        if (err) {
          res.status(500).send("eror");
        } else {
          res.status(200).send("success");
        }
        
      });
    });
  }
});

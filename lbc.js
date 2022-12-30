const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractHTML(html);
    }
}

// inspect ->
// unique
function extractHTML(html) {
    let $ = cheerio.load(html);
    // let elemArr = $(".ds-text-compact-s+.ds-hover-parent p");
    let elemArr = $(".ds-text-compact-s+.ds-hover-parent div[itemprop=\"articleBody\"]");
    // console.log("" + elemArr);
    let text=$(elemArr[0]).text();
    let htmlData=$(elemArr[0]).html();
    console.log("Text Data: ", text);
    console.log("HTML Data: ", htmlData);
}
// console.log("After");
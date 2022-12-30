const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        extractHTML(html);
    }
}
function extractHTML(html) {
    let $ = cheerio.load(html);
    let inningsArr = $(".ds-rounded-lg.ds-mt-2");
    let htmlStr = "";
    for (let i = 0; i < inningsArr.length; i++) {
        // team name
        let teamNameEle = $(inningsArr[i]).find(".ds-text-title-xs.ds-font-bold.ds-text-typo-title");
        let teamName = teamNameEle.text();
        teamName = teamName.split("(")[0];
        teamName = teamName.trim();
        // team batsman
        // console.log(teamName);
        let hwtName = "";
        let hwt = 0;
        let tableElem = $(inningsArr[i]).find(".ci-scorecard-table tbody");
        let allBatsman = $(tableElem).find("tr");
        for (let j = 0; j < allBatsman.length - 4; j++) {
            let allColsOfPlayer = $(allBatsman[j]).find("td");
            let hasClass = $(allBatsman[j]).hasClass("ds-hidden");
            if (!hasClass) {
                let href = $(allColsOfPlayer[0]).find("a").attr("href");
                let name = $(allColsOfPlayer[0]).text();
                let fullLink = "https://www.espncricinfo.com" + href;
                // console.log(fullLink);
                getBirthdayPage(fullLink, name, teamName);
            }
        }
    }
    // console.log(htmlStr);
}
// console.log(htmlStr);

function getBirthdayPage(url, name, teamName) {
    request(url, cb);
    function cb(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            extractBirthday(html, name, teamName);
        }
    }
}
function extractBirthday(html, name, teamName) {
    let $ = cheerio.load(html);
    let detailsArr = $(".ds-mb-8 .ds-text-title-s");
    let birthday = $(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthday}`);
}
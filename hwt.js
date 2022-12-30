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
    // full page search
    let teamArr = $(".ds-flex.ds-flex-col.ds-mt-3.ds-mt-0.ds-mb-1 .ci-team-score");
    let wTeamName;
    for (let i = 0; i < teamArr.length; i++) {
        let hasClass = $(teamArr[i]).hasClass("ds-opacity-50");
        if (!hasClass) {
            let teamNameEle = $(teamArr[i]).find("a>span");
            wTeamName = teamNameEle.text().trim();
        }
    }
    // segregate
    // shorter form html
    let innings = $(".ds-rounded-lg.ds-mt-2");
    let htmlStr = "";
    for (let i = 0; i < innings.length; i++) {
        // let cHtml = $(innings[i]).html();
        // htmlStr += cHtml;
        // team names
        let teamNameEle = $(innings[i]).find(".ds-text-title-xs.ds-font-bold.ds-text-typo-title");
        let teamName = teamNameEle.text();
        teamName = teamName.split("(")[0];
        teamName = teamName.trim();
        // team table
        // console.log(teamName);
        let hwtName="";
        let hwt=0;
        if (wTeamName == teamName) {
            // console.log(teamName);
            let tableElem = $(innings[i]).find(".ci-scorecard-table+table tbody");
            let allBowlers = $(tableElem).find("tr");
            for (let j = 0; j < allBowlers.length; j++) {
                let hasClass = $(allBowlers[j]).hasClass("ds-hidden");
                if (!hasClass) {
                    let allColsOfPlayer = $(allBowlers[j]).find("td");
                    let playerName = $(allColsOfPlayer[0]).text();
                    let wickets = $(allColsOfPlayer[4]).text();
                    // console.log(`Winning Team ${wTeamName} PlayerName: ${playerName} Wickets: ${wickets}`);
                    if(hwt<wickets){
                        hwt=wickets;
                        hwtName=playerName;
                    }
                }
            }
            console.log(`Winning Team ${wTeamName} Highest Wicket Taker PlayerName: ${hwtName} Wickets: ${hwt}`);
        }
    }
    // console.log(htmlStr);
}
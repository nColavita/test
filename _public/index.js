// New Data Set
let data_set = {};

// Render Chart
const renderChart = (data) => {
    console.log(data);
    var chart = c3.generate({
        bindto: '#chart',
        data: {
          json: data_set,
          type: 'bar'
        },
        size: {
            height: 850
        },
        axis: {
            x: {
                label: 'Word',
                type: 'category'
            },
            y: {
                label: '# of Occurances'
            }
        },
        grid: {
            y: {
                show: true
            }
        }            
    });
    d3.select("svg").append("text")
        .attr("x", "50%" )
        .attr("y", 15)
        .attr("class", "chart-title")
        .style("text-anchor", "middle")
        .text("Unique Words: Justin Beiber Twitter Feed");
}

// Traverse Parsed Data For Body HTML
const parseData = (data) => {
    let content = data.content;
    // Loop through each row
    content.forEach(d => {
        if(d.content.bodyHtml){
            let bodyHTML = d.content.bodyHtml.split(/\s+/);
            // Loop through each bodyHTML array
            bodyHTML.forEach(d => {
                d = d.toLowerCase();
                // Filter unnecessary elements in bodyHTML strings - messy needs to be rewritten
                if( 
                    d.includes("<a") ||  d.includes("resource") || d.includes("data") || d.includes("href") || d.includes("<span") || d.includes("<a") || d.includes("property") || d.includes("target") || d.includes("vocab") || d.includes("class") || d.includes("rel") || d.includes("typeof") || d.includes("hashtag")
                ){
                    // Do nothing
                }else{
                    if(data_set.hasOwnProperty(d)){
                        data_set[d]++;
                    }else{
                        data_set[d] = 1;
                    }
                }
            })
        }
    });
    renderChart(JSON.stringify(data_set));
}

window.onload = function(){
    console.log("window loaded");
    // AJAX request to read local JSON file
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          parseData(JSON.parse(this.responseText));
      }
    };
    xhttp.open("GET", "../test_feed.json", true);
    xhttp.send();
}
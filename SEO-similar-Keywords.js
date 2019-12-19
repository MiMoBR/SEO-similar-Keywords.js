(function() {
    clear();

    const email = prompt("Email?");
    const password = prompt("Password?");
    const limit = prompt("How many, max is 1000?");
    const country_code = prompt("Country ISO code (like US)?");
    const language = prompt("Language Code (like en)?");
    const keyword = prompt("Keyword?");

    const params = {};
    const ID = Math.floor(Math.random() * 300000) + 1;

    params[ID] = {                    
        limit: limit ? parseInt(limit, 10) : 100,
        keyword,
        language: language.toLowerCase(),
        country_code: country_code.toLowerCase(),
        orderby:"search_volume,desc",
        filters:[
            ["cpc", ">", 0],
            "or",
            ["search_volume", ">", 20],
        ],
    };

    const data = {
        data: params,
    };

    const AUTH = btoa(`${email}:${password}`)

    const headers = {
       "Content-Type": "application/json",
       "Authorization": `Basic ${AUTH}`,       
    };

    fetch("https://api.dataforseo.com/v2/kwrd_finder_similar_keywords_get", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(data)
    })
    .then(function(response){         
        return response.json();
    })
    .then(function(data) {
        
        const result = [];
        console.log(data);

        for (const k of data.results[ID].similar) {
            const keyword = k.key;
            const volume = k.search_volume;
            const cpc = k.cpc;
            const competition = k.competition;            
            result.push(`${keyword}\t"${volume}"\t"${cpc}"\t"${competition}"`);
        }

        const content = "KEYWORD\tVOLUME\tCPC\tCOMPETITION\n" + result.join("\n");
        console.log(content);    

    }).catch((err) => console.log(err));
        
})();

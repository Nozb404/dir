function runLinks() {
    $.getJSON("js/dirs.json", async function (jd) {
        for (const [key, value] of Object.entries(jd)) {
            for (const [key0, value0] of Object.entries(value["infos"])) {
                let online = false;

                for (let i = 0; i < value0['urls'].length; i++) {
                    const url = value0['urls'][i];
                    
                    if (!isOnionLink(url)) {
                        online = await verificarSite(url);
                    }
                    
                    // Verifica se apenas um dos links está online
                    if (online) {
                        break;
                    }
                }
                // console.log(`${key} -> ${key0} está ${online ? 'online' : 'offline'}`);
                
                if (online) {
                    value0['status'] = 1;
                }
                else{
                    value0['status'] = 2;
                }
                
            }
        }

        console.log(JSON.stringify(jd, null, 2));
    });
}

function isOnionLink(url) {
    // const onionPattern = /https?:\/\/[a-z0-9]{16}\.onion/;
    // return onionPattern.test(url);

    return url.includes(".onion");
}

async function verificarSite(url_i) {
    let url = "https://corsproxy.io/?" + url_i;

    try {
        const response = await fetch(url);
        if (response.ok) {
            console.log(`${url} está online.`);
            return true;
        } else {
            console.log(`${url} está offline. Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`${url} está offline. Erro: ${error}`);
        return false;
    }
}

// Verifica a cada hora (3600000 milissegundos)
// setInterval(runLinks, 3600000);
runLinks();

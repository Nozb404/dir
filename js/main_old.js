let types = ["Site", "Software"]
let sections =
{
    "reading": "Leitura",
    "streaming": "Streaming",
    "games": "Games",
    "onions": "Onions",
    "indexers": "Indexadores"
}

$.getJSON("js/dirs.json", function (jd) {
    Object.entries(jd).forEach((entry) => {
        const [key, value, index] = entry;
        createSections(key);

        Object.entries(value["infos"]).forEach((entry0) => {
            const [key0, value0] = entry0;
            addCard(key, value0, key0);
        });
    });
});

function addCard(type, infos, key_0 = null) {
    let al_cd = document.querySelector(`#${type} > .cards_all`);
    let al_md = document.getElementById("modal_all");
    let modal_id = `${type}-${key_0}-${infos["title"]}`;
    let card =
        `
        <article class="card mb-3" style="width: 34em;height: 10em;">
            <div class="row g-0" style="height: 100%;">
                <div class="col-md-4 img_card">
                    <img src="${infos["icon"]}" class="img-fluid rounded-start" alt="${infos["title"]}" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${infos["title"]}</h5>
                        <p class="card-text">${infos["description"]}</p>
                        <p class="card-text">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modal_id}">Ver</button>
                        </p>
                    </div>
                </div>
            </div>
        </article>
    `;

    al_cd.insertAdjacentHTML("beforeend", card);
    let status = ["Online", "success"];
    switch (infos["status"]) {
        case 1:
            status = ["Suspenso", "danger"];
            break;
    }

    let ids =
        [
            `${type}-${key_0}-accordion`,
            `${type}-${key_0}-flush0`,
            `${type}-${key_0}-flush1`,
            `${type}-${key_0}-flush2`,
        ];
    let lists = {
        "types": [],
        "urls": []
    }

    Object.entries(infos["type"]).forEach((entry) => {
        const [key, value] = entry;
        let type = types[value]
        type = `<li class="list-group-item">${type}</li>`
        lists["types"].push(type);
    });
    Object.entries(infos["urls"]).forEach((entry) => {
        const [key, value] = entry;
        let url = `
        <li class="list-group-item">
            <a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>
        </li>`
        lists["urls"].push(url);
    });
    lists["types"] = lists["types"].join('')
    lists["urls"] = lists["urls"].join('')

    let modal =
        `
        <div class="modal" id="${modal_id}">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h4 class="modal-title">${infos["title"]}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <img src="${infos["icon"]}" class="card-img-top img_modal" alt="${infos["title"]}">

                    <div class="modal-body">
                        <h6>Status: <span class="badge text-bg-${status[1]}">${status[0]}</span></h6>
                        <div class="accordion accordion-flush" id="${ids[0]}">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#${ids[1]}" aria-expanded="false" aria-controls="${ids[1]}">
                                    Descrição
                                    </button>
                                </h2>
                                <div id="${ids[1]}" class="accordion-collapse collapse" data-bs-parent="#${ids[0]}">
                                    <div class="accordion-body">
                                        ${infos["description"]}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#${ids[2]}" aria-expanded="false" aria-controls="${ids[2]}">
                                    Tipo
                                    </button>
                                </h2>
                                <div id="${ids[2]}" class="accordion-collapse collapse" data-bs-parent="#${ids[0]}">
                                    <div class="accordion-body">
                                        <ul class="list-group">
                                            ${lists["types"]}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#${ids[3]}" aria-expanded="false" aria-controls="${ids[3]}">
                                    URL(s)
                                    </button>
                                </h2>
                            <div id="${ids[3]}" class="accordion-collapse collapse" data-bs-parent="#${ids[0]}">
                                <div class="accordion-body">
                                    <ol class="list-group">
                                        ${lists["urls"]}
                                    </ol>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    al_md.insertAdjacentHTML("beforeend", modal);
}

function createSections(type) {
    let main = document.getElementById("c_secs_info");
    let section = document.getElementById(type);
    if (section == null) {
        section = sections[type];
        let content =
            `
        <section id="${type}"  class="c_info_cd">
            <h4 class="h_tx0">${section}</h4>
            <div class="cards_all">
            </div>
        </section>
    `;

        main.insertAdjacentHTML("beforeend", content);
    }
}
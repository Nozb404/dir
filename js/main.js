let types = ["Site", "Software"]
let sections =
{
    "reading": "Leitura",
    "streaming": "Streaming",
    "games": "Games",
    "onions": "Onions",
    "indexers": "Indexadores",
    "multimedia": "Multimídia"
}

$.getJSON("js/dirs.json", function (jd) {
    for (const [key, value, index] of Object.entries(jd)) {
        createSections(key);

        for (const [key0, value0] of Object.entries(value["infos"])) {
            addCard(key, value0, key0);
        }
    }
});

// $.getJSON("js/dirs.json", function (jd) {
//     Object.entries(jd).forEach((entry) => {
//         const [key, value, index] = entry;
//         createSections(key);

//         Object.entries(value["infos"]).forEach((entry0) => {
//             const [key0, value0] = entry0;
//             addCard(key, value0, key0);
//         });
//     });
// });

let status_all = {
    0: ["Suspenso", "danger"],
    1: ["Online", "success"],
    2: ["Indisponível", "warning"],
    999: ["Desconhecido", "secondary"]
}

function addCard(type, infos, key_0 = null) {
    let al_cd = document.querySelector(`#${type}_table > tbody`);
    let al_md = document.getElementById("modal_all");
    let encodedTitle = window.btoa(infos["title"]);
    let modal_id = `${type}-${key_0}-${encodedTitle}`;

    let status = status_all[999];
    switch (infos["status"]) {
        case 0:
            status = status_all[0];
            break;
        case 1:
            status = status_all[1];
            break;
        case 2:
            status = status_all[2];
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
            <a class="link_modal" href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>
        </li>`
        lists["urls"].push(url);
    });
    lists["types"] = lists["types"].join('')
    lists["urls"] = lists["urls"].join('')

    let card =
        `
        <tr>
            <td>${infos["title"]}</td>
            <td><img class="img_table" src="${infos["icon"]}" alt="${infos["title"]}"></td>
            <td>${infos["description"]}</td>
            <td><span class="badge text-bg-${status[1]}">${status[0]}</span></td>
            <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modal_id}">Ver</button>
            </td>
        </tr>
    `;
    al_cd.insertAdjacentHTML("beforeend", card);
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    al_md.insertAdjacentHTML("beforeend", modal);
}

function createSections(type) {
    let main = document.getElementById("c_secs_info");
    let lks_header = document.getElementById("tables_sspy");
    let section = document.getElementById(type);
    if (section == null) {
        section = sections[type];
        let link_h =
            `
            <li><a class="dropdown-item" href="#${type}" onclick="highlightElement('${type}')">${section}</a></li>
        `
        let content =
            `
            <section id="${type}"  class="c_info_cd table-responsive">
                <h4 class="h_tx0">${section}</h4>
                <table id="${type}_table" class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Status</th>
                            <th scope="col">Informações</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </section>
        `;

        lks_header.insertAdjacentHTML("beforeend", link_h);
        main.insertAdjacentHTML("beforeend", content);
    }
}

function highlightElement(id) {
    var element = document.getElementById(id);
    element.classList.add('highlight');
    setTimeout(function () {
        element.classList.remove('highlight');
    }, 1500); // 1500 milissegundos = 1,5 segundos
}
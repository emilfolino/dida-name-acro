let searchInput = document.getElementById('search');
let searchButton = document.getElementById('do-search');
let factor = document.getElementById('factor');
let searchResults = document.getElementById('search-results');

(function IIFE() {
    searchButton.addEventListener("click", function() {
        let query = searchInput.value;
        fetchSearch(query, searchResults);
    });

    factor.addEventListener("keyup", keyBoardInput);
    searchInput.addEventListener("keyup", keyBoardInput);
})();

function keyBoardInput(event) {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    if (event.keyCode === 13) {
        let query = searchInput.value;
        fetchSearch(query, searchResults);
    }
}

function fetchSearch(query, container) {
    fetch(`/search/${query}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            renderTable(result.data, container);
        });
}

function renderTable(persons, container) {
    if (!container) {
        return;
    }

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    thead.innerHTML = "<tr><th>Namn</th><th>Akronym</th></tr>";

    table.appendChild(thead);

    persons.forEach(function(p) {
        let tr = document.createElement("tr");

        tr.innerHTML = `<td>${p.name}</td><td>${p.acro}</td>`;

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

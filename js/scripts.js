const fetch = require("node-fetch");

document.getElementById("sort_by_name").addEventListener("click", sortByNames);
document.getElementById("sort_by_points").addEventListener("click", sortByPoints);

var list = document.getElementsByClassName("lboard_main_list")[0];

var names_asc = true;
var points_asc = true;

var entries = [];

function fetchEntries() {
    const url = "https://spreadsheets.google.com/feeds/list/17_1B-7knKNEe76EKSwrPaucg9wx36L8HowSiLQz_Pxc/od6/public/values?alt=json";

    fetch(url)
        .then(response => response.json())
        .then(json => compileData(json));
}


const compileData = data => {
    {
        data.feed.entry.forEach(entry => {

            // saving data as an array of dictionaries
            entries.push({
                fullname: entry.gsx$fullname.$t,
                username: entry.gsx$username.$t,
                email: entry.gsx$email.$t,
                points: entry.gsx$totalpoints.$t
            });
        });

        sortByPoints();

    }
};

function sortByPoints() {

    sorted = entries.sort(comaparePoints);

    if (points_asc != true) {
        sorted.reverse();
    }

    var rows = '';

    var index = 0;

    sorted.forEach(entry => {

        index += 1;

        // concatinating content to write on the document
        rows +=
            `
                <div class="lboard_main_item">
                    <p class="position">${index}</p>
                    <div class="name">
                        <img src="img/Ellipse${Math.floor(Math.random() * 5)}.png" alt="picture">
                        <p>${entry.fullname}</p>
                    </div>
                    <p class="slack-username">${entry.username}</p>
                    <p class="point">${entry.points}</p>
                    <div class="share">
                        <a href="https://twitter.com/intent/tweet?text=Hey!%20I%20am%20ranked%20number%20${index}%20on%20the%20current%20@hnginternship%20board%20with%20${entry.points}%20points."><img src="img/Vector.png" alt=""></a>
                    </div>
                </div>
            `

    });
    list.innerHTML = '';

    list.insertAdjacentHTML('beforeend', rows);

    if (points_asc == true) {
        // formating the top three

        document.getElementsByClassName('position')[0].className += " pos1";

        document.getElementsByClassName('position')[1].className += " pos2";

        document.getElementsByClassName('position')[2].className += " pos3";
    }

    points_asc = !points_asc;

}

function sortByNames() {
    sorted = entries.sort(compareNames);
    if (names_asc != true) {
        sorted.reverse();
    }

    var rows = '';

    var index = 0;

    sorted.forEach(entry => {

        index += 1;

        // concatinating content to write on the document
        rows +=
            `
                <div class="lboard_main_item">
                    <p class="position">${index}</p>
                    <div class="name">
                        <img src="img/Ellipse${Math.floor(Math.random() * 5)}.png" alt="picture">
                        <p>${entry.fullname}</p>
                    </div>
                    <p class="slack-username">${entry.username}</p>
                    <p class="point">${entry.points}</p>
                    <div class="share">
                        <a href="https://twitter.com/intent/tweet?text=Hey!%20I%20am%20ranked%20number%20${index}%20on%20the%20current%20@hnginternship%20board%20with%20${entry.points}%20points."><img src="img/Vector.png" alt=""></a>
                    </div>
                </div>
            `

    });
    list.innerHTML = '';

    list.insertAdjacentHTML('beforeend', rows);

    names_asc = !names_asc;
}


function comaparePoints(a, b) {
    const pointsA = parseFloat(a.points);
    const pointsB = parseFloat(b.points);

    let comparison = 0;
    if (pointsA < pointsB) {
        comparison = 1;
    } else if (pointsA > pointsB) {
        comparison = -1;
    }
    return comparison;
}

function compareNames(a, b) {
    const nameA = a.fullname.toUpperCase();
    const nameB = b.fullname.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;
    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
}


fetchEntries();
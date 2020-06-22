const fetch = require("node-fetch");

function fetchEntries() {
    const url = "https://spreadsheets.google.com/feeds/list/17_1B-7knKNEe76EKSwrPaucg9wx36L8HowSiLQz_Pxc/od6/public/values?alt=json";

    fetch(url)
        .then(response => response.json())
        .then(json => compileData(json));
}


const compileData = data => {
    {
        var list = document.getElementsByClassName("lboard_main_list")[0];

        var rows = '';

        var index = 0;

        data.feed.entry.forEach(entry => {
            index += 1;
            rows += `
                    <div class="lboard_main_item">
                        <p class="position">${index}</p>
                        <div class="name">
                            <img src="img/Ellipse${Math.floor(Math.random() * 5)}.png" alt="picture">
                            <p>${entry.gsx$fullname.$t}</p>
                        </div>
                        <p class="slack-username">${entry.gsx$username.$t}</p>
                        <p class="point">${entry.gsx$totalpoints.$t}</p>
                        <div class="share">
                            <a href="https://twitter.com/intent/tweet?text=Hey!%20I%20am%20ranked%20number%20${index}%20on%20the%20current%20@hnginternship%20board%20with%20${entry.gsx$totalpoints.$t}%20points."><img src="img/Vector.png" alt=""></a>
                        </div>
                    </div>`
        });

        list.insertAdjacentHTML('beforeend', rows);

        // formating the top three

        document.getElementsByClassName('position')[0].className += " pos1";

        document.getElementsByClassName('position')[1].className += " pos2";

        document.getElementsByClassName('position')[2].className += " pos3";

    }
};
fetchEntries();
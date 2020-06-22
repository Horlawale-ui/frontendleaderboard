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
                            <img src="img/Ellipse%204.png" alt="picture">
                            <p>${entry.gsx$fullname.$t}</p>
                        </div>
                        <p class="slack-username">${entry.gsx$username.$t}</p>
                        <p class="point">${entry.gsx$totalpoints.$t}</p>
                        <div class="share">
                            <a href="#"><img src="img/Vector.png" alt=""></a>
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
$(window).on("load", start);
$(document).on("change", "#url", change);
$(document).on("click", "#shortcut button", shortcut);

function start() {

    // APP LOADED
    $("#shortcut button:first").click();
};

function change() {

    // URL UPDATED
    $("#image").attr("src", $("#url").val());

}

function shortcut() {

    // SHORTCUT BUTTON CLICKED
    var href = $(this).attr("data-url");
    $("#url").val(href).change();

}

function loaded() {

    // IMAGE LOADED
    // PALETTE
    $("#palette").text("Loading ...");

    const colorThief = new ColorThief();

    const img = $("img")[0];


    const colors = colorThief.getPalette(img);

    const dominant = colorThief.getColor(img);


    $("#palette").empty();

    // ADDING DOMINANT COLOUR

    $("#palette").append("<div class='p-4 rounded-circle d-inline-block border me-1' style='background-color:rgb(" + dominant[0] + ", " + dominant[1] + ", " + dominant[2] + ")'></div>");



    $.each(colors, addColor);

    function addColor(i, o) {

        // ITERATING PALETTE ITEMS
        $("#palette").append("<div class='p-3 rounded-circle d-inline-block border me-1' style='background-color:rgb(" + o[0] + ", " + o[1] + ", " + o[2] + ")'></div>");

    }

    $("#text").text("Loading ...");



    (async () => {

        const worker = await Tesseract.createWorker('eng');

        const { data: { text } } = await worker.recognize($("img")[0]);

        await worker.terminate();

        // WRITE THE RESULTS

        $("#text").text(text);

    })();

}
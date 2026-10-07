$(document).ready(function() {
    setTimeout(() => {
        $('.percent div').each(function() {
            let width = $(this).attr('data-width');
            $(this).css('width', width);
        });
    }, 300);
});

$("#floating-button").on("click mouseenter", function() {
    $("#popup-menu").addClass("show");
});

$("#popup-menu").on("mouseleave", function() {
    $("#popup-menu").removeClass("show");
});

$(window).on("click", function(event) {
    if (!$(event.target).closest("#floating-button").length && !$(event.target).closest("#popup-menu").length) {
        $("#popup-menu").removeClass("show");
    }
});

$("#btn-download-pdf").on("click", function() {
    downloadPDF();
});

const downloadPDF = () => {
    $("#floating-button").hide();
    
    $("#overlay").css("display", "flex");
    $("#message").text("Generating PDF...");

    const element = document.querySelector('.container');
    
    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV_Eng.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1200 },
        jsPDF:        { unit: 'mm', format: [291, 385], orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        $("#message").text("Download complete!");
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 1500);
    }).catch(err => {
        console.error("Error generating PDF:", err);
        $("#message").text("Error generating PDF.");
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 2000);
    });
};

$("#btn-spanish").on("click", function() {
    window.location.href = "index.html";
});

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
    $("#message").text("Generando PDF de tu CV...");

    const element = document.querySelector('.container');
    
    // Guardamos el ancho original
    const originalWidth = element.style.width;
    // Forzamos 1100px para garantizar la vista de escritorio perfecta
    element.style.width = '1100px';
    
    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1200 },
        // Tamaño en pulgadas (11.5 x 17.5 pulgadas = ~1100 x 1680 píxeles). Ideal para la vista actual.
        jsPDF:        { unit: 'in', format: [11.5, 17.5], orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        $("#message").text("¡Descarga completada!");
        // Restauramos el ancho
        element.style.width = originalWidth;
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 1500);
    }).catch(err => {
        console.error("Error al generar PDF:", err);
        $("#message").text("Error al generar el PDF.");
        element.style.width = originalWidth;
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 2000);
    });
};

$("#btn-english").on("click", function() {
    window.location.href = "index.eng.html";
});

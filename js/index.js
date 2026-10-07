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
    
    // Calculamos la proporción exacta del contenedor para que encaje en 1 sola página
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const ratio = height / width;
    
    // Fijamos el ancho estándar (ej. 210mm) y calculamos el alto proporcional
    const pdfWidth = 210; 
    const pdfHeight = pdfWidth * ratio;

    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        $("#message").text("¡Descarga completada!");
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 1500);
    }).catch(err => {
        console.error("Error al generar PDF:", err);
        $("#message").text("Error al generar el PDF.");

        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 2000);
    });
};

$("#btn-english").on("click", function() {
    window.location.href = "index.eng.html";
});

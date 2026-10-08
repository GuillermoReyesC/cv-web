$(document).ready(function() {
    // Animación de las barras de progreso al cargar
    setTimeout(() => {
        $('.percent div').each(function() {
            let width = $(this).attr('data-width');
            $(this).css('width', width);
        });
    }, 300);
});

// Mostrar/ocultar el popup al hacer clic o hover
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

// Función para descargar el PDF dinámicamente
$("#btn-download-pdf").on("click", function() {
    downloadPDF();
});

const downloadPDF = () => {
    // Ocultar botón flotante para que no aparezca en el PDF
    $("#floating-button").hide();
    
    // Mostrar overlay de carga
    $("#overlay").css("display", "flex");
    $("#message").text("Generating PDF...");

    const element = document.querySelector('.container');
    
    // Guardamos estilos
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;

    // Forzamos 1100px para que el DOM se acomode como en PC y podamos medir la altura real
    element.style.width = '1100px';
    element.style.maxWidth = '1100px';

    const canvasWidth = 1100;
    const canvasHeight = element.offsetHeight;
    
    // jsPDF funciona perfecto con puntos (pt). 1 pixel CSS = 0.75 puntos.
    // Le sumamos 20px de margen inferior al canvasHeight para asegurar que nada rebase la página.
    const pdfWidth = canvasWidth * 0.75;
    const pdfHeight = (canvasHeight + 20) * 0.75;

    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV_Eng.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1100 },
        jsPDF:        { unit: 'pt', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
    };

    // Usar html2pdf
    html2pdf().set(opt).from(element).save().then(() => {
        $("#message").text("Download complete!");
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 1500);
    }).catch(err => {
        console.error("Error generating PDF:", err);
        $("#message").text("Error generating PDF.");
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
        
        setTimeout(() => {
            $("#overlay").hide();
            $("#floating-button").show();
        }, 2000);
    });
};

// Función de "Traducir" al español
$("#btn-spanish").on("click", function() {
    window.location.href = "index.html";
});

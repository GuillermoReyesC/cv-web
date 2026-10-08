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
    
    // Guardamos los estilos originales
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    const originalMargin = element.style.margin;

    // Forzamos la vista de escritorio y quitamos márgenes para evitar recortes en html2canvas
    element.style.width = '1100px';
    element.style.maxWidth = '1100px';
    element.style.margin = '0';

    // Damos un pequeño respiro al navegador para aplicar los estilos
    setTimeout(() => {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const ratio = height / width;
        
        const pdfWidth = 210;
        const pdfHeight = pdfWidth * ratio;

        const opt = {
            margin:       0,
            filename:     'Guillermo_Reyes_CV_Eng.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2, useCORS: true, windowWidth: 1100 },
            jsPDF:        { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            $("#message").text("Download complete!");
            
            // Restauramos los estilos
            element.style.width = originalWidth;
            element.style.maxWidth = originalMaxWidth;
            element.style.margin = originalMargin;

            setTimeout(() => {
                $("#overlay").hide();
                $("#floating-button").show();
            }, 1500);
        }).catch(err => {
            console.error("Error generating PDF:", err);
            $("#message").text("Error generating PDF.");

            element.style.width = originalWidth;
            element.style.maxWidth = originalMaxWidth;
            element.style.margin = originalMargin;
            
            setTimeout(() => {
                $("#overlay").hide();
                $("#floating-button").show();
            }, 2000);
        });
    }, 100);

};

// Función de "Traducir" al español
$("#btn-spanish").on("click", function() {
    window.location.href = "index.html";
});

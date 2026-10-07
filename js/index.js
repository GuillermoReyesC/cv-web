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
    $("#message").text("Generando PDF de tu CV...");

    const element = document.querySelector('.container');
    
    // Tomamos las dimensiones exactas del contenedor para exportarlo en 1 sola página continua
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const opt = {
        margin:       0, // Margen 0
        filename:     'Guillermo_Reyes_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // scale 2 mejora la calidad
        jsPDF:        { unit: 'px', format: [width, height], orientation: 'portrait' }
    };

    // Usar html2pdf
    html2pdf().set(opt).from(element).save().then(() => {
        // Al terminar:
        $("#message").text("¡Descarga completada!");
        
        setTimeout(() => {
            $("#overlay").hide();
            // Restaurar botón flotante
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

// Función de "Traducir"
$("#btn-english").on("click", function() {
    window.location.href = "index.eng.html";
});

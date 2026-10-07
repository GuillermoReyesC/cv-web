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
    
    // Obtenemos las dimensiones en pixeles
    const w_px = element.offsetWidth;
    const h_px = element.offsetHeight;

    // jsPDF es muy estable con milímetros. Convertimos los píxeles a mm (1 px = 0.264583 mm)
    // Le damos un margen pequeñísimo extra de alto para que no haya desbordamiento
    const w_mm = w_px * 0.264583;
    const h_mm = (h_px + 20) * 0.264583;

    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: [w_mm, h_mm], orientation: 'portrait' }
    };

    // Usar html2pdf
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

// Función de "Traducir"
$("#btn-english").on("click", function() {
    window.location.href = "index.eng.html";
});

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
    
    // Configurar html2pdf usando el tamaño real sin alterar el DOM de forma destructiva
    const opt = {
        margin:       [10, 0, 10, 0], // Margen arriba y abajo
        filename:     'Guillermo_Reyes_CV_Eng.pdf',
        image:        { type: 'jpeg', quality: 1 },
        // windowWidth fuerza la vista de escritorio para que nunca se tome la versión móvil
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1200 },
        // Creamos una página personalizada que se adapta a la altura del contenido
        jsPDF:        { unit: 'px', format: [1200, element.scrollHeight + 50], orientation: 'portrait' }
    };

    // Usar html2pdf
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

// Función de "Traducir" al español
$("#btn-spanish").on("click", function() {
    window.location.href = "index.html";
});

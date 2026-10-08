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
    
    // Obtenemos la proporción real de escritorio SIN modificar el DOM visible
    // Esto previene que se rompa el PDF por recortes de la ventana.
    const clone = element.cloneNode(true);
    clone.style.width = '1100px';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.visibility = 'hidden';
    document.body.appendChild(clone);
    
    // Obtenemos el ratio exacto del diseño de PC
    const ratio = clone.offsetHeight / clone.offsetWidth;
    document.body.removeChild(clone);

    // Usamos el ancho estandar de A4 (210mm) y multiplicamos por el ratio
    // Esto garantiza 1 sola página escalada proporcionalmente.
    const pdfWidth = 210;
    const pdfHeight = pdfWidth * ratio;

    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV_Eng.pdf',
        image:        { type: 'jpeg', quality: 1 },
        // Forzamos html2canvas a renderizar el diseño de PC
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1100 },
        jsPDF:        { unit: 'mm', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
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

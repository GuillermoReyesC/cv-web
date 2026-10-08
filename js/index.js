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

    const originalElement = document.querySelector('.container');
    
    // Creamos un wrapper oculto que fuerza la vista PC desde el eje X=0
    // Esto garantiza que html2canvas no recorte ni la izquierda ni la derecha.
    const cloneWrapper = document.createElement('div');
    cloneWrapper.style.position = 'absolute';
    cloneWrapper.style.top = '0';
    cloneWrapper.style.left = '0';
    cloneWrapper.style.width = '1100px';
    cloneWrapper.style.zIndex = '-9999';
    cloneWrapper.style.background = '#e9ecef'; 

    const clone = originalElement.cloneNode(true);
    clone.style.margin = '0'; // Quita el centrado automático para evitar desfases
    clone.style.width = '1100px';
    clone.style.maxWidth = '1100px';
    
    cloneWrapper.appendChild(clone);
    document.body.appendChild(cloneWrapper);

    const opt = {
        margin:       0,
        filename:     'Guillermo_Reyes_CV.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, windowWidth: 1100 }
    };

    // Usamos el API de promesas de html2pdf para capturar el canvas EXACTO
    html2pdf()
        .set(opt)
        .from(clone)
        .toCanvas()
        .get('canvas')
        .then((canvas) => {
            // El canvas tiene las medidas precisas renderizadas.
            const widthPx = canvas.width / 2;
            const heightPx = canvas.height / 2;
            
            // Creamos un PDF del tamaño exacto en pixeles (esto EVITA la paginación a 2 hojas)
            return html2pdf().set({
                margin: 0,
                filename: 'Guillermo_Reyes_CV.pdf',
                image: { type: 'jpeg', quality: 1 },
                jsPDF: { unit: 'px', format: [widthPx, heightPx], orientation: 'portrait' }
            }).from(canvas).save();
        })
        .then(() => {
            document.body.removeChild(cloneWrapper);
            $("#message").text("¡Descarga completada!");
            setTimeout(() => {
                $("#overlay").hide();
                $("#floating-button").show();
            }, 1500);
        })
        .catch(err => {
            console.error("Error al generar PDF:", err);
            document.body.removeChild(cloneWrapper);
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

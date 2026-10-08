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
    $("#floating-button").hide();
    $("#overlay").css("display", "flex");
    $("#message").text("Generating PDF.");

    const element = document.querySelector('.container');

    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;
    const originalMargin = element.style.margin;

    const restore = () => {
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
        element.style.margin = originalMargin;
    };

    element.style.width = '1100px';
    element.style.maxWidth = '1100px';
    element.style.margin = '0';
    window.scrollTo(0, 0);

    setTimeout(() => {
        const opt = {
            html2canvas: {
                scale: 2,
                useCORS: true,
                windowWidth: 1100,
                scrollX: 0,
                scrollY: 0
            }
        };

        let canvas;

        html2pdf().set(opt).from(element)
            .toCanvas().get('canvas').then(c => { canvas = c; })
            .toPdf().get('pdf').then(tmp => {
                const pdf = new tmp.constructor({ unit: 'mm', format: 'a4', orientation: 'portrait' });

                const pageW = 210, pageH = 297;
                const scale = Math.min(pageW / canvas.width, pageH / canvas.height);
                const w = canvas.width * scale;
                const h = canvas.height * scale;
                const x = (pageW - w) / 2;

                pdf.addImage(canvas.toDataURL('image/jpeg', 1), 'JPEG', x, 0, w, h);
                pdf.save('Guillermo_Reyes_CV.pdf');
            })
            .then(() => {
                $("#message").text("Download Complete!");
                restore();
                setTimeout(() => {
                    $("#overlay").hide();
                    $("#floating-button").show();
                }, 1500);
            })
            .catch(err => {
                console.error("Error generating PDF:", err);
                $("#message").text("Error generating PDF.");
                restore();
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

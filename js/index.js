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
    
    const cloneWrapper = document.createElement('div');
    cloneWrapper.style.position = 'fixed';
    cloneWrapper.style.top = '0';
    cloneWrapper.style.left = '0';
    cloneWrapper.style.width = '1100px';
    cloneWrapper.style.zIndex = '1';
    cloneWrapper.style.background = '#fff';
        
    const clone = originalElement.cloneNode(true);
    clone.style.margin = '0';
    clone.style.width = '1100px';
    clone.style.maxWidth = '1100px';
    clone.style.gridTemplateColumns = '1fr 2.2fr';
    clone.querySelectorAll('.about .box').forEach(box => {
        box.style.flexDirection = 'row';
    });
    clone.querySelectorAll('.interest ul').forEach(list => {
        list.style.gridTemplateColumns = 'repeat(3, 1fr)';
    });
    cloneWrapper.appendChild(clone);
    document.body.appendChild(cloneWrapper);

    const removeClone = () => {
        if (cloneWrapper.parentNode) {
            cloneWrapper.parentNode.removeChild(cloneWrapper);
        }
    };

    Promise.all([
        document.fonts.ready,
        ...Array.from(clone.querySelectorAll('img'), image => image.decode())
    ])
        .then(() => {
            const width = Math.ceil(clone.getBoundingClientRect().width);
            const height = Math.max(clone.scrollHeight, clone.getBoundingClientRect().height);

            return window.html2canvas(clone, {
                scale: 1.5,
                useCORS: true,
                width,
                windowWidth: width,
                windowHeight: height,
                scrollX: 0,
                scrollY: 0
            }).then(canvas => {
                    const JsPDF = window.jspdf?.jsPDF;
                    if (!JsPDF) {
                        throw new Error('No se encontró jsPDF en html2pdf.bundle.');
                    }

                    const pageWidthMm = 210;
                    const pageHeightMm = pageWidthMm * canvas.height / canvas.width;
                    const pdf = new JsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: [pageWidthMm, pageHeightMm]
                    });

                    pdf.addImage(
                        canvas.toDataURL('image/jpeg', 0.95),
                        'JPEG',
                        0,
                        0,
                        pageWidthMm,
                        pageHeightMm
                    );
                    pdf.save('Guillermo_Reyes_CV.pdf');
                });
        })
        .then(() => {
            removeClone();
            $("#message").text("¡Descarga completada!");
            setTimeout(() => {
                $("#overlay").hide();
                $("#floating-button").show();
            }, 1500);
        })
        .catch(err => {
            console.error("Error al generar PDF:", err);
            removeClone();
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

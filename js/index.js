$(document).ready(function() {
   
});

/**funciones del boton y sdel popup de la descarga */
 // Mostrar/ocultar el popup al hacer clic en el botón flotante
 $("#floating-button").on("click", function() {
    $("#popup-menu").css("display", $("#popup-menu").css("display") === "flex" ? "none" : "flex");
});

// Mostrar el popup al hacer hover sobre el botón flotante
$("#floating-button").on("mouseenter", function() {
    $("#popup-menu").css("display", "flex");
});


// Ocultar el popup cuando se quita el hover del menú
$("#popup-menu").on("mouseleave", function() {
    $("#popup-menu").css("display", "none");
});



// Ocultar el menú si el usuario hace clic fuera de él
$(window).on("click", function(event) {
    if (!$(event.target).closest("#floating-button").length && !$(event.target).closest("#popup-menu").length) {
        $("#popup-menu").css("display", "none");
    }
});

// Función de "Descargar PDF"
$("#btn-download-pdf").on("click", function() {
    downloadPDF();
});
// Función para descargar el PDF
const downloadPDF = () => {
    const pdfUrl = "https://drive.google.com/uc?export=download&id=1S9ELqg7LgT9mUJHijJVyOIk8W8QDrLCc";
   
    // Mostrar el overlay con el mensaje de descarga
    $("#overlay").show();
    $("#message").text("Descargando, espere un momento...");
    
    // Redirigir al enlace de descarga
    window.location.href = pdfUrl;
    
    // Cambiar el mensaje a "Listo!" cuando la descarga inicie
    setTimeout(() => {
        $("#message").text("Listo!");
    }, 2000); // Cambiar el texto después de 2 segundos (puedes ajustarlo)
    
    // Ocultar el overlay después de 3 segundos para dar tiempo al mensaje "Listo!"
    setTimeout(() => {
        $("#overlay").hide();
    }, 3500); // 3 segundos después de que se muestra el mensaje "Listo!"
};


// Función de "Traducir" (placeholder)
$("#btn-english").on("click", function() {
    EnglishMode()
});
const EnglishMode = () =>{
    window.location.href = "index.eng.html";
};



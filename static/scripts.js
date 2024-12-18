document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = document.getElementById('data').value;
    const qrImage = document.getElementById('generatedQr');
    
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'data': data
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Código QR';
        document.getElementById('qrResult').innerHTML = '';
        document.getElementById('qrResult').appendChild(img);
        
        // Crear un enlace para descargar la imagen
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'codigo_qr.png';
        downloadLink.innerText = 'Descargar Código QR';
        downloadLink.className = 'btn btn-success mt-2';
        document.getElementById('qrResult').appendChild(downloadLink);
        
        // Crear botón para compartir
        //const shareButton = document.createElement('button');
        //shareButton.innerText = 'Compartir Código QR';
        //shareButton.className = 'btn btn-info mt-2 ml-2';
        shareButton.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Código QR',
                    text: 'Aquí está el código QR generado.',
                    url: img.src
                }).then(() => {
                    console.log('Compartido con éxito');
                }).catch((error) => {
                    console.error('Error al compartir:', error);
                });
            } else {
                alert('La función de compartir no está disponible en este navegador.');
            }
        });
        document.getElementById('qrResult').appendChild(shareButton);
    })
    .catch(error => console.error('Error:', error));

    // Validar el tipo de datos ingresados
    if (data.startsWith('http://') || data.startsWith('https://')) {
        // URL
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;
    } else if (data.startsWith('BEGIN:VCARD')) {
        // vCard
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;
    } else {
        // Texto simple
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=200x200`;
    }

    // Mostrar la ventana modal
    $('#qrModal').modal('show');
});

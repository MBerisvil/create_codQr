document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const data = document.getElementById('data').value;
    
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
    })
    .catch(error => console.error('Error:', error));
});
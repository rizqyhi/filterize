var result = document.querySelector('.result'),
    preview = document.querySelector('.result img'),
    reader = new FileReader(),
    imgWidth = 0,
    imgHeight = 0,
    ratio = 1;
  
reader.addEventListener('load', function() {
  preview.src = reader.result

  preview.onload = function() {
    imgWidth = this.naturalWidth;
    imgHeight = this.naturalHeight;
    ratio = this.naturalWidth / this.width;
    
    result.style.width = imgWidth + 'px'
  }
}, false);

// Listener ketika file dipilih
function previewFile(e) {
  var file = e.target.files[0]
      
  if (file) {
    result.className = 'result';
    reader.readAsDataURL(file);
  }
}

// Listener ketika tombol filter diklik
function applyFilter(e) {
  result.className = 'result ' + e.target.id
}

// Listener ketika tombol reset diklik
function resetFilter() {
  result.className = 'result'
}

// Listener ketika tombol download diklik
function downloadImage() {
  if (!preview.src) alert('Choose image first');
  
  var options = {
    quality: 0.9,
    width: imgWidth,
    height: imgHeight,
    style: {
      transform: 'scale('+ratio+')',
      transformOrigin: 'top left'
    }
  }
  
  domtoimage.toJpeg(result, options)
    .then(function(dataUrl) {
      var link = document.createElement('a')
      link.href = dataUrl;
      link.download = 'result.jpg';
      link.click();
    });
}
const imgInput = document.getElementById("img-input");
const label = document.getElementById("img-input-label");
const textInput = document.getElementById("text-input");
const downloadButton = document.getElementById("download");
const canvas = document.getElementById("canvas");
canvas.crossOrigin = "Anonymous";
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
const reader = new FileReader();
let bgImage;

const addText = e => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  addImage(bgImage);
  let text = e.target.value;
  ctx.font = "30px Helvetica";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = selectTextColor();
  ctx.fillText(text, canvas.width / 2, canvas.height - 80);
};

const selectTextColor = () => {
  let textColor = document.querySelector("input[name='color']:checked").value;
  return textColor;
};

const addImage = img => {
  if (img) {
    const width = document.body.offsetWidth * 0.7;
    const scale = width / img.width;
    canvas.width = width;
    canvas.height = img.height * scale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } else {
    false;
  }
};

const loadImage = async e => {
  reader.readAsDataURL(e.target.files[0]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const image = await new Promise((resolve, reject) => {
    reader.addEventListener("loadend", function(e) {
      const img = new Image();
      img.src = e.target.result;
      img.addEventListener("load", function(e) {
        resolve(img);
      });
    });
  });
  return image;
};

const handleDownload = () => {
  downloadButton.href = canvas.toDataURL();
  downloadButton.download = "myImg.png";
};

textInput.addEventListener("keyup", addText);

imgInput.addEventListener("change", function(e) {
  loadImage(e).then(img => {
    addImage(img);
    bgImage = img;
  });
});

downloadButton.addEventListener("click", handleDownload);

imgInput.addEventListener("mouseenter", function() {
  label.classList.add("hover");
});

imgInput.addEventListener("mouseleave", function() {
  label.classList.remove("hover");
});

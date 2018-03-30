const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStorage => {
      console.log(localMediaStorage);
      video.srcObject = localMediaStorage;
      video.play();
    })
    .catch(err => console.log(err));
}

function paintToCanvas() {
  const { videoWidth: width, videoHeight: height } = video;
  console.log(width, height);
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = chromaticAbberation(pixels);

    ctx.putImageData(pixels, 0, 0);
    ctx.globalAlpha = 0.2;
  }, 33);
}

function redEffect(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 100;
    pixels.data[i + 2] = pixels.data[i + 2] - 60;
  }

  return pixels;
}

function chromaticAbberation(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 180] = pixels.data[i + 0] + 60;
    pixels.data[i + 1] = pixels.data[i + 1];
    pixels.data[i - 180] = pixels.data[i + 2] + 60;
  }

  return pixels;
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("images/jpeg");
  const link = document.createElement("a");

  link.href = data;
  link.setAttribute("download", "Image");
  link.innerHTML = `<img src=${data} alt="MAN"/>`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas);

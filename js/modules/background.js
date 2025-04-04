export function getRandomLocalImage() {
  const localImages = [
    "../img/img1.jpg",
    "../img/img2.jpg",
    "../img/img3.jpg",
    "../img/img4.jpg",
  ];
  return localImages[Math.floor(Math.random() * localImages.length)];
}

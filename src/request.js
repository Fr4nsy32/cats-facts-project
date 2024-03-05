export async function fetchFacts(page) {
  const response = await fetch(`https://catfact.ninja/facts?page=${page}`);
  const resData = await response.json();

  return resData.data;
}

export function getRandomNumber() {
  const min = 100;
  const max = 1000;
  const interval = 50;

  const range = (max - min) / interval;
  const randomIndex = Math.floor(Math.random() * range);
  const randomNumber = min + randomIndex * interval;

  return randomNumber;
}

export function getFactImage() {
  const urlImages = [];
  for (let i = 0; i < 10; i++) {
    const urlPhoto = `https://placekitten.com/${getRandomNumber()}/${getRandomNumber()}`;
    urlImages.push(urlPhoto);
  }
  return urlImages[Math.floor(Math.random() * urlImages.length)];
}

import Ascii from "./ascii.ts";

function chooseRandomItem<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function logItem<T>(array: T[]): void {
  console.log(chooseRandomItem(array));
}

function invertAvatar(): void {
  const avatar = document.querySelector(".avatar") as HTMLImageElement;

  if (avatar) {
    avatar.addEventListener("click", () => {
      avatar.classList.toggle("is-inverted");
    });
  }
}

logItem(Ascii);
invertAvatar();

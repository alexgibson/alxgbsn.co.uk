import Ascii from "./ascii.ts";

function chooseAscii(Ascii: string[]): string {
  const index = Math.floor(Math.random() * Ascii.length);
  return Ascii[index];
}

function render(Ascii: string[]): void {
  console.log(chooseAscii(Ascii));
}

function invertAvatar(): void {
  const avatar = document.querySelector(".avatar") as HTMLImageElement;

  if (avatar) {
    avatar.addEventListener("click", () => {
      avatar.classList.toggle("is-inverted");
    });
  }
}

render(Ascii);
invertAvatar();

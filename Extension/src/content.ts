let interval: number;

interval = setInterval(() => {
  minimizeSelfView();
}, 1000);

async function minimizeSelfView() {
  const menuButtonResults = document.querySelectorAll(
    'button[aria-label="More options"]'
  );
  const menuButtons = Array.from(menuButtonResults) as HTMLButtonElement[];
  if (menuButtons.length !== 2) return;

  const minMenu = menuButtons[0];
  minMenu.click();
  await sleep(1000);

  const listItemResults = document.querySelectorAll('li');
  const listItems = Array.from(listItemResults) as HTMLLIElement[];
  const minimizeButton = listItems.find(
    listItem => listItem.textContent?.trim() === 'close_fullscreenMinimize'
  );
  if (!minimizeButton) return;
  minimizeButton.click();

  clearInterval(interval);
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

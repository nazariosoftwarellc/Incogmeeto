setInterval(() => {
  main();
}, 1000);

let minimizingInProgress = false;
let alreadyMinimizedSelfInCurrentCall = false;

async function main() {
  const inCall = checkIfInCall();
  if (inCall && !minimizingInProgress && !alreadyMinimizedSelfInCurrentCall) {
    minimizingInProgress = true
    await minimizeSelfView();
    minimizingInProgress = false;
  }
}

function checkIfInCall(): boolean {
  const leaveCallButton = document.querySelector(
    'button[aria-label="Leave call"]'
  ) as HTMLButtonElement | null;
  return Boolean(leaveCallButton);
}

async function minimizeSelfView() {
  const menuButtons = Array.from(document.querySelectorAll(
    'button[aria-label="More options"]'
  )) as HTMLButtonElement[];
  if (menuButtons.length < 2) return;

  const selfViewMenu = menuButtons[menuButtons.length - 2];
  selfViewMenu.click();

  await sleep(1000);

  const listItems = Array.from(document.querySelectorAll('li')) as HTMLLIElement[];
  const minimizeButton = listItems.find(
    listItem => listItem.textContent?.trim() === 'close_fullscreenMinimize'
  );
  if (!minimizeButton) return;
  minimizeButton.click();
  alreadyMinimizedSelfInCurrentCall = true;
  window.onbeforeunload = () => {
    alreadyMinimizedSelfInCurrentCall = false;
  };

  await sleep(1000);

  const closeButton = document.querySelector(
    'button[aria-label="Close"]'
  ) as HTMLButtonElement | null;
  if (closeButton) {
    closeButton.click();
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

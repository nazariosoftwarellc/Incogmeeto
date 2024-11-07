setInterval(() => {
  main();
}, 1000);

let minimizingInProgress = false;
let alreadyMinimizedSelfInCurrentCall = false;

async function main() {
  const inCall = checkIfInCall();
  if (inCall && !minimizingInProgress && !alreadyMinimizedSelfInCurrentCall) {
    minimizingInProgress = true;
    await minimizeSelfView();
    minimizingInProgress = false;
  }
}

function checkIfInCall(): boolean {
  const buttons = Array.from(
    document.querySelectorAll('button')
  ) as HTMLButtonElement[];
  const leaveCallButton = buttons.find(
    button => button.textContent?.trim() === 'call_end'
  );
  return Boolean(leaveCallButton);
}

async function minimizeSelfView() {
  let buttons = Array.from(
    document.querySelectorAll('button')
  ) as HTMLButtonElement[];
  const menuButtons = buttons.filter(
    button => button.textContent?.trim() === 'more_vert'
  );
  if (menuButtons.length < 2) return;

  const selfViewMenu = menuButtons[menuButtons.length - 2];
  selfViewMenu.click();

  await sleep(1000);

  const listItems = Array.from(
    document.querySelectorAll('li')
  ) as HTMLLIElement[];
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

  buttons = Array.from(
    document.querySelectorAll('button')
  ) as HTMLButtonElement[];
  const closeButton = buttons.find(
    button => button.textContent?.trim() === 'close'
  );
  if (closeButton) {
    closeButton.click();
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

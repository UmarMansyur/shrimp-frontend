import { ref } from 'vue';
declare const bootstrap: any;

const isSm = ref(false);
const toggleMenu = () => {
  if (window.innerWidth > 794) {
    if (document.documentElement.getAttribute('data-sidebar-size') === 'lg') {
      document.documentElement.setAttribute('data-sidebar-size', 'sm');
    } else {
      document.documentElement.setAttribute('data-sidebar-size', 'lg');
    }
    isSm.value = !isSm.value;
  } else {
    document.body.classList.add('twocolumn-panel');
    document.body.classList.add('vertical-sidebar-enable');
  }
};
const isFullScreen = ref(true);

function makeFullScreen() {
  const element: any = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  isFullScreen.value = !isFullScreen.value;
}

const exitFullScreen = () => {
  const element: any = document.documentElement;
  if (element.requestFullscreen) {
    document.exitFullscreen();
  } else if (element.webkitRequestFullscreen) {
    document.exitFullscreen();
  } else if (element.mozRequestFullScreen) {
    document.exitFullscreen();
  } else if (element.msRequestFullscreen) {
    document.exitFullscreen();
  }
  isFullScreen.value = !isFullScreen.value;
}

const handleTheme = () => {
  const element: any = document.documentElement;
  if(element.getAttribute('data-bs-theme') === 'dark') {
    element.setAttribute('data-bs-theme', 'light');
  } else {
    element.setAttribute('data-bs-theme', 'dark');
  }
}

const carousels = (id: string) => {
  new bootstrap.Carousel(document.getElementById(id), {
    interval: 3000,
    pause: false
  })
}

const togglePassword = () => {
  let passwordInput: any = document.querySelector('#password-input');
  if(passwordInput.type == 'text') {
    passwordInput.type = 'password';
  } else {
    passwordInput.type = 'text';
  }

}

function navActiveSelection(el: any, position: string, isNext?: boolean) {
  const tabActive: any = document.querySelector(el);
  const tabActivePosition = tabActive.getAttribute('data-position');
  const tabPosition: any = isNext ? parseInt(tabActivePosition) + 1 : parseInt(tabActivePosition) - 1;
  const tab: any = document.querySelector(position + `[data-position="${tabPosition}"]`);


  tabActive.classList.remove('active', 'done');
  tabActive.classList.add('done');
  tabActive.setAttribute('aria-selected', 'false');
  tabActive.setAttribute('tabindex', '-1');
  tab.classList.add('active', 'show');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
}

const next = () => {
  navActiveSelection('button.nav-link.active', 'button', true);
  navActiveSelection('.tab-pane.fade.active.show', '.tab-pane.fade', true);
};
const prev = () => {
  navActiveSelection('button.nav-link.active', 'button', false);
  navActiveSelection('.tab-pane.fade.active.show', '.tab-pane.fade', false);
};

export {
  isSm,
  toggleMenu,
  isFullScreen,
  makeFullScreen,
  exitFullScreen,
  handleTheme,
  carousels,
  togglePassword,
  next,
  prev,
  navActiveSelection
};
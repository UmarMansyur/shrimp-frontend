import { ref } from 'vue';

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


export {
  isSm,
  toggleMenu,
  isFullScreen,
  makeFullScreen,
  exitFullScreen,
  handleTheme
};
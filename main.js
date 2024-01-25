//宣言
const ua = new UAParser();

//ブラウザ情報取得
const browser = ua.getBrowser();

console.log(ua.os.name);

const handleIOSDeepLink = () => {
  // 
  if (ua.browser.name === 'Mobile Safari') {
    alert('Mobile Safari!!');
    return
  }
  // 
  if (window.opener) {
    // Check if the page was opened by another app (e.g. Gmail, Teams)
    window.close();
    return;
  }
  const openedApp = window.open('https://view.secomsights.com/login', '_blank');
  const checkAppInForeground = () => {
    if (document.hidden) {
      // Show App Store by URL
      location.href = 'https://apps.apple.com/jp/app/secom-sights/id6463053242';
    } else if (openedApp && !openedApp.closed) {
      // If the application is available, open it and close tab
      openedApp.close();
    }
  };
  // Check if the app is in the foreground every 100 milliseconds
  const checkInterval = setInterval(checkAppInForeground, 100);
  // Clear the interval after a certain duration
  const timeoutDuration = 5000; // Adjust the duration as needed
  setTimeout(() => {
    clearInterval(checkInterval);
  }, timeoutDuration);
};

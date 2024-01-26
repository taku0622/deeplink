//宣言
const ua = new UAParser();

//ブラウザ情報取得
const browser = ua.getBrowser();

console.log(browser.name);

const handleIOSDeepLink = () => {
  if (browser.name === 'Mobile Safari') {
    // リンクをクリック
    const openedApp = window.open('https://view.secomsights.com/login', '_blank');
    if (openedApp) {
      // webで遷移してしまう場合(≒アプリなし)、ストアへ遷移
      openedApp.close();
      location.href = 'https://apps.apple.com/jp/app/secom-sights/id6463053242';
    }
  }
  const openedApp = window.open('https://view.secomsights.com/login', '_blank');
  const checkAppInForeground = () => {
    if (document.hidden) {
      // ストアへ遷移
      location.href = 'https://apps.apple.com/jp/app/secom-sights/id6463053242';
    } else if (openedApp && !openedApp.closed) {
      // アプリが利用可能な場合、アプリを開いてタブを閉じます
      openedApp.close();
    }
  };
  // アプリがフォアグラウンドにあるか100ミリ秒ごとに確認します
  const checkInterval = setInterval(checkAppInForeground, 100);
  // 一定時間経過後にインターバルを取り消す
  const timeoutDuration = 5000; // 必要に応じて時間調整
  setTimeout(() => {
    clearInterval(checkInterval);
  }, timeoutDuration);
};

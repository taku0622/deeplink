//宣言
const ua = new UAParser();

const handleIOSDeepLink = () => {
  //ブラウザ情報取得
  const browser = ua.getBrowser();

  // ユーザアプリを開く(アプリ or 新規ウィンドウ)
  const openedWindow = window.open('https://view.secomsights.com/login', '_blank');

  // safariのみ対応が異なるので分岐
  if (browser.name === 'Mobile Safari') {
    if (openedWindow) {
      // 新規ウィンドウに遷移してしまう場合(≒アプリなし)、アプリストアへ遷移
      openedWindow.close();
      location.href = 'https://apps.apple.com/jp/app/secom-sights/id6463053242';
    }
    return;
  }
  // safari以外
  const checkAppInForeground = () => {
    if (document.hidden) {
      // アプリなしの場合、アプリストアへ遷移
      location.href = 'https://apps.apple.com/jp/app/secom-sights/id6463053242';
    } else if (openedWindow && !openedWindow.closed) {
      // アプリありの場合、アプリを開いてタブを閉じます
      openedWindow.close();
    }
  };
  // アプリがフォアグラウンドにあるか100ミリ秒ごとに確認
  const checkInterval = setInterval(checkAppInForeground, 100);
  // 一定時間経過後にインターバルを取り消す
  const timeoutDuration = 5000; // 必要に応じて時間調整
  setTimeout(() => {
    clearInterval(checkInterval);
  }, timeoutDuration);
};

location.href = "https://view.secomsights.com/login";
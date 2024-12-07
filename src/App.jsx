import React, { useState } from 'react';
import axios from 'axios';
import './a.css';  // CSSファイルをインポート

const omikujiResults = [
  "大吉",
  "吉",
  "中吉",
  "小吉",
  "凶",
  "大凶"
];

const App = () => {
  const [result, setResult] = useState(''); // おみくじの結果
  const [dogImage, setDogImage] = useState(''); // 犬画像のURL
  const [loading, setLoading] = useState(false); // 読み込み中の状態
  const [isCentered, setIsCentered] = useState(true); // コンテンツを中央にするかどうか

  // おみくじを引く関数
  const handleOmikuji = async () => {
    setLoading(true);
    setResult('');
    setDogImage('');
    setIsCentered(true); // おみくじを引いた後は中央に配置

    try {
      // ランダムにおみくじ結果を選ぶ
      const randomResult = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
      setResult(randomResult);

      // 犬画像を取得するAPIリクエスト
      const response = await axios.get('https://random.dog/woof.json');
      setDogImage(response.data.url); // 取得した犬画像のURLをセット
    } catch (error) {
      console.error('エラーが発生しました:', error);
    } finally {
      setLoading(false);
    }

    // 5秒後に元の位置に戻す
    setTimeout(() => {
      setIsCentered(false); // 5秒後に位置を元に戻す
    }, 5000); // 5000ms = 5秒
  };

  return (
    <div className={`container ${isCentered ? 'centered' : ''}`}>
      <h1>おみくじ</h1>
      <button onClick={handleOmikuji} disabled={loading}>
        {loading ? '読み込み中...' : 'おみくじを引く'}
      </button>
      {result && <p>結果: {result}</p>}
      {dogImage && <img src={dogImage} alt="犬の画像" />}
      <footer>
        <p>氏名: [小原楓雅]</p>
        <p>学生証番号: [5423081]</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import axios from 'axios';

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

  // おみくじを引く関数
  const handleOmikuji = async () => {
    setLoading(true);
    setResult('');
    setDogImage('');  // 犬画像URLも初期化
    try {
      // ランダムにおみくじ結果を選ぶ
      const randomResult = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
      setResult(randomResult);

      // 犬画像を取得するAPIリクエスト
      const response = await axios.get('https://random.dog/woof.json'); // 犬画像API
      setDogImage(response.data.url); // 取得した犬画像のURLをセット
    } catch (error) {
      console.error('エラーが発生しました:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>おみくじ</h1>
      <button onClick={handleOmikuji} disabled={loading}>
        {loading ? '読み込み中...' : 'おみくじを引く'}
      </button>
      {result && <p>結果: {result}</p>}
      {dogImage && <img src={dogImage} alt="犬の画像" style={{ width: '300px', marginTop: '20px' }} />}
      <footer>
        <p>氏名: [自分の名前]</p>
        <p>学生証番号: [学生証番号]</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </div>
  );
};

export default App;


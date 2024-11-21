import React, { useState } from 'react';

const omikujiResults = [
  "大吉",
  "吉",
  "中吉",
  "小吉",
  "凶",
  "大凶"
];

export default function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // おみくじを引く関数
  const handleOmikuji = () => {
    setLoading(true);
    // ランダムにおみくじ結果を選ぶ
    const randomResult = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
    setTimeout(() => {
      setResult(randomResult);
      setLoading(false);
    }, 1000); // 読み込み中の演出として1秒待つ
  };

  return (
    <div className="container">
      <h1>おみくじ</h1>
      <button onClick={handleOmikuji} disabled={loading}>
        {loading ? '読み込み中...' : 'おみくじを引く'}
      </button>
      <p>{result && `結果: ${result}`}</p>

      <footer>
        <p>氏名: [自分の名前]</p>
        <p>学生証番号: [学生証番号]</p>
        <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
      </footer>
    </div>
  );
}



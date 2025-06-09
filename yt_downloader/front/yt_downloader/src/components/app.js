import React, { useState } from "react";

const appStyle = {
  textAlign: "center",
  marginTop: "0px",
  backgroundImage: "url('/picture.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingRight: "1000px",
  justifyContent: "flex-start",
  color: "white", // Цвет текста для контраста
};

const rightSectionStyle = {
  position: "absolute",
  right: "100px",
  top: "100px",
  width: "500px",
};

const scrollBoxStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  height: "500px",
  overflowY: "scroll",
  marginTop: "10px",
};

function App() {
  const [singleInput, setSingleInput] = useState("");
  const [singleOutput, setSingleOutput] = useState(""); 
  
  const [scrollContent, setScrollContent] = useState([]);
  

  const handleSingleSubmit = async () => {
    try {
      const response = await fetch("http://argocd.k8s-23.sa/api/single/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: singleInput }),
      });
      setSingleInput("");

      const data = await response.json();
      setSingleOutput(data.response);
    } catch (error) {
      setSingleOutput("Ошибка при взаимодействии с сервером");
    }
  };
  
  const handleRightButtonClick = async () => {
    try {
      const response = await fetch("http://argocd.k8s-23.sa/api/history/");
      const data = await response.json();
      setScrollContent(data.history); // Обновляем список сообщений
    } catch (error) {
      setScrollContent(["Ошибка при запросе к серверу"]);
    }
  };

  return (
    <div style={appStyle}>
      <h1>Сохранение видео с YouTube</h1>

      {/* Одиночное поле */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="singleInput">Введите url-ссылку:</label><br />
        <input 
          type="text" 
          id="singleInput" 
          value={singleInput} 
          onChange={(e) => setSingleInput(e.target.value)} 
        />
      </div>
      <button onClick={handleSingleSubmit}>Скачать видео</button>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>{singleOutput}</div>
      
      {/* Правая секция с кнопкой и API-интерактивным полем вывода со скроллом */}
      <div style={rightSectionStyle}>
        <button onClick={handleRightButtonClick}>Отобразить историю url запросов</button>
        <div style={scrollBoxStyle}>
          {scrollContent.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

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
  color: "white",
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
   
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [doubleOutput, setDoubleOutput] = useState("");
  
  const [scrollContent, setScrollContent] = useState([]);
  

  const handleSingleSubmit = async () => {
    try {
      const response = await fetch("http://yt-downloader.k8s-23.sa/api/single/", {
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

  const handleDoubleSubmit = async () => {
    try {
      const response = await fetch("http://yt-downloader.k8s-23.sa/api/double/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first: firstInput, second: secondInput }),
      });
      setFirstInput("");
      setSecondInput("");

      const data = await response.json();
      setDoubleOutput(data.response);
    } catch (error) {
      setDoubleOutput("Ошибка при взаимодействии с сервером");
    }
  };
  
  const handleRightButtonClick = async () => {
    try {
      const response = await fetch("http://yt-downloader.k8s-23.sa/api/history/");
      const data = await response.json();
      setScrollContent(data.history);
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
      <button onClick={handleSingleSubmit}>Получить информацию о видео</button>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>{singleOutput}</div>

      {/* Два поля в ряд */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "30px" }}>
        <div>
          <label htmlFor="firstInput">Качество видео:</label><br />
          <input 
            type="text" 
            id="firstInput" 
            value={firstInput} 
            onChange={(e) => setFirstInput(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="secondInput">Качество аудио:</label><br />
          <input 
            type="text" 
            id="secondInput" 
            value={secondInput} 
            onChange={(e) => setSecondInput(e.target.value)} 
          />
        </div>
      </div>
      <button onClick={handleDoubleSubmit} style={{ marginTop: "20px" }}>Скачать</button>
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>{doubleOutput}</div>
      
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

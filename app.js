const WebSocket = require("ws");
const express = require("express");
const http = require("http");

// HTTP sunucusu oluştur
const app = express();
const server = http.createServer(app);

// WebSocket sunucusu başlat
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Yeni bir kullanıcı bağlandı!");

  ws.on("message", (message) => {
    // Mesajı metne dönüştür
    const textMessage = message.toString();
    console.log("Mesaj Gönderildi:", textMessage);

    // Mesajı diğer istemcilere gönder
    console.log("Mesaj Alındı");
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(textMessage); // Metin mesajını gönder
      }
    });
  });

  ws.on("close", () => {
    console.log("Bir kullanıcı bağlantıyı kapattı.");
  });
});

// HTTP sunucusunu dinlemeye başla
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(
    `Sunucu ${PORT} portunda çalışıyor... Zessenger Şuanda Kullanılabilir!`,
  );
});

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for generating sweet customizable notes for her 26th birthday
app.post("/api/sweet-note", async (req, res) => {
  try {
    const { messageType, customPrompt, nickname } = req.body;
    
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY no está configurada en el servidor. Por favor configúrala para habilitar el generador de deseos." 
      });
    }

    const ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    let systemPrompt = `Eres la personificación de la ternura. Eres el "generador mágico de felicidad" de un novio profundamente enamorado de su novia, FLOR LIHUE, que cumple 26 años el 17 de junio. 
Tu misión exclusiva de amor es redactar mensajes en español que sean sumamente dulces, alegres, poéticos, conmovedores y llenos de agradecimiento por su hermosa vida.
Usa constantemente apodos cariñosos como "Amor", "Amorcito", "linda", "Princesa", "Hermosa" y frases cariñosas como: "¡Me encantas!", "Te amo hasta la palmera, hasta el cielo 🌴🌌", "La Duque 🐾 te manda saludos y también te re ama", "Agradezco por tu vida, porque me hizo muy feliz desde que te conozco".
Haz énfasis en la felicidad de que cumpla sus hermosos 26 años. Háblale con ternura, alegría, colores pastel y calidez hogareña. Su novio la ama profundamente. No uses lenguaje frío, robótico ni formal. ¡Su nombre es Flor Lihue!`;

    let userPrompt = "";
    if (messageType === "fortune") {
      userPrompt = "Escribe una predicción/oráculo de amor para su año número 26. Que sea optimista, poético y muy romántico, diciéndole qué cosas maravillosas le esperan a nuestro lado este año.";
    } else if (messageType === "thanks") {
      userPrompt = "Escribe una carta de agradecimiento súper dulce y tierna. Da las gracias por su risa, por su existencia, por iluminar cada día, por ser una novia tan perfecta y por cada pequeño detalle de su vida.";
    } else if (messageType === "compliment") {
      userPrompt = "Escribe un halago poético y hermoso de cumpleaños. Resalta la belleza de su alma, la dulzura de su mirada, lo feliz que me hace verla cumplir un año más, y lo hermosa que está a sus flamantes 26 años.";
    } else {
      userPrompt = customPrompt ? `Escribe un mensaje en base al siguiente deseo de ella: "${customPrompt}". Transfórmalo en una bendición/carta de amor mágica e interactiva.` : "Escribe un saludo de cumpleaños increíble, dulce y alegre para sus 26 años.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 1.0,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error generating sweet note:", error);
    res.status(500).json({ error: error.message || "Error al generar el mensaje." });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} with environment ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();

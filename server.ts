import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the Google GenAI client securely on the server-side only
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Gift Matcher will run in fallback simulation mode.");
}

// AI Gift Matcher server-side proxy route
app.post("/api/gift-match", async (req, res) => {
  const { age, gender, interests, personality, loveLanguage, budget } = req.body;

  if (!ai) {
    // Elegant fallback simulation if no API key is set yet, ensuring the app remains 100% robust and doesn't crash
    console.log("Simulating Gift Match recommendations due to missing GEMINI_API_KEY");
    return res.json({
      giftStrategy: `Based on their love language (${loveLanguage || 'Quality Time'}) and personality, we recommend prioritizing custom experiences and sensory gifts.`,
      recommendedProducts: [
        { name: "Maison Noire - Ambre Nuit", reason: "Perfect match for a premium fragrance lover seeking high-end personality matches." },
        { name: "La Vie en Rose - Eternal Bouquet", reason: "An elegant floral arrangement conveying long-term thoughtfulness." }
      ],
      recommendedExperiences: [
        { name: "Couples Sanctuary Spa Ritual", reason: "An excellent way to fulfill their love language through dedicated time together." }
      ],
      recommendedGiftBox: {
        size: "premium",
        theme: "romantic",
        items: ["perfume", "flowers", "chocolate"],
        estimatedPrice: 158500
      },
      recommendedDecor: {
        name: "Enchanted Rose Canopy",
        reason: "Bespoke setup designed to create an immersive, stunning visual impact."
      }
    });
  }

  try {
    const prompt = `You are Lunara's senior luxury gifting matches planner.
Analyze the following recipient characteristics and generate highly personalized, premium recommendations.
Recipient details:
- Age: ${age || 'Any'}
- Gender: ${gender || 'Any'}
- Key Interests: ${interests || 'None specified'}
- Personality: ${personality || 'Warm & affectionate'}
- Love Language: ${loveLanguage || 'Acts of Service'}
- Gifting Budget (in Nigerian Naira ₦): ${budget || 'Flexible'}

Provide a structured recommendation for:
1. A descriptive gifting strategy (giftStrategy).
2. Recommended products from Lunara (recommendedProducts - array of objects with name and reason).
3. Recommended experiences (recommendedExperiences - array of objects with name and reason).
4. Recommended custom Curated Gift Box setup (recommendedGiftBox - object with size, theme, items, and estimatedPrice in numbers).
5. Recommended room decor themes (recommendedDecor - object with name and reason).

Focus on luxury, elegance, and unforgettable moments.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            giftStrategy: {
              type: Type.STRING,
              description: "A professional, warm, luxury gifting strategy advising on what makes this recipient smile."
            },
            recommendedProducts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING, description: "Why this product fits their interests or personality perfectly." }
                },
                required: ["name", "reason"]
              }
            },
            recommendedExperiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING, description: "Why this experience resonates with their love language." }
                },
                required: ["name", "reason"]
              }
            },
            recommendedGiftBox: {
              type: Type.OBJECT,
              properties: {
                size: { type: Type.STRING, description: "mini, standard, premium, or luxury" },
                theme: { type: Type.STRING, description: "romantic, birthday, friendship, self-care, luxury, or corporate" },
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Array of items: perfume, flowers, chocolate, notes, candles, plushies"
                },
                estimatedPrice: { type: Type.NUMBER }
              },
              required: ["size", "theme", "items", "estimatedPrice"]
            },
            recommendedDecor: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["name", "reason"]
            }
          },
          required: ["giftStrategy", "recommendedProducts", "recommendedExperiences", "recommendedGiftBox", "recommendedDecor"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini API");
    }

    const jsonResult = JSON.parse(resultText.trim());
    return res.json(jsonResult);

  } catch (error: any) {
    console.error("Gemini Matcher error:", error);
    res.status(500).json({ error: "Failed to generate AI recommendations", details: error.message });
  }
});

// AI Calligraphy card message generator route
app.post("/api/generate-card-message", async (req, res) => {
  const { recipientName, relationship, occasion, tone } = req.body;

  if (!ai) {
    // Premium fallback card messages if no API key is configured
    return res.json({
      messages: [
        `Dearest ${recipientName || 'Love'}, you are my absolute favorite adventure. Happy ${occasion || 'Special Day'}!`,
        `To the one who brings light and warmth to my everyday. Wishing you a beautiful ${occasion || 'Special Day'} filled with love.`
      ]
    });
  }

  try {
    const prompt = `You are a master calligraphy card poet at Lunara, a luxury gifting house.
Generate 2 distinct, premium, deeply personal greeting card messages with the following details:
- Recipient Name: ${recipientName || 'Beloved'}
- Relationship: ${relationship || 'Special someone'}
- Occasion: ${occasion || 'Celebration'}
- Tone Theme: ${tone || 'Heartfelt'}

Ensure each option is exquisite, heartfelt, emotionally resonant, and avoids cliché. Keep each card message compact (under 3 lines or 45 words), perfect for hand calligraphy.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            messages: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of 2 beautifully styled greeting card options."
            }
          },
          required: ["messages"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini API");
    }

    const jsonResult = JSON.parse(resultText.trim());
    return res.json(jsonResult);

  } catch (error: any) {
    console.error("Gemini card generator error:", error);
    res.status(500).json({ error: "Failed to generate card messages", details: error.message });
  }
});

// AI Memory Vault prose/poem narrator route
app.post("/api/narrate-memory", async (req, res) => {
  const { title, date, recipientName, description } = req.body;

  if (!ai) {
    return res.json({
      narrative: `A beautiful surprise captured on ${date || 'a special day'} named "${title || 'Cherished Memory'}" for ${recipientName || 'a loved one'}. The air was sweet with laughter, and every detail whispered of a memory that will forever endure in our hearts.`
    });
  }

  try {
    const prompt = `You are a legendary literary curator and memory archivist at Lunara, a bespoke luxury gift maker.
Transform the following simple memory log into an exquisite, classic poem or elegant prose narrative keepsake.
Memory log:
- Title: ${title}
- Recipient Name: ${recipientName}
- Date: ${date}
- Description of the moment: ${description || 'A joyful surprise moment shared together.'}

Generate an elegant, heartwarming, and poetic narrative of exactly 2-3 stanzas or brief paragraphs. Speak in an eternal, classical voice that captures the magic of this unforgettable surprise milestone. Make it highly polished and ready to be printed on handmade parchment.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            narrative: {
              type: Type.STRING,
              description: "An elegant, heartwarming classic literary narrative or poem keepsake."
            }
          },
          required: ["narrative"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No text returned from Gemini API");
    }

    const jsonResult = JSON.parse(resultText.trim());
    return res.json(jsonResult);

  } catch (error: any) {
    console.error("Gemini memory narrator error:", error);
    res.status(500).json({ error: "Failed to narrate memory", details: error.message });
  }
});

// AI Concierge Chatbot route
app.post("/api/concierge-chat", async (req, res) => {
  const { message, history } = req.body;

  if (!ai) {
    // Exquisite fallback responses for the chat concierge
    const lowerMessage = (message || '').toLowerCase();
    let reply = "Welcome to Lunara's luxury concierge. I can guide you in picking a perfume, designing custom room decor, planning beach sunset cruises, or building bespoke gift boxes.";
    if (lowerMessage.includes('box') || lowerMessage.includes('curat')) {
      reply = "Our Curated Gift Box Atelier allows you to pick sizing, custom interior themes (like Romantic Velvet or Corporate Noir), and hand-pack luxury items like French Cologne and eternal roses.";
    } else if (lowerMessage.includes('decor') || lowerMessage.includes('setup')) {
      reply = "For hotel suites or private chambers, we arrange breathtaking Room Decor setups, like our signature 'Enchanted Rose path' with fresh flower paths, balloons, and led candle paths.";
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('date')) {
      reply = "Our experiences are designed to spark unforgettable moments—including romantic beach dinners with acoustic violinists, private couples spa sessions, or custom chocolate blending workshops.";
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('naira')) {
      reply = "We offer options spanning various budgets. A custom Mini Box starts at ₦15,000, while our premium room decor installations run from ₦150,000 up to ₦1,000,000+ for grand hotel suite makeovers.";
    }
    return res.json({ reply });
  }

  try {
    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.content }]
    }));

    // Create chat session with a tailored system instruction
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are Lunara's Senior Luxury Concierge, named Amber.
Lunara is Nigeria's most exclusive full-service luxury gifting and romantic room-decor setup company.
Your persona is incredibly refined, warm, attentive, and highly professional. You speak with grace and elegance.
You assist customers in:
1. Navigating our services: Premium Gifts Marketplace (perfumes, cakes, eternal flowers, artisanal truffles), Curated Box Atelier, Room Decor installations (anniversary balloon paths, romantic setups), and Couples Surprise Experiences (couples massage spa, private sunset violin dinners).
2. Advising on Nigerian Naira (₦) budget distributions.
3. Formulating creative surprise strategy concepts.

Keep responses relatively brief (under 80 words), focused on luxurious solutions, and encouraging the user to explore our custom tabs. Never break character. Always address the user with utmost respect.`,
      }
    });

    // Send the message using sendMessage
    const response = await chat.sendMessage({
      message: message
    });

    const reply = response.text;
    return res.json({ reply });

  } catch (error: any) {
    console.error("Gemini Concierge Chat error:", error);
    res.status(500).json({ error: "Failed to generate concierge response", details: error.message });
  }
});

// Automated Surprise Scenario Generator (The "Milestone Planner")
app.post("/api/generate-itinerary", async (req, res) => {
  const { recipientName, relationship, occasion, personality, budgetTier, preferences } = req.body;

  const budgetVal = budgetTier === 'royal' ? 1200000 : budgetTier === 'diamond' ? 500000 : 180000;
  const tierName = budgetTier === 'royal' ? 'Royal Prestige' : budgetTier === 'diamond' ? 'Diamond Elite' : 'Luxe Premium';

  if (!ai) {
    // Elegant fallback simulation
    return res.json({
      themeName: `The Enchanted ${occasion || 'Milestone'} Sanctuary`,
      totalPrice: budgetVal,
      plannerAdvice: `An exquisite curation tailored specifically for your ${relationship || 'partner'} (${recipientName || 'Beloved'}), reflecting their ${personality || 'thoughtful'} personality. We suggest a subtle crescendo of mini-surprises leading up to the grand reveal.`,
      steps: [
        {
          time: "17:30",
          title: "The Golden Scroll Delivery",
          description: `A Lunara escort arrives at ${recipientName || 'their'} location, dressed in custom uniform, presenting a gold wax-sealed parchment note explaining that a carriage awaits.`,
          estimatedCost: Math.round(budgetVal * 0.1)
        },
        {
          time: "18:15",
          title: "Chauffeur Transport & Fragrance Mist",
          description: "Our premium private driver transports them. The vehicle cabin is customized with their favorite scent and ambient classical jazz playing.",
          estimatedCost: Math.round(budgetVal * 0.15)
        },
        {
          time: "19:00",
          title: "The Chamber Entrance & Candlelit Path",
          description: `The suite doors glide open. A stunning custom room decor theme unfolds: a 25-meter pathway of fresh scent rose petals, lit with over 150 safe glowing led candles.`,
          estimatedCost: Math.round(budgetVal * 0.35)
        },
        {
          time: "19:15",
          title: "Private Acoustic Serenade",
          description: "A private violinist emerges from the shadow, playing a gorgeous slow acoustic cover of their absolute favorite song as they settle into the lounge.",
          estimatedCost: Math.round(budgetVal * 0.25)
        },
        {
          time: "20:00",
          title: "Presentation of the Bespoke Curated Box",
          description: `Unveiling the grand Lunara ${tierName} curation box containing customized French Perfumes, artisanal truffles, and an eternal gold-ink parchment scroll.`,
          estimatedCost: Math.round(budgetVal * 0.15)
        }
      ]
    });
  }

  try {
    const prompt = `You are the Principal Creative Director and Surprise Architect at Lunara, Nigeria's premier luxury surprise house.
Formulate an extraordinary, highly specific, step-by-step surprise event timeline/itinerary with these parameters:
- Recipient Name: ${recipientName || 'Beloved'}
- Relationship: ${relationship || 'Partner'}
- Occasion: ${occasion || 'Anniversary'}
- Personality Profile: ${personality || 'Appreciates subtle luxury, romantic, artistic'}
- Budget Tier: ${tierName} (Target budget range around ₦${budgetVal.toLocaleString()})
- Additional Preferences: ${preferences || 'None'}

Generate a beautiful theme name, a short piece of expert planner advice, and exactly 4 to 5 detailed sequential steps with specific times, exquisite descriptions, and allocated costs in Naira (₦) summing close to the target budget of ₦${budgetVal}. No markdown inside fields.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themeName: { type: Type.STRING, description: "A dramatic, luxurious theme name for this surprise layout." },
            totalPrice: { type: Type.INTEGER, description: "Total budget summing all steps in Naira (₦)." },
            plannerAdvice: { type: Type.STRING, description: "A highly expert, encouraging tip from Lunara's Senior surprise director." },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Time of step (e.g. '18:30')." },
                  title: { type: Type.STRING, description: "Elegant title of the step." },
                  description: { type: Type.STRING, description: "Detailed, sensory, and theatrical description of the surprise interaction." },
                  estimatedCost: { type: Type.INTEGER, description: "Cost allocation in Naira (₦) for this step." }
                },
                required: ["time", "title", "description", "estimatedCost"]
              }
            }
          },
          required: ["themeName", "totalPrice", "plannerAdvice", "steps"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No text returned from Gemini API");

    const jsonResult = JSON.parse(resultText.trim());
    return res.json(jsonResult);

  } catch (error: any) {
    console.error("Gemini Surprise Planner error:", error);
    res.status(500).json({ error: "Failed to generate surprise plan", details: error.message });
  }
});

// Predictive Gifting Reminders & Relationship CRM
app.post("/api/crm-forecasts", async (req, res) => {
  const { recipients, occasions } = req.body;

  // Let's create beautiful premium recommendations
  if (!ai) {
    const listRecs = recipients || [];
    const listOccs = occasions || [];

    // Formulate realistic milestone reminders
    const forecasts = [];

    // Fallback item 1: Sarah
    const mainRec = listRecs[0] || { name: "Sarah", relationship: "Spouse", favoriteColor: "Burgundy" };
    forecasts.push({
      recipientName: mainRec.name,
      relationship: mainRec.relationship,
      occasion: listOccs[0]?.title || "Upcoming Anniversary Milestone",
      daysAway: 18,
      forecastDate: "In 18 Days",
      description: `Based on your luxury profiling, last year you surprise-gifted a curated chocolate and rose collection to ${mainRec.name}. For this upcoming milestone, we predict she would be deeply moved by our Diamond-tier Room Decor setup with fresh flower petal pathways and LED soft candle arrangements, customized in her favorite theme.`,
      recommendedProducts: [
        { name: "Enchanted Room Decor Installation", reason: "Features over 200 fresh roses, custom balloon archways, and ambient candlepaths.", price: 185000 },
        { name: "Ambre Impérial Oud Perfume", reason: `Exquisite fragrance that perfectly complements her favorite theme.`, price: 45000 }
      ]
    });

    // Fallback item 2: Mother/Associate
    const secondRec = listRecs[1] || { name: "Chief Adeleke", relationship: "Business Associate", favoriteColor: "Emerald Green" };
    forecasts.push({
      recipientName: secondRec.name,
      relationship: secondRec.relationship,
      occasion: "Corporate Birthday & Thanksgiving",
      daysAway: 27,
      forecastDate: "In 27 Days",
      description: `To maintain a stellar prestige connection with ${secondRec.name}, our relationship engine forecasts that a custom Corporate Noir curate box paired with artisanal Belgian truffles and aged sparkling non-alcoholic vintage cider will make an unforgettable impression.`,
      recommendedProducts: [
        { name: "Lunara Royale Corporate Noir Box", reason: "Includes gold-rimmed glassware, imported truffles, and custom leather journals.", price: 95000 },
        { name: "Scented Leather Humidor", reason: "Adds a touch of timeless distinction to their executive workspace.", price: 60000 }
      ]
    });

    return res.json({ forecasts });
  }

  try {
    const prompt = `You are a high-end Relationship CRM Consultant at Lunara Luxury Gifting House.
We are analyzing our client's saved recipient list and registered occasions to proactively forecast target-personalized upcoming luxury gifting recommendations.
Saved Recipients: ${JSON.stringify(recipients || [])}
Saved Occasions: ${JSON.stringify(occasions || [])}

Generate exactly 2 premium, highly targeted milestone forecasts with detailed descriptions and specific high-ticket item recommendations in Naira (₦).
Speak with absolute prestige, refer to previous gifts (simulate if none recorded, e.g. "Last year you sent her our classic rose box"), and craft compelling, hyper-tailored reasons why they would love these suggestions. Return valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            forecasts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  recipientName: { type: Type.STRING },
                  relationship: { type: Type.STRING },
                  occasion: { type: Type.STRING },
                  daysAway: { type: Type.INTEGER },
                  forecastDate: { type: Type.STRING },
                  description: { type: Type.STRING, description: "A predictive personalized paragraph summarizing past interactions and why this curated recommendation is perfect." },
                  recommendedProducts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        reason: { type: Type.STRING },
                        price: { type: Type.INTEGER }
                      },
                      required: ["name", "reason", "price"]
                    }
                  }
                },
                required: ["recipientName", "relationship", "occasion", "daysAway", "forecastDate", "description", "recommendedProducts"]
              }
            }
          },
          required: ["forecasts"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No text returned from Gemini API");

    const jsonResult = JSON.parse(resultText.trim());
    return res.json(jsonResult);

  } catch (error: any) {
    console.error("Gemini CRM Forecasting error:", error);
    res.status(500).json({ error: "Failed to generate CRM forecasts", details: error.message });
  }
});

// Configure Vite middleware or serve static production build
async function initVite() {
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
}

initVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Vite server init failed:", err);
});

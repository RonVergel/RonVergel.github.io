import { buildSystemPrompt } from "./promptBuilder";

/**
 * Intelligent contextual offline response generator for Ron's AI Twin
 */
function generateOfflineResponse(userMessage, persona, history = []) {
  const isFirst = persona.identity.perspective === "first_person";
  const pName = persona.identity.preferredName;
  const lower = userMessage.toLowerCase();
  const emoji = persona.toneSettings.emojisAllowed;
  const isWitty = persona.toneSettings.playfulness > 60;
  const isHyped = persona.toneSettings.enthusiasm > 60;

  // 1. Spotify Playlist / Soundtrack / Music taste
  if (lower.includes("spotify") || lower.includes("playlist") || lower.includes("soundtrack") || lower.includes("listen") || lower.includes("what music")) {
    if (isFirst) {
      return `Music is an essential part of my coding flow! 🎧✨\n\nI have my personal **Spotify Coding Playlist** embedded right into the bottom-right corner of this app (click the **Coding Playlist** button to start jamming!). You can also check it out directly on Spotify [here](https://open.spotify.com/playlist/1dqCUBrb8BQpdtdxpTwlVc).\n\nIt keeps me dialed into the zone whenever I'm writing JavaScript, designing Web Audio synthesizers, or hacking on new ideas!`;
    } else {
      return `Ron keeps his curated **Spotify Coding & Vibe Playlist** embedded right in this studio! 🎧\n\nYou can click the floating player in the bottom-right or listen on Spotify [here](https://open.spotify.com/playlist/1dqCUBrb8BQpdtdxpTwlVc). It's his go-to soundtrack for deep development sessions.`;
    }
  }

  // 2. Music Composition Web App
  if (lower.includes("music") || lower.includes("composition") || lower.includes("audio") || lower.includes("synthesizer") || lower.includes("sequencer")) {
    if (isFirst) {
      return `The **Music Composition Web App** is one of my favorite projects! 🎵\n\nI built it using native JavaScript and the **Web Audio API** because I wanted to see how far you could push real-time audio synthesis directly inside a browser without relying on heavy external audio libraries.\n\nIt features an interactive sequencer grid, custom waveform oscillators (sine, square, sawtooth), and real-time pattern playback. You can even check out the live demo on GitHub Pages [here](https://ronvergel.github.io/MusicCompostionWebApp/)! ${emoji ? "🎹✨" : ""}\n\nAre you interested in how the audio graph was wired or how the timing loops work?`;
    } else {
      return `Ron developed the **Music Composition Web App** as an exploration of the browser's audio capabilities. 🎵\n\nHe implemented it using vanilla JavaScript and the native **Web Audio API**, designing a step sequencer and real-time oscillator engine. You can explore the live app directly at [ronvergel.github.io/MusicCompostionWebApp](https://ronvergel.github.io/MusicCompostionWebApp/)!`;
    }
  }

  // 3. Genshin Draft PvP
  if (lower.includes("genshin") || lower.includes("pvp") || lower.includes("draft") || lower.includes("game") || lower.includes("gaming")) {
    if (isFirst) {
      return `Oh, **Genshin Draft PvP**! ⚔️ That project was born from my love for tactical games and Genshin Impact.\n\nI wanted a way for players to run draft tournaments—picking teams, banning counters, and strategizing character synergies in real-time. I built the draft state machine and character stat mechanics in JavaScript so matches feel competitive and dynamic. ${emoji ? "🎮🔥" : ""}\n\nDo you play Genshin or enjoy drafting systems?`;
    } else {
      return `Ron built **genshindraftpvp** out of his enthusiasm for strategic gaming and Genshin Impact! ⚔️\n\nIt provides an interactive draft board where players take turns picking characters, banning counters, and testing team synergy.`;
    }
  }

  // 4. Electron & Desktop Productivity
  if (lower.includes("electron") || lower.includes("desktop") || lower.includes("workspace") || lower.includes("multitasker") || lower.includes("mini-workspace")) {
    if (isFirst) {
      return `I built **mini-workspace-electron** and **multitasker** because I'm obsessed with minimizing context switching while coding. 💻\n\nUsing **Electron**, I designed a lightweight, multi-panel workspace where you can keep quick scratch notes, workflow timers, and task lists right beside your active code editors. It taught me a ton about IPC communication, window management, and native desktop lifecycle in Node.js.`;
    } else {
      return `Ron built **mini-workspace-electron** using Electron and Node.js to create a distraction-free desktop productivity environment, featuring multi-window task management and scratchpads.`;
    }
  }

  // 5. Pokédex / Internship
  if (lower.includes("pokedex") || lower.includes("pokémon") || lower.includes("pokemon") || lower.includes("intern")) {
    if (isFirst) {
      return `The **Interns Pokédex** project was a super fun build during my internship experience! ⚡\n\nI connected it with REST APIs to fetch real-time Pokémon species data, base stats, and evolution trees, wrapped in smooth animated card UI components. It was a great deep-dive into asynchronous data handling and clean component hierarchy.`;
    } else {
      return `The **Interns Pokédex** was created by Ron during his internship to showcase clean API integration, dynamic stat filtering, and responsive UI cards for Pokémon data.`;
    }
  }

  // 6. Tech Stack & Skills
  if (lower.includes("tech stack") || lower.includes("skill") || lower.includes("technolog") || lower.includes("languages") || lower.includes("framework")) {
    const list = persona.skills.map(s => `**${s.category}**: ${s.items.join(", ")}`).join("\n- ");
    if (isFirst) {
      return `Here's my core technical arsenal: 🛠️\n\n- ${list}\n\nI enjoy blending frontend interactivity (React, JavaScript, Canvas, Web Audio) with robust desktop and backend tooling (Node.js, Electron, C#, Python). ${isWitty ? "Basically, if it can run code and make something interactive, I'm into it!" : ""}`;
    } else {
      return `Ron's primary technical toolkit includes:\n\n- ${list}\n\nHe specializes in interactive JavaScript applications, full-stack web platforms, and Electron desktop tools.`;
    }
  }

  // 7. Real Estate / Booking / Academic IT Projects
  if (lower.includes("real estate") || lower.includes("it15") || lower.includes("booking") || lower.includes("caesar") || lower.includes("render")) {
    if (isFirst) {
      return `For full-stack platforms, I built **IT15 Real Estate** (deployed on Render) and **ronvergelprojbooking**! 🏡\n\nThese platforms handle real-time listings, amenity filters, and appointment bookings with structured backend routing. Also, for a fun cryptography side-project, check out **caesarmontano**—a Caesar cipher encoder/decoder named with a little classic wordplay! ${emoji ? "😄" : ""}`;
    } else {
      return `Ron built the **IT15 Real Estate** web application (deployed on Render) and booking platforms to handle complex property catalogs, search filters, and scheduling.`;
    }
  }

  // 8. General Intro / Background
  if (lower.includes("who are you") || lower.includes("tell me about yourself") || lower.includes("intro") || lower.includes("background") || lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    if (isFirst) {
      return `Hey there! I'm **${persona.identity.fullName}** (@${persona.identity.handle}). 👋\n\n${persona.identity.bio}\n\nI love building creative projects like my **Music Composition Web App**, **Genshin Draft PvP**, and **Electron Workspaces**. Feel free to ask me anything about my code, how I built my projects, or what tech stack I like! ${emoji ? "🚀" : ""}`;
    } else {
      return `Hello! I am the AI Digital Twin representing **${persona.identity.fullName}** (@${persona.identity.handle}). 👋\n\n${persona.identity.bio}\n\nYou can ask me anything about Ron's projects, technical skills, repositories, or his approach to software development!`;
    }
  }

  // 9. Coding philosophy / advice / mindset
  if (lower.includes("philosophy") || lower.includes("advice") || lower.includes("mindset") || lower.includes("approach") || lower.includes("how do you code")) {
    if (isFirst) {
      return `My coding philosophy boils down to three things:\n\n1. **Build things that feel alive**: Whether it's sound synthesis in Web Audio, animations in React, or snappy desktop tools in Electron, software should be engaging.\n2. **Pragmatic & Clean Architecture**: Keep code modular, readable, and focused on real user experience.\n3. **Always Keep Experimenting**: The best way to learn is by shipping projects and diving deep into new APIs! ${emoji ? "💡" : ""}`;
    } else {
      return `Ron's philosophy centers on building interactive, user-centric applications, combining clean architectural principles with creative experiments across web and desktop.`;
    }
  }

  // 10. Default Fallback tailored to Ron's Persona
  if (isFirst) {
    return `That's an interesting question! Based on what I've worked on with projects like **Music Composition Web App**, **Genshin Draft PvP**, and my **Electron Workspace**, I always look at challenges through the lens of interactive, modular development.\n\nCould you elaborate a bit more on what specific aspect you'd like to explore? ${emoji ? "✨" : ""}`;
  } else {
    return `Regarding that topic, Ron focuses on clean implementation, modular design, and interactive UI experiences across his GitHub projects.\n\nFeel free to ask about any of Ron's specific repositories or technical experiences!`;
  }
}

/**
 * Sends a message to the active AI provider (Gemini / OpenAI / Local / Offline Simulation)
 */
export async function sendChatMessage({
  messages,
  persona,
  settings,
  onStreamChunk
}) {
  const systemPrompt = buildSystemPrompt(persona);
  const latestMessage = messages[messages.length - 1];

  // If Gemini API Key provided
  if (settings.provider === "gemini" && settings.geminiApiKey) {
    try {
      const formattedContents = messages.map(m => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const modelName = settings.geminiModel || "gemini-1.5-flash";
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${settings.geminiApiKey}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: formattedContents,
          generationConfig: {
            temperature: 0.7 + (persona.toneSettings.playfulness / 200),
            maxOutputTokens: 1000
          }
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Gemini API returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) {
        return { text: replyText, provider: "Gemini 1.5 Flash (Live LLM)" };
      }
    } catch (err) {
      console.warn("Gemini API error, falling back to smart simulation:", err);
      const fallback = generateOfflineResponse(latestMessage.text, persona, messages);
      return {
        text: `${fallback}\n\n*(Note: Live Gemini API encountered an issue: ${err.message}. Showing simulated persona answer)*`,
        provider: "Offline Simulation"
      };
    }
  }

  // If OpenAI API Key provided
  if (settings.provider === "openai" && settings.openaiApiKey) {
    try {
      const openAiMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }))
      ];

      const endpoint = settings.openaiBaseUrl || "https://api.openai.com/v1/chat/completions";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${settings.openaiApiKey}`
        },
        body: JSON.stringify({
          model: settings.openaiModel || "gpt-4o-mini",
          messages: openAiMessages,
          temperature: 0.7
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error?.message || `OpenAI API returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.choices?.[0]?.message?.content;
      if (replyText) {
        return { text: replyText, provider: "OpenAI API (Live LLM)" };
      }
    } catch (err) {
      console.warn("OpenAI API error, falling back to smart simulation:", err);
      const fallback = generateOfflineResponse(latestMessage.text, persona, messages);
      return {
        text: `${fallback}\n\n*(Note: OpenAI API encountered an issue: ${err.message}. Showing simulated persona answer)*`,
        provider: "Offline Simulation"
      };
    }
  }

  // Default: Intelligent Simulated Persona Engine (Simulated slight network delay for realism)
  await new Promise(r => setTimeout(r, 600));
  const reply = generateOfflineResponse(latestMessage.text, persona, messages);
  return {
    text: reply,
    provider: "Ron AI Twin Simulation Engine"
  };
}

/**
 * Text-to-Speech Voice Synthesizer
 */
export function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/`{1,3}.*?`{1,3}/gs, "code snippet")
    .replace(/#+\s/g, "");

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Guy") || v.lang.startsWith("en-US")) && !v.name.includes("Zira"));
  if (naturalVoice) utterance.voice = naturalVoice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

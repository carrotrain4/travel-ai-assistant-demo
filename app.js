(() => {
  "use strict";

  const RESPONSES = {
    weather: {
      intent: "weather",
      label: "天气查询",
      agentName: "天气 Agent",
      workflow: "weather.flow",
      badge: "WEATHER.FLOW",
      meta: "1.24s · weather.api + LLM",
      prompt: "大理明天天气怎么样？适合环洱海吗？",
      title: "明天适合环洱海，傍晚的光会很好",
      weather: {
        temp: "25",
        condition: "多云转晴 · 体感舒适",
        location: "大理 · Dali",
        date: "4 月 19 日 · 明天",
        icon: "sun-cloud"
      },
      forecast: [
        { day: "今天", icon: "cloud", high: "23°", low: "16°", note: "短时阵雨" },
        { day: "明天", icon: "sun-cloud", high: "25°", low: "18°", note: "适合出片" },
        { day: "后天", icon: "sun", high: "26°", low: "17°", note: "风稍大" }
      ],
      advice: "建议把环洱海安排在 15:00 之后：先走海西，再在日落前抵达海舌公园。紫外线中等，带一件薄外套应对傍晚降温。",
      tools: ["weather.api", "maps.route", "LLM"]
    },

    pose: {
      intent: "pose",
      label: "Pose 灵感",
      agentName: "Pose Agent",
      workflow: "pose.flow",
      badge: "POSE.FLOW",
      meta: "1.76s · image.gen + code",
      prompt: "帮我在洱海边设计一个出片 Pose。",
      title: "洱海出片灵感 · 让风成为画面的一部分",
      poseIndex: 0,
      poses: [
        {
          title: "海边回眸",
          location: "海舌公园 · 16:40",
          caption: "等一阵风，再回头",
          description: "站在浅滩边的三分线位置，身体先朝湖面，摄影师倒数 3 秒时自然回头。让裙摆或外套被风带起来，画面会轻盈很多。",
          tags: ["日落逆光", "低机位", "连拍 3 张"],
          camera: "0.7× 广角 · f/2.8 · 人像模式",
          palette: ["#e6a57f", "#d66c55", "#204d58"]
        },
        {
          title: "公路漫步",
          location: "环海西路 · 17:10",
          caption: "沿着光，慢慢走",
          description: "不要停在正中间，沿公路白线偏左行走，摄影师后退保持 1.5 米距离，抓拍自然迈步的瞬间。人物在画面下三分之一，会更像电影截图。",
          tags: ["公路感", "抓拍", "电影构图"],
          camera: "2× 长焦 · 俯拍 5° · 连续对焦",
          palette: ["#e9bd7d", "#8a7564", "#31525b"]
        },
        {
          title: "窗边侧影",
          location: "喜洲古镇 · 09:20",
          caption: "把早晨留在窗边",
          description: "坐在木窗侧边，身体朝窗外、脸向镜头转 45°。让手臂自然搭在窗框上，留出一点呼吸空间。古镇的暖色墙面会把肤色衬得很干净。",
          tags: ["古镇人文", "自然光", "侧逆光"],
          camera: "1× 人像 · f/2.2 · 窗边顺光",
          palette: ["#d7b394", "#7d8b79", "#f0e3cd"]
        }
      ],
      tools: ["image.gen", "code", "vision"]
    },

    story: {
      intent: "story",
      label: "语音故事",
      agentName: "故事 Agent",
      workflow: "story.flow",
      badge: "STORY.VOICE",
      meta: "2.08s · LLM + TTS",
      prompt: "给我讲一个关于大理的短故事，并用语音播放。",
      title: "洱海边的月亮船",
      duration: "00:38",
      text: "当地人相信，洱海的月亮不是倒映在水里，而是从一艘小船里慢慢升起来的。很久以前，一位渔人每晚出海都会带回一捧月光，送给在岸边等他的姑娘。后来，姑娘变成了一棵柳树，渔人仍旧每天划船经过。起风的时候，柳枝轻轻扫过水面，整片洱海就亮起来。所以下次看见月光落在涟漪上，不妨慢一点走——也许那是有人在替远方的人，向你问好。",
      narration: "很久以前，洱海边住着一位渔人。他每晚出海，都会带回一捧月光，送给在岸边等他的姑娘。后来，姑娘变成了一棵柳树，渔人仍旧每天划船经过。起风的时候，柳枝轻轻扫过水面，整片洱海就亮起来。所以下次看见月光落在涟漪上，不妨慢一点走。也许那是有人在替远方的人，向你问好。",
      tools: ["knowledge.search", "LLM", "tts.voice"]
    },

    outfit: {
      intent: "outfit",
      label: "穿搭灵感",
      agentName: "穿搭 Agent",
      workflow: "outfit.flow",
      badge: "OUTFIT.FLOW",
      meta: "1.36s · knowledge + LLM",
      prompt: "大理四月怎么穿？给我三套不同场景的穿搭。",
      title: "大理 4 月 · 三套松弛感穿搭",
      subtitle: "昼夜温差约 8°C，层次感比厚度更重要。",
      outfits: [
        {
          time: "清晨 · 14°C",
          name: "苍山看雾",
          items: "米白针织 + 浅卡其工装裤 + 轻羽绒马甲",
          palette: ["#f1e6d2", "#bfa888", "#5c7772"]
        },
        {
          time: "午后 · 25°C",
          name: "洱海出片",
          items: "雾蓝长裙 + 草编包 + 姜黄色薄衫",
          palette: ["#b8d8d6", "#e4b95e", "#f6eee0"]
        },
        {
          time: "夜晚 · 17°C",
          name: "古城散步",
          items: "黑色短外套 + 白 T + 直筒牛仔裤 + 帆布鞋",
          palette: ["#30393d", "#f7f2e9", "#6d8095"]
        }
      ],
      tools: ["weather.api", "knowledge.search", "LLM"]
    },

    copy: {
      intent: "copy",
      label: "朋友圈文案",
      agentName: "文案 Agent",
      workflow: "copy.flow",
      badge: "COPY.FLOW",
      meta: "1.12s · LLM + loop",
      prompt: "帮我写一条大理洱海日落的朋友圈文案。",
      title: "为洱海日落写的三组朋友圈",
      subtitle: "选一个今天的语气，把风装进文字里。",
      tone: "healing",
      setIndex: 0,
      sets: [
        {
          healing: "风从苍山来，经过洱海，刚好把我的坏情绪吹散。\n今天不赶路，只赶一场日落。",
          literary: "洱海把天空揉成一张旧信纸，风是落款，日落是迟到的邮差。\n我在大理，读了一封没有地址的信。",
          funny: "今日任务：在洱海边认真发呆。\n完成度：120%。缺点：晒黑两个度，优点：快乐也是。"
        },
        {
          healing: "在大理，时间不是用来赶的。\n它用来等一阵风、看一片云，还有慢慢落下去的太阳。",
          literary: "苍山负雪，洱海盛月。此刻无酒，风也醉人。\n借大理的黄昏，敬一次不必解释的自由。",
          funny: "报告！洱海的风太大，把我的发型吹成了行为艺术。\n但它把晚霞吹得很好看，所以原谅它。"
        }
      ],
      tools: ["LLM", "loop", "copywriter.llm"]
    },

    itinerary: {
      intent: "itinerary",
      label: "行程规划",
      agentName: "行程 Agent",
      workflow: "planner.flow",
      badge: "PLANNER.FLOW",
      meta: "1.62s · maps + code + LLM",
      prompt: "帮我把大理 4 天 3 晚排得松弛一点。",
      title: "大理 4 天 3 晚 · 不赶路的版本",
      subtitle: "每天只安排一个主场景，给天气和临时起意留一点空间。",
      days: [
        { day: "DAY 01", title: "大理古城 · 抵达与慢慢熟悉", desc: "下午入住，人民路吃饭，晚上去床单厂艺术区逛逛。不安排硬性景点。", tag: "抵达日" },
        { day: "DAY 02", title: "环洱海 · 海西到双廊", desc: "10:30 出发，海西骑行一小段；15:00 后去海舌公园等日落，晚餐在双廊。", tag: "主场景" },
        { day: "DAY 03", title: "苍山 / 喜洲 · 二选一", desc: "体力好上苍山感通索道；想松弛就去喜洲吃粑粑、逛古镇和田野。", tag: "留白" },
        { day: "DAY 04", title: "早市与返程", desc: "早上逛北门菜市场，买一点鲜花和咖啡，下午返程。", tag: "返程日" }
      ],
      tools: ["maps.route", "weather.api", "code", "LLM"]
    }
  };

  const state = {
    running: false,
    autoTimer: null,
    toastTimer: null,
    currentIntent: null,
    currentSpeech: null,
    speakingCard: null,
    copySetIndex: 0
  };

  const el = {
    chatMessages: document.getElementById("chatMessages"),
    quickActions: Array.from(document.querySelectorAll("#quickActions .quick-action")),
    chatForm: document.getElementById("chatForm"),
    travelInput: document.getElementById("travelInput"),
    sendButton: document.getElementById("sendButton"),
    clearChat: document.getElementById("clearTravelChat"),
    mainAgentNode: document.getElementById("mainAgentNode"),
    currentIntent: document.getElementById("currentIntent"),
    routeStatus: document.getElementById("routeStatus"),
    routeLatency: document.getElementById("routeLatency"),
    routeLog: document.getElementById("routeLog"),
    toast: document.getElementById("toast"),
    subagents: Array.from(document.querySelectorAll(".subagent"))
  };

  const WELCOME_MARKUP = el.chatMessages.innerHTML;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showToast(message) {
    if (state.toastTimer) window.clearTimeout(state.toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => {
      el.toast.classList.remove("show");
      state.toastTimer = null;
    }, 2500);
  }

  function scrollChatToBottom() {
    window.setTimeout(() => {
      el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
    }, 50);
  }

  function cancelAutoRun() {
    if (state.autoTimer) {
      window.clearTimeout(state.autoTimer);
      state.autoTimer = null;
    }
  }

  function setBusy(busy) {
    state.running = busy;
    el.sendButton.disabled = busy;
    el.quickActions.forEach((button) => { button.disabled = busy; });
    el.clearChat.disabled = busy;
    el.sendButton.querySelector("span").textContent = busy ? "路由中" : "出发";
  }

  function setRouteStatus(mode, text) {
    el.routeStatus.className = `route-live ${mode || ""}`.trim();
    el.routeStatus.innerHTML = `<i></i>${text}`;
  }

  function formatRouteTime(ms) {
    return `${(Math.max(0, ms) / 1000).toFixed(2)}s`;
  }

  function appendRouteEntry(source, text, atMs, warning = false) {
    if (!el.routeLog.querySelector(".route-entry")) {
      el.routeLog.innerHTML = "";
    }
    const row = document.createElement("div");
    row.className = `route-entry${warning ? " warn" : ""}`;
    row.innerHTML = `
      <span>${formatRouteTime(atMs)}</span>
      <div><strong>${escapeHTML(source)}</strong><p>${escapeHTML(text)}</p></div>
    `;
    el.routeLog.appendChild(row);
    el.routeLog.scrollTop = el.routeLog.scrollHeight;
  }

  function resetRoute() {
    setRouteStatus("", "READY");
    el.routeLatency.textContent = "—";
    el.currentIntent.textContent = "等待意图";
    el.mainAgentNode.classList.remove("active");
    el.subagents.forEach((node) => node.classList.remove("active", "done"));
    el.routeLog.innerHTML = '<div class="route-empty">等待一次旅行请求，主 Agent 会在这里留下路由轨迹。</div>';
  }

  function inferIntent(text) {
    if (/(天气|气温|下雨|晴天|温度|适合.*(出门|环洱海))/.test(text)) return "weather";
    if (/(pose|拍照|姿势|出片|构图|机位|照片)/i.test(text)) return "pose";
    if (/(故事|语音|听|传说|讲一段|讲故事)/.test(text)) return "story";
    if (/(穿搭|穿什么|衣服|搭配|外套|裙子)/.test(text)) return "outfit";
    if (/(朋友圈|文案|配文|发圈|写一段)/.test(text)) return "copy";
    return "itinerary";
  }

  function responseForIntent(intent, query) {
    const base = RESPONSES[intent] || RESPONSES.itinerary;
    return { ...base, displayQuery: query };
  }

  function appendUserMessage(text) {
    const wrapper = document.createElement("div");
    wrapper.className = "message user";
    wrapper.innerHTML = `
      <span class="message-avatar">YOU</span>
      <div class="message-main">
        <div class="message-meta"><strong>你</strong><span>刚刚</span></div>
        <div class="message-bubble"><p>${escapeHTML(text)}</p></div>
      </div>
    `;
    el.chatMessages.appendChild(wrapper);
    scrollChatToBottom();
  }

  function appendTypingMessage(response) {
    const wrapper = document.createElement("div");
    wrapper.className = "message assistant";
    wrapper.innerHTML = `
      <span class="message-avatar">AI</span>
      <div class="message-main">
        <div class="message-meta"><strong>小旅伴</strong><span>正在路由</span><em>MAIN AGENT</em></div>
        <div class="typing-bubble"><span class="typing-dots"><i></i><i></i><i></i></span><span>主 Agent 正在交给 ${escapeHTML(response.agentName)}…</span></div>
      </div>
    `;
    el.chatMessages.appendChild(wrapper);
    scrollChatToBottom();
    return wrapper;
  }

  function weatherIcon(type, big = false) {
    if (type === "sun") {
      return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="16" cy="16" r="5.2"/><path d="M16 3.5v3M16 25.5v3M3.5 16h3M25.5 16h3M7.2 7.2l2.2 2.2M22.6 22.6l2.2 2.2M24.8 7.2l-2.2 2.2M9.4 22.6l-2.2 2.2"/></svg>`;
    }
    if (type === "cloud") {
      return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 24h14a5 5 0 0 0 0-10 7 7 0 0 0-13.7-1.5A5.8 5.8 0 0 0 9 24Z"/></svg>`;
    }
    return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="12" r="5"/><path d="M20 3.5v2M20 18.5v2M11.5 12h2M26.5 12h2M14.2 6.2l1.5 1.5M24.3 16.3l1.5 1.5M25.8 6.2l-1.5 1.5"/><path d="M7 25h13a4.2 4.2 0 0 0 0-8.4 5.8 5.8 0 0 0-11.4-1.2A4.8 4.8 0 0 0 7 25Z"/></svg>`;
  }

  function renderWeather(response) {
    const weather = response.weather;
    return `
      <div class="travel-card weather-response" data-response="weather">
        <div class="response-head">
          <span class="response-badge"><i></i>${escapeHTML(response.badge)}</span>
          <span class="response-meta">${escapeHTML(response.meta)}</span>
        </div>
        <div class="weather-body">
          <div class="weather-hero">
            <div class="weather-now">
              <span class="weather-icon-big">${weatherIcon(weather.icon, true)}</span>
              <div><div class="weather-temp">${weather.temp}<span>°</span></div><small>${escapeHTML(weather.condition)}</small></div>
            </div>
            <div class="weather-location"><span>${escapeHTML(weather.location)}</span><strong>${escapeHTML(weather.date)}</strong></div>
          </div>
          <div class="forecast-row">
            ${response.forecast.map((day) => `
              <div class="forecast-day"><span>${escapeHTML(day.day)}</span><i>${weatherIcon(day.icon)}</i><strong>${escapeHTML(day.high)} <em style="font-style:normal;color:#9aa39c;font-weight:400">/ ${escapeHTML(day.low)}</em></strong><small>${escapeHTML(day.note)}</small></div>
            `).join("")}
          </div>
          <div class="weather-advice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/><circle cx="12" cy="12" r="4"/></svg>
            <span>${escapeHTML(response.advice)}</span>
          </div>
        </div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="copy-weather">复制天气建议</button>
          <button class="mini-action" type="button" data-action="add-plan">加入明日行程</button>
        </div>
      </div>
    `;
  }

  function poseArtMarkup(pose, index, seed) {
    const gid = `posegrad${seed}${index}`;
    const sunColors = [["#f4c276", "#de846a", "#23545c"], ["#f5d28f", "#b88963", "#614e48"], ["#f0d9b5", "#b9a27e", "#637967"]][index];
    const background = `<defs>
      <linearGradient id="${gid}" x1="210" y1="0" x2="210" y2="240" gradientUnits="userSpaceOnUse">
        <stop stop-color="${sunColors[0]}"/><stop offset=".58" stop-color="${sunColors[1]}"/><stop offset="1" stop-color="${sunColors[2]}"/>
      </linearGradient>
    </defs>`;

    if (index === 0) {
      return `<svg viewBox="0 0 420 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="洱海边回眸 Pose 示意图">
        ${background}<rect width="420" height="240" fill="url(#${gid})"/>
        <circle cx="322" cy="74" r="38" fill="#ffe5a7" opacity=".9"/>
        <path d="M0 145 66 112l32 19 44-38 52 38 34-20 49 26 38-15 105 37v81H0v-95Z" fill="#315d61" opacity=".72"/>
        <path d="M0 154c82-18 150 9 230-4 66-11 128-2 190 17v73H0v-86Z" fill="#1d565f" opacity=".95"/>
        <path d="M28 184c45-9 82 5 127-1M266 201c41-7 76-1 123 3M110 222c44-6 84 7 119 2" stroke="#a8d6d1" stroke-width="2" opacity=".25" stroke-linecap="round"/>
        <path d="M0 229c78-20 147-10 228 1 70 10 124-3 192-14v24H0v-11Z" fill="#e6bf99" opacity=".8"/>
        <g transform="translate(287 116)">
          <circle cx="0" cy="0" r="11" fill="#193a3e"/><path d="M-15 17c9-9 22-9 31 0 3 15 1 34-5 52h-14l-5-28-10 29h-14l12-40c-4-7 2-16 5-13Z" fill="#193a3e"/>
          <path d="M-16 23c-8 11-12 25-15 37M16 25c8 11 13 21 19 28" stroke="#193a3e" stroke-width="5" stroke-linecap="round"/>
          <path d="m-2 69-7 34M9 69l10 34" stroke="#193a3e" stroke-width="6" stroke-linecap="round"/>
          <path d="M-14 104h15M14 104h15" stroke="#e7c59f" stroke-width="2" stroke-linecap="round"/>
        </g>
        <path d="M40 30c40 18 74 18 114 3M36 43c31 12 62 14 93 4" stroke="#fff2d5" stroke-width="1.5" opacity=".3" stroke-linecap="round"/>
      </svg>`;
    }

    if (index === 1) {
      return `<svg viewBox="0 0 420 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="公路漫步 Pose 示意图">
        ${background}<rect width="420" height="240" fill="url(#${gid})"/>
        <circle cx="86" cy="61" r="29" fill="#ffe9b9" opacity=".8"/>
        <path d="M0 145 52 105l46 30 51-59 53 54 47-33 65 34 36-16 70 39v86H0v-95Z" fill="#5b7069" opacity=".7"/>
        <path d="M0 161c73-26 135-2 209-6 73-5 143-14 211 8v77H0v-79Z" fill="#866c5b" opacity=".78"/>
        <path d="M52 240 184 150h54l122 90H52Z" fill="#4e4f4d" opacity=".8"/>
        <path d="M195 240 206 164h9l18 76" fill="#eddfc2" opacity=".63"/>
        <path d="M58 232c26-11 55-13 93-11M315 219c19 2 37 8 54 17" stroke="#e3c6a0" stroke-width="2" opacity=".35" stroke-linecap="round"/>
        <g transform="translate(196 122)">
          <circle cx="0" cy="0" r="10" fill="#203d40"/><path d="M-13 15c9-7 20-7 28 0 4 16 2 36-4 54h-11l-6-26-7 27h-13l10-42c-2-5 0-11 3-13Z" fill="#203d40"/>
          <path d="M-13 22c-7 9-13 19-17 29M14 22c8 8 14 18 20 25" stroke="#203d40" stroke-width="5" stroke-linecap="round"/>
          <path d="m-2 70-10 31M9 70l15 29" stroke="#203d40" stroke-width="6" stroke-linecap="round"/>
          <path d="M-18 102h16M19 99h16" stroke="#f0d0a1" stroke-width="2" stroke-linecap="round"/>
        </g>
        <path d="M346 34c-20 9-37 20-50 35M348 34l-12-1M348 34l-2 12" stroke="#fff3d2" stroke-width="1.5" opacity=".35" stroke-linecap="round"/>
      </svg>`;
    }

    return `<svg viewBox="0 0 420 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="古镇窗边 Pose 示意图">
      ${background}<rect width="420" height="240" fill="url(#${gid})"/>
      <rect x="0" y="0" width="130" height="240" fill="#cbb38f" opacity=".85"/>
      <rect x="25" y="24" width="78" height="116" rx="39" fill="#f7e8ca" opacity=".75"/>
      <rect x="32" y="31" width="64" height="102" rx="32" fill="#69908b" opacity=".62"/>
      <path d="M32 82c18-8 38-8 64 0M64 32v101" stroke="#f8efd8" stroke-width="1.8" opacity=".62"/>
      <path d="M130 0h290v240H130z" fill="#d5ba91" opacity=".58"/>
      <path d="M166 0v240M338 0v240" stroke="#f6e7ca" stroke-width="1.5" opacity=".32"/>
      <path d="M145 190c50-13 80 7 123 0 27-4 46 1 59 8v42H145v-50Z" fill="#9a8062" opacity=".45"/>
      <g transform="translate(247 112)">
        <circle cx="0" cy="0" r="10" fill="#263e3d"/><path d="M-12 14c8-6 19-6 27 0 4 15 2 33-3 47h-12l-5-24-7 25h-12l9-39c-2-5 2-9 3-9Z" fill="#263e3d"/>
        <path d="M-13 21c-10 7-17 18-19 29M15 22c11 4 19 13 24 20" stroke="#263e3d" stroke-width="5" stroke-linecap="round"/>
        <path d="m-2 61-8 29M9 61l14 27" stroke="#263e3d" stroke-width="5" stroke-linecap="round"/>
        <path d="M-16 90h15M19 88h15" stroke="#e6c7a0" stroke-width="2" stroke-linecap="round"/>
      </g>
      <circle cx="349" cy="54" r="14" fill="#f8dfad" opacity=".5"/>
      <path d="M336 82h30M336 88h20" stroke="#f6e8ce" stroke-width="1.4" opacity=".33" stroke-linecap="round"/>
    </svg>`;
  }

  function poseDetailMarkup(pose) {
    return `
      <h4>${escapeHTML(pose.title)} · ${escapeHTML(pose.location)}</h4>
      <p>${escapeHTML(pose.description)}</p>
      <div class="pose-tags"><span>${escapeHTML(pose.tags[0])}</span><span>${escapeHTML(pose.tags[1])}</span><span>${escapeHTML(pose.tags[2])}</span><span>${escapeHTML(pose.camera)}</span></div>
    `;
  }

  function renderPose(response) {
    const pose = response.poses[response.poseIndex];
    const seed = Math.random().toString(36).slice(2, 8);
    return `
      <div class="travel-card pose-response" data-response="pose" data-pose-index="${response.poseIndex}" data-pose-seed="${seed}">
        <div class="response-head"><span class="response-badge"><i></i>${escapeHTML(response.badge)}</span><span class="response-meta">${escapeHTML(response.meta)}</span></div>
        <div class="pose-art">
          ${poseArtMarkup(pose, response.poseIndex, seed)}
          <span class="pose-frame-corner tl"></span><span class="pose-frame-corner tr"></span><span class="pose-frame-corner bl"></span><span class="pose-frame-corner br"></span>
          <span class="pose-chip">POSE 0${response.poseIndex + 1} · ${escapeHTML(pose.camera)}</span>
          <div class="pose-caption"><strong>${escapeHTML(pose.caption)}</strong><span>${escapeHTML(pose.location)}</span></div>
        </div>
        <div class="pose-detail">${poseDetailMarkup(pose)}</div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="pose-regenerate">换一个 Pose</button>
          <button class="mini-action" type="button" data-action="pose-copy">复制拍摄要点</button>
        </div>
      </div>
    `;
  }

  function storyWaveMarkup() {
    const heights = [6, 11, 8, 14, 7, 12, 5, 13, 9, 15, 7, 11, 6, 12];
    return heights.map((height, index) => `<i style="--h:${height}px;--delay:${(index * 0.06).toFixed(2)}s"></i>`).join("");
  }

  function renderStory(response) {
    return `
      <div class="travel-card story-response" data-response="story">
        <div class="response-head"><span class="response-badge"><i></i>${escapeHTML(response.badge)}</span><span class="response-meta">${escapeHTML(response.meta)}</span></div>
        <div class="story-player">
          <div class="story-cover">
            <button class="story-play" type="button" data-action="story-play" aria-label="播放语音故事">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10-6.5L8 5.5Z"/></svg>
            </button>
            <div class="story-mid"><strong>${escapeHTML(response.title)}</strong><div class="story-wave" data-story-wave>${storyWaveMarkup()}</div></div>
            <span class="story-duration">${escapeHTML(response.duration)}</span>
          </div>
          <p class="story-text">${escapeHTML(response.text)}</p>
        </div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="story-play">播放语音故事</button>
          <button class="mini-action" type="button" data-action="story-stop">停止播放</button>
          <button class="mini-action" type="button" data-action="story-copy">复制故事</button>
        </div>
      </div>
    `;
  }

  function renderOutfit(response) {
    return `
      <div class="travel-card outfit-response" data-response="outfit">
        <div class="response-head"><span class="response-badge"><i></i>${escapeHTML(response.badge)}</span><span class="response-meta">${escapeHTML(response.meta)}</span></div>
        <div class="response-body"><h4 class="response-title">${escapeHTML(response.title)}</h4><p class="response-sub">${escapeHTML(response.subtitle)}</p></div>
        <div class="outfit-grid">
          ${response.outfits.map((outfit) => `
            <article class="outfit-item"><span>${escapeHTML(outfit.time)}</span><strong>${escapeHTML(outfit.name)}</strong><p>${escapeHTML(outfit.items)}</p><div class="palette">${outfit.palette.map((color) => `<i style="--c:${color}"></i>`).join("")}</div></article>
          `).join("")}
        </div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="pack-outfit">加入行李清单</button>
          <button class="mini-action" type="button" data-action="copy-outfit">复制穿搭建议</button>
        </div>
      </div>
    `;
  }

  function copyTextMarkup(response, setIndex, tone) {
    return escapeHTML(response.sets[setIndex][tone]).replaceAll("\n", "<br>");
  }

  function renderCopy(response) {
    const tone = response.tone;
    return `
      <div class="travel-card copy-response" data-response="copy" data-copy-set="${response.setIndex}" data-tone="${tone}">
        <div class="response-head"><span class="response-badge"><i></i>${escapeHTML(response.badge)}</span><span class="response-meta">${escapeHTML(response.meta)}</span></div>
        <div class="response-body"><h4 class="response-title">${escapeHTML(response.title)}</h4><p class="response-sub">${escapeHTML(response.subtitle)}</p></div>
        <div class="tone-tabs">
          <button class="tone-tab ${tone === "healing" ? "active" : ""}" type="button" data-action="tone" data-tone="healing">治愈</button>
          <button class="tone-tab ${tone === "literary" ? "active" : ""}" type="button" data-action="tone" data-tone="literary">文艺</button>
          <button class="tone-tab ${tone === "funny" ? "active" : ""}" type="button" data-action="tone" data-tone="funny">搞怪</button>
        </div>
        <div class="copy-text" data-copy-content>${copyTextMarkup(response, response.setIndex, tone)}</div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="copy-text">复制文案</button>
          <button class="mini-action" type="button" data-action="regen-copy">换一组</button>
        </div>
      </div>
    `;
  }

  function renderItinerary(response) {
    return `
      <div class="travel-card itinerary-response" data-response="itinerary">
        <div class="response-head"><span class="response-badge"><i></i>${escapeHTML(response.badge)}</span><span class="response-meta">${escapeHTML(response.meta)}</span></div>
        <div class="response-body"><h4 class="response-title">${escapeHTML(response.title)}</h4><p class="response-sub">${escapeHTML(response.subtitle)}</p></div>
        <div class="day-list">
          ${response.days.map((day) => `
            <div class="day-item"><span>${escapeHTML(day.day)}</span><div><strong>${escapeHTML(day.title)}</strong><p>${escapeHTML(day.desc)}</p></div><em>${escapeHTML(day.tag)}</em></div>
          `).join("")}
        </div>
        <div class="response-actions">
          <button class="mini-action primary" type="button" data-action="copy-itinerary">复制行程</button>
          <button class="mini-action" type="button" data-action="add-plan">加入行程日历</button>
        </div>
      </div>
    `;
  }

  function renderResponse(response) {
    const renderers = {
      weather: renderWeather,
      pose: renderPose,
      story: renderStory,
      outfit: renderOutfit,
      copy: renderCopy,
      itinerary: renderItinerary
    };
    return (renderers[response.intent] || renderItinerary)(response);
  }

  function replaceTypingWithResponse(typingNode, response) {
    const main = typingNode.querySelector(".message-main");
    main.innerHTML = `
      <div class="message-meta"><strong>小旅伴</strong><span>刚刚</span><em>${escapeHTML(response.workflow.toUpperCase())}</em></div>
      ${renderResponse(response)}
    `;
    scrollChatToBottom();
  }

  async function simulateRoute(response) {
    const start = performance.now();
    setRouteStatus("running", "ROUTING");
    el.mainAgentNode.classList.add("active");
    el.currentIntent.textContent = "解析旅行意图…";
    el.routeLatency.textContent = "—";
    el.routeLog.innerHTML = "";
    appendRouteEntry("MAIN AGENT", "收到请求，正在理解用户意图与当前行程上下文。", 0);
    await sleep(260);

    el.currentIntent.textContent = `识别为「${response.label}」 → ${response.workflow}`;
    appendRouteEntry("ROUTER", `意图匹配「${response.label}」，准备交给 ${response.agentName}。`, performance.now() - start);
    await sleep(260);

    const node = document.querySelector(`.subagent[data-agent="${response.intent}"]`);
    if (node) node.classList.add("active");
    const tools = Array.isArray(response.tools) ? response.tools : [];
    appendRouteEntry("ROUTER", `加载子工作流 ${response.workflow}，挂载 ${tools.length} 个工具。`, performance.now() - start);
    await sleep(360);

    appendRouteEntry("TOOL", `调用 ${tools.join(" · ") || "LLM"}，开始生成旅行卡片。`, performance.now() - start);
    await sleep(420);

    if (node) {
      node.classList.remove("active");
      node.classList.add("done");
    }
    el.mainAgentNode.classList.remove("active");
    el.routeLatency.textContent = response.meta.split(" · ")[0];
    appendRouteEntry("MAIN AGENT", `已聚合「${response.label}」结果，返回统一聊天卡片。`, performance.now() - start);
    setRouteStatus("done", "DONE");
  }

  async function sendMessage(text, forcedIntent) {
    if (state.running) return;
    const query = String(text || "").trim();
    if (!query) {
      showToast("先告诉小旅伴你想做什么吧");
      return;
    }

    cancelAutoRun();
    stopStory();
    const intent = forcedIntent || inferIntent(query);
    const response = responseForIntent(intent, query);
    state.currentIntent = intent;
    setBusy(true);
    appendUserMessage(query);
    const typing = appendTypingMessage(response);
    el.travelInput.value = "";
    resetRoute();

    const routePromise = simulateRoute(response);
    await sleep(1500 + Math.random() * 500);
    replaceTypingWithResponse(typing, response);
    try {
      await routePromise;
    } catch (error) {
      setRouteStatus("", "DEGRADED");
      appendRouteEntry("SYSTEM", "路由轨迹回放中断，已保留当前结果卡片。", 0, true);
    }
    setBusy(false);
    el.travelInput.focus();
    showToast(`主 Agent 已将请求路由至 ${response.workflow}`);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        area.remove();
      }
    });
  }

  async function copyAndToast(text, message) {
    try {
      await copyText(text);
      showToast(message || "已复制到剪贴板");
    } catch (error) {
      showToast("复制失败，请手动选择文字");
    }
  }

  function resetStoryPlayback(card) {
    if (!card) return;
    const wave = card.querySelector("[data-story-wave]");
    if (wave) wave.classList.remove("playing");
    const playButton = card.querySelector(".story-play");
    if (playButton) {
      playButton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10-6.5L8 5.5Z"/></svg>';
      playButton.setAttribute("aria-label", "播放语音故事");
    }
    card.querySelectorAll('[data-action="story-play"]').forEach((button) => {
      if (!button.classList.contains("story-play")) button.textContent = "播放语音故事";
    });
  }

  function stopStory() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    resetStoryPlayback(state.speakingCard);
    state.speakingCard = null;
    state.currentSpeech = null;
  }

  function toggleStory(card) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      showToast("当前浏览器不支持语音播报，可先阅读故事文字");
      return;
    }

    if (state.speakingCard === card && window.speechSynthesis.speaking) {
      stopStory();
      return;
    }

    stopStory();
    const story = RESPONSES.story;
    const utterance = new SpeechSynthesisUtterance(story.narration);
    utterance.lang = "zh-CN";
    utterance.rate = 0.88;
    utterance.pitch = 1.02;
    utterance.onend = () => {
      resetStoryPlayback(card);
      if (state.speakingCard === card) {
        state.speakingCard = null;
        state.currentSpeech = null;
      }
    };
    utterance.onerror = () => {
      resetStoryPlayback(card);
      showToast("语音播放未完成，可检查浏览器语音设置");
    };
    state.speakingCard = card;
    state.currentSpeech = utterance;
    card.querySelector("[data-story-wave]").classList.add("playing");
    const playButton = card.querySelector(".story-play");
    if (playButton) {
      playButton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
      playButton.setAttribute("aria-label", "暂停语音故事");
    }
    card.querySelectorAll('[data-action="story-play"]').forEach((button) => {
      if (!button.classList.contains("story-play")) button.textContent = "暂停播放";
    });
    window.speechSynthesis.speak(utterance);
    showToast("语音故事开始播放");
  }

  function regeneratePose(card) {
    const response = RESPONSES.pose;
    const current = Number(card.dataset.poseIndex || 0);
    const next = (current + 1) % response.poses.length;
    const pose = response.poses[next];
    const seed = Math.random().toString(36).slice(2, 8);
    card.dataset.poseIndex = String(next);
    card.dataset.poseSeed = seed;
    card.querySelector(".pose-art").innerHTML = `
      ${poseArtMarkup(pose, next, seed)}
      <span class="pose-frame-corner tl"></span><span class="pose-frame-corner tr"></span><span class="pose-frame-corner bl"></span><span class="pose-frame-corner br"></span>
      <span class="pose-chip">POSE 0${next + 1} · ${escapeHTML(pose.camera)}</span>
      <div class="pose-caption"><strong>${escapeHTML(pose.caption)}</strong><span>${escapeHTML(pose.location)}</span></div>
    `;
    card.querySelector(".pose-detail").innerHTML = poseDetailMarkup(pose);
    showToast(`已切换为 Pose 0${next + 1}：${pose.title}`);
  }

  function updateCopyCard(card, setIndex, tone) {
    const response = RESPONSES.copy;
    card.dataset.copySet = String(setIndex);
    card.dataset.tone = tone;
    card.querySelector("[data-copy-content]").innerHTML = copyTextMarkup(response, setIndex, tone);
    card.querySelectorAll(".tone-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tone === tone));
  }

  el.chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(el.travelInput.value);
  });

  el.travelInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      el.chatForm.requestSubmit();
    }
  });

  el.quickActions.forEach((button) => {
    button.addEventListener("click", () => {
      if (state.running) return;
      cancelAutoRun();
      const intent = button.dataset.intent;
      const response = RESPONSES[intent];
      el.travelInput.value = response.prompt;
      sendMessage(response.prompt, intent);
    });
  });

  el.chatMessages.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    const card = actionEl.closest(".travel-card");

    if (action === "copy-weather") {
      const response = RESPONSES.weather;
      copyAndToast(`${response.title}\n${response.weather.date} · ${response.weather.location}\n${response.forecast.map((day) => `${day.day} ${day.high}/${day.low} ${day.note}`).join("；")}\n${response.advice}`, "天气建议已复制");
      return;
    }

    if (action === "add-plan") {
      showToast("已加入明日行程：15:00 后环洱海，日落前抵达海舌公园");
      return;
    }

    if (action === "pose-regenerate") {
      if (card) regeneratePose(card);
      return;
    }

    if (action === "pose-copy") {
      if (!card) return;
      const pose = RESPONSES.pose.poses[Number(card.dataset.poseIndex || 0)];
      copyAndToast(`${pose.title} · ${pose.location}\n${pose.description}\n拍摄参数：${pose.camera}`, "拍摄要点已复制");
      return;
    }

    if (action === "story-play") {
      if (card) toggleStory(card);
      return;
    }

    if (action === "story-stop") {
      stopStory();
      showToast("语音故事已停止");
      return;
    }

    if (action === "story-copy") {
      copyAndToast(`${RESPONSES.story.title}\n\n${RESPONSES.story.text}`, "故事文字已复制");
      return;
    }

    if (action === "pack-outfit") {
      actionEl.textContent = "已加入行李清单";
      actionEl.disabled = true;
      showToast("穿搭建议已加入行李清单");
      return;
    }

    if (action === "copy-outfit") {
      const text = RESPONSES.outfit.outfits.map((outfit) => `${outfit.time}｜${outfit.name}：${outfit.items}`).join("\n");
      copyAndToast(`${RESPONSES.outfit.title}\n${text}`, "穿搭建议已复制");
      return;
    }

    if (action === "tone") {
      if (!card) return;
      updateCopyCard(card, Number(card.dataset.copySet || 0), actionEl.dataset.tone);
      return;
    }

    if (action === "regen-copy") {
      if (!card) return;
      const nextSet = (Number(card.dataset.copySet || 0) + 1) % RESPONSES.copy.sets.length;
      updateCopyCard(card, nextSet, card.dataset.tone || "healing");
      showToast("朋友圈文案已换一组");
      return;
    }

    if (action === "copy-text") {
      if (!card) return;
      const content = card.querySelector("[data-copy-content]");
      if (content) copyAndToast(content.innerText, "朋友圈文案已复制");
      return;
    }

    if (action === "copy-itinerary") {
      const text = RESPONSES.itinerary.days.map((day) => `${day.day}｜${day.title}\n${day.desc}`).join("\n\n");
      copyAndToast(`${RESPONSES.itinerary.title}\n\n${text}`, "行程已复制");
    }
  });

  el.clearChat.addEventListener("click", () => {
    if (state.running) {
      showToast("当前正在路由中，请稍后再重新开始");
      return;
    }
    cancelAutoRun();
    stopStory();
    el.chatMessages.innerHTML = WELCOME_MARKUP;
    el.travelInput.value = "";
    resetRoute();
    showToast("已重新开始一段旅程");
    el.travelInput.focus();
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".main-nav a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Auto-play one travel request so the link has a meaningful result on open.
  state.autoTimer = window.setTimeout(() => {
    if (document.visibilityState !== "hidden") {
      el.travelInput.value = RESPONSES.weather.prompt;
      sendMessage(RESPONSES.weather.prompt, "weather");
    }
  }, 850);
})();

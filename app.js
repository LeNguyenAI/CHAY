const STORAGE_KEY = "chay-state-v1";

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TODAY = getDateKey();

const roleLabels = {
  content: "Content / Social",
  ads: "Paid Ads",
  seo: "SEO",
  strategy: "Strategy / Branding",
  email: "Email / CRM"
};

const goalLabels = {
  delivery: "giao việc đều",
  clients: "kiếm khách mới",
  discipline: "giữ kỷ luật",
  burnout: "giữ sức bền"
};

const defaultQuotes = [
  "Làm trước rồi mới có động lực. Đừng đợi não thuyết phục bạn.",
  "Bản đầu tiên chưa cần hay. Chỉ cần viết ra để còn sửa.",
  "Hôm nay không cần làm quá nhiều. Chỉ cần xong một việc thật sự quan trọng.",
  "Nếu đang né việc, hãy làm nó nhỏ lại: mở file, viết một dòng, gửi một tin nhắn.",
  "Người làm sáng tạo không thiếu ý tưởng. Thứ cần là một khoảng yên để bắt đầu.",
  "Không cần hoàn hảo. Chỉ cần bật lên và CHẠY."
];

const nudges = {
  low: "Đừng ép mình thành người siêu năng suất. Chọn một bước nhỏ, chạy 15 phút, tạo đà trước.",
  steady: "Bạn đang đủ ổn để làm việc thật. Chọn một đầu ra cụ thể và để RUN MODE giữ nhịp.",
  sharp: "Dùng phiên đầu cho việc có lực nhất: concept, hook, proposal, strategy hoặc phần khách hàng sẽ thấy."
};

const energyTaskPrefix = {
  low: "Bản tối giản:",
  steady: "Hoàn thành:",
  sharp: "Đẩy mạnh:"
};

const smartTaskMap = {
  content: [
    "Chốt một insight hoặc angle chính",
    "Viết 5 hook có thể dùng ngay",
    "Soạn bản nháp đầu tiên để sửa tiếp"
  ],
  ads: [
    "Chọn một chỉ số đang cần tối ưu",
    "Viết một giả thuyết test rõ ràng",
    "Tạo 2 biến thể copy hoặc creative"
  ],
  seo: [
    "Chốt keyword và intent chính",
    "Lập outline H2/H3 đủ để viết",
    "Thêm CTA và 3 internal link cần dùng"
  ],
  strategy: [
    "Viết vấn đề chính của khách trong 1 câu",
    "Phác 3 hướng xử lý có thể trình bày",
    "Chốt next step khách cần thấy hôm nay"
  ],
  email: [
    "Chọn segment và mục tiêu email",
    "Viết subject + preview text",
    "Soạn bản nháp email đầu tiên"
  ]
};

const outputNouns = {
  content: "bản nháp nội dung đầu tiên",
  ads: "một giả thuyết test kèm 2 biến thể quảng cáo",
  seo: "outline SEO có thể bắt đầu viết",
  strategy: "hướng chiến lược đủ rõ để gửi hoặc trình bày",
  email: "bản nháp email có subject và nội dung chính"
};

const defaultTemplates = [
  {
    id: "content",
    icon: "✍",
    title: "Content sprint",
    note: "Tạo nội dung có thể đăng hoặc gửi khách.",
    tasks: ["Research insight và angle chính", "Viết 5 hook hoặc outline", "Soạn bản nháp đầu tiên"]
  },
  {
    id: "ads",
    icon: "📈",
    title: "Ads optimize",
    note: "Rà KPI và tạo hành động tối ưu.",
    tasks: ["Kiểm tra CPA, CTR, ROAS", "Chọn 1 giả thuyết test", "Viết 2 biến thể creative/copy"]
  },
  {
    id: "seo",
    icon: "🔎",
    title: "SEO brief",
    note: "Biến keyword thành outline rõ ràng.",
    tasks: ["Chọn keyword và intent", "Lập outline H2/H3", "Thêm internal link và CTA"]
  },
  {
    id: "client",
    icon: "💼",
    title: "Client delivery",
    note: "Dọn việc khách cần thấy hôm nay.",
    tasks: ["Chốt đầu ra cần bàn giao", "Hoàn thiện file/report chính", "Gửi update ngắn cho khách"]
  },
  {
    id: "growth",
    icon: "🚀",
    title: "Get clients",
    note: "Tạo pipeline để không phụ thuộc một khách.",
    tasks: ["Cập nhật 1 case study", "Gửi 3 follow-up chất lượng", "Đăng 1 insight thể hiện chuyên môn"]
  },
  {
    id: "strategy",
    icon: "◆",
    title: "Strategy deck",
    note: "Biến suy nghĩ rời rạc thành hướng đi rõ.",
    tasks: ["Chốt insight và vấn đề chính", "Phác 3 hướng chiến lược", "Viết next step cho khách"]
  },
  {
    id: "email",
    icon: "✉",
    title: "Email / CRM",
    note: "Tạo luồng chăm sóc hoặc bán hàng gọn.",
    tasks: ["Chọn segment và mục tiêu email", "Viết subject + preview", "Soạn bản nháp email đầu tiên"]
  }
];

const rescueSteps = [
  "Mở đúng file cần làm. Chỉ mở thôi cũng được, nhưng mở ngay.",
  "Viết 3 ý ngắn, chưa cần hay. Có chữ trên màn hình là đã bắt đầu.",
  "Chọn đúng một khách hàng hoặc một việc. Đừng ôm quá nhiều trong một phiên.",
  "Đặt timer 15 phút và làm phần dễ nhất: tiêu đề, dàn ý, số liệu hoặc tin nhắn cập nhật.",
  "Tự hứa: cuối phiên này mình chỉ cần có bản nháp để sửa tiếp."
];

const defaultState = {
  date: TODAY,
  tasks: [],
  logs: [],
  streak: 0,
  lastCompletedDate: "",
  energy: "steady",
  quoteIndex: 0,
  commitment: "",
  selectedTemplate: "",
  profile: {
    onboarded: false,
    role: "content",
    goal: "delivery",
    rhythm: "morning"
  },
  command: {
    money: "",
    delivery: "",
    asset: "",
    selfcare: ""
  },
  commandLabels: {
    money: "Tiền / khách mới",
    delivery: "Deadline / bàn giao",
    asset: "Xây tài sản",
    selfcare: "Giữ năng lượng"
  },
  quotes: [],
  templates: [],
  metrics: {}
};

let state = loadState();
let audioContext;
let timer = {
  duration: 25 * 60,
  remaining: 25 * 60,
  running: false,
  interval: null
};

const el = {
  onboardingModal: document.querySelector("#onboardingModal"),
  roleSelect: document.querySelector("#roleSelect"),
  goalSelect: document.querySelector("#goalSelect"),
  rhythmSelect: document.querySelector("#rhythmSelect"),
  finishOnboardingButton: document.querySelector("#finishOnboardingButton"),
  skipOnboardingButton: document.querySelector("#skipOnboardingButton"),
  editProfileButton: document.querySelector("#editProfileButton"),
  openSettingsButton: document.querySelector("#openSettingsButton"),
  profileChip: document.querySelector("#profileChip"),
  todayLabel: document.querySelector("#todayLabel"),
  focusScore: document.querySelector("#focusScore"),
  streakDays: document.querySelector("#streakDays"),
  todayProgressText: document.querySelector("#todayProgressText"),
  heroProgress: document.querySelector("#heroProgress"),
  heroSprints: document.querySelector("#heroSprints"),
  heroRunStatus: document.querySelector("#heroRunStatus"),
  heroCommitmentPreview: document.querySelector("#heroCommitmentPreview"),
  dailyQuote: document.querySelector("#dailyQuote"),
  newQuoteButton: document.querySelector("#newQuoteButton"),
  startDayButton: document.querySelector("#startDayButton"),
  energyOptions: document.querySelector("#energyOptions"),
  energyNudge: document.querySelector("#energyNudge"),
  moneyInput: document.querySelector("#moneyInput"),
  deliveryInput: document.querySelector("#deliveryInput"),
  assetInput: document.querySelector("#assetInput"),
  selfcareInput: document.querySelector("#selfcareInput"),
  moneyLabelText: document.querySelector("#moneyLabelText"),
  deliveryLabelText: document.querySelector("#deliveryLabelText"),
  assetLabelText: document.querySelector("#assetLabelText"),
  selfcareLabelText: document.querySelector("#selfcareLabelText"),
  saveCommandButton: document.querySelector("#saveCommandButton"),
  templateGrid: document.querySelector("#templateGrid"),
  templateFeedback: document.querySelector("#templateFeedback"),
  taskForm: document.querySelector("#taskForm"),
  taskInput: document.querySelector("#taskInput"),
  taskList: document.querySelector("#taskList"),
  clearDoneButton: document.querySelector("#clearDoneButton"),
  durationSelect: document.querySelector("#durationSelect"),
  timerRing: document.querySelector("#timerRing"),
  timerDisplay: document.querySelector("#timerDisplay"),
  timerState: document.querySelector("#timerState"),
  timerToggleButton: document.querySelector("#timerToggleButton"),
  timerResetButton: document.querySelector("#timerResetButton"),
  focusModeButton: document.querySelector("#focusModeButton"),
  rescueButton: document.querySelector("#rescueButton"),
  rescueOutput: document.querySelector("#rescueOutput"),
  commitmentInput: document.querySelector("#commitmentInput"),
  saveCommitmentButton: document.querySelector("#saveCommitmentButton"),
  weekSprints: document.querySelector("#weekSprints"),
  weekTasks: document.querySelector("#weekTasks"),
  weekEnergy: document.querySelector("#weekEnergy"),
  weekInsight: document.querySelector("#weekInsight"),
  activityLog: document.querySelector("#activityLog"),
  focusOverlay: document.querySelector("#focusOverlay"),
  closeFocusButton: document.querySelector("#closeFocusButton"),
  focusTimerDisplay: document.querySelector("#focusTimerDisplay"),
  focusCommitmentText: document.querySelector("#focusCommitmentText"),
  focusToggleButton: document.querySelector("#focusToggleButton"),
  focusRescueButton: document.querySelector("#focusRescueButton"),
  settingsModal: document.querySelector("#settingsModal"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  quoteSettingsInput: document.querySelector("#quoteSettingsInput"),
  templateSettingsSelect: document.querySelector("#templateSettingsSelect"),
  templateTitleInput: document.querySelector("#templateTitleInput"),
  templateNoteInput: document.querySelector("#templateNoteInput"),
  templateTaskInputs: document.querySelectorAll(".templateTaskInput"),
  moneyLabelInput: document.querySelector("#moneyLabelInput"),
  deliveryLabelInput: document.querySelector("#deliveryLabelInput"),
  assetLabelInput: document.querySelector("#assetLabelInput"),
  selfcareLabelInput: document.querySelector("#selfcareLabelInput"),
  resetTodayButton: document.querySelector("#resetTodayButton"),
  resetSettingsButton: document.querySelector("#resetSettingsButton"),
  saveSettingsButton: document.querySelector("#saveSettingsButton"),
  scrollTopButton: document.querySelector("#scrollTopButton"),
  guideModal: document.querySelector("#guideModal"),
  openGuideButton: document.querySelector("#openGuideButton"),
  closeGuideButton: document.querySelector("#closeGuideButton")
};

function loadState() {
  const previous = JSON.parse(localStorage.getItem("work-pulse-state-v2") || "null");
  const legacy = JSON.parse(localStorage.getItem("work-pulse-state-v1") || "null");
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || previous || legacy;
  const merged = {
    ...defaultState,
    ...(saved || {}),
    profile: { ...defaultState.profile, ...((saved || {}).profile || {}) },
    command: { ...defaultState.command, ...((saved || {}).command || {}) },
    commandLabels: { ...defaultState.commandLabels, ...((saved || {}).commandLabels || {}) },
    quotes: Array.isArray((saved || {}).quotes) && (saved || {}).quotes.length ? (saved || {}).quotes : [...defaultQuotes],
    templates: Array.isArray((saved || {}).templates) && (saved || {}).templates.length ? (saved || {}).templates : cloneTemplates(defaultTemplates),
    metrics: { ...((saved || {}).metrics || {}) }
  };

  if (merged.date !== TODAY) {
    return {
      ...merged,
      date: TODAY,
      tasks: [],
      command: { ...defaultState.command },
      commitment: "",
      quoteIndex: Math.floor(Math.random() * merged.quotes.length),
      logs: [
        {
          at: new Date().toISOString(),
          text: "Ngày mới đã mở. Chọn 3 việc đáng làm nhất rồi vào sprint đầu tiên."
        },
        ...(merged.logs || []).slice(0, 8)
      ]
    };
  }

  return merged;
}

function cloneTemplates(source) {
  return source.map((template) => ({
    ...template,
    tasks: [...template.tasks]
  }));
}

function roleForSuggestions() {
  return smartTaskMap[state.profile.role] ? state.profile.role : "content";
}

function getSmartTasks(role = roleForSuggestions(), energy = state.energy) {
  const baseTasks = smartTaskMap[role] || smartTaskMap.content;
  if (energy === "steady") return [...baseTasks];

  return baseTasks.map((task, index) => {
    if (energy === "low" && index === 0) return `${energyTaskPrefix.low} ${task.toLowerCase()}`;
    if (energy === "sharp" && index === 2) return `${energyTaskPrefix.sharp} ${task.toLowerCase()}`;
    return task;
  });
}

function makeCommitment(role = roleForSuggestions(), energy = state.energy) {
  const output = outputNouns[role] || outputNouns.content;
  const pace = energy === "low"
    ? "bản nhỏ nhất có thể sửa tiếp"
    : energy === "sharp"
      ? "bản đủ lực để gửi feedback hoặc triển khai ngay"
      : "bản rõ ràng để tiếp tục hoặc gửi feedback";
  return `Cuối phiên này tôi sẽ có ${output}: ${pace}.`;
}

function applySmartPlan(options = {}) {
  const { overwrite = false, log = true } = options;
  if (!overwrite && (state.tasks.length || state.commitment)) return;

  const role = roleForSuggestions();
  state.selectedTemplate = "";
  state.tasks = getSmartTasks(role).map((task) => ({
    id: makeId(),
    text: task,
    done: false
  }));
  state.commitment = makeCommitment(role);

  if (log) addLog(`CHẠY đã gợi ý 3 bước nhỏ cho ${roleLabels[role]}.`);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayMetrics() {
  if (!state.metrics[TODAY]) {
    state.metrics[TODAY] = {
      sprints: 0,
      tasksDone: 0,
      energy: state.energy,
      commitments: 0
    };
  }
  return state.metrics[TODAY];
}

function saveAndRender() {
  saveState();
  render();
}

function formatDate() {
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date());
}

function render() {
  el.todayLabel.textContent = formatDate();
  const activeQuotes = state.quotes.length ? state.quotes : defaultQuotes;
  el.dailyQuote.textContent = activeQuotes[state.quoteIndex % activeQuotes.length];
  el.energyNudge.textContent = nudges[state.energy];
  el.commitmentInput.value = state.commitment;
  el.moneyInput.value = state.command.money;
  el.deliveryInput.value = state.command.delivery;
  el.assetInput.value = state.command.asset;
  el.selfcareInput.value = state.command.selfcare;
  el.roleSelect.value = state.profile.role;
  el.goalSelect.value = state.profile.goal;
  el.rhythmSelect.value = state.profile.rhythm;
  el.profileChip.textContent = `${roleLabels[state.profile.role]} · ${goalLabels[state.profile.goal]}`;
  el.moneyLabelText.textContent = state.commandLabels.money;
  el.deliveryLabelText.textContent = state.commandLabels.delivery;
  el.assetLabelText.textContent = state.commandLabels.asset;
  el.selfcareLabelText.textContent = state.commandLabels.selfcare;

  document.querySelectorAll(".energy-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.energy === state.energy);
  });

  renderTemplates();
  renderTasks();
  renderStats();
  renderWeeklyReview();
  renderLog();
  updateTimerDisplay();
  syncFocusView();
  toggleOnboarding(!state.profile.onboarded);
}

function toggleOnboarding(show) {
  el.onboardingModal.classList.toggle("show", show);
  el.onboardingModal.setAttribute("aria-hidden", show ? "false" : "true");
}

function renderTemplates() {
  el.templateGrid.innerHTML = "";
  state.templates.forEach((template) => {
    const button = document.createElement("button");
    button.className = `template-card ${state.selectedTemplate === template.id ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="template-icon" aria-hidden="true">${template.icon}</span>
      <span>
        <strong>${template.title}</strong>
        <span>${template.note}</span>
      </span>
    `;
    button.addEventListener("click", () => applyTemplate(template.id));
    el.templateGrid.append(button);
  });
  renderTemplateFeedback();
}

function renderTemplateFeedback() {
  const template = state.templates.find((item) => item.id === state.selectedTemplate);
  if (!template) {
    if (state.tasks.length) {
      el.templateFeedback.innerHTML = `
        <strong>Đã có gợi ý theo hồ sơ của bạn.</strong>
        <span>3 bước nhỏ bên dưới được tạo từ kiểu việc ${roleLabels[roleForSuggestions()]} và mức năng lượng hiện tại.</span>
      `;
      return;
    }

    el.templateFeedback.innerHTML = `
      <strong>Chưa chọn mẫu nào.</strong>
      <span>Bấm Bật mode CHẠY để app tự tạo 3 việc chính và cam kết đầu ra cho bạn.</span>
    `;
    return;
  }

  el.templateFeedback.innerHTML = `
    <strong>Đã tạo checklist từ ${template.title}.</strong>
    <span>3 việc chính ở bên dưới đã được thay bằng workflow này.</span>
    <button class="ghost-button jump-to-tasks-button" type="button">
      <span class="button-icon" aria-hidden="true">↓</span>
      Xem checklist
    </button>
  `;
  el.templateFeedback.querySelector(".jump-to-tasks-button").addEventListener("click", () => {
    document.querySelector("#taskPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderTasks() {
  el.taskList.innerHTML = "";

  if (!state.tasks.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "Thêm tối đa 3 việc chính hoặc bấm một mẫu việc để có checklist ngay.";
    el.taskList.append(empty);
    return;
  }

  state.tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item ${task.done ? "done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "task-check";
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Đánh dấu xong: ${task.text}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.className = "delete-task";
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Xóa việc: ${task.text}`);
    remove.addEventListener("click", () => removeTask(task.id));

    item.append(checkbox, text, remove);
    el.taskList.append(item);
  });
}

function renderStats() {
  const completed = state.tasks.filter((task) => task.done).length;
  const total = Math.max(state.tasks.length, 3);
  const score = Math.round((completed / total) * 100);
  const metrics = todayMetrics();
  el.focusScore.textContent = `${score}%`;
  el.streakDays.textContent = String(state.streak || 0);
  el.heroProgress.textContent = `${completed}/${total}`;
  el.heroSprints.textContent = String(metrics.sprints || 0);
  el.heroRunStatus.textContent = metrics.sprints
    ? "Đã có bằng chứng hôm nay"
    : "Sẵn sàng trong 1 click";
  el.todayProgressText.textContent = metrics.sprints
    ? `Hôm nay đã có ${metrics.sprints} sprint. Mai chỉ cần quay lại và bật tiếp.`
    : "Bắt đầu một sprint là ngày hôm nay đã có bằng chứng.";
  el.heroCommitmentPreview.textContent = state.commitment || makeCommitment();
}

function renderWeeklyReview() {
  const summary = getWeeklySummary();
  el.weekSprints.textContent = String(summary.sprints);
  el.weekTasks.textContent = String(summary.tasksDone);
  el.weekEnergy.textContent = summary.energyLabel;
  el.weekInsight.textContent = summary.insight;
}

function renderLog() {
  el.activityLog.innerHTML = "";

  if (!state.logs.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "Mỗi lần bạn bắt đầu ca, lưu cam kết hoặc hoàn thành sprint, tiến độ sẽ nằm ở đây.";
    el.activityLog.append(empty);
    return;
  }

  state.logs.slice(0, 7).forEach((log) => {
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.dateTime = log.at;
    time.textContent = new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(log.at));
    const text = document.createElement("span");
    text.textContent = log.text;
    item.append(time, text);
    el.activityLog.append(item);
  });
}

function getWeeklySummary() {
  const energyNames = { low: "Uể oải", steady: "Ổn định", sharp: "Sẵn sàng" };
  const counts = { low: 0, steady: 0, sharp: 0 };
  let sprints = 0;
  let tasksDone = 0;

  for (let index = 0; index < 7; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const metric = state.metrics[getDateKey(date)];
    if (!metric) continue;
    sprints += metric.sprints || 0;
    tasksDone += metric.tasksDone || 0;
    if (metric.energy) counts[metric.energy] += 1;
  }

  const hasEnergyData = Object.values(counts).some((count) => count > 0);
  const topEnergy = hasEnergyData
    ? Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    : state.energy;
  const todaySprint = state.metrics[TODAY]?.sprints || 0;
  const insight = sprints === 0
    ? "Tuần này chưa có phiên tập trung nào. Bắt đầu bằng 15 phút là đủ để tạo dữ liệu đầu tiên."
    : todaySprint
      ? `Hôm nay đã có ${todaySprint} sprint. Đóng phiên gọn, mai quay lại bật CHẠY tiếp.`
      : `Bạn đã có ${sprints} sprint trong 7 ngày gần nhất. Hôm nay chỉ cần thêm một phiên ngắn để giữ nhịp.`;

  return {
    sprints,
    tasksDone,
    energyLabel: energyNames[topEnergy],
    insight
  };
}

function addLog(text) {
  state.logs = [{ at: new Date().toISOString(), text }, ...state.logs].slice(0, 16);
  saveState();
}

function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addTask(text, shouldRender = true) {
  if (state.tasks.length >= 3) {
    addLog("Bạn đã có 3 việc chính. Hãy hoàn thành hoặc xóa bớt trước khi thêm việc mới.");
    if (shouldRender) render();
    return;
  }

  state.tasks.push({
    id: makeId(),
    text,
    done: false
  });

  if (shouldRender) saveAndRender();
}

function applyTemplate(templateId, options = {}) {
  const { scrollToTasks = true } = options;
  const template = state.templates.find((item) => item.id === templateId);
  if (!template) return;
  state.selectedTemplate = template.id;
  state.tasks = template.tasks.map((task) => ({ id: makeId(), text: task, done: false }));
  state.commitment = `Cuối phiên tôi sẽ có: ${template.note.toLowerCase()}`;
  addLog(`Đã áp dụng template: ${template.title}.`);
  saveAndRender();
  if (!scrollToTasks) return;
  window.setTimeout(() => {
    document.querySelector("#taskPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function toggleTask(id) {
  const before = state.tasks.find((item) => item.id === id);
  state.tasks = state.tasks.map((task) => {
    if (task.id !== id) return task;
    return { ...task, done: !task.done };
  });

  const after = state.tasks.find((item) => item.id === id);
  if (!before?.done && after?.done) {
    todayMetrics().tasksDone += 1;
    addLog(`Đã xong: ${after.text}`);
  }
  updateStreakIfNeeded();
  saveAndRender();
}

function removeTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveAndRender();
}

function updateStreakIfNeeded() {
  const completed = state.tasks.filter((task) => task.done).length;
  if (completed < 3 || state.lastCompletedDate === TODAY) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);
  state.streak = state.lastCompletedDate === yesterdayKey ? state.streak + 1 : 1;
  state.lastCompletedDate = TODAY;
  addLog("Bạn đã hoàn thành 3 việc chính hôm nay. Ngày này có bằng chứng rồi.");
}

function setEnergy(energy) {
  state.energy = energy;
  todayMetrics().energy = energy;
  saveAndRender();
}

function saveCommandCenter() {
  state.command = {
    money: el.moneyInput.value.trim(),
    delivery: el.deliveryInput.value.trim(),
    asset: el.assetInput.value.trim(),
    selfcare: el.selfcareInput.value.trim()
  };
  addLog("Đã lưu bảng thắng hôm nay.");
  saveAndRender();
}

function saveProfile() {
  state.profile = {
    onboarded: true,
    role: el.roleSelect.value,
    goal: el.goalSelect.value,
    rhythm: el.rhythmSelect.value
  };
  applySmartPlan({ overwrite: true, log: false });
  addLog(`Đã thiết lập hồ sơ cho ${roleLabels[state.profile.role]}.`);
  saveAndRender();
}

function skipOnboarding() {
  state.profile = {
    ...state.profile,
    onboarded: true
  };
  applySmartPlan({ overwrite: true, log: false });
  addLog("Đã dùng thiết lập mặc định. Có 3 bước nhỏ sẵn để bắt đầu.");
  saveAndRender();
}

function setDuration(minutes) {
  stopTimer("Sẵn sàng");
  timer.duration = Number(minutes) * 60;
  timer.remaining = timer.duration;
  updateTimerDisplay();
}

function toggleTimer() {
  if (timer.running) {
    stopTimer("Tạm nghỉ");
    return;
  }

  timer.running = true;
  el.timerState.textContent = "Đang tập trung";
  timer.interval = window.setInterval(() => {
    timer.remaining -= 1;
    if (timer.remaining <= 0) {
      timer.remaining = 0;
      completeSprint();
    }
    updateTimerDisplay();
  }, 1000);
  updateTimerButtons();
}

function completeSprint() {
  stopTimer("Đã xong");
  todayMetrics().sprints += 1;
  addLog(`Hoàn thành một sprint ${Math.round(timer.duration / 60)} phút. Đóng phiên gọn, mai quay lại bật CHẠY tiếp.`);
  playChime();
  saveAndRender();
}

function stopTimer(label = "Tạm nghỉ") {
  timer.running = false;
  window.clearInterval(timer.interval);
  timer.interval = null;
  el.timerState.textContent = timer.remaining === 0 ? "Đã xong" : label;
  updateTimerButtons();
}

function resetTimer() {
  stopTimer("Sẵn sàng");
  timer.remaining = timer.duration;
  updateTimerDisplay();
}

function updateTimerButtons() {
  const content = timer.running
    ? '<span class="button-icon" aria-hidden="true">Ⅱ</span> Tạm dừng'
    : '<span class="button-icon" aria-hidden="true">▶</span> Chạy';
  el.timerToggleButton.innerHTML = content;
  el.focusToggleButton.innerHTML = content;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timer.remaining / 60);
  const seconds = timer.remaining % 60;
  const value = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  el.timerDisplay.textContent = value;
  el.focusTimerDisplay.textContent = value;

  const circumference = 326.7;
  const progress = 1 - timer.remaining / timer.duration;
  el.timerRing.style.strokeDashoffset = String(circumference - circumference * progress);
}

function syncFocusView() {
  const commitment = state.commitment || "Viết cam kết bàn giao để não biết cần kết thúc ở đâu.";
  el.focusCommitmentText.textContent = commitment;
}

function toggleFocusMode(show) {
  syncFocusView();
  el.focusOverlay.classList.toggle("show", show);
  el.focusOverlay.setAttribute("aria-hidden", show ? "false" : "true");
}

function toggleSettings(show) {
  if (show) renderSettings();
  el.settingsModal.classList.toggle("show", show);
  el.settingsModal.setAttribute("aria-hidden", show ? "false" : "true");
}

function toggleGuide(show) {
  el.guideModal.classList.toggle("show", show);
  el.guideModal.setAttribute("aria-hidden", show ? "false" : "true");
}

function renderSettings() {
  el.quoteSettingsInput.value = state.quotes.join("\n");
  el.moneyLabelInput.value = state.commandLabels.money;
  el.deliveryLabelInput.value = state.commandLabels.delivery;
  el.assetLabelInput.value = state.commandLabels.asset;
  el.selfcareLabelInput.value = state.commandLabels.selfcare;

  el.templateSettingsSelect.innerHTML = "";
  state.templates.forEach((template) => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.title;
    el.templateSettingsSelect.append(option);
  });

  el.templateSettingsSelect.value = state.selectedTemplate || state.templates[0]?.id || "";
  renderSelectedTemplateSettings();
}

function renderSelectedTemplateSettings() {
  const template = state.templates.find((item) => item.id === el.templateSettingsSelect.value) || state.templates[0];
  if (!template) return;
  el.templateSettingsSelect.value = template.id;
  el.templateTitleInput.value = template.title;
  el.templateNoteInput.value = template.note;
  el.templateTaskInputs.forEach((input, index) => {
    input.value = template.tasks[index] || "";
  });
}

function saveSettings() {
  const quoteLines = el.quoteSettingsInput.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  state.quotes = quoteLines.length ? quoteLines : [...defaultQuotes];

  const templateId = el.templateSettingsSelect.value;
  state.templates = state.templates.map((template) => {
    if (template.id !== templateId) return template;
    const taskValues = Array.from(el.templateTaskInputs)
      .map((input) => input.value.trim())
      .filter(Boolean)
      .slice(0, 3);
    return {
      ...template,
      title: el.templateTitleInput.value.trim() || template.title,
      note: el.templateNoteInput.value.trim() || template.note,
      tasks: taskValues.length ? taskValues : template.tasks
    };
  });

  state.commandLabels = {
    money: el.moneyLabelInput.value.trim() || defaultState.commandLabels.money,
    delivery: el.deliveryLabelInput.value.trim() || defaultState.commandLabels.delivery,
    asset: el.assetLabelInput.value.trim() || defaultState.commandLabels.asset,
    selfcare: el.selfcareLabelInput.value.trim() || defaultState.commandLabels.selfcare
  };

  addLog("Đã lưu cài đặt cá nhân.");
  toggleSettings(false);
  saveAndRender();
}

function resetToday() {
  stopTimer("Sẵn sàng");
  timer.remaining = timer.duration;
  state.tasks = [];
  state.command = { ...defaultState.command };
  state.commitment = "";
  state.selectedTemplate = "";
  state.metrics[TODAY] = {
    sprints: 0,
    tasksDone: 0,
    energy: state.energy,
    commitments: 0
  };
  addLog("Đã reset dữ liệu hôm nay.");
  toggleSettings(false);
  saveAndRender();
}

function resetSettings() {
  state.quotes = [...defaultQuotes];
  state.templates = cloneTemplates(defaultTemplates);
  state.commandLabels = { ...defaultState.commandLabels };
  state.quoteIndex = 0;
  renderSettings();
  saveAndRender();
}

function activateRunMode() {
  if (!state.tasks.length) {
    applySmartPlan({ overwrite: true });
  }

  if (!state.commitment) {
    state.commitment = makeCommitment();
  }

  addLog("Đã bật RUN MODE: mở màn hình tập trung, chuẩn bị checklist và bắt đầu phiên chạy việc.");
  saveState();
  render();

  if (!timer.running) toggleTimer();
  toggleFocusMode(true);
  el.startDayButton.classList.add("is-running");
  el.startDayButton.innerHTML = '<span class="button-icon" aria-hidden="true">⚡</span> Đang CHẠY';
}

function rescue() {
  const smartSteps = getSmartTasks().map((task) => `Làm bản nhỏ nhất của việc này: ${task.toLowerCase()}.`);
  const pool = [...smartSteps, ...rescueSteps];
  const step = pool[Math.floor(Math.random() * pool.length)];
  addLog(`Bước nhỏ: ${step}`);
  state.commitment = step;
  el.rescueOutput.textContent = step;
  saveAndRender();
  el.rescueOutput.textContent = step;
}

function playChime() {
  try {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return;
    audioContext = audioContext || new AudioEngine();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 740;
    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.35);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.38);
  } catch {
    // Audio is optional; some browsers block it until user interaction.
  }
}

el.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = el.taskInput.value.trim();
  if (!text) return;
  addTask(text);
  el.taskInput.value = "";
});

el.clearDoneButton.addEventListener("click", () => {
  state.tasks = state.tasks.filter((task) => !task.done);
  saveAndRender();
});

el.energyOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-energy]");
  if (!button) return;
  setEnergy(button.dataset.energy);
});

el.newQuoteButton.addEventListener("click", () => {
  const activeQuotes = state.quotes.length ? state.quotes : defaultQuotes;
  state.quoteIndex = (state.quoteIndex + 1) % activeQuotes.length;
  saveAndRender();
});

el.startDayButton.addEventListener("click", () => {
  activateRunMode();
});

el.saveCommandButton.addEventListener("click", saveCommandCenter);
el.finishOnboardingButton.addEventListener("click", saveProfile);
el.skipOnboardingButton.addEventListener("click", skipOnboarding);
el.editProfileButton.addEventListener("click", () => toggleOnboarding(true));
el.openSettingsButton.addEventListener("click", () => toggleSettings(true));
el.closeSettingsButton.addEventListener("click", () => toggleSettings(false));
el.templateSettingsSelect.addEventListener("change", renderSelectedTemplateSettings);
el.saveSettingsButton.addEventListener("click", saveSettings);
el.resetTodayButton.addEventListener("click", resetToday);
el.resetSettingsButton.addEventListener("click", resetSettings);
el.scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  el.scrollTopButton.classList.toggle("is-visible", window.scrollY > 520);
}, { passive: true });

el.openGuideButton.addEventListener("click", () => toggleGuide(true));
el.closeGuideButton.addEventListener("click", () => toggleGuide(false));
el.durationSelect.addEventListener("change", (event) => setDuration(event.target.value));
el.timerToggleButton.addEventListener("click", toggleTimer);
el.focusToggleButton.addEventListener("click", toggleTimer);
el.timerResetButton.addEventListener("click", resetTimer);
el.focusModeButton.addEventListener("click", () => toggleFocusMode(true));
el.closeFocusButton.addEventListener("click", () => toggleFocusMode(false));
el.rescueButton.addEventListener("click", rescue);
el.focusRescueButton.addEventListener("click", rescue);

el.saveCommitmentButton.addEventListener("click", () => {
  state.commitment = el.commitmentInput.value.trim();
  if (state.commitment) {
    todayMetrics().commitments += 1;
    addLog(`Cam kết: ${state.commitment}`);
  }
  saveAndRender();
});

render();

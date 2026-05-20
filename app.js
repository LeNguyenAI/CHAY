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
  "Mở việc ra trước. Cảm giác rõ hơn sẽ đến sau.",
  "Bản đầu tiên được phép xấu. Nó chỉ cần tồn tại.",
  "Hôm nay chỉ cần một đầu ra nhỏ cũng đủ có đà.",
  "Nếu đang né việc, hãy làm nó nhỏ lại: mở file, viết một dòng, gửi một tin nhắn.",
  "Không cần nghĩ hết đường. Chỉ cần bước đầu tiên.",
  "Không cần hoàn hảo. Chỉ cần bật lên và CHẠY."
];

const nudges = {
  low: "Nhẹ thôi: mở file, viết 1 dòng, chạy 10 phút.",
  steady: "Chọn một đầu ra nhỏ. Bật RUN MODE.",
  sharp: "Lấy phần khách sẽ thấy. Làm bản đầu trước."
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
    id: "quick-win",
    icon: "⚡",
    title: "Quick win",
    note: "Một việc nhỏ để có đà ngay.",
    tasks: ["Gửi 1 follow-up", "Viết 3 bullet", "Mở file dang dở"]
  },
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

const quickWinStarts = [
  {
    task: "Viết 3 bullet đầu tiên.",
    commitment: "3 bullet nháp đủ để sửa tiếp.",
    step: "Mở file và viết 3 dòng thô."
  },
  {
    task: "Mở file dang dở.",
    commitment: "file dang dở đã được mở và có một chỉnh sửa nhỏ.",
    step: "Mở file. Chạm vào đúng chỗ cần sửa."
  },
  {
    task: "Sửa hook mở đầu.",
    commitment: "1 hook mở đầu rõ hơn bản cũ.",
    step: "Chỉ sửa câu đầu tiên."
  },
  {
    task: "Gửi 1 follow-up.",
    commitment: "1 tin nhắn follow-up đã được gửi hoặc soạn xong.",
    step: "Viết một tin nhắn 2 câu."
  },
  {
    task: "Chỉ làm 5 phút đầu.",
    commitment: "5 phút tiến lên, dù chỉ là bản nháp xấu.",
    step: "Bật timer và làm phần dễ nhất."
  }
];

const rescueSteps = [
  "Mở file cần làm.",
  "Viết 3 bullet đầu tiên.",
  "Chỉ làm 5 phút đầu.",
  "Viết bản nháp xấu trước.",
  "Gửi 1 follow-up ngắn.",
  "Sửa 1 hook trước.",
  "Dọn inbox 5 phút.",
  "Chọn 1 phần dễ nhất và làm ngay."
];

const contextualStepRules = [
  {
    match: ["landing", "page", "trang"],
    steps: ["Viết headline xấu trước.", "Viết 3 bullet đầu tiên.", "Phác CTA trong một dòng."]
  },
  {
    match: ["email", "mail"],
    steps: ["Viết subject trước.", "Viết 3 bullet nội dung email.", "Soạn đoạn mở đầu xấu trước."]
  },
  {
    match: ["reel", "video", "short"],
    steps: ["Viết hook 3 giây đầu.", "Gạch 3 cảnh chính.", "Chọn một insight duy nhất."]
  },
  {
    match: ["outline", "dàn ý", "seo", "brief"],
    steps: ["Viết 3 heading chính.", "Chốt intent trong một câu.", "Thêm CTA nháp cuối bài."]
  },
  {
    match: ["ads", "quảng cáo", "creative", "copy"],
    steps: ["Viết 1 giả thuyết test.", "Tạo 2 angle, mỗi angle một dòng.", "Chỉ sửa headline trước."]
  },
  {
    match: ["proposal", "khách", "client"],
    steps: ["Viết vấn đề của khách trong 1 câu.", "Gạch 3 việc sẽ làm.", "Soạn tin nhắn update ngắn."]
  }
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
    onboarded: true,
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
  metrics: {},
  session: null,
  lastDuration: 25,
  ambientSound: "off"
};

let state = loadState();
let audioContext;
let ambientAudio = null;
let timer = {
  duration: 25 * 60,
  remaining: 25 * 60,
  running: false
};
let timerInterval = null;

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
  streakCopy: document.querySelector("#streakCopy"),
  momentumOutputs: document.querySelector("#momentumOutputs"),
  heroProgress: document.querySelector("#heroProgress"),
  heroSprints: document.querySelector("#heroSprints"),
  heroRunStatus: document.querySelector("#heroRunStatus"),
  heroTimerDisplay: document.querySelector("#heroTimerDisplay"),
  heroCommitmentPreview: document.querySelector("#heroCommitmentPreview"),
  heroRescueButton: document.querySelector("#heroRescueButton"),
  heroRescueOutput: document.querySelector("#heroRescueOutput"),
  heroQuickWinButton: document.querySelector("#heroQuickWinButton"),
  heroDurationSelect: document.querySelector("#heroDurationSelect"),
  customDurationField: document.querySelector("#customDurationField"),
  customDurationInput: document.querySelector("#customDurationInput"),
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
  focusSessionView: document.querySelector("#focusSessionView"),
  completionView: document.querySelector("#completionView"),
  focusTimerDisplay: document.querySelector("#focusTimerDisplay"),
  focusCommitmentText: document.querySelector("#focusCommitmentText"),
  focusToggleButton: document.querySelector("#focusToggleButton"),
  focusRescueButton: document.querySelector("#focusRescueButton"),
  ambientSoundSelect: document.querySelector("#ambientSoundSelect"),
  completionCommitmentText: document.querySelector("#completionCommitmentText"),
  completionSprintReward: document.querySelector("#completionSprintReward"),
  completionStreakReward: document.querySelector("#completionStreakReward"),
  completionReturnText: document.querySelector("#completionReturnText"),
  completeDoneButton: document.querySelector("#completeDoneButton"),
  completeProgressButton: document.querySelector("#completeProgressButton"),
  extendSessionButton: document.querySelector("#extendSessionButton"),
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
    profile: { ...defaultState.profile, ...((saved || {}).profile || {}), onboarded: true },
    command: { ...defaultState.command, ...((saved || {}).command || {}) },
    commandLabels: { ...defaultState.commandLabels, ...((saved || {}).commandLabels || {}) },
    quotes: Array.isArray((saved || {}).quotes) && (saved || {}).quotes.length ? (saved || {}).quotes : [...defaultQuotes],
    templates: mergeDefaultTemplates((saved || {}).templates),
    metrics: { ...((saved || {}).metrics || {}) },
    session: (saved || {}).session || null,
    lastDuration: (saved || {}).lastDuration || defaultState.lastDuration
  };

  if (merged.date !== TODAY) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const keptRhythm = merged.lastCompletedDate === getDateKey(yesterday);
    const dayOpenText = keptRhythm
      ? "Ngày mới đã mở. Bạn đang có nhịp, chỉ cần một phiên để nối tiếp."
      : "Ngày mới đã mở. Bắt đầu lại một nhịp mới, nhẹ thôi cũng được.";

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
          text: dayOpenText
        },
        ...(merged.logs || []).slice(0, 23)
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

function mergeDefaultTemplates(savedTemplates) {
  const saved = Array.isArray(savedTemplates) ? cloneTemplates(savedTemplates) : [];
  const savedIds = new Set(saved.map((template) => template.id));
  const missingDefaults = defaultTemplates.filter((template) => !savedIds.has(template.id));
  return [...cloneTemplates(missingDefaults), ...saved];
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
  el.ambientSoundSelect.value = state.ambientSound || "off";
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
  updateTimerButtons();
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
    button.dataset.templateId = template.id;
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
      <span>Bấm Bật mode CHẠY để app tự tạo 3 bước nhỏ và cam kết đầu ra cho bạn.</span>
    `;
    return;
  }

  el.templateFeedback.innerHTML = `
    <strong>Đã tạo checklist từ ${template.title}.</strong>
    <span>3 bước nhỏ bên dưới đã được thay bằng đường vào việc này.</span>
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
    empty.textContent = "Thêm tối đa 3 bước nhỏ hoặc bấm Quick win để bắt đầu nhẹ hơn.";
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
  el.focusScore.textContent = String(metrics.sprints || 0);
  el.streakDays.textContent = String(state.streak || 0);
  el.streakCopy.textContent = getStreakCopy(metrics);
  el.heroProgress.textContent = `${completed}/${total}`;
  el.heroSprints.textContent = String(metrics.sprints || 0);
  el.heroRunStatus.textContent = getHeroRunStatus(metrics);
  el.todayProgressText.textContent = metrics.sprints
    ? `+${metrics.sprints} sprint hôm nay.`
    : "Một phiên là đủ để bắt đầu.";
  el.heroCommitmentPreview.textContent = state.commitment || makeCommitment();
  if (!el.heroRescueOutput.textContent.trim()) {
    el.heroRescueOutput.textContent = "Mở file cần làm.";
  }
  renderMomentumOutputs();
}

function getHeroRunStatus(metrics = todayMetrics()) {
  if (state.session?.status === "active") return "ĐANG CHẠY";
  if (state.session?.status === "paused") return "ĐANG TẠM DỪNG";
  if (state.session?.status === "completed") return "HOÀN THÀNH";
  return metrics.sprints ? "Đã có bằng chứng hôm nay" : "Sẵn sàng trong 1 click";
}

function getStreakCopy(metrics = todayMetrics()) {
  if (metrics.sprints) return "Mai tiếp tục giữ nhịp.";
  if (state.lastCompletedDate === TODAY) return "Hôm nay đã có bằng chứng.";
  if (state.streak > 1) return "Một phiên ngắn là đủ để nối tiếp.";
  return "Bắt đầu lại một nhịp mới.";
}

function renderMomentumOutputs() {
  el.momentumOutputs.innerHTML = "";
  const outputs = getRecentOutputs(3);

  if (!outputs.length) {
    const empty = document.createElement("li");
    empty.className = "empty-state compact-empty";
    empty.textContent = "Output sẽ hiện sau phiên đầu.";
    el.momentumOutputs.append(empty);
    return;
  }

  outputs.forEach((output) => {
    const item = document.createElement("li");
    item.textContent = output.text;
    el.momentumOutputs.append(item);
  });
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
    empty.textContent = "Output hôm nay sẽ nằm ở đây: bản nháp, outline, email, reel, proposal...";
    el.activityLog.append(empty);
    return;
  }

  groupLogsByDay(state.logs.slice(0, 28)).forEach((group) => {
    const item = document.createElement("li");
    item.className = "history-day";

    const header = document.createElement("div");
    header.className = "history-day-head";
    header.innerHTML = `<strong>${group.label}</strong><span>${group.outputs} output</span>`;

    const list = document.createElement("ul");
    list.className = "history-items";

    group.logs.slice(0, 5).forEach((log) => {
      const row = document.createElement("li");
      row.className = log.type === "output" ? "output-log" : "";

      const time = document.createElement("time");
      time.dateTime = log.at;
      time.textContent = new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(log.at));

      const text = document.createElement("span");
      text.textContent = log.text;
      row.append(time, text);
      list.append(row);
    });

    item.append(header, list);
    el.activityLog.append(item);
  });
}

function getRecentOutputs(limit = 3) {
  return state.logs
    .filter((log) => log.type === "output")
    .slice(0, limit)
    .map((log) => ({
      ...log,
      text: log.text.replace(/^✓\s*/, "")
    }));
}

function groupLogsByDay(logs) {
  const groups = [];

  logs.forEach((log) => {
    const date = new Date(log.at);
    const key = getDateKey(date);
    let group = groups.find((item) => item.key === key);

    if (!group) {
      group = {
        key,
        label: formatHistoryDay(date),
        logs: [],
        outputs: 0
      };
      groups.push(group);
    }

    group.logs.push(log);
    if (log.type === "output") group.outputs += 1;
  });

  return groups;
}

function formatHistoryDay(date) {
  const key = getDateKey(date);
  if (key === TODAY) return "Hôm nay";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (key === getDateKey(yesterday)) return "Hôm qua";

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  }).format(date);
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
  state.logs = [{ at: new Date().toISOString(), text }, ...state.logs].slice(0, 40);
  saveState();
}

function addOutputLog(text) {
  state.logs = [{ at: new Date().toISOString(), text, type: "output" }, ...state.logs].slice(0, 40);
  saveState();
}

function makeId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addTask(text, shouldRender = true) {
  if (state.tasks.length >= 3) {
    addLog("Bạn đã có 3 bước nhỏ. Hãy làm hoặc xóa bớt trước khi thêm.");
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
  if (template.id === "quick-win" && isMobileViewport() && scrollToTasks) {
    instantQuickWinStart();
    return;
  }
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

function isMobileViewport() {
  return window.matchMedia("(max-width: 620px)").matches;
}

function pickQuickWinStart() {
  return quickWinStarts[Math.floor(Math.random() * quickWinStarts.length)];
}

function instantQuickWinStart() {
  const start = pickQuickWinStart();
  clearSessionTicker();
  state.profile.onboarded = true;
  state.selectedTemplate = "quick-win";
  state.tasks = [{ id: makeId(), text: start.task, done: false }];
  state.commitment = `Cuối phiên tôi sẽ có: ${start.commitment}`;
  state.lastDuration = 10;
  state.session = null;
  timer.duration = 10 * 60;
  timer.remaining = timer.duration;
  syncDurationControls(10);
  addLog(`Quick win: ${start.task}`);
  saveState();
  render();
  el.heroRescueOutput.textContent = start.step;
  el.rescueOutput.textContent = start.step;
  startSession(10);
  state.session.lastRescueStep = start.step;
  saveState();
  syncFocusView();
  toggleFocusMode(true);
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
  addLog("Bạn đã hoàn thành 3 bước nhỏ hôm nay. Ngày này có bằng chứng rồi.");
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

function clampDuration(minutes) {
  const value = Number.parseInt(minutes, 10);
  if (Number.isNaN(value)) return 25;
  return Math.min(Math.max(value, 1), 180);
}

function syncDurationControls(minutes, source = "") {
  const value = String(minutes);
  const presetValues = Array.from(el.heroDurationSelect.options)
    .map((option) => option.value)
    .filter((optionValue) => optionValue !== "custom");
  const isPreset = presetValues.includes(value);

  if (source !== "hero") {
    el.heroDurationSelect.value = isPreset ? value : "custom";
  }

  if (source !== "custom") {
    el.customDurationInput.value = value;
  }

  if (source !== "console" && Array.from(el.durationSelect.options).some((option) => option.value === value)) {
    el.durationSelect.value = value;
  }

  el.customDurationField.hidden = el.heroDurationSelect.value !== "custom";
}

function setDuration(minutes, options = {}) {
  const nextMinutes = clampDuration(minutes);
  if (isSessionActive()) return;
  clearSessionTicker();
  state.session = null;
  state.lastDuration = nextMinutes;
  timer.duration = nextMinutes * 60;
  timer.remaining = timer.duration;
  syncDurationControls(nextMinutes, options.source);
  updateTimerDisplay();
  updateTimerButtons();
  saveState();
}

function applyHeroDuration() {
  const minutes = el.heroDurationSelect.value === "custom"
    ? clampDuration(el.customDurationInput.value)
    : clampDuration(el.heroDurationSelect.value);

  if (!isSessionActive() && !isSessionCompleted()) {
    setDuration(minutes, { source: el.heroDurationSelect.value === "custom" ? "custom" : "hero" });
  }
}

function toggleTimer() {
  if (isSessionCompleted()) {
    toggleFocusMode(true);
    return;
  }

  if (!state.session) {
    startSession();
    return;
  }

  if (state.session.status === "active") {
    pauseSession();
    return;
  }

  resumeSession();
}

function isSessionActive() {
  return state.session?.status === "active" || state.session?.status === "paused";
}

function isSessionCompleted() {
  return state.session?.status === "completed";
}

function startSession(extraMinutes) {
  const minutes = extraMinutes || clampDuration(el.heroDurationSelect.value === "custom"
    ? el.customDurationInput.value
    : el.heroDurationSelect.value);
  const duration = minutes * 60;
  const now = Date.now();
  const commitment = state.commitment || makeCommitment();
  state.commitment = commitment;
  state.lastDuration = minutes;
  state.session = {
    status: "active",
    duration,
    remaining: duration,
    startedAt: now,
    endsAt: now + duration * 1000,
    commitment,
    loggedStart: false
  };
  syncDurationControls(minutes);
  startSessionTicker();
  saveState();
  updateTimerDisplay();
  updateTimerButtons();
  startAmbientIfNeeded();
}

function pauseSession() {
  if (state.session?.status !== "active") return;
  state.session.remaining = getRemainingSeconds();
  state.session.status = "paused";
  delete state.session.endsAt;
  clearSessionTicker();
  stopAmbientSound();
  saveState();
  updateTimerDisplay();
  updateTimerButtons();
}

function resumeSession() {
  if (state.session?.status !== "paused") return;
  const now = Date.now();
  state.session.status = "active";
  state.session.endsAt = now + state.session.remaining * 1000;
  startSessionTicker();
  startAmbientIfNeeded();
  saveState();
  updateTimerDisplay();
  updateTimerButtons();
}

function resetTimer() {
  clearSessionTicker();
  stopAmbientSound();
  state.session = null;
  timer.running = false;
  timer.duration = (state.lastDuration || 25) * 60;
  timer.remaining = timer.duration;
  syncDurationControls(state.lastDuration || 25);
  saveState();
  updateTimerDisplay();
  updateTimerButtons();
}

function extendSession(minutes = 10) {
  const addedSeconds = minutes * 60;
  const currentRemaining = Math.max(getRemainingSeconds(), 0);
  const now = Date.now();
  const nextRemaining = currentRemaining + addedSeconds;
  state.session = {
    ...(state.session || {}),
    status: "active",
    duration: (state.session?.duration || 0) + addedSeconds,
    remaining: nextRemaining,
    endsAt: now + nextRemaining * 1000,
    commitment: state.session?.commitment || state.commitment || makeCommitment()
  };
  startSessionTicker();
  saveState();
  toggleFocusMode(true);
  updateTimerDisplay();
  updateTimerButtons();
}

function getRemainingSeconds() {
  if (!state.session) return timer.remaining;
  if (state.session.status === "active" && state.session.endsAt) {
    return Math.max(0, Math.ceil((state.session.endsAt - Date.now()) / 1000));
  }
  return Math.max(0, state.session.remaining || 0);
}

function completeSession() {
  if (!state.session || state.session.status === "completed") return;
  clearSessionTicker();
  stopAmbientSound();
  state.session.remaining = 0;
  updateTimerDisplay();
  updateTimerButtons();
  document.body.classList.add("session-completing");
  el.focusTimerDisplay.classList.add("timer-freeze");

  window.setTimeout(() => {
    if (!state.session || state.session.status === "completed") return;
    state.session.status = "completed";
    state.session.remaining = 0;
    state.session.completedAt = new Date().toISOString();
    document.body.classList.remove("session-completing");
    el.focusTimerDisplay.classList.remove("timer-freeze");
    el.completionView.classList.add("reward-pulse");
    el.completionView.classList.remove("actions-ready");
    playChime();
    saveState();
    toggleFocusMode(true);
    updateTimerDisplay();
    updateTimerButtons();
    window.setTimeout(() => el.completionView.classList.add("actions-ready"), 720);
    window.setTimeout(() => el.completionView.classList.remove("reward-pulse"), 900);
  }, 420);
}

function finishSession(resultText) {
  if (!state.session) return;
  stopAmbientSound();
  const durationMinutes = Math.round((state.session.duration || timer.duration) / 60);
  todayMetrics().sprints += 1;
  const output = cleanCommitmentText(state.session.commitment || state.commitment);
  addLog(`${resultText} Sprint ${durationMinutes} phút đã được ghi nhận. Mai quay lại bật CHẠY tiếp.`);
  addOutputLog(`✓ ${output}`);
  state.session = null;
  timer.running = false;
  timer.duration = (state.lastDuration || durationMinutes || 25) * 60;
  timer.remaining = timer.duration;
  updateStreakFromSprint();
  document.body.classList.add("momentum-spark");
  window.setTimeout(() => document.body.classList.remove("momentum-spark"), 1200);
  saveState();
  toggleFocusMode(false);
  saveAndRender();
}

function updateStreakFromSprint() {
  if (state.lastCompletedDate === TODAY) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);
  state.streak = state.lastCompletedDate === yesterdayKey ? state.streak + 1 : 1;
  state.lastCompletedDate = TODAY;
}

function startSessionTicker() {
  clearSessionTicker();
  timerInterval = window.setInterval(() => {
    updateTimerDisplay();
    updateTimerButtons();
    if (state.session?.status === "active" && getRemainingSeconds() <= 0) {
      completeSession();
    }
  }, 1000);
}

function clearSessionTicker() {
  window.clearInterval(timerInterval);
  timerInterval = null;
}

function restoreSession() {
  if (!state.session) {
    timer.duration = (state.lastDuration || 25) * 60;
    timer.remaining = timer.duration;
    syncDurationControls(state.lastDuration || 25);
    return;
  }

  timer.duration = state.session.duration || (state.lastDuration || 25) * 60;
  timer.remaining = getRemainingSeconds();
  if (state.session.status === "active" && timer.remaining <= 0) {
    completeSession();
    return;
  }
  if (state.session.status === "active") startSessionTicker();
  syncDurationControls(Math.round(timer.duration / 60));
}

function updateTimerButtons() {
  const completed = isSessionCompleted();
  const active = state.session?.status === "active";
  const paused = state.session?.status === "paused";
  const content = active
    ? '<span class="button-icon" aria-hidden="true">Ⅱ</span> Tạm dừng'
    : state.session
      ? '<span class="button-icon" aria-hidden="true">▶</span> Tiếp tục'
      : '<span class="button-icon" aria-hidden="true">▶</span> Chạy';
  el.timerToggleButton.innerHTML = content;
  el.focusToggleButton.innerHTML = active
    ? '<span class="button-icon" aria-hidden="true">Ⅱ</span> Tạm dừng'
    : '<span class="button-icon" aria-hidden="true">▶</span> Tiếp tục';

  const heroContent = active || paused || completed
    ? '<span class="button-icon" aria-hidden="true">▶</span> Tiếp tục phiên'
    : '<span class="button-icon" aria-hidden="true">⚡</span> Bật mode CHẠY';
  el.startDayButton.innerHTML = heroContent;
  el.startDayButton.classList.toggle("is-running", active || paused || completed);
  el.startDayButton.closest(".hero-run-card")?.classList.toggle("session-active", active || paused);
  el.heroDurationSelect.disabled = active || paused;
  el.customDurationInput.disabled = active || paused;
  el.durationSelect.disabled = active || paused;
  el.timerState.textContent = completed ? "Đã xong" : active ? "Đang tập trung" : paused ? "Tạm dừng" : "Sẵn sàng";
  el.heroRunStatus.textContent = getHeroRunStatus();
}

function updateTimerDisplay() {
  timer.duration = state.session?.duration || timer.duration;
  timer.remaining = getRemainingSeconds();
  timer.running = state.session?.status === "active";
  const minutes = Math.floor(timer.remaining / 60);
  const seconds = timer.remaining % 60;
  const value = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  el.heroTimerDisplay.textContent = value;
  el.timerDisplay.textContent = value;
  el.focusTimerDisplay.textContent = value;

  const circumference = 326.7;
  const progress = timer.duration ? 1 - timer.remaining / timer.duration : 0;
  el.timerRing.style.strokeDashoffset = String(circumference - circumference * progress);
  syncFocusView();
}

function cleanCommitmentText(text) {
  return (text || "một bản nháp đủ để sửa tiếp")
    .replace(/^Cuối phiên này tôi sẽ có:?\s*/i, "")
    .replace(/^Cuối phiên tôi sẽ có:?\s*/i, "")
    .trim();
}

function syncFocusView() {
  const commitment = cleanCommitmentText(state.session?.commitment || state.commitment);
  el.focusCommitmentText.textContent = state.session?.lastRescueStep
    ? `Bước nhỏ ngay: ${state.session.lastRescueStep}`
    : `Cuối phiên tôi sẽ có: ${commitment}`;
  const nextSprintCount = (todayMetrics().sprints || 0) + 1;
  const nextStreak = state.lastCompletedDate === TODAY ? state.streak : Math.max(1, state.streak + 1);
  el.completionSprintReward.textContent = `+1 sprint hôm nay (${nextSprintCount})`;
  el.completionStreakReward.textContent = nextStreak > 1 ? `${nextStreak} ngày liên tiếp` : "Giữ nhịp hôm nay";
  el.completionReturnText.textContent = nextSprintCount > 1
    ? "Momentum đang được xây. Mai chỉ cần nối tiếp."
    : "Một phiên nữa là đủ để tiến lên. Mai quay lại giữ nhịp.";
  el.completionCommitmentText.textContent = `M đã tạo ra gì từ mục tiêu: ${commitment}?`;
  const completed = isSessionCompleted();
  el.focusSessionView.hidden = completed;
  el.completionView.hidden = !completed;
  if (!completed) {
    el.completionView.classList.remove("actions-ready");
    return;
  }

  const completedAt = state.session?.completedAt ? new Date(state.session.completedAt).getTime() : 0;
  if (completedAt && Date.now() - completedAt > 900) {
    el.completionView.classList.add("actions-ready");
  }
}

function toggleFocusMode(show) {
  syncFocusView();
  el.focusOverlay.classList.toggle("show", show);
  el.focusOverlay.setAttribute("aria-hidden", show ? "false" : "true");
  document.body.classList.toggle("run-mode-open", show);
  if (show) {
    document.body.classList.add("run-mode-entering");
    window.setTimeout(() => document.body.classList.remove("run-mode-entering"), 640);
  } else {
    document.body.classList.remove("run-mode-entering");
  }
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
  clearSessionTicker();
  stopAmbientSound();
  state.session = null;
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
  if (state.session) {
    toggleFocusMode(true);
    updateTimerDisplay();
    updateTimerButtons();
    return;
  }

  if (!state.tasks.length) {
    applySmartPlan({ overwrite: true });
  }

  if (!state.commitment) {
    state.commitment = makeCommitment();
  }

  applyHeroDuration();
  addLog("Đã bật RUN MODE: mở màn hình tập trung, chuẩn bị checklist và bắt đầu phiên chạy việc.");
  saveState();
  render();

  startSession();
  toggleFocusMode(true);
}

function currentActionContext() {
  const activeTask = state.tasks.find((task) => !task.done) || state.tasks[0];
  return [
    activeTask?.text,
    state.session?.commitment,
    state.commitment,
    state.command.delivery,
    state.command.asset,
    state.command.money
  ].filter(Boolean).join(" ").toLowerCase();
}

function makeContextualRescueStep() {
  const context = currentActionContext();
  const matchedRule = contextualStepRules.find((rule) =>
    rule.match.some((keyword) => context.includes(keyword))
  );

  if (matchedRule) {
    return matchedRule.steps[Math.floor(Math.random() * matchedRule.steps.length)];
  }

  const activeTask = state.tasks.find((task) => !task.done) || state.tasks[0];
  if (activeTask?.text) {
    return `Làm 5 phút đầu: ${activeTask.text}.`;
  }

  return rescueSteps[Math.floor(Math.random() * rescueSteps.length)];
}

function rescue() {
  const step = makeContextualRescueStep();
  addLog(`Bước nhỏ: ${step}`);
  if (state.session) {
    state.session.lastRescueStep = step;
  } else {
    state.commitment = step;
  }
  el.rescueOutput.textContent = step;
  el.heroRescueOutput.textContent = step;
  saveAndRender();
  el.rescueOutput.textContent = step;
  el.heroRescueOutput.textContent = step;
  syncFocusView();
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

function getAudioContext() {
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return null;
  audioContext = audioContext || new AudioEngine();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function createNoiseSource(context) {
  const bufferSize = context.sampleRate * 2;
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const output = buffer.getChannelData(0);

  for (let index = 0; index < bufferSize; index += 1) {
    output[index] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createFilteredNoise(context, options = {}) {
  const source = createNoiseSource(context);
  const filter = context.createBiquadFilter();
  filter.type = options.type || "lowpass";
  filter.frequency.value = options.frequency || 1200;
  filter.Q.value = options.q || 0.7;
  source.connect(filter);
  return { source, output: filter, nodes: [source, filter] };
}

function createAmbientGraph(context, sound) {
  const master = context.createGain();
  master.gain.value = 0.001;
  const nodes = [master];
  const sources = [];

  if (sound === "lofi") {
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1450;
    filter.Q.value = 0.8;
    filter.connect(master);
    nodes.push(filter);

    [196, 246.94, 329.63, 392].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.035 : 0.019;
      oscillator.connect(gain);
      gain.connect(filter);
      sources.push(oscillator);
      nodes.push(oscillator, gain);
    });

    const bed = createFilteredNoise(context, { type: "bandpass", frequency: 980, q: 0.7 });
    const bedGain = context.createGain();
    bedGain.gain.value = 0.03;
    bed.output.connect(bedGain);
    bedGain.connect(filter);
    sources.push(bed.source);
    nodes.push(...bed.nodes, bedGain);
  } else {
    const noise = createFilteredNoise(context, sound === "rain"
      ? { type: "highpass", frequency: 950, q: 0.9 }
      : sound === "cafe"
        ? { type: "bandpass", frequency: 760, q: 0.8 }
        : { type: "lowpass", frequency: 4200, q: 0.45 });
    const gain = context.createGain();
    gain.gain.value = sound === "white" ? 0.045 : sound === "rain" ? 0.038 : 0.052;
    noise.output.connect(gain);
    gain.connect(master);
    sources.push(noise.source);
    nodes.push(...noise.nodes, gain);

    if (sound === "cafe") {
      [220, 330, 440].forEach((frequency, index) => {
        const murmur = context.createOscillator();
        const murmurGain = context.createGain();
        murmur.type = index === 2 ? "triangle" : "sine";
        murmur.frequency.value = frequency;
        murmurGain.gain.value = index === 2 ? 0.008 : 0.01;
        murmur.connect(murmurGain);
        murmurGain.connect(master);
        sources.push(murmur);
        nodes.push(murmur, murmurGain);
      });
    }
  }

  master.connect(context.destination);
  return { master, nodes, sources };
}

function stopAmbientSound() {
  if (!ambientAudio) return;
  const current = ambientAudio;
  ambientAudio = null;

  try {
    const now = current.context.currentTime;
    current.master.gain.cancelScheduledValues(now);
    current.master.gain.setTargetAtTime(0.001, now, 0.08);
    window.setTimeout(() => {
      current.sources.forEach((source) => {
        try {
          source.stop();
        } catch {}
      });
      current.nodes.forEach((node) => {
        try {
          node.disconnect();
        } catch {}
      });
    }, 220);
  } catch {}
}

function startAmbientSound(sound = state.ambientSound) {
  if (!sound || sound === "off") {
    stopAmbientSound();
    return;
  }

  const context = getAudioContext();
  if (!context) return;
  stopAmbientSound();

  try {
    const graph = createAmbientGraph(context, sound);
    ambientAudio = { ...graph, context, sound };
    graph.sources.forEach((source) => source.start());
    const targetGain = sound === "cafe" ? 0.22 : sound === "lofi" ? 0.2 : 0.16;
    graph.master.gain.setTargetAtTime(targetGain, context.currentTime, 0.18);
  } catch {
    ambientAudio = null;
  }
}

function startAmbientIfNeeded() {
  if (state.session?.status === "active" && state.ambientSound && state.ambientSound !== "off") {
    startAmbientSound(state.ambientSound);
  }
}

function setAmbientSound(sound) {
  state.ambientSound = sound;
  saveState();
  if (state.session?.status === "active") {
    startAmbientSound(sound);
  } else {
    stopAmbientSound();
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
el.heroDurationSelect.addEventListener("change", (event) => {
  const isCustom = event.target.value === "custom";
  el.customDurationField.hidden = !isCustom;

  if (isCustom) {
    el.customDurationInput.focus();
    setDuration(el.customDurationInput.value, { source: "hero" });
    return;
  }

  setDuration(event.target.value, { source: "hero" });
});
el.customDurationInput.addEventListener("change", () => {
  setDuration(el.customDurationInput.value, { source: "custom" });
});
el.customDurationInput.addEventListener("input", () => {
  if (isSessionActive()) return;
  const minutes = clampDuration(el.customDurationInput.value);
  timer.duration = minutes * 60;
  timer.remaining = timer.duration;
  updateTimerDisplay();
  updateTimerButtons();
});
el.durationSelect.addEventListener("change", (event) => setDuration(event.target.value, { source: "console" }));
el.timerToggleButton.addEventListener("click", toggleTimer);
el.focusToggleButton.addEventListener("click", toggleTimer);
el.timerResetButton.addEventListener("click", resetTimer);
el.focusModeButton.addEventListener("click", () => toggleFocusMode(true));
el.closeFocusButton.addEventListener("click", () => toggleFocusMode(false));
el.ambientSoundSelect.addEventListener("change", (event) => setAmbientSound(event.target.value));
el.heroRescueButton.addEventListener("click", rescue);
el.heroQuickWinButton.addEventListener("click", instantQuickWinStart);
el.rescueButton.addEventListener("click", rescue);
el.focusRescueButton.addEventListener("click", rescue);
el.completeDoneButton.addEventListener("click", () => finishSession("Đã xong."));
el.completeProgressButton.addEventListener("click", () => finishSession("Chưa xong nhưng đã tiến lên."));
el.extendSessionButton.addEventListener("click", () => extendSession(10));

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest("button, .template-card");
  if (!target) return;
  target.classList.add("is-pressing");
});

document.addEventListener("pointerup", (event) => {
  const target = event.target.closest("button, .template-card");
  if (!target) return;
  window.setTimeout(() => target.classList.remove("is-pressing"), 120);
});

document.addEventListener("pointercancel", () => {
  document.querySelectorAll(".is-pressing").forEach((target) => target.classList.remove("is-pressing"));
});

el.saveCommitmentButton.addEventListener("click", () => {
  state.commitment = el.commitmentInput.value.trim();
  if (state.commitment) {
    todayMetrics().commitments += 1;
    addLog(`Cam kết: ${state.commitment}`);
  }
  saveAndRender();
});

restoreSession();
render();

if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

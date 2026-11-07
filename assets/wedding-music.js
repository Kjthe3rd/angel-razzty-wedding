(() => {
  const audio = document.getElementById("wedding-music");
  const button = document.getElementById("music-toggle");
  const status = document.getElementById("music-status");
  const storageKey = "angel-razzty-music";
  let savedState = null;
  let wantsPlayback = true;
  let storageAvailable = true;

  try {
    savedState = JSON.parse(sessionStorage.getItem(storageKey) || "null");
    if (savedState && typeof savedState.wantsPlayback === "boolean") {
      wantsPlayback = savedState.wantsPlayback;
    }
  } catch {
    storageAvailable = false;
  }

  const updatePlayer = () => {
    const playing = !audio.paused;
    button.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    button.setAttribute("aria-pressed", String(playing));
    status.textContent = playing ? "Music playing" : "Music paused";
  };

  const savePlaybackState = () => {
    if (!storageAvailable) return;

    try {
      sessionStorage.setItem(storageKey, JSON.stringify({
        currentTime: audio.currentTime,
        wantsPlayback
      }));
    } catch {
      storageAvailable = false;
      status.textContent = "Music may restart on the next page";
    }
  };

  const startPlayback = async () => {
    try {
      await audio.play();
      updatePlayer();
    } catch (error) {
      updatePlayer();
      if (error.name === "NotAllowedError") {
        status.textContent = "Tap ♫ to play music";
      } else {
        status.textContent = "Music could not be played";
        console.error("Background music could not be played.", error);
      }
    }
  };

  audio.addEventListener("loadedmetadata", () => {
    const savedTime = savedState && Number(savedState.currentTime);
    if (Number.isFinite(savedTime) && savedTime >= 0 && savedTime < audio.duration) {
      audio.currentTime = savedTime;
    }

    if (wantsPlayback) {
      startPlayback();
    } else {
      updatePlayer();
    }
  }, { once: true });

  audio.addEventListener("play", updatePlayer);
  audio.addEventListener("pause", updatePlayer);
  audio.addEventListener("error", () => {
    status.textContent = "Music could not be loaded";
    console.error("Background music could not be loaded.", audio.error);
  });

  button.addEventListener("click", () => {
    if (audio.paused) {
      wantsPlayback = true;
      startPlayback();
    } else {
      wantsPlayback = false;
      audio.pause();
      updatePlayer();
      savePlaybackState();
    }
  });

  window.addEventListener("pagehide", savePlaybackState);
  audio.load();
})();

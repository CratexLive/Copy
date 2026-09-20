const WILLOW_API_URL = 'https://willow-api.sayanwork-studioo.workers.dev/';
const willowTrack = document.getElementById('willowLiveTrack');
const willowArrowLeft = document.getElementById('willowLiveArrowLeft');
const willowArrowRight = document.getElementById('willowLiveArrowRight');

async function fetchWillowMatches() {
  if (!willowTrack) return;
  try {
    const res = await fetch(WILLOW_API_URL);
    const data = await res.json();
    const matches = data.Matches || data.streams || [];
    
    willowTrack.innerHTML = matches.map(m => `
      <a class="willow-live-card" href="willow-player.html?id=${encodeURIComponent(m.tvgId || m.title)}">
        <div class="willow-live-thumb">
          <img src="${m.cover_image || 'https://via.placeholder.com/480x270'}" alt="${m.title}" loading="lazy">
          <div class="willow-live-badge-live">LIVE</div>
        </div>
        <div class="willow-live-info">
          <div class="willow-live-match-title">${m.title}</div>
        </div>
      </a>
    `).join('');
  } catch (err) {
    willowTrack.innerHTML = '<div style="color:#aaa;padding:1rem;">Failed to load matches</div>';
  }
}

if (willowArrowRight) willowArrowRight.addEventListener('click', () => willowTrack.scrollBy({ left: 320, behavior: 'smooth' }));
if (willowArrowLeft) willowArrowLeft.addEventListener('click', () => willowTrack.scrollBy({ left: -320, behavior: 'smooth' }));

fetchWillowMatches();

(function() {
  const API_URL = 'https://raw.githubusercontent.com/drmlive/fancode-live-events/refs/heads/main/fancode.json';
  const track = document.getElementById('fancodeTrack');
  const arrowLeft = document.getElementById('fancodeArrowLeft');
  const arrowRight = document.getElementById('fancodeArrowRight');

  if (!track) return;

  async function fetchFancode() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const matches = data.matches || data || [];

      track.innerHTML = matches.map(m => `
        <div class="fancode-card" data-match-id="${m.match_id}">
          <div class="fancode-thumb">
            <img src="${m.src}" alt="${m.title}" loading="lazy">
            ${m.status === 'LIVE' ? '<span class="live-badge">LIVE</span>' : ''}
          </div>
          <div class="fancode-info">
            <div style="font-size:0.75rem;color:#f5c518;">${m.event_name || 'FanCode'}</div>
            <div class="fancode-teams">${m.team_1 || 'Team 1'} vs ${m.team_2 || 'Team 2'}</div>
          </div>
        </div>
      `).join('');
    } catch (e) {
      track.innerHTML = '<div style="color:#777;padding:1rem;">Failed to load FanCode data</div>';
    }
  }

  if (arrowRight) arrowRight.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
  if (arrowLeft) arrowLeft.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));

  fetchFancode();
})();

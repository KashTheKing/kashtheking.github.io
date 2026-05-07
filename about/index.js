const GROUPS = [
    { id: 32360058 },
    { id: 829233796 },
    { id: 34555295 },
    { id: 33447364 },
    { id: 300315957 },
    { id: 34135129 },
    { id: 33846029 },
    { id: 219333405 },
    { id: 32924401, stolen: true },
];

async function robloxFetch(url) {
    const proxies = [
        u => u,
        u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
        u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
        u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
    ];
    for (const proxy of proxies) {
        try {
            const r = await fetch(proxy(url));
            if (!r.ok) throw new Error(r.status);
            return r.json();
        } catch {}
    }
    throw new Error(`All proxies failed for ${url}`);
}

async function loadGroups() {
    const gallery = document.querySelector('.gallery');
    try {
        const ids = GROUPS.map(g => g.id);

        const [infoResults, iconResults] = await Promise.all([
            Promise.all(ids.map(id => robloxFetch(`https://groups.roblox.com/v1/groups/${id}`))),
            robloxFetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${ids.join(',')}&size=150x150&format=Png&isCircular=false`),
        ]);

        const iconMap = {};
        for (const item of (iconResults.data || [])) {
            iconMap[item.targetId] = item.imageUrl;
        }

        gallery.innerHTML = '';

        GROUPS.forEach((group, i) => {
            const info = infoResults[i];
            if (!info || !info.name) return;
            const icon = iconMap[group.id] || '';
            const stolen = group.stolen || false;

            const card = document.createElement('a');
            card.href = `https://www.roblox.com/groups/${group.id}`;
            card.target = '_blank';
            card.className = 'group-card' + (stolen ? ' stolen' : '');

            card.innerHTML = `
                <img src="${icon}" alt="${info.name}">
                <div class="group-info">
                    <h3>${info.name}${stolen ? ' <span class="stolen-tag">STOLEN</span>' : ''}</h3>
                    <p>${info.description || ''}</p>
                </div>
            `;

            gallery.appendChild(card);
        });
    } catch (err) {
        console.error('Failed to load groups:', err);
        gallery.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:13px;">Could not load groups.</p>';
    }
}

async function loadDiscord() {
    const widget = document.getElementById('discord-widget');
    try {
        const data = await fetch('https://discord.com/api/guilds/820530275981066270/widget.json').then(r => r.json());

        if (data.code) {
            widget.innerHTML = `<p style="color:rgba(255,255,255,0.4);font-size:13px;">Discord widget not enabled.</p>`;
            return;
        }

        const onlineMembers = (data.members || []).slice(0, 8);

        widget.innerHTML = `
            <div class="discord-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.053a19.902 19.902 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                <div>
                    <h3>${data.name}</h3>
                    <span>${data.presence_count} online</span>
                </div>
                <a href="${data.instant_invite}" target="_blank" class="discord-join">Join</a>
            </div>
            ${onlineMembers.length > 0 ? `
            <div class="discord-members">
                ${onlineMembers.map(m => `
                    <div class="discord-member">
                        <div class="discord-avatar">
                            <img src="${m.avatar_url}" alt="${m.username}">
                            <span class="status-dot"></span>
                        </div>
                        <span>${m.username}</span>
                    </div>
                `).join('')}
            </div>` : ''}
        `;
    } catch (err) {
        console.error('Failed to load Discord widget:', err);
        widget.innerHTML = `<p style="color:rgba(255,255,255,0.4);font-size:13px;">Could not load Discord widget.</p>`;
    }
}

const GAMES = [
    { placeId: 18882629640,    universeId: 6395375513 },
    { placeId: 18882642310,    universeId: 6395380195 },
    { placeId: 91804761265726, universeId: 6676207694 },
    { placeId: 18882651254,    universeId: 6395383240 },
];

async function loadGames() {
    const grid = document.getElementById('games-grid');
    try {
        const universeIds = GAMES.map(g => g.universeId).join(',');
        const [infoRes, iconRes] = await Promise.all([
            robloxFetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`),
            robloxFetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=150x150&format=Png&isCircular=false`),
        ]);

        const iconMap = {};
        for (const item of (iconRes.data || [])) iconMap[item.targetId] = item.imageUrl;

        const infoMap = {};
        for (const item of (infoRes.data || [])) infoMap[item.id] = item;

        grid.innerHTML = '';
        for (const game of GAMES) {
            const info = infoMap[game.universeId];
            if (!info) continue;
            const icon = iconMap[game.universeId] || '';
            const card = document.createElement('a');
            card.href = `https://www.roblox.com/games/${game.placeId}`;
            card.target = '_blank';
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${icon}" alt="${info.name}">
                <div class="game-info">
                    <span class="dev-tag">IN DEVELOPMENT</span>
                    <h3>${info.name}</h3>
                    <p>${info.description || ''}</p>
                </div>
            `;
            grid.appendChild(card);
        }
    } catch (err) {
        console.error('Failed to load games:', err);
        grid.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:13px;">Could not load games.</p>';
    }
}

async function loadVideos() {
    const grid = document.getElementById('videos-grid');
    try {
        const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCN_nYYokQXHP5UUh6eC3C_A';
        const xml = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(feedUrl)}`).then(r => r.text());
        const doc = new DOMParser().parseFromString(xml, 'text/xml');
        const entries = [...doc.querySelectorAll('entry')].slice(0, 6);

        grid.innerHTML = '';
        for (const entry of entries) {
            const id = entry.querySelector('videoId')?.textContent;
            const title = entry.querySelector('title')?.textContent;
            const thumb = entry.querySelector('thumbnail')?.getAttribute('url');
            if (!id || !title) continue;

            const card = document.createElement('a');
            card.href = `https://www.youtube.com/watch?v=${id}`;
            card.target = '_blank';
            card.className = 'video-card';
            card.innerHTML = `
                <div class="video-thumb">
                    <img src="${thumb}" alt="${title}">
                    <div class="play-btn">▶</div>
                </div>
                <p class="video-title">${title}</p>
            `;
            grid.appendChild(card);
        }
    } catch (err) {
        console.error('Failed to load videos:', err);
        grid.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:13px;">Could not load videos.</p>';
    }
}

const FRIEND_COLORS = ['#57f287', '#eb459e', '#5865f2', '#ed4245', '#fee75c', '#3ba55c'];

async function loadDiscordUiUsers() {
    const messages = document.querySelectorAll('.discord-message[data-discord-id]');
    const ids = [...new Set([...messages].map(m => m.dataset.discordId).filter(id => id !== 'kash'))];

    const users = {};
    await Promise.all(ids.map(async (id, i) => {
        try {
            const res = await fetch(`https://japi.rest/discord/v1/user/${id}`).then(r => r.json());
            const data = res.data;
            users[id] = {
                name: data.global_name || data.username || 'User',
                avatar: data.avatarURL || data.defaultAvatarURL || '',
                color: FRIEND_COLORS[i % FRIEND_COLORS.length],
            };
        } catch {
            users[id] = { name: 'User', avatar: '', color: FRIEND_COLORS[i % FRIEND_COLORS.length] };
        }
    }));

    messages.forEach(msg => {
        const id = msg.dataset.discordId;
        if (id === 'kash') return;
        const user = users[id];
        if (!user) return;
        const img = msg.querySelector('.discord-msg-avatar');
        const nameEl = msg.querySelector('.discord-msg-author-name');
        if (img) { img.src = user.avatar; img.alt = user.name; }
        if (nameEl) { nameEl.textContent = user.name; nameEl.style.color = user.color; }
    });
}

loadGroups();
loadGames();
loadVideos();
loadDiscord();
loadDiscordUiUsers();

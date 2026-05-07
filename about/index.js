// --- Static data (always renders immediately) ---

const STATIC_GROUPS = [
    { id: 32360058,  name: "Kash's Kingdom",   desc: "I created this group to make games and bring developers together.", icon: "https://tr.rbxcdn.com/180DAY-c68fff864fd8da819b9779b15e86345f/150/150/Image/Png/noFilter" },
    { id: 829233796, name: "The Bloxxas",       desc: "Everything Changes.",                                              icon: "https://tr.rbxcdn.com/180DAY-e198b0732b354f0ec61f19c1e16d76fb/150/150/Image/Png/noFilter" },
    { id: 34555295,  name: "Brickiez",          desc: "Creating fun and silly games for everyone to enjoy!",              icon: "https://tr.rbxcdn.com/180DAY-40fb0fe9866d98db4573cdacb8e2a76a/150/150/Image/Png/noFilter" },
    { id: 33447364,  name: "Best Events",       desc: "",                                                                  icon: "https://tr.rbxcdn.com/180DAY-73279337d38a0909602a4d10657c3228/150/150/Image/Png/noFilter" },
    { id: 300315957, name: "Clanker Studios",   desc: "all about the vibes 😎",                                           icon: "https://tr.rbxcdn.com/180DAY-b3724b62515f03f99435f72a99adc8eb/150/150/Image/Png/noFilter" },
    { id: 34135129,  name: "Game Swap",         desc: "THE MOST AWESOME GAMES ON ROBLOX MADE IN A SHORT TIME!",           icon: "https://tr.rbxcdn.com/180DAY-bc6e7b57abe6c197cc9f3f721d307957/150/150/Image/Png/noFilter" },
    { id: 33846029,  name: "WeTheBread",        desc: "bread bread bread bread bread bread bread bread bread",             icon: "https://tr.rbxcdn.com/180DAY-a03926b78e8c2db772b249675ab27f36/150/150/Image/Png/noFilter" },
    { id: 219333405, name: "Unknown Group",     desc: "",                                                                  icon: "https://tr.rbxcdn.com/180DAY-47f9867bc677d5a08801bda4407f958d/150/150/Image/Png/noFilter" },
    { id: 32924401,  name: "Unknown Group",     desc: "", stolen: true,                                                    icon: "https://tr.rbxcdn.com/180DAY-e806a1501862c6dd05947de7729ee6e4/150/150/Image/Png/noFilter" },
];

const STATIC_GAMES = [
    { placeId: 130778402266121, name: "Players vs Hunter",                  desc: "",                                                         icon: "https://t3.rbxcdn.com/180DAY-2c1129a448e74940038294483f07d5a6",                                    finished: false },
    { placeId: 18882629640,     universeId: 6395375513, name: "Waterslide Simulator",           desc: "How fun can a waterslide REALLY be? 💥 Come find out. 💥", icon: "https://tr.rbxcdn.com/180DAY-686004a42acf612642dc37c32a20d926/150/150/Image/Png/noFilter", finished: false },
    { placeId: 18882642310,     universeId: 6395380195, name: "Mega Ramp Obby",                 desc: "",                                                         icon: "https://t2.rbxcdn.com/180DAY-592cff9498813006ee393de00fa697c4",                              finished: false },
    { placeId: 91804761265726,  universeId: 6676207694, name: "Grapple Ball Sandbox",           desc: "",                                                         icon: "https://t4.rbxcdn.com/180DAY-4fb716609029d3b8f6ffed5c338c713c",                            finished: false },
    { placeId: 18882651254,     universeId: 6395383240, name: "Obby but you're strapped to a bomb!", desc: "",                                                    icon: "https://t0.rbxcdn.com/180DAY-b9b1d7b305e38c8666fd39852423d926",                            finished: false },
    { placeId: 97158533146210,  name: "Be Famous",                          desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-a2813934e301a4615cf888980d2ce9a0/150/150/Image/Png/noFilter",    finished: true  },
    { placeId: 116357250335199, name: "Calculator",                         desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-063e683869c069c10b3034b3b4be5afb/150/150/Image/Png/noFilter",    finished: true  },
    { placeId: 93247877223004,  name: "Sun Apocalypse",                     desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-006143452bcbc8ca45aa94b4d486970e/150/150/Image/Png/noFilter",    finished: true  },
    { placeId: 17054406156,     name: "Interview Box",                      desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-59d23f9f9093c93fd25f8c2ade24f80b/150/150/Image/Png/noFilter",    finished: true  },
    { placeId: 15239012937,     name: "Missile Launch Sequence",            desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-0859bd7dbcd79ad358132ba9557b5647/150/150/Image/Png/noFilter",    finished: true  },
];

const STATIC_VIDEOS = [
    { id: "xeXbQVAVgQg", title: "Is Scripting or 3D Modeling Harder?",          thumb: "https://i1.ytimg.com/vi/xeXbQVAVgQg/hqdefault.jpg" },
    { id: "bxOjZ29GyDI", title: "THE RICHEST ROBLOX GAME... 🤯 #shorts",        thumb: "https://i3.ytimg.com/vi/bxOjZ29GyDI/hqdefault.jpg" },
    { id: "U3gJC9g5mqk", title: "Can 10 DEVS Make Grow a Garden in ROBLOX?",    thumb: "https://i2.ytimg.com/vi/U3gJC9g5mqk/hqdefault.jpg" },
    { id: "jPtJBVbHNOY", title: "5 Game Devs vs 1 Fake | Odd One Out",          thumb: "https://i3.ytimg.com/vi/jPtJBVbHNOY/hqdefault.jpg" },
    { id: "tMjvzB8MnnY", title: "5 Devs Game Swap",                             thumb: "https://i1.ytimg.com/vi/tMjvzB8MnnY/hqdefault.jpg" },
    { id: "w0SLgD7fn48", title: "Scripter vs 3D Modeler Game Swap",             thumb: "https://i4.ytimg.com/vi/w0SLgD7fn48/hqdefault.jpg" },
];

// --- Render functions ---

function renderGroups(groups) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    groups.forEach(group => {
        const card = document.createElement('a');
        card.href = `https://www.roblox.com/groups/${group.id}`;
        card.target = '_blank';
        card.className = 'group-card' + (group.stolen ? ' stolen' : '');
        card.innerHTML = `
            <img src="${group.icon}" alt="${group.name}">
            <div class="group-info">
                <h3>${group.name}${group.stolen ? ' <span class="stolen-tag">STOLEN</span>' : ''}</h3>
                <p>${group.desc || ''}</p>
            </div>`;
        gallery.appendChild(card);
    });
}

function makeGameCard(game) {
    const card = document.createElement('a');
    card.href = `https://www.roblox.com/games/${game.placeId}`;
    card.target = '_blank';
    card.className = 'game-card';
    const tag = game.finished
        ? `<span class="dev-tag finished-tag">FINISHED</span>`
        : `<span class="dev-tag">IN DEVELOPMENT</span>`;
    card.innerHTML = `
        <img src="${game.icon}" alt="${game.name}">
        <div class="game-info">
            ${tag}
            <h3>${game.name}</h3>
            <p>${game.desc || ''}</p>
        </div>`;
    return card;
}

function renderGames(games) {
    const grid = document.getElementById('games-grid');
    grid.innerHTML = '';
    const inDev = games.filter(g => !g.finished);
    const finished = games.filter(g => g.finished);
    inDev.forEach(g => grid.appendChild(makeGameCard(g)));
    if (finished.length) {
        const label = document.createElement('p');
        label.className = 'subsection-label games-sublabel';
        label.textContent = 'Finished Games';
        grid.appendChild(label);
        finished.forEach(g => grid.appendChild(makeGameCard(g)));
    }
}

function renderVideos(videos) {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = '';
    videos.forEach(video => {
        const card = document.createElement('a');
        card.href = `https://www.youtube.com/watch?v=${video.id}`;
        card.target = '_blank';
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumb">
                <img src="${video.thumb}" alt="${video.title}">
                <div class="play-btn">▶</div>
            </div>
            <p class="video-title">${video.title}</p>`;
        grid.appendChild(card);
    });
}

// --- Render static data immediately ---
renderGroups(STATIC_GROUPS);
renderGames(STATIC_GAMES);
renderVideos(STATIC_VIDEOS);

// --- Try to refresh from APIs in background ---

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

async function refreshGroups() {
    try {
        const ids = STATIC_GROUPS.map(g => g.id);
        const [infoResults, iconResults] = await Promise.all([
            Promise.all(ids.map(id => robloxFetch(`https://groups.roblox.com/v1/groups/${id}`))),
            robloxFetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${ids.join(',')}&size=150x150&format=Png&isCircular=false`),
        ]);
        const iconMap = {};
        for (const item of (iconResults.data || [])) iconMap[item.targetId] = item.imageUrl;
        const fresh = STATIC_GROUPS.map((g, i) => {
            const info = infoResults[i];
            if (!info || !info.name) return g;
            return { ...g, name: info.name, desc: info.description || '', icon: iconMap[g.id] || g.icon };
        });
        renderGroups(fresh);
    } catch {}
}

async function refreshGames() {
    try {
        const universeIds = STATIC_GAMES.map(g => g.universeId).join(',');
        const [infoRes, iconRes] = await Promise.all([
            robloxFetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`),
            robloxFetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=150x150&format=Png&isCircular=false`),
        ]);
        const iconMap = {};
        for (const item of (iconRes.data || [])) iconMap[item.targetId] = item.imageUrl;
        const infoMap = {};
        for (const item of (infoRes.data || [])) infoMap[item.id] = item;
        const fresh = STATIC_GAMES.map(g => {
            const info = infoMap[g.universeId];
            if (!info) return g;
            return { ...g, name: info.name, desc: info.description || '', icon: iconMap[g.universeId] || g.icon };
        });
        renderGames(fresh);
    } catch {}
}

async function refreshVideos() {
    try {
        const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCN_nYYokQXHP5UUh6eC3C_A';
        const proxies = [
            `https://corsproxy.io/?url=${encodeURIComponent(feedUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(feedUrl)}`,
        ];
        let xml = null;
        for (const proxy of proxies) {
            try { const r = await fetch(proxy); if (r.ok) { xml = await r.text(); break; } } catch {}
        }
        if (!xml) return;
        const doc = new DOMParser().parseFromString(xml, 'text/xml');
        const entries = [...doc.querySelectorAll('entry')].slice(0, 6);
        const fresh = entries.map(entry => ({
            id: entry.querySelector('videoId')?.textContent,
            title: entry.querySelector('title')?.textContent,
            thumb: entry.querySelector('thumbnail')?.getAttribute('url'),
        })).filter(v => v.id && v.title);
        if (fresh.length) renderVideos(fresh);
    } catch {}
}

async function loadDiscord() {
    const widget = document.getElementById('discord-widget');
    try {
        const data = await fetch('https://discord.com/api/guilds/820530275981066270/widget.json').then(r => r.json());
        if (data.code) return;
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
                    </div>`).join('')}
            </div>` : ''}`;
    } catch {}
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
            if (!data) return;
            users[id] = {
                name: data.global_name || data.username || 'User',
                avatar: data.avatarURL || data.defaultAvatarURL || '',
                color: FRIEND_COLORS[i % FRIEND_COLORS.length],
            };
        } catch {}
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

// Background refresh
refreshGroups();
refreshGames();
refreshVideos();
loadDiscord();
loadDiscordUiUsers();

// --- Daily Quote ---
const DAILY_QUOTES = [
    { text: "My only stable belief is that Christ is King", author: "Me" },
    { text: "Become the person you have a crush on", author: "Me" },
    { text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud", author: "1 Corinthians 13:4" },
    { text: "If you have faith as small as a mustard seed, you can say to this mountain, ‘Move from here to there,’ and it will move. Nothing will be impossible for you.", author: "Matthew 17:20" },
    { text: "Recognize what is in your sight, and that which is hidden from you will become plain to you. For there is nothing hidden which will not become manifest.", author: "Jesus" },
    { text: "Be aware, be vigilant.", author: "George Orwell" },
    { text: "Life's better on Saturn", author: "👁️" },
];
(function() {
    const q = DAILY_QUOTES[new Date().getDay()];
    const el = document.getElementById('daily-quote-text');
    if (el) el.innerHTML = `“${q.text}”<br>- ${q.author}`;
})();

// --- Static data (always renders immediately) ---

const STATIC_GROUPS = [
    { order: 1,  id: 45578084,  name: "No Trash Studios",  desc: "",                                                                  icon: "https://tr.rbxcdn.com/180DAY-438648c2382e7be64f83cdc2fcadbf16/150/150/Image/Png/noFilter", tag: "PRIMARY" },
    { order: 2,  id: 34135129,  name: "Game Swap",         desc: "THE MOST AWESOME GAMES ON ROBLOX MADE IN A SHORT TIME!",           icon: "https://tr.rbxcdn.com/180DAY-bc6e7b57abe6c197cc9f3f721d307957/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 3,  id: 34555295,  name: "Brickiez",          desc: "Creating fun and silly games for everyone to enjoy!",              icon: "https://tr.rbxcdn.com/180DAY-40fb0fe9866d98db4573cdacb8e2a76a/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 4,  id: 300315957, name: "Clanker Studios",   desc: "all about the vibes 😎",                                           icon: "https://tr.rbxcdn.com/180DAY-b3724b62515f03f99435f72a99adc8eb/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 5,  id: 33846029,  name: "WeTheBread",        desc: "bread bread bread bread bread bread bread bread bread",             icon: "https://tr.rbxcdn.com/180DAY-a03926b78e8c2db772b249675ab27f36/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 6,  id: 443524639, name: "The Basement Games",  desc: "",                                                              icon: "https://tr.rbxcdn.com/180DAY-86d27432e33b6d5f3f0478465ba6b2d9/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 7,  id: 559719618, name: "No Slop Studios",   desc: "",                                                                  icon: "https://tr.rbxcdn.com/180DAY-342ae8e5ec226669de7034e891e28601/150/150/Image/Png/noFilter", tag: "FUN GAMES" },
    { order: 99, id: 32924401,  name: "Nobloxia",          desc: "Stolen from us by Azure Ventures.", stolen: true, tag: "FUN GAMES", icon: "https://tr.rbxcdn.com/180DAY-e806a1501862c6dd05947de7729ee6e4/150/150/Image/Png/noFilter" },
    { order: 1,  id: 33447364,  name: "Best Events",       desc: "",                                                                  icon: "https://tr.rbxcdn.com/180DAY-73279337d38a0909602a4d10657c3228/150/150/Image/Png/noFilter", tag: "EVENTS" },
    { order: 2,  id: 219333405, name: "Roblox Civilization Survival", desc: "",                                                       icon: "https://tr.rbxcdn.com/180DAY-47f9867bc677d5a08801bda4407f958d/150/150/Image/Png/noFilter", tag: "EVENTS" },
    { order: 3,  id: 32360058,  name: "Kash's Kingdom",    desc: "I created this group to make games and bring developers together.", icon: "https://tr.rbxcdn.com/180DAY-c68fff864fd8da819b9779b15e86345f/150/150/Image/Png/noFilter", tag: "PERSONAL" },
    { order: 4,  id: 829233796, name: "The Bloxxas",       desc: "Everything Changes.",                                              icon: "https://tr.rbxcdn.com/180DAY-e198b0732b354f0ec61f19c1e16d76fb/150/150/Image/Png/noFilter", tag: "YOUTUBE" },
];

const STATIC_GAMES = [
    { order: 1, placeId: 17223006401,     universeId: 5894409679, name: "Rob a Convenience Store Simulator", desc: "",                                                       icon: "https://tr.rbxcdn.com/180DAY-573722b15d95c9dccfcf038699bb318c/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-d043058e72b93c430b0e99181a3333bc/768/432/Image/Png/noFilter"  },
    { order: 2, placeId: 97158533146210,  universeId: 9251494665, name: "Be Famous",                          desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-ed46ad772a9af1d516bd664858fed49d/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-99d71a15335ad835614a6a74e79db63f/768/432/Image/Png/noFilter"  },
    { order: 3, placeId: 116357250335199, universeId: 7413307311, name: "Calculator",                         desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-063e683869c069c10b3034b3b4be5afb/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-cbfe689a0bde9a4f0824d75b98069256/768/432/Image/Png/noFilter"  },
    { order: 4, placeId: 93247877223004,  universeId: 7395704513, name: "Sun Apocalypse",                     desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-006143452bcbc8ca45aa94b4d486970e/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-2a8a006d11157c33e55a24846acd8cbf/768/432/Image/Png/noFilter"  },
    { order: 5, placeId: 17054406156,     universeId: 5846862286, name: "Interview Box",                      desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-59d23f9f9093c93fd25f8c2ade24f80b/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-d4bfbb41e58a941f1c1911f810a7cce0/768/432/Image/Png/noFilter"  },
    { order: 6, placeId: 15239012937,     universeId: 5254192909, name: "Missile Launch Sequence",            desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-0859bd7dbcd79ad358132ba9557b5647/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-63283f4439acc9e7e565ec7b0fb74529/768/432/Image/Png/noFilter"  },
    { order: 7, placeId: 10141461362,     universeId: 3723366489, name: "Ways to Die",                        desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-fdd165ef5ad3bf9d2f5a5685ae6da899/150/150/Image/Png/noFilter",    finished: true, thumb: "https://tr.rbxcdn.com/180DAY-4c442e1ea13c8461c1ce27293602ab81/768/432/Image/Png/noFilter"  },
    { order: 1, placeId: 113489516847696, universeId: 8916375040, name: "My Fishing Brainrots",            desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-9b9be8b2f5fe657a2b57f5e733a0da21/150/150/Image/Png/noFilter",    finished: true, contributed: true, thumb: "https://tr.rbxcdn.com/180DAY-09721c339e333fc0af649db41d1aef80/768/432/Image/Png/noFilter"  },
    { order: 2, placeId: 13992243473,     universeId: 4847474655, name: "Sword Combat",                     desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-0c609d228de364e8bfcc70564d503599/150/150/Image/Png/noFilter",    finished: true, contributed: true, thumb: "https://tr.rbxcdn.com/180DAY-a47f797eb94974140cf57193c66e1e84/768/432/Image/Png/noFilter"  },
    { order: 3, placeId: 12946776055,     universeId: 4528468905, name: "Goofy Soccer",                     desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-09a22c21a3820a939abb64df02d66691/150/150/Image/Png/noFilter",    finished: true, contributed: true, thumb: "https://tr.rbxcdn.com/180DAY-de3f19b589efd0b4e30812e7856db9e5/768/432/Image/Png/noFilter"  },
    { order: 99, placeId: 6196759988,     universeId: 2270233824, name: "ShapeShifter",                     desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-eb4d3b4d6f640050ac2c76824ea02b9c/150/150/Image/Png/noFilter",    finished: true, contributed: true, thumb: "https://tr.rbxcdn.com/180DAY-93b27b35cd58373da46eb52fada27f39/768/432/Image/Png/noFilter"  },
    { order: 1, placeId: 18882629640,     universeId: 6395375513, name: "Waterslide Simulator",           desc: "How fun can a waterslide REALLY be? 💥 Come find out. 💥", icon: "https://tr.rbxcdn.com/180DAY-1412cf6107fcb54db8312d4d78e43872/150/150/Image/Png/noFilter", finished: false },
    { order: 2, placeId: 130778402266121, universeId: 7414832095, name: "Players vs Hunter",                  desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-6f04369060213cc72bbec0d8dd5a47a4/150/150/GameIcon8/Png/noFilter", finished: false },
    { order: 3, placeId: 18882642310,     universeId: 6395380195, name: "Mega Ramp Obby",                 desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-6f04369060213cc72bbec0d8dd5a47a4/150/150/GameIcon8/Png/noFilter", finished: false },
    { order: 4, placeId: 91804761265726,  universeId: 6676207694, name: "Grapple Ball Sandbox",           desc: "",                                                         icon: "https://tr.rbxcdn.com/180DAY-8a2116bd9d541c179d7bd4e611fe58b8/150/150/GameIcon3/Png/noFilter", finished: false },
    { order: 5, placeId: 18882651254,     universeId: 6395383240, name: "Obby but you're strapped to a bomb!", desc: "",                                                    icon: "https://tr.rbxcdn.com/180DAY-55f24c4f0a10653c67f48120983a1b09/150/150/GameIcon5/Png/noFilter", finished: false },
];

const STATIC_VIDEOS = [
    { order: 1, id: "xeXbQVAVgQg", title: "Is Scripting or 3D Modeling Harder?",          thumb: "https://i1.ytimg.com/vi/xeXbQVAVgQg/hqdefault.jpg" },
    { order: 2, id: "bxOjZ29GyDI", title: "THE RICHEST ROBLOX GAME... 🤯 #shorts",        thumb: "https://i3.ytimg.com/vi/bxOjZ29GyDI/hqdefault.jpg" },
    { order: 3, id: "U3gJC9g5mqk", title: "Can 10 DEVS Make Grow a Garden in ROBLOX?",    thumb: "https://i2.ytimg.com/vi/U3gJC9g5mqk/hqdefault.jpg" },
    { order: 4, id: "jPtJBVbHNOY", title: "5 Game Devs vs 1 Fake | Odd One Out",          thumb: "https://i3.ytimg.com/vi/jPtJBVbHNOY/hqdefault.jpg" },
    { order: 5, id: "tMjvzB8MnnY", title: "5 Devs Game Swap",                             thumb: "https://i1.ytimg.com/vi/tMjvzB8MnnY/hqdefault.jpg" },
    { order: 6, id: "w0SLgD7fn48", title: "Scripter vs 3D Modeler Game Swap",             thumb: "https://i4.ytimg.com/vi/w0SLgD7fn48/hqdefault.jpg" },
    { order: 7, id: "HJCUmhr-G4I", title: "I Scripted Football but with GUNS in Roblox...", thumb: "https://i1.ytimg.com/vi/HJCUmhr-G4I/hqdefault.jpg" },
];

// --- Render functions ---

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

const GROUP_CATEGORIES = [
    { label: 'Fun Games', match: g => g.tag === 'PRIMARY' || g.tag === 'FUN GAMES' },
    { label: 'Social', match: g => !g.stolen && (g.tag === 'EVENTS' || g.tag === 'PERSONAL' || g.tag === 'YOUTUBE') },
];

function renderGroups(groups) {
    const container = document.querySelector('.groups');
    container.innerHTML = '';
    GROUP_CATEGORIES.forEach(cat => {
        const items = groups.filter(cat.match).sort(byOrder);
        if (!items.length) return;
        const label = document.createElement('p');
        label.className = 'group-category-label';
        label.textContent = cat.label;
        container.appendChild(label);
        const row = document.createElement('div');
        row.className = 'group-row';
        items.forEach(group => {
            const card = document.createElement('a');
            card.href = group.link || `https://www.roblox.com/groups/${group.id}`;
            if (!group.link) card.target = '_blank';
            card.className = 'group-card' + (group.stolen ? ' stolen' : '');
            card.innerHTML = `
                <img src="${group.icon}" alt="${group.name}">
                <div class="group-info">
                    <h3>${group.name}${group.stolen ? ' <span class="stolen-tag">⚠ STOLEN</span>' : ''}</h3>
                    <p>${group.desc || ''}</p>
                </div>`;
            row.appendChild(card);
        });
        container.appendChild(row);
    });
}

function makeGameCard(game) {
    const card = document.createElement('a');
    card.href = `https://www.roblox.com/games/${game.placeId}`;
    card.target = '_blank';
    card.className = 'game-card' + (game.finished ? '' : ' in-dev');
    const img = (game.finished && game.thumb) ? game.thumb : game.icon;
    card.innerHTML = `
        <div class="img-wrap"><img src="${img}" alt="${game.name}"></div>
        <div class="game-info">
            <h3>${game.name}</h3>
            <p>${game.desc || ''}</p>
        </div>`;
    if (game.finished) {
        const play = document.createElement('button');
        play.className = 'play-btn';
        play.type = 'button';
        play.setAttribute('aria-label', `Play ${game.name}`);
        play.innerHTML = '<span>▶</span>';
        play.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `roblox://experiences/start?placeId=${game.placeId}`;
        });
        card.appendChild(play);
    }
    return card;
}

function renderGames(games) {
    const mine = document.getElementById('my-games-row');
    const contributed = document.getElementById('contributed-games-row');
    const indev = document.getElementById('indev-games-row');
    mine.innerHTML = '';
    contributed.innerHTML = '';
    indev.innerHTML = '';
    games.filter(g => g.finished && !g.contributed).sort(byOrder).forEach(g => mine.appendChild(makeGameCard(g)));
    games.filter(g => g.finished && g.contributed).sort(byOrder).forEach(g => contributed.appendChild(makeGameCard(g)));
    games.filter(g => !g.finished).sort(byOrder).forEach(g => indev.appendChild(makeGameCard(g)));
}

function renderVideos(videos) {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = '';
    [...videos].sort(byOrder).forEach(video => {
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
        const [infoRes, iconRes, thumbRes] = await Promise.all([
            robloxFetch(`https://games.roblox.com/v1/games?universeIds=${universeIds}`),
            robloxFetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeIds}&size=150x150&format=Png&isCircular=false`),
            robloxFetch(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${universeIds}&countPerUniverse=1&defaults=true&size=768x432&format=Png&isCircular=false`),
        ]);
        const iconMap = {};
        for (const item of (iconRes.data || [])) iconMap[item.targetId] = item.imageUrl;
        const thumbMap = {};
        for (const item of (thumbRes.data || [])) thumbMap[item.universeId] = item.thumbnails?.[0]?.imageUrl;
        const infoMap = {};
        for (const item of (infoRes.data || [])) infoMap[item.id] = item;
        const fresh = STATIC_GAMES.map(g => {
            const info = infoMap[g.universeId];
            if (!info) return g;
            return { ...g, name: info.name, desc: info.description || '', icon: iconMap[g.universeId] || g.icon, thumb: thumbMap[g.universeId] || g.thumb };
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
        const entries = [...doc.querySelectorAll('entry')].slice(0, 8);
        const fresh = entries.map(entry => ({
            id: entry.querySelector('videoId')?.textContent,
            title: entry.querySelector('title')?.textContent,
            thumb: entry.querySelector('thumbnail')?.getAttribute('url'),
        })).filter(v => v.id && v.title);
        if (fresh.length) renderVideos(fresh);
    } catch {}
}

async function loadPixelDiversWidget() {
    const widget = document.getElementById('pixeldivers-widget');
    if (!widget) return;
    try {
        const data = await fetch('https://discord.com/api/guilds/1228796738198966282/widget.json').then(r => r.json());
        if (data.code) return;
        const onlineMembers = (data.members || []).slice(0, 6);
        widget.innerHTML = `
            <div class="discord-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.053a19.902 19.902 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                <div>
                    <h3>${data.name}</h3>
                    <span>${data.presence_count} online</span>
                </div>
                <a href="https://discord.gg/Mc5XD5sXYQ" target="_blank" class="discord-join">Join</a>
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
loadPixelDiversWidget();

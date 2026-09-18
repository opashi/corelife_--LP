document.addEventListener("DOMContentLoaded", () => {
    const newsStorageKey = "coreLifeNews";
    const fcStorageKey = "coreLifeFcSettings";
    const shopsStorageKey = "coreLifeShops";

    function readStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }

    function formatDate(date) {
        return String(date).replaceAll("-", ".");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");
    }

    const defaultShopAccounts = [
        { id: "hikone", name: "整体Core Life 彦根院", loginId: "hikone", loginPassword: "corelife" },
        { id: "higashiomi", name: "整体Core Life まい整体院", loginId: "higashiomi", loginPassword: "corelife" },
        { id: "rittoh", name: "整体Core Life さつき整体院", loginId: "rittoh", loginPassword: "corelife" },
        { id: "yotsuba", name: "整体Core Life よつば整体院", loginId: "yotsuba", loginPassword: "corelife" },
        { id: "nishi-tokyo", name: "整体Core Life 鍼灸マッサージ治療室とつかや", loginId: "nishi-tokyo", loginPassword: "corelife" },
        { id: "minoh", name: "整体Core Life Minohけいすけ整体院", loginId: "minoh", loginPassword: "corelife" },
        { id: "yatsushiro", name: "整体Core Life 道田整体院", loginId: "yatsushiro", loginPassword: "corelife" }
    ];

    function renderNewsList() {
        const list = document.querySelector(".news-list");
        const storedNews = readStorage(newsStorageKey);
        if (!list || !Array.isArray(storedNews)) return;

        list.innerHTML = storedNews.map(item => `
            <article class="news-item" data-category="${escapeHtml(item.categoryKey)}" id="news-admin-${escapeHtml(item.id)}">
                <a href="news_detail.html?id=${item.id}">
                    <div class="news-date"><time datetime="${escapeHtml(item.date)}">${formatDate(item.date)}</time></div>
                    <div class="news-category">${escapeHtml(item.category)}</div>
                    <h3 class="news-title">${escapeHtml(item.title)}</h3>
                    <span class="news-arrow">→</span>
                </a>
            </article>
        `).join("");
    }

    function renderHomeNews() {
        const list = document.querySelector("#news .news-list");
        const storedNews = readStorage(newsStorageKey);
        if (!list || !Array.isArray(storedNews)) return;

        list.innerHTML = storedNews.slice(0, 3).map(item => `
            <a href="news_detail.html?id=${escapeHtml(item.id)}" class="news-item">
                <time>${formatDate(item.date)}</time>
                <span class="news-category">${escapeHtml(item.category)}</span>
                <p>${escapeHtml(item.title)}</p>
                <span class="arrow">→</span>
            </a>
        `).join("");
    }

    function applyFcSettings() {
        const settings = readStorage(fcStorageKey);
        if (!settings || !document.querySelector(".fc-page")) return;

        const heroTitle = document.querySelector(".fc-hero h1");
        const heroDescription = document.querySelector(".fc-hero-description");
        const welcomeTitle = document.querySelector(".fc-welcome h2");
        const welcomeText = document.querySelector(".fc-welcome-text");
        const supportTitle = document.querySelector(".fc-information-title h2");
        const supportText = document.querySelector(".fc-information-text > p");

        if (heroTitle) heroTitle.textContent = settings.heroTitle;
        if (heroDescription) heroDescription.innerHTML = settings.heroDescription.replaceAll("\n", "<br>");
        if (welcomeTitle) welcomeTitle.textContent = settings.welcomeTitle;
        if (welcomeText) welcomeText.innerHTML = settings.welcomeText.replaceAll("\n", "<br>");
        if (supportTitle) supportTitle.textContent = settings.supportTitle;
        if (supportText) supportText.textContent = settings.supportText;
    }

    function renderShops() {
        const shopGrid = document.getElementById("shopGrid");
        const storedShops = readStorage(shopsStorageKey);
        if (!shopGrid || !Array.isArray(storedShops)) return;

        shopGrid.innerHTML = storedShops.map(shop => `
            <article class="shop-card" data-prefecture="${escapeHtml(shop.prefecture)}" data-area="${escapeHtml(shop.area)}" data-lat="${escapeHtml(shop.lat)}" data-lng="${escapeHtml(shop.lng)}" data-shop-name="${escapeHtml(shop.name)}">
                <div class="shop-image">
                    <img src="${escapeHtml(shop.image)}" alt="${escapeHtml(shop.name)}">
                    <span class="shop-label">${escapeHtml(shop.prefectureName)}</span>
                </div>
                <div class="shop-body">
                    <p class="shop-area">${escapeHtml(shop.prefectureName)}・${escapeHtml(shop.areaName)}</p>
                    <h2>${escapeHtml(shop.name)}</h2>
                    <div class="shop-info">
                        <div><span>ADDRESS</span><p>${escapeHtml(shop.address)}</p></div>
                        <div><span>ACCESS</span><p>${escapeHtml(shop.access)}</p></div>
                        <div><span>OPEN</span><p>${escapeHtml(shop.open)}</p></div>
                        <div><span>TEL</span><p><a href="tel:${escapeHtml(shop.tel.replaceAll("-", ""))}">${escapeHtml(shop.tel)}</a></p></div>
                    </div>
                    <div class="shop-buttons">
                        <a href="${escapeHtml(shop.detailUrl)}" class="detail-button">店舗詳細 <span>→</span></a>
                        <a href="fc.html" class="reserve-button">加盟店ページ</a>
                    </div>
                </div>
            </article>
        `).join("");

        const area = document.getElementById("area");
        if (area) {
            const areas = storedShops.filter((shop, index, list) => list.findIndex(item => item.area === shop.area) === index);
            area.innerHTML = `<option value="all">すべて</option>` + areas.map(shop => `<option value="${escapeHtml(shop.area)}" data-prefecture="${escapeHtml(shop.prefecture)}">${escapeHtml(shop.areaName)}</option>`).join("");
        }
    }

    function setupFcLogin() {
        const form = document.getElementById("fcLoginForm");
        const overlay = document.getElementById("fcLoginOverlay");
        const error = document.getElementById("fcLoginError");
        const logout = document.querySelector(".fc-logout");
        if (!form || !overlay) return;

        const accounts = readStorage(shopsStorageKey) || defaultShopAccounts;
        const sessionId = localStorage.getItem("coreLifeFcSession");
        const current = accounts.find(shop => shop.id === sessionId);

        function showUser(shop) {
            overlay.hidden = true;
            const userName = document.querySelector(".fc-user-name");
            if (userName) userName.textContent = shop.name;
        }

        if (current) showUser(current);

        form.addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(form);
            const account = accounts.find(shop => shop.loginId === formData.get("loginId") && shop.loginPassword === formData.get("password"));
            if (!account) {
                error.textContent = "ログインIDまたはパスワードが正しくありません。";
                error.hidden = false;
                return;
            }
            localStorage.setItem("coreLifeFcSession", account.id);
            showUser(account);
        });

        if (logout) {
            logout.addEventListener("click", event => {
                event.preventDefault();
                localStorage.removeItem("coreLifeFcSession");
                overlay.hidden = false;
            });
        }
    }

    renderNewsList();
    renderHomeNews();
    applyFcSettings();
    renderShops();
    setupFcLogin();
});

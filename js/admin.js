document.addEventListener("DOMContentLoaded", () => {
    const storageKeys = {
        news: "coreLifeNews",
        fc: "coreLifeFcSettings",
        shops: "coreLifeShops"
    };

    const defaultNews = [
        {
            id: 1,
            date: "2026-09-17",
            category: "お知らせ",
            categoryKey: "information",
            title: "Core Life公式サイトをリニューアルしました。",
            body: "Core Lifeの公式サイトをリニューアルしました。店舗情報やメニューをより分かりやすくお届けします。"
        },
        {
            id: 7,
            date: "2026-08-01",
            category: "お知らせ",
            categoryKey: "information",
            title: "新しい施術メニューを開始しました。",
            body: "身体の状態やお悩みに合わせた新しい施術メニューを開始しました。"
        },
        {
            id: 2,
            date: "2026-09-10",
            category: "キャンペーン",
            categoryKey: "campaign",
            title: "秋の身体メンテナンスキャンペーンのお知らせ",
            body: "季節の変わり目に合わせた身体メンテナンスキャンペーンを実施します。"
        },
        {
            id: 3,
            date: "2026-09-01",
            category: "店舗情報",
            categoryKey: "shop",
            title: "Core Life 新店舗オープンのお知らせ",
            body: "Core Lifeに新しい店舗がオープンしました。"
        },
        {
            id: 4,
            date: "2026-08-20",
            category: "お知らせ",
            categoryKey: "information",
            title: "9月の営業日についてのお知らせ",
            body: "9月の営業日をご案内します。"
        },
        {
            id: 5,
            date: "2026-08-05",
            category: "キャンペーン",
            categoryKey: "campaign",
            title: "初めての方限定キャンペーンのご案内",
            body: "初めてCore Lifeをご利用いただく方を対象にしたキャンペーンをご案内します。"
        },
        {
            id: 6,
            date: "2026-07-25",
            category: "店舗情報",
            categoryKey: "shop",
            title: "彦根院の営業時間変更について",
            body: "彦根院の営業時間を一部変更しました。"
        }
    ];

    const defaultFc = {
        heroTitle: "加盟店ページ",
        heroDescription: "Core Life加盟店の皆さまへ。\n研修・マニュアル・最新情報をご確認いただけます。",
        welcomeTitle: "加盟店の皆さまへ",
        welcomeText: "Core Life加盟店専用ページへようこそ。\nこちらから研修動画や研修日程、マニュアルなど、店舗運営に必要な情報をご確認いただけます。",
        supportTitle: "加盟店サポート",
        supportText: "店舗運営についてのお困りごとや、システム・研修に関するご質問は加盟店サポートまでお問い合わせください。"
    };

    const defaultShops = [
        { id: "hikone", name: "整体Core Life 彦根院", prefecture: "shiga", prefectureName: "滋賀県", area: "hikone", areaName: "彦根市", address: "滋賀県彦根市平田町378-1", access: "南彦根駅 徒歩5分", open: "9:00〜20:00", tel: "080-8942-1161", lat: "35.2745", lng: "136.2596", image: "images/shop-01.jpg", detailUrl: "shop-detail.html?shop=hikone", loginId: "hikone", loginPassword: "corelife" },
        { id: "higashiomi", name: "整体Core Life まい整体院", prefecture: "shiga", prefectureName: "滋賀県", area: "higashiomi", areaName: "東近江市", address: "滋賀県東近江市垣見町588-1", access: "能登川駅 徒歩5分", open: "9:00〜20:00", tel: "070-3152-1364", lat: "35.1120", lng: "136.2010", image: "images/shop-02.jpg", detailUrl: "https://mai-seitaiin.com/", loginId: "higashiomi", loginPassword: "corelife" },
        { id: "rittoh", name: "整体Core Life さつき整体院", prefecture: "shiga", prefectureName: "滋賀県", area: "rittoh", areaName: "栗東市", address: "滋賀県栗東市小柿6-9-22", access: "JR栗東駅 徒歩5分", open: "9:00〜20:00", tel: "090-3977-9526", lat: "35.0210", lng: "135.9980", image: "images/shop-03.jpg", detailUrl: "shop-detail.html?shop=rittoh", loginId: "rittoh", loginPassword: "corelife" },
        { id: "yotsuba", name: "整体Core Life よつば整体院", prefecture: "shiga", prefectureName: "滋賀県", area: "higashiomi", areaName: "東近江市", address: "滋賀県東近江市山上町3597-3", access: "JR能登川駅 徒歩7分", open: "9:00〜20:00", tel: "080-1418-6246", lat: "35.1560", lng: "136.2790", image: "images/shop-04.jpg", detailUrl: "shop-detail.html?shop=yotsuba", loginId: "yotsuba", loginPassword: "corelife" },
        { id: "nishi-tokyo", name: "整体Core Life 鍼灸マッサージ治療室とつかや", prefecture: "tokyo", prefectureName: "東京都", area: "nishi-tokyo", areaName: "西東京市", address: "東京都西東京市田無町3-3-7 海老沢第一ビル505", access: "田無駅 徒歩5分", open: "9:00〜20:00", tel: "042-452-5480", lat: "35.7250", lng: "139.5380", image: "images/shop-05.jpg", detailUrl: "shop-detail.html?shop=nishi-tokyo", loginId: "nishi-tokyo", loginPassword: "corelife" },
        { id: "minoh", name: "整体Core Life Minohけいすけ整体院", prefecture: "osaka", prefectureName: "大阪府", area: "minoh", areaName: "箕面市", address: "大阪府箕面市箕面7-1-14 リッツ箕面301", access: "箕面駅 徒歩5分", open: "9:00〜20:00", tel: "080-5602-0009", lat: "34.8269", lng: "135.4706", image: "images/shop-06.jpg", detailUrl: "shop-detail.html?shop=minoh", loginId: "minoh", loginPassword: "corelife" },
        { id: "yatsushiro", name: "整体Core Life 道田整体院", prefecture: "kumamoto", prefectureName: "熊本県", area: "yatsushiro", areaName: "八代市", address: "熊本県八代市古城町1981-1", access: "八代駅 徒歩5分", open: "9:00〜20:00", tel: "060-9597-9811", lat: "32.5070", lng: "130.6010", image: "images/shop-07.jpg", detailUrl: "shop-detail.html?shop=yatsushiro", loginId: "yatsushiro", loginPassword: "corelife" }
    ];

    const newsEditorList = document.getElementById("newsEditorList");
    const shopEditorList = document.getElementById("shopEditorList");
    const fcSettingsForm = document.getElementById("fcSettingsForm");
    const saveStatus = document.getElementById("saveStatus");
    const toast = document.getElementById("adminToast");

    let newsItems = readStorage(storageKeys.news, defaultNews);
    let fcSettings = readStorage(storageKeys.fc, defaultFc);
    let shops = readStorage(storageKeys.shops, defaultShops);

    function readStorage(key, fallback) {
        try {
            const stored = JSON.parse(localStorage.getItem(key));
            return stored || structuredClone(fallback);
        } catch {
            return structuredClone(fallback);
        }
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
    }

    function markSaved(message) {
        saveStatus.textContent = message;
        saveStatus.classList.add("saved");
        window.setTimeout(() => saveStatus.classList.remove("saved"), 1600);
    }

    function saveNews() {
        localStorage.setItem(storageKeys.news, JSON.stringify(newsItems));
        markSaved("NEWSを保存しました");
        showToast("NEWSを保存しました");
    }

    function saveShops() {
        localStorage.setItem(storageKeys.shops, JSON.stringify(shops));
        markSaved("加盟店情報を保存しました");
        showToast("加盟店情報を保存しました");
    }

    function renderNews() {
        newsEditorList.innerHTML = "";

        newsItems.forEach((item, index) => {
            const editor = document.createElement("article");
            editor.className = "news-editor-item";
            editor.innerHTML = `
                <div class="editor-item-heading">
                    <span class="editor-number">${String(index + 1).padStart(2, "0")}</span>
                    <strong>NEWS ${String(item.id).padStart(2, "0")}</strong>
                    <button type="button" class="delete-news-button" data-index="${index}">削除</button>
                </div>
                <div class="editor-fields">
                    <label>日付<input type="date" data-field="date" value="${item.date}"></label>
                    <label>カテゴリ<select data-field="categoryKey">
                        <option value="information" ${item.categoryKey === "information" ? "selected" : ""}>お知らせ</option>
                        <option value="campaign" ${item.categoryKey === "campaign" ? "selected" : ""}>キャンペーン</option>
                        <option value="shop" ${item.categoryKey === "shop" ? "selected" : ""}>店舗情報</option>
                    </select></label>
                    <label class="field-wide">タイトル<input type="text" data-field="title" value="${escapeAttribute(item.title)}"></label>
                    <label class="field-wide">本文<textarea data-field="body" rows="3">${escapeText(item.body)}</textarea></label>
                </div>
            `;

            editor.querySelectorAll("[data-field]").forEach(input => {
                input.addEventListener("change", () => {
                    const field = input.dataset.field;
                    item[field] = input.value;
                    if (field === "categoryKey") {
                        item.category = input.options[input.selectedIndex].textContent;
                    }
                    saveNews();
                });
            });

            editor.querySelector(".delete-news-button").addEventListener("click", () => {
                newsItems.splice(index, 1);
                saveNews();
                renderNews();
            });

            newsEditorList.appendChild(editor);
        });
    }

    function escapeAttribute(value) {
        return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    function escapeText(value) {
        return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    function renderShops() {
        shopEditorList.innerHTML = "";

        shops.forEach((shop, index) => {
            const editor = document.createElement("article");
            editor.className = "news-editor-item shop-editor-item";
            editor.innerHTML = `
                <div class="editor-item-heading">
                    <span class="editor-number">${String(index + 1).padStart(2, "0")}</span>
                    <strong>${escapeText(shop.name)}</strong>
                    <button type="button" class="delete-news-button" data-shop-index="${index}">削除</button>
                </div>
                <div class="editor-fields shop-editor-fields">
                    <label>店舗ID<input type="text" data-field="id" value="${escapeAttribute(shop.id)}"></label>
                    <label>店舗名<input type="text" data-field="name" value="${escapeAttribute(shop.name)}"></label>
                    <label>都道府県<select data-field="prefecture" data-name-field="prefectureName">
                        <option value="shiga" ${shop.prefecture === "shiga" ? "selected" : ""}>滋賀県</option>
                        <option value="osaka" ${shop.prefecture === "osaka" ? "selected" : ""}>大阪府</option>
                        <option value="tokyo" ${shop.prefecture === "tokyo" ? "selected" : ""}>東京都</option>
                        <option value="kumamoto" ${shop.prefecture === "kumamoto" ? "selected" : ""}>熊本県</option>
                    </select></label>
                    <label>エリア名<input type="text" data-field="areaName" value="${escapeAttribute(shop.areaName)}"></label>
                    <label>エリアID<input type="text" data-field="area" value="${escapeAttribute(shop.area)}"></label>
                    <label>電話<input type="tel" data-field="tel" value="${escapeAttribute(shop.tel)}"></label>
                    <label>営業時間<input type="text" data-field="open" value="${escapeAttribute(shop.open)}"></label>
                    <label class="field-wide">住所<input type="text" data-field="address" value="${escapeAttribute(shop.address)}"></label>
                    <label class="field-wide">アクセス<input type="text" data-field="access" value="${escapeAttribute(shop.access)}"></label>
                    <label>緯度<input type="text" data-field="lat" value="${escapeAttribute(shop.lat)}"></label>
                    <label>経度<input type="text" data-field="lng" value="${escapeAttribute(shop.lng)}"></label>
                    <label>画像パス<input type="text" data-field="image" value="${escapeAttribute(shop.image)}"></label>
                    <label>詳細URL<input type="text" data-field="detailUrl" value="${escapeAttribute(shop.detailUrl)}"></label>
                    <label>ログインID<input type="text" data-field="loginId" value="${escapeAttribute(shop.loginId)}"></label>
                    <label>ログインパスワード<input type="text" data-field="loginPassword" value="${escapeAttribute(shop.loginPassword)}"></label>
                </div>
            `;

            editor.querySelectorAll("[data-field]").forEach(input => {
                input.addEventListener("change", () => {
                    const field = input.dataset.field;
                    shop[field] = input.value;
                    if (input.dataset.nameField) {
                        shop[input.dataset.nameField] = input.options[input.selectedIndex].textContent;
                    }
                    saveShops();
                });
            });

            editor.querySelector("[data-shop-index]").addEventListener("click", () => {
                shops.splice(index, 1);
                saveShops();
                renderShops();
            });

            shopEditorList.appendChild(editor);
        });
    }

    function fillFcForm() {
        Object.entries(fcSettings).forEach(([key, value]) => {
            const field = fcSettingsForm.elements.namedItem(key);
            if (field) field.value = value;
        });
    }

    document.querySelectorAll(".admin-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".admin-tab").forEach(item => item.classList.remove("active"));
            document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.panel).classList.add("active");
        });
    });

    document.getElementById("addNewsButton").addEventListener("click", () => {
        const nextId = newsItems.reduce((max, item) => Math.max(max, item.id), 0) + 1;
        newsItems.unshift({
            id: nextId,
            date: new Date().toISOString().slice(0, 10),
            category: "お知らせ",
            categoryKey: "information",
            title: "新しいお知らせ",
            body: "お知らせ本文を入力してください。"
        });
        saveNews();
        renderNews();
    });

    document.getElementById("addShopButton").addEventListener("click", () => {
        const nextId = `shop-${Date.now()}`;
        shops.push({
            id: nextId,
            name: "新しい加盟店",
            prefecture: "shiga",
            prefectureName: "滋賀県",
            area: "new-area",
            areaName: "新しいエリア",
            address: "住所を入力してください",
            access: "アクセスを入力してください",
            open: "9:00〜20:00",
            tel: "000-0000-0000",
            lat: "35.2745",
            lng: "136.2596",
            image: "images/shop-01.jpg",
            detailUrl: "#",
            loginId: nextId,
            loginPassword: "change-me"
        });
        saveShops();
        renderShops();
    });

    fcSettingsForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(fcSettingsForm);
        fcSettings = Object.fromEntries(formData.entries());
        localStorage.setItem(storageKeys.fc, JSON.stringify(fcSettings));
        markSaved("FC設定を保存しました");
        showToast("FC設定を保存しました");
    });

    document.getElementById("resetAllButton").addEventListener("click", () => {
        if (!window.confirm("管理画面の設定を初期状態に戻しますか？")) return;
        localStorage.removeItem(storageKeys.news);
        localStorage.removeItem(storageKeys.fc);
        localStorage.removeItem(storageKeys.shops);
        newsItems = structuredClone(defaultNews);
        fcSettings = structuredClone(defaultFc);
        shops = structuredClone(defaultShops);
        renderNews();
        renderShops();
        fillFcForm();
        showToast("設定を初期化しました");
    });

    renderNews();
    renderShops();
    fillFcForm();
});

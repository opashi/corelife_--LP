document.addEventListener("DOMContentLoaded", () => {

    const shopMapElement =
        document.getElementById("shopMap");

    const prefecture =
        document.getElementById("prefecture");

    const area =
        document.getElementById("area");

    const areaOptions =
        Array.from(area.options).filter(
            option => option.value !== "all"
        );

    const searchButton =
        document.getElementById("searchButton");

    const resetButton =
        document.getElementById("resetButton");

    const shopCards =
        document.querySelectorAll(".shop-card");

    const resultCount =
        document.getElementById("resultCount");

    const noResult =
        document.getElementById("noResult");

    let shopMap = null;
    let shopMarkers = [];


    /* ========================================
       AREA OPTIONS
    ======================================== */

    function updateAreaOptions() {

        const selectedPrefecture =
            prefecture.value;

        areaOptions.forEach(option => {

            const isVisible =
                selectedPrefecture === "all" ||
                option.dataset.prefecture === selectedPrefecture;

            option.hidden = !isVisible;
        });

        area.value = "all";
    }


    /* ========================================
       SEARCH
    ======================================== */

    function searchShops() {

        const selectedPrefecture =
            prefecture.value;

        const selectedArea =
            area.value;

        let count = 0;


        shopCards.forEach(card => {

            const cardPrefecture =
                card.dataset.prefecture;

            const cardArea =
                card.dataset.area;


            const prefectureMatch =
                selectedPrefecture === "all" ||
                cardPrefecture === selectedPrefecture;


            const areaMatch =
                selectedArea === "all" ||
                cardArea === selectedArea;


            if (
                prefectureMatch &&
                areaMatch
            ) {

                card.style.display = "block";

                count++;

            } else {

                card.style.display = "none";

            }

        });


        resultCount.textContent = count;


        if (count === 0) {

            noResult.classList.add("active");

        } else {

            noResult.classList.remove("active");

        }

        updateMapMarkers();

    }


     /* ========================================
         OPEN MAP
     ======================================== */

    function showMapMessage(message) {

        shopMapElement.innerHTML =
            `<p class="shop-map-message">${message}</p>`;
    }


    function getShopPosition(card) {

        return {
            lat: Number(card.dataset.lat),
            lng: Number(card.dataset.lng)
        };
    }


    function focusShopCard(card) {

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        card.classList.add("is-map-focused");

        window.setTimeout(() => {
            card.classList.remove("is-map-focused");
        }, 1800);
    }


    function updateMapMarkers() {

        if (!shopMap) {
            return;
        }

        shopMarkers.forEach(marker => {
            marker.remove();
        });

        shopMarkers = [];

        shopCards.forEach(card => {

            if (card.style.display === "none") {
                return;
            }

            const address =
                card.querySelector(".shop-info > div:first-child p")?.textContent.trim() || "";

            const marker = L.marker(getShopPosition(card), {
                title: card.dataset.shopName
            })
                .addTo(shopMap)
                .bindPopup(
                    `<strong>${card.dataset.shopName}</strong><br><span>${address}</span>`,
                    { className: "shop-map-popup" }
                );

            marker.on("click", () => {

                focusShopCard(card);
            });

            shopMarkers.push(marker);
        });
    }


    function initShopMap() {

        shopMap = L.map(shopMapElement, {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([35.18, 136.25], 7);

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
            attribution: "Tiles &copy; Esri | Sources: Esri, OpenStreetMap contributors",
            maxZoom: 19
        }).addTo(shopMap);

        const positions = Array.from(shopCards).map(getShopPosition);
        const bounds = L.latLngBounds(positions);

        if (positions.length > 1) {
            shopMap.fitBounds(bounds, {
                padding: [30, 30]
            });
        }

        updateMapMarkers();
    }


    function loadOpenMap() {

        if (!window.L) {
            showMapMessage(
                "地図を読み込めませんでした。ネットワーク接続をご確認ください。"
            );
            return;
        }

        initShopMap();
    }


    /* ========================================
       SEARCH BUTTON
    ======================================== */

    searchButton.addEventListener(
        "click",
        searchShops
    );


    /* ========================================
       SELECT CHANGE
       自動検索
    ======================================== */

    prefecture.addEventListener(
        "change",
        () => {
            updateAreaOptions();
            searchShops();
        }
    );

    area.addEventListener(
        "change",
        searchShops
    );


    /* ========================================
       RESET
    ======================================== */

    resetButton.addEventListener(
        "click",
        () => {

            prefecture.value = "all";

            updateAreaOptions();

            area.value = "all";

            searchShops();

        }
    );


    /* ========================================
       INITIAL
    ======================================== */

     updateAreaOptions();
    searchShops();
    loadOpenMap();

});

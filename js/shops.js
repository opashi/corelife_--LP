document.addEventListener("DOMContentLoaded", () => {

    const prefecture =
        document.getElementById("prefecture");

    const area =
        document.getElementById("area");

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
        searchShops
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

            area.value = "all";

            searchShops();

        }
    );


    /* ========================================
       INITIAL
    ======================================== */

    searchShops();

});

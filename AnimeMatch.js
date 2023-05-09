let cardData = [
    { id: 1, value: 1, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/_Vx01-bOUnYAAAAM/naruto-sasuke.gif" },
    { id: 2, value: 2, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://giffiles.alphacoders.com/132/13214.gif" },
    { id: 3, value: 3, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://steamuserimages-a.akamaihd.net/ugc/940572271204651043/A77B3A14E135087F5B7B6E05294325ABF15FF661/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" },
    { id: 4, value: 4, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/n69LvFpJGekAAAAC/tanjiro-tanjiro-season2.gif" },
    { id: 5, value: 5, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/bl2xK2l35ZwAAAAC/luffy.gif" },
    { id: 6, value: 5, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/bl2xK2l35ZwAAAAC/luffy.gif" },
    { id: 7, value: 4, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/n69LvFpJGekAAAAC/tanjiro-tanjiro-season2.gif" },
    { id: 8, value: 3, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://steamuserimages-a.akamaihd.net/ugc/940572271204651043/A77B3A14E135087F5B7B6E05294325ABF15FF661/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" },
    { id: 9, value: 2, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://giffiles.alphacoders.com/132/13214.gif" },
    { id: 10, value: 1, front: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/12/9-best-anime-logo-designs-and-how-to-make-your-own-for-free-2020--1-2.png", back: "https://media.tenor.com/_Vx01-bOUnYAAAAM/naruto-sasuke.gif" },
];
let flippedCards = [];
let totalFlips = 0;
let totalTime = 60;

function shuffleCards(cardsArray) {
    // we need to create a brand array and copy cardsArray into this new array
    // this is a shortcut to do this
    let newArray = [...cardsArray];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    cardData = newArray;
}

function ready() {
    const cardContainer = document.querySelector(".cards-container");
    const flips = document.querySelector("#flips");
    let timeRemaining = document.querySelector("#time-remaining");
    let cardsHTML = "";
    
    // count down time
    const timer = setInterval(() => {
        if (totalTime === 0) {
            clearTimer(timer);
            alert("You lost!");
        }
        timeRemaining.innerText = --totalTime
    }, 1000);
    
    shuffleCards(cardData);
    
    cardData.forEach(card => {
        cardsHTML += `<div class="card" id="card-${card.id}" data-value="${card.value}">
        <div class="card-back card-face">
          <img src="${card.front}" />
        </div>
        <div class="card-front card-face">
          <img class="card-value" src="${card.back}" />
        </div>
      </div>`
    });
    cardContainer.innerHTML = cardsHTML;

    const overlays = document.querySelectorAll(".overlay-text");
    const cards = document.querySelectorAll(".card");
    const game = new MixOrMatch(100, cardData);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute("id");
            const cardValue = card.dataset.value;
            // first check to make sure we haven't flipped two cards already
            // if we already flipped two cards then exit this function
            if (flippedCards.length === 2) {
                return;
            }

            // we will add the id of the card into this array
            flippedCards.push({ id: cardId , value: cardValue });

            // now we will flip the card
            card.classList.add("visible");

            // now we need to check if this is the second card that is flipped
            if (flippedCards.length === 2) {
                // check if both cards equal the same
                if (flippedCards[0].value !== flippedCards[1].value) {
                    setTimeout(() => {
                        // turn over the first card 
                        document.querySelector(`#${flippedCards[0].id}`).classList.remove("visible");

                        // turn over the second card
                        document.querySelector(`#${flippedCards[1].id}`).classList.remove("visible");

                        // clear the flipped cards
                        flippedCards = [];
                    }, 2000);
                } else {
                    // if they both equal, leave the cards turned over and reset flippedCards
                    flippedCards = [];

                    totalFlips++;
                    flips.innerText = totalFlips;

                    // stop timer
                    clearInterval(timer);

                    // check if all cards are flipped
                    // quick hack
                    if (document.querySelectorAll(".visible").length === 10) {
                        alert("You won!");
                    }
                }
            }
        });
    });
}

ready();


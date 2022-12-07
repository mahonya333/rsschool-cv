window.addEventListener('DOMContentLoaded', () => {
    createAnimateSymbols('.animated-text');

    document.querySelector('.main__title')?.addEventListener('mouseover', function (event) {
        const target = event.target

        if (target.classList.contains('animated-text__symbol')) {
            target.classList.add('_animated');

            target.addEventListener('animationend', () => {
                target.classList.remove('_animated');
            });
        }
    })
    createAnimateBubbles('.main .bubbles');

    document.querySelector('#burger-btn').addEventListener('click', function (event) {
        toggleNavigation('header', this)
    })
})

function toggleNavigation(blockId, btn) {
    let header = document.getElementById(blockId);
    btn.classList.toggle('_active');
    header.classList.toggle('_open');

}


function createAnimateSymbols(textClassName) {
    document.querySelectorAll(textClassName).forEach(textArray => {
        textArray.innerHTML = textArray.textContent.replace(/\S/g, '<span class="animated-text__symbol">$&</span>');
    });
}

function calculateRandomValue(x, y) {
    return (x + (Math.random() * (y - x)));
}

function createAnimateBubbles(wrapperClassName) {
    var object = " ";

    for (var i = 0; i < 100; i++) {
        var a = calculateRandomValue(2, 30);
        object += `<div class="bubbles__object" style="height: ${a}px; width: ${a}px; background-color: rgb(${calculateRandomValue(0, 117)},${calculateRandomValue(55, 75)},${calculateRandomValue(55, 74)}); animation-duration: ${calculateRandomValue(10, 30)}s; top: ${calculateRandomValue(0, 100)}%; left: ${calculateRandomValue(0, 100)}%;"></div>`
    }

    document.querySelector(wrapperClassName).innerHTML += object;
}
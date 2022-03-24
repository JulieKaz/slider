let images = [{
    url: 'img/image%201.jpg',
    title: 'Rostov-on-Don, Admiral',
    param: {
        city: 'Rostov-on-Don  <br>LCD admiral',
        area: '81 m2',
        time: '3.5 months'
    }
}, {
    url: 'img/image%202.jpg',
    title: 'Sochi Thieves',
    param: {
        city: 'Sochi <br>Thieves',
        area: '105 m2',
        time: '4 months'
    }
}, {
    url: 'img/image%203.jpg',
    title: 'Rostov-on-Don Patriotic',
    param: {
        city: 'Rostov-on-Don <br>Patriotic',
        area: '93 m2',
        time: '3 months'
    }
}];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        indicators: true,
        autoplay: false
    };

    let sliderImage = document.querySelector('.completed__img');
    let sliderArrows = document.querySelectorAll('.carousel-control__arrow');
    let sliderIndicators = document.querySelector('.carousel-control');
    let sliderRefs = document.querySelector('.carousel-list');

    initImage();
    initArrows();
    initRefs();

    if (options.indicators) {
        initIndicators();
    }

    if (options.autoplay) {
        initAutoplay(options.autoplayInt);
    }

    function initImage() {
        images.forEach(function(item, i){
            let image = `<img class="slider__image n${i} ${i === 0 ? "active" : ""}" src="${images[i].url}" data-index="${i}" alt="${images[i].title}">`;
            sliderImage.innerHTML += image;
        });
    }

    function initArrows() {
        sliderArrows.forEach(function(arrow){
            arrow.addEventListener('click', function() {
                let currentNum = +sliderImage.querySelector('.active').dataset.index;
                let nextNum;
                if (arrow.classList.contains('next')) {
                    nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;
                } else {
                    nextNum = currentNum === 0 ? images.length -1 : currentNum - 1;
                }
                moveSlider(nextNum);
            });
        });
    }

    function initIndicators() {
        images.forEach(function(image, index) {
            let indicator = `<button class="carousel-control__indicator n${index} ${index === 0 ? "active" : ""}" data-index = "${index}"></button>`;
            document.querySelector('.carousel-control__next').insertAdjacentHTML('beforebegin', indicator);
        });
        sliderIndicators.querySelectorAll('.carousel-control__indicator').forEach(function (indicator) {
            indicator.addEventListener('click', function() {
               moveSlider(this.dataset.index);
            });
        })
    }

    function initRefs() {
        images.forEach(function(image, index) {
            let ref = `<li class="carousel-list__item n${index} ${index === 0 ? "active" : ""}" data-index = "${index}"><a href="#">${image.title}</a></li>`;
            sliderRefs.innerHTML += ref;
        });
        sliderRefs.querySelectorAll('.carousel-list__item').forEach(function (li) {
            li.addEventListener('click', function() {
               moveSlider(this.dataset.index);
            });
        })
    }

    function moveSlider(num) {
        sliderImage.querySelector('.active').classList.remove('active');
        // sliderImage.querySelector('.n' + num).classList.add('active');
        fadeSliderImage(sliderImage.querySelector('.n' + num));
        sliderIndicators.querySelector('.active').classList.remove('active');
        sliderIndicators.querySelector('.n' + num).classList.add('active');
        sliderRefs.querySelector('.active').classList.remove('active');
        sliderRefs.querySelector('.n' + num).classList.add('active');
        setParam(num);
    }

    function setParam(num) {
        let city = document.querySelector('.param__city');
        let area = document.querySelector('.param__area');
        let time = document.querySelector('.param__time');
        city.innerHTML = images[num].param.city;
        area.innerHTML = images[num].param.area;
        time.innerHTML = images[num].param.time;
    }


    function initAutoplay(interval) {
        setInterval(function(){
            let currentNum = +sliderImage.querySelector('.active').dataset.index;
            let nextNum = currentNum === images.length - 1 ? 0 : currentNum + 1;
            moveSlider(nextNum);
        }, interval);
    }

    function fadeSliderImage(imageIn) {
        imageIn.classList.add('active');
        imageIn.style.zIndex = 10;
        setTimeout(() => {
            imageIn.style.zIndex = 0;
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});


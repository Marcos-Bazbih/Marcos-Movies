const SLIDER_IMAGES = [
    "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
    "https://m.media-amazon.com/images/I/810SlMj1+eL._AC_SY741_.jpg",
    "https://i.pinimg.com/736x/11/49/cf/1149cf80aabbd9c11924b29eefcceb47.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
];

let counter = 0;
setInterval(() => {
    sliderImg.src = SLIDER_IMAGES[counter++];
    if (counter == 4) counter = 0;
}, 5000);
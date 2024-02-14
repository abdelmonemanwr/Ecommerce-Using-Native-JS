let Btn1 = document.getElementById("Btn1");
let Btn2 = document.getElementById("Btn2");

let readmore1 = document.getElementById("readmore1");
let readmore2 = document.getElementById("readmore2");


Btn1.addEventListener("click", function () {
    if(Btn1.innerHTML == "Learn More"){
        readmore1.style.display = "inline-block";
        Btn1.innerHTML = "Learn Less";
    }else{
        readmore1.style.display = "none";
        Btn1.innerHTML = "Learn More";
    }
});


Btn2.addEventListener("click", function () {
    if(Btn2.innerHTML == "Learn More"){
        readmore2.style.display = "block";
        Btn2.innerHTML = "Learn Less";
    }else{
        readmore2.style.display = "none";
        Btn2.innerHTML = "Learn More";
    }
});



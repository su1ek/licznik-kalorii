//LICZNIK KALORII

let zapisane = localStorage.getItem("mojeProdukty");
let produkty = zapisane ? JSON.parse(zapisane) : [];
const wszystkieKalorie = document.getElementById("wszystkieKalorie");
const produkt = document.getElementById("produkt");
const kalorie = document.getElementById("kalorie");
const lista = document.getElementById("lista");
let totalCalories = 0;

produkty.forEach(wyswietl);

function wyswietl(wpis){
    const nowyProdukt = document.createElement("li");
    nowyProdukt.textContent = `${wpis.nazwa}: ${wpis.kcal} kcal`;
    lista.appendChild(nowyProdukt);
    totalCalories += wpis.kcal;
    wszystkieKalorie.textContent = `Liczba kalorii wynosi: ${totalCalories}`;

    nowyProdukt.onclick = function(){
        this.remove();
        const index = produkty.indexOf(wpis); //ustalenie indexu zeby działał splice
        produkty.splice(index, 1);
        zapisDoLocalStorage();
        totalCalories = totalCalories - wpis.kcal;
        wszystkieKalorie.textContent = `Liczba kalorii wynosi: ${totalCalories}`;
        console.log(produkty);
    }
    
}

function pobierz(){
    let wpisaneKalorie = kalorie.value;
    wpisaneKalorie = Number(wpisaneKalorie);

    //sprawdzanie czy użytkownik wpisał poprawną liczbę kalorii
    if (isNaN(wpisaneKalorie) || wpisaneKalorie <= 0) {
        alert("Wpisz poprawną liczbę kalorii");
        return;
    }
    //tworzenie obiektu produktu
    const nowyWpis = {
        nazwa: produkt.value,
        kcal: wpisaneKalorie
    };
    produkty.push(nowyWpis);
    console.log(produkty);

    zapisDoLocalStorage();

    produkt.value = "";
    kalorie.value = "";

    wyswietl(nowyWpis);
}

function resetuj(){
    localStorage.clear(produkty);
    produkty = [];
    totalCalories = 0;
    wszystkieKalorie.textContent = `Liczba kalorii wynosi: ${totalCalories}`;
    lista.textContent = "";
}
function zapisDoLocalStorage(){
    localStorage.setItem("mojeProdukty", JSON.stringify(produkty)); //zapisanie tablicy pod kluczem mojeProdukty
                                                                    //zmiana z tablicy na tekst dzieki JSON.stringify
}

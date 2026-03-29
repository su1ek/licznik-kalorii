//LICZNIK KALORII

let zapisane = localStorage.getItem("mojeProdukty");
let produkty = zapisane ? JSON.parse(zapisane) : [];
const wszystkieKalorie = document.getElementById("wszystkieKalorie");
const produkt = document.getElementById("produkt");
const kalorie = document.getElementById("kalorie");
const lista = document.getElementById("lista");
let totalCalories = 0;

produkty.forEach(wyswietl);
// wyszukajNajwiekszy();

function wyswietl(wpis){
    const nowyProdukt = document.createElement("li");
    nowyProdukt.dataset.id = wpis.id;
    nowyProdukt.textContent = `${wpis.nazwa}: ${wpis.kcal} kcal`;
    lista.appendChild(nowyProdukt);
    totalCalories += wpis.kcal;
    wszystkieKalorie.textContent = `Liczba kalorii wynosi: ${totalCalories}`;

    nowyProdukt.onclick = function(){
        this.remove();
        const index = produkty.indexOf(wpis); //ustalenie indexu zeby działał splice
        produkty.splice(index, 1);
        wyszukajNajwiekszy();
        wyszukajNajmniejszy();
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
        id: Date.now(),
        nazwa: produkt.value,
        kcal: wpisaneKalorie
    };
    produkty.push(nowyWpis);
    console.log(produkty);

    zapisDoLocalStorage();

    produkt.value = "";
    kalorie.value = "";

    wyswietl(nowyWpis);
    // wyszukajNajwiekszy();
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

function wyszukajNajwiekszy(){
    //ze wszystkich znaczników usuwamy klasę największy
    document.querySelectorAll('li').forEach(li => li.classList.remove('najwiekszy'));
    
    //jesli na liscie nie ma nic to zwracamy pusto
    if (produkty.length === 0)
        return;
    
    //wyszukujemy produkt z najwieksza liczba kalorii 
    const lider = produkty.reduce((max, obecny) => {
        return (obecny.kcal > max.kcal) ? obecny : max;
    })

    //wyszukiwanie id lidera
    const elementLidera = document.querySelector(`li[data-id="${lider.id}"]`);
    if (elementLidera)
        elementLidera.classList.add('najwiekszy');
}

function wyszukajNajmniejszy(){
    document.querySelectorAll('li').forEach(li => li.classList.remove('najmniejszy'));

    if (produkty.length === 0)
        return;

    const frajer = produkty.reduce((min,obecny) => {
        return (obecny.kcal < min.kcal) ? obecny : min;
    })
    const elementFrajera = document.querySelector(`li[data-id="${frajer.id}"]`);
    if (elementFrajera)
        elementFrajera.classList.add('najmniejszy');
}
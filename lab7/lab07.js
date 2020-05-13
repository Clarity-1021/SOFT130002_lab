const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];

for(let i = 0; i < works.length; i++){
    let item = document.createElement("div");
    item.className = 'item';

    let h4 = document.createElement("h4");
    h4.appendChild(document.createTextNode("Genre : " + works[i].tips));

    let inner1 = document.createElement("div");
    inner1.className = 'inner-box';
    let h31 = document.createElement("h3");
    h31.style.display = "inline";
    h31.appendChild(document.createTextNode("" + works[i].author));
    inner1.appendChild(h31);
    let h5 = document.createElement("h5");
    h5.style.display = "inline";
    h5.style.marginLeft = "1em";
    h5.appendChild(document.createTextNode("lifetime:" + works[i].lifetime));
    inner1.appendChild(h5);

    let inner2 = document.createElement("div");
    inner2.className = 'inner-box';
    let h32 = document.createElement("h3");
    h32.appendChild(document.createTextNode("Popular Photos"));
    inner2.appendChild(h32);
    let photos = works[i].photos;
    for(let j = 0 ; j < photos.length; j++){
        let photo = document.createElement("img");
        photo.className = 'photo';
        photo.src = photos[j];
        inner2.appendChild(photo);
    }

    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Visit"));

    item.appendChild(h4);
    item.appendChild(inner1);
    item.appendChild(inner2);
    item.appendChild(button);

    document.getElementsByClassName("flex-container")[0].appendChild(item);
}

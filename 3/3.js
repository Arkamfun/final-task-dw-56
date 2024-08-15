function drawImage(jml) {
    let jarak = "\n";
    let pagar = '#';
    let bintang = '*';
    let nilaiTengah = Math.ceil(jml / 2);
    for (let i = 1; i <= jml; i++) {
        for (let j = 1; j <= jml; j++) {
        if(i == 1 || i == nilaiTengah || i == jml) {
            let pagar2 =+ pagar;
            console.log(pagar2);
            
        }
        
    console.log(jarak);
    
    };
    
}
}

drawImage(5);

// let star = "\n";

// for(var i=1; i <= 5; i++)
// {
//   for(var j=1; j<=i; j++)
//   {
//    star += '*'
//   }
//   star += "\n";
// }

// console.log(star);
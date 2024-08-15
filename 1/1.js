function beliBarang(kualitas, jumlah) {
    if(kualitas.toUpperCase() == 'A') {
        let harga = 4550
        if(jumlah > 13) {
            harga = harga - 231
            return console.log(`Total Harga : ${harga * jumlah}`); //harga
        }
        return console.log(`Total Harga : ${harga * jumlah}`);
    }
    if(kualitas.toUpperCase() == 'B') {
        let harga = 5330
        if(jumlah > 7) {
            let total = harga * jumlah
            let diskon = total - (total * 0.23)
            return console.log(`Total Harga : ${diskon}`);
        }
        return console.log(`Total Harga : ${harga * jumlah}`); 
    }
    
    if(kualitas.toUpperCase() == 'C') {
        let harga = 8653
        return console.log(`Total Harga : ${harga * jumlah}`);
    }   

    if(kualitas.toUpperCase() !== 'A' || 'B' || 'C') {
        return console.log('Kualitas tidak tersedia')
    }
}
console.log('=========================');
beliBarang('a', 10)
console.log('=========================');
beliBarang('b', 10)
console.log('=========================');
beliBarang('c', 10)
console.log('=========================');
beliBarang('f', 10)


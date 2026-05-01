// Typing Effect
const txtElement = ["Sneakers Keren", "Sepatu Olahraga", "Koleksi Terbaru"];
let count = 0, txtIndex = 0, currentTxt = "", words = "";
(function ngetik() {
    if (count == txtElement.length) count = 0;
    currentTxt = txtElement[count];
    words = currentTxt.slice(0, ++txtIndex);
    const target = document.querySelector(".efek-ngetik");
    if(target) target.textContent = words;
    let typeSpeed = 150;
    if (words.length == currentTxt.length) { typeSpeed = 2000; count++; txtIndex = 0; }
    setTimeout(ngetik, typeSpeed);
})();

// Logika Belanja
let keranjang = [];
let totalHargaProduk = 0;

function tambahKeKeranjang(nama, harga, stokId, sizeId) {
    const stokElement = document.getElementById(stokId);
    const sizeElement = document.getElementById(sizeId);
    let stok = parseInt(stokElement.innerText);
    let size = sizeElement.value;

    // Cek apakah user sudah pilih size huruf
    if (size === "") return alert("Silakan pilih ukuran (S/M/L/XL) dulu!");

    if (stok > 0) {
        stokElement.innerText = stok - 1;
        keranjang.push({ nama: nama + " (Size: " + size + ")", harga: harga });
        totalHargaProduk += harga;
        updateUI();
    } else { 
        alert("Stok Habis!"); 
    }
}

function updateUI() {
    const list = document.getElementById("keranjang-list");
    list.innerHTML = keranjang.length === 0 ? "<p style='text-align:center; color:#999;'>Belum ada barang.</p>" : "";
    keranjang.forEach((item, i) => {
        list.innerHTML += `<p>${i+1}. <strong>${item.nama}</strong> - Rp ${item.harga.toLocaleString()}</p>`;
    });
    updateTotal();
}

function updateTotal() {
    const ongkir = parseInt(document.getElementById("kurir").value);
    document.getElementById("total-harga").innerText = `Total Produk: Rp ${totalHargaProduk.toLocaleString()}`;
    document.getElementById("total-akhir").innerText = `Total Bayar: Rp ${(totalHargaProduk + ongkir).toLocaleString()}`;
}

function prosesBayar() {
    if (keranjang.length === 0) return alert("Pilih sepatu dulu!");
    if (document.getElementById("kurir").value == "0") return alert("Pilih kurir pengiriman!");
    
    const wrapper = document.querySelector(".checkout-wrapper");
    const total = totalHargaProduk + parseInt(document.getElementById("kurir").value);
    
    wrapper.innerHTML = `
        <div style="text-align:center; padding:30px;">
            <i class="fas fa-check-circle" style="font-size:70px; color:#27ae60;"></i>
            <h2 style="margin:20px 0 10px;">Terima Kasih Sudah Berbelanja!</h2>
            <p>Pesanan sebesar <strong>Rp ${total.toLocaleString()}</strong> sedang diproses.</p>
            <button onclick="location.reload()" style="margin-top:25px; padding:12px 25px; cursor:pointer; background:#000; color:#fff; border:none; border-radius:8px; font-weight:bold;">Belanja Lagi</button>
        </div>`;
}
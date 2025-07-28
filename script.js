document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const spinner = document.getElementById('spinner');
    
    // Daftar hadiah dengan warna
    const prizes = [
        { name: "MOBIL MEWAH", color: "#FF5252" },
        { name: "LIBURAN KE BALI", color: "#FF4081" },
        { name: "VOUCHER 5 JUTA", color: "#E040FB" },
        { name: "SMARTPHONE FLAGSHIP", color: "#7C4DFF" },
        { name: "TV LED 55 INCH", color: "#536DFE" },
        { name: "LAPTOP GAMING", color: "#448AFF" },
        { name: "PAKET ELEKTRONIK", color: "#40C4FF" },
        { name: "UANG TUNAI 10 JUTA", color: "#18FFFF" }
    ];
    
    // Inisialisasi roda
    function initWheel() {
        const segmentAngle = 360 / prizes.length;
        let html = '';
        
        prizes.forEach((prize, index) => {
            const rotateAngle = segmentAngle * index;
            const skewAngle = 90 - segmentAngle;
            
            html += `
                <div class="wheel-segment" 
                     style="transform: rotate(${rotateAngle}deg) skew(${skewAngle}deg);
                            background-color: ${prize.color};">
                    <span style="transform: skew(${-skewAngle}deg) rotate(${segmentAngle/2}deg);">
                        ${prize.name}
                    </span>
                </div>
            `;
        });
        
        wheel.innerHTML = html;
    }
    
    // Fungsi untuk memutar roda
    function spinWheel() {
        // Matikan tombol selama putaran
        spinButton.disabled = true;
        
        // Hitung putaran acak (5-10 putaran penuh + sudut acak)
        const spinDegrees = 1800 + Math.floor(Math.random() * 1800);
        
        // Terapkan animasi putaran
        wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
        wheel.style.transform = `rotate(${-spinDegrees}deg)`;
        
        // Tampilkan spinner loading
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses...";
        
        // Setelah animasi selesai, tentukan hadiah
        setTimeout(() => {
            spinner.style.display = 'none';
            
            // Hitung hadiah berdasarkan posisi akhir
            const normalizedDegree = spinDegrees % 360;
            const prizeIndex = Math.floor(normalizedDegree / (360 / prizes.length));
            const selectedPrize = prizes[prizeIndex];
            
            // Tampilkan hadiah
            prizeDisplay.innerHTML = `
                SELAMAT!<br>
                Anda mendapatkan:<br>
                <span style="color:${selectedPrize.color}; font-weight:bold">
                ${selectedPrize.name}</span>
            `;
            
            // Aktifkan tombol kembali setelah 3 detik
            setTimeout(() => {
                spinButton.disabled = false;
            }, 3000);
            
        }, 4000); // Sesuaikan dengan durasi animasi
    }
    
    // Event listener untuk tombol putar
    spinButton.addEventListener('click', spinWheel);
    
    // Inisialisasi roda saat halaman dimuat
    initWheel();
});

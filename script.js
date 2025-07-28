document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const spinner = document.getElementById('spinner');
    
    // Daftar hadiah dengan warna masing-masing
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
    
    initWheel();
    
    let canSpin = true;
    
    spinButton.addEventListener('click', function() {
        if (!canSpin) return;
        
        canSpin = false;
        spinButton.disabled = true;
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses hadiah Anda...";
        
        // Simulasi loading
        setTimeout(() => {
            spinner.style.display = 'none';
            spinWheel();
        }, 2000);
    });
    
    function spinWheel() {
        const spinDegrees = 360 * 10 + Math.floor(Math.random() * 360);
        wheel.style.transform = `rotate(${-spinDegrees}deg)`;
        
        setTimeout(() => {
            // Hitung hadiah berdasarkan posisi roda
            const prizeIndex = Math.floor((spinDegrees % 360) / (360 / prizes.length));
            const selectedPrize = prizes[prizeIndex];
            
            // Tampilkan hadiah
            prizeDisplay.innerHTML = `SELAMAT!<br>Anda mendapatkan:<br>
                                   <span style="color:${selectedPrize.color}">
                                   ${selectedPrize.name}</span>`;
            
            canSpin = true;
            spinButton.disabled = false;
            
        }, 5000); // Sesuaikan dengan durasi animasi
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const spinner = document.getElementById('spinner');
    const jumpscare = document.getElementById('jumpscare');
    const screamSound = document.getElementById('screamSound');
    
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
            
            // Setelah 2 detik, tampilkan jumpscare
            setTimeout(showJumpscare, 2000);
            
        }, 5000);
    }
    
    function showJumpscare() {
    const jumpscare = document.getElementById('jumpscare');
    const prankMessage = document.getElementById('prankMessage');
    const screamSound = document.getElementById('screamSound');
    const laughSound = document.getElementById('laughSound');
    
    // Tampilkan jumpscare
    jumpscare.style.display = 'flex';
    
    // Mainkan suara jeritan
    screamSound.currentTime = 0;
    screamSound.volume = 1.0;
    screamSound.play();
    
    // Setelah 1 detik, tambahkan efek dan tampilkan pesan prank
    setTimeout(() => {
        jumpscare.classList.add('show-message');
        
        // Mainkan suara tawa
        laughSound.currentTime = 0;
        laughSound.volume = 0.7;
        laughSound.play();
        
    }, 1000);
    
    // Setelah 4 detik total, sembunyikan jumpscare dan reset permainan
    setTimeout(() => {
        jumpscare.style.display = 'none';
        jumpscare.classList.remove('show-message');
        resetGame();
    }, 4000);
}

function resetGame() {
    canSpin = true;
    spinButton.disabled = false;
    prizeDisplay.textContent = "Berani coba lagi?";
    wheel.style.transform = 'rotate(0deg)';
}
// Pastikan path benar saat memanggil audio
const screamSound = new Audio('scream.mp3');
const laughSound = new Audio('laugh.mp3');
const spinSound = new Audio('spin.mp3'); 
const winSound = new Audio('win.mp3');

// Fungsi putar suara yang reusable
function playSound(sound, volume = 1.0) {
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play().catch(e => console.log("Autoplay blocked:", e));
}

// Contoh penggunaan:
playSound(spinSound); // Saal memutar roda
playSound(screamSound, 0.8); // Saat jumpscare

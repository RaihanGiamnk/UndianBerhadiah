document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const spinner = document.getElementById('spinner');
    const jumpscare = document.getElementById('jumpscare');
    const prankMessage = document.getElementById('prankMessage');
    const prankPopup = document.getElementById('prankPopup');
    const closePopup = document.getElementById('closePopup');
    
    // Audio elements
    const screamSound = document.getElementById('screamSound');
    const laughSound = document.getElementById('laughSound');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('winSound');
    
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
        if (spinButton.disabled) return;
        
        spinButton.disabled = true;
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses hadiah Anda...";
        playSound(spinSound, 0.5);
        
        // Putaran acak (5-10 putaran + sudut acak)
        const spinDegrees = 1800 + Math.floor(Math.random() * 1800);
        wheel.style.transform = `rotate(${-spinDegrees}deg)`;
        
        setTimeout(() => {
            spinner.style.display = 'none';
            
            // Hitung hadiah
            const prizeIndex = Math.floor((spinDegrees % 360) / (360 / prizes.length));
            const selectedPrize = prizes[prizeIndex];
            
            // Tampilkan hadiah
            prizeDisplay.innerHTML = `SELAMAT!<br>Anda mendapatkan:<br>
                                   <span style="color:${selectedPrize.color}">
                                   ${selectedPrize.name}</span>`;
            playSound(winSound, 0.7);
            
            // Tampilkan jumpscare setelah 2 detik
            setTimeout(triggerJumpscare, 2000);
            
        }, 5000); // Waktu putaran 5 detik
    }
    
    // Fungsi untuk memainkan suara
    function playSound(sound, volume = 1.0) {
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play().catch(e => console.log("Error playing sound:", e));
    }
    
    // Fungsi jumpscare
    function triggerJumpscare() {
        // Tampilkan jumpscare
        jumpscare.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Mainkan suara jeritan
        playSound(screamSound, 0.8);
        
        // Setelah 1 detik, tampilkan pesan dan mainkan tawa
        setTimeout(() => {
            jumpscare.classList.add('active');
            playSound(laughSound, 0.6);
        }, 1000);
        
        // Setelah 3 detik, sembunyikan jumpscare dan tampilkan popup
        setTimeout(() => {
            jumpscare.style.display = 'none';
            jumpscare.classList.remove('active');
            showPrankPopup();
        }, 3000);
    }
  

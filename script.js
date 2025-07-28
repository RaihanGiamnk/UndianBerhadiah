document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const prankContainer = document.getElementById('prankContainer');
    const spinner = document.getElementById('spinner');
    const scarySound = document.getElementById('scarySound');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('winSound');
    
    // Daftar hadiah dengan warna masing-masing
    const prizes = [
        { name: "MOBIL MEWAH", color: "#FF5252" },
        { name: "LIBURAN KE BALI", color: "#FF4081" },
        { name: "VOUCHER 5 JUTA", color: "#E040FB" },
        { name: "SMARTPHONE FLAGSHIP", color: "#7C4DFF" },
        { name: "TV LED 55 INCH", color: "#536DFE" },
        { name: "LAPTOP GAMING", color: "#448AFF" },
        { name: "PAKET ELEKTRONIK", color: "#40C4FF" },
        { name: "UANG TUNAI 10 JUTA", color: "#18FFFF" },
        { name: "TIKET KONSER VIP", color: "#64FFDA" },
        { name: "MAKANAN GRATIS 1 TAHUN", color: "#69F0AE" }
    ];
    
    // Buat segmen roda
    function createWheelSegments() {
        const segmentAngle = 360 / prizes.length;
        
        prizes.forEach((prize, index) => {
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.transform = `rotate(${segmentAngle * index}deg)`;
            segment.style.backgroundColor = prize.color;
            segment.textContent = prize.name;
            
            // Atur posisi teks
            segment.style.transform += ` skew(${90 - segmentAngle}deg)`;
            segment.style.fontSize = `${Math.max(10, 16 - prizes.length)}px`;
            
            wheel.appendChild(segment);
        });
    }
    
    createWheelSegments();
    
    let canSpin = true;
    
    spinButton.addEventListener('click', function() {
        if (!canSpin) return;
        
        canSpin = false;
        spinButton.disabled = true;
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses hadiah Anda...";
        
        // Putar efek suara
        spinSound.currentTime = 0;
        spinSound.play();
        
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
            prizeDisplay.innerHTML = `SELAMAT!<br>Anda mendapatkan:<br><span style="color:${selectedPrize.color}">${selectedPrize.name}</span>`;
            
            // Efek suara menang
            winSound.currentTime = 0;
            winSound.play();
            
            // Tampilkan confetti
            createConfetti();
            
            // Setelah 3 detik, tampilkan prank message
            setTimeout(() => {
                showPrank();
            }, 3000);
            
        }, 5000);
    }
    
    function createConfetti() {
        const colors = ['#ff0000', '#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#448aff', '#18ffff', '#64ffda', '#69f0ae'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // Animasi confetti
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.top = '100vh';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.transition = `top ${Math.random() * 3 + 2}s linear, left ${Math.random() * 3 + 2}s linear, opacity 2s ease`;
                
                // Hapus confetti setelah animasi selesai
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 10);
        }
    }
    
    function showPrank() {
        // Mainkan suara menyeramkan
        scarySound.currentTime = 0;
        scarySound.volume = 0.7;
        scarySound.play();
        
        // Tampilkan efek prank
        prankContainer.style.display = 'flex';
        
        // Tambahkan efek darah
        createBloodEffect();
        
        // Tambahkan mata setan
        createEvilEyes();
        
        // Goyangkan layar
        document.body.style.animation = 'shake 0.5s infinite';
        
        // Setelah 5 detik, hentikan efek
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 5000);
    }
    
    function createBloodEffect() {
        for (let i = 0; i < 30; i++) {
            const blood = document.createElement('div');
            blood.className = 'blood';
            blood.style.width = Math.random() * 100 + 50 + 'px';
            blood.style.height = Math.random() * 100 + 50 + 'px';
            blood.style.left = Math.random() * 100 + 'vw';
            blood.style.top = Math.random() * 100 + 'vh';
            blood.style.opacity = '0';
            
            document.body.appendChild(blood);
            
            setTimeout(() => {
                blood.style.opacity = '0.7';
                blood.style.transition = 'opacity 2s ease';
            }, i * 100);
        }
    }
    
    function createEvilEyes() {
        // Mata kiri
        const eye1 = document.createElement('div');
        eye1.className = 'evil-eyes';
        eye1.style.left = '30%';
        eye1.style.top = '30%';
        document.body.appendChild(eye1);
        
        // Mata kanan
        const eye2 = document.createElement('div');
        eye2.className = 'evil-eyes';
        eye2.style.left = '60%';
        eye2.style.top = '30%';
        document.body.appendChild(eye2);
        
        setTimeout(() => {
            eye1.style.display = 'block';
            eye2.style.display = 'block';
        }, 500);
        
        // Gerakan mata mengikuti mouse
        document.addEventListener('mousemove', function(e) {
            const eyes = document.querySelectorAll('.evil-eyes');
            eyes.forEach(eye => {
                const eyeRect = eye.getBoundingClientRect();
                const eyeX = eyeRect.left + eyeRect.width / 2;
                const eyeY = eyeRect.top + eyeRect.height / 2;
                const angle = Math.atan2(e.pageY - eyeY, e.pageX - eyeX);
                const distance = Math.min(10, 
                    Math.sqrt(Math.pow(e.pageX - eyeX, 2) + Math.pow(e.pageY - eyeY, 2)) / 10;
                
                eye.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            });
        });
    }
});

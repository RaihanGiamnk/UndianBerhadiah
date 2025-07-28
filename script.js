document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const prankMessage = document.getElementById('prankMessage');
    const spinner = document.getElementById('spinner');
    
    const prizes = [
        "Mobil Baru",
        "Liburan ke Bali",
        "Voucher Belanja Rp 5.000.000",
        "Smartphone Flagship",
        "TV LED 55 Inch",
        "Laptop Gaming",
        "Paket Elektronik Lengkap",
        "Uang Tunai Rp 10.000.000"
    ];
    
    let canSpin = true;
    
    spinButton.addEventListener('click', function() {
        if (!canSpin) return;
        
        canSpin = false;
        spinButton.disabled = true;
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses...";
        
        // Simulasi loading
        setTimeout(() => {
            spinner.style.display = 'none';
            spinWheel();
        }, 2000);
    });
    
    function spinWheel() {
        const spinDegrees = 360 * 5 + Math.floor(Math.random() * 360);
        wheel.style.transform = `rotate(${-spinDegrees}deg)`;
        
        setTimeout(() => {
            // Hitung hadiah berdasarkan posisi roda
            const prizeIndex = Math.floor((spinDegrees % 360) / (360 / prizes.length));
            const selectedPrize = prizes[prizeIndex];
            
            // Tampilkan hadiah
            prizeDisplay.textContent = `SELAMAT! Anda mendapatkan: ${selectedPrize}`;
            
            // Tampilkan confetti
            createConfetti();
            
            // Setelah 3 detik, tampilkan prank message
            setTimeout(() => {
                prankMessage.style.display = 'block';
                document.querySelector('.container').style.transform = 'scale(0.9)';
                
                // Animasi tambahan untuk efek prank
                setTimeout(() => {
                    document.body.style.backgroundColor = '#ff4757';
                    document.querySelector('.container').style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    document.querySelector('.container').style.color = '#333';
                }, 500);
            }, 3000);
            
        }, 4000);
    }
    
    function createConfetti() {
        const colors = ['#ff4757', '#ff6b81', '#ffa502', '#7bed9f', '#70a1ff', '#5352ed'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            
            document.body.appendChild(confetti);
            
            // Animasi confetti
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.top = '100vh';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.transition = `top ${Math.random() * 3 + 2}s linear, left ${Math.random() * 3 + 2}s linear`;
                
                // Hapus confetti setelah animasi selesai
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 20);
        }
    }
});

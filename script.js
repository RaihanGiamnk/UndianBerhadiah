document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const prizeDisplay = document.getElementById('prizeDisplay');
    const spinner = document.getElementById('spinner');
    const jumpscare = document.getElementById('jumpscare');
    const prankMessage = document.getElementById('prankMessage');
    
    // Audio elements
    const screamSound = document.getElementById('screamSound');
    const laughSound = document.getElementById('laughSound');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('winSound');
    
    // Prize configuration
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
    
    // Initialize the wheel
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
    
    // Play sound helper function
    function playSound(sound, volume = 1.0) {
        try {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(e => console.log("Audio play prevented:", e));
        } catch (e) {
            console.log("Audio error:", e);
        }
    }
    
    // Spin the wheel
    function spinWheel() {
        const spinDegrees = 360 * 10 + Math.floor(Math.random() * 360);
        wheel.style.transform = `rotate(${-spinDegrees}deg)`;
        playSound(spinSound, 0.5);
        
        setTimeout(() => {
            const prizeIndex = Math.floor((spinDegrees % 360) / (360 / prizes.length));
            const selectedPrize = prizes[prizeIndex];
            
            prizeDisplay.innerHTML = `SELAMAT!<br>Anda mendapatkan:<br>
                                   <span style="color:${selectedPrize.color}">
                                   ${selectedPrize.name}</span>`;
            playSound(winSound, 0.7);
            
            setTimeout(showJumpscare, 2000);
        }, 5000);
    }
    
    // Show jumpscare effect
    function showJumpscare() {
        jumpscare.style.display = 'flex';
        playSound(screamSound, 0.8);
        
        setTimeout(() => {
            jumpscare.classList.add('show-message');
            playSound(laughSound, 0.6);
        }, 1000);
        
        setTimeout(() => {
            jumpscare.style.display = 'none';
            jumpscare.classList.remove('show-message');
            resetGame();
        }, 4000);
    }
    
    // Reset the game
    function resetGame() {
        wheel.style.transform = 'rotate(0deg)';
        spinButton.disabled = false;
        prizeDisplay.textContent = "Berani coba lagi?";
    }
    
    // Event listener for spin button
    spinButton.addEventListener('click', function() {
        if (spinButton.disabled) return;
        
        spinButton.disabled = true;
        spinner.style.display = 'block';
        prizeDisplay.textContent = "Memproses hadiah Anda...";
        
        setTimeout(() => {
            spinner.style.display = 'none';
            spinWheel();
        }, 2000);
    });
    
    // Initialize the wheel on load
    initWheel();
});

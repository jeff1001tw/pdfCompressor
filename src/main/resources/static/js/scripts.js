// 煙火特效代碼 Fireworks Effect Code
class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.hue = Math.random() * 360; // 隨機顏色 random color
    }

    // 初始化煙火 Initialize firework
    init(x, y) {
        const particleCount = 100;
        const angleStep = (Math.PI * 2) / particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = i * angleStep;
            
            // 創建粒子 Create particle with random velocity
            const velocity = 2 + Math.random() * 2;
            const particle = {
                x: x,
                y: y,
                size: Math.random() * 3 + 1,
                velocity: velocity,
                angle: angle,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.01,
                hue: this.hue + Math.random() * 30 - 15,
            };
            
            this.particles.push(particle);
        }
    }

    // 更新並繪製粒子 Update and draw particles
    update() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += Math.cos(particle.angle) * particle.velocity;
            particle.y += Math.sin(particle.angle) * particle.velocity + 0.1; // 微重力效果 slight gravity effect
            particle.alpha -= particle.decay;
            particle.velocity *= 0.99; // 阻力效果 friction effect
            particle.size *= 0.96; // 縮小效果 shrinking effect
            
            // 繪製粒子 Draw the particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.closePath();
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 80%, ${particle.alpha})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, ${particle.alpha})`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // 移除透明度太低的粒子 Remove faded particles
            if (particle.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
}

// 啟動煙火特效 Start fireworks effect
function startFireworks() {
    const canvas = document.getElementById('fireworks-container');
    const successMessage = document.getElementById('success-message');
    canvas.style.display = 'block';
    successMessage.style.display = 'block';
    
    // 設定畫布尺寸 Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const fireworks = [];
    let fireworkInterval;
    
    // 創建新的煙火 Create new firework
    function createFirework() {
        const firework = new Firework(canvas);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        firework.init(x, y);
        fireworks.push(firework);
        
        // 如果煙火太多，移除最舊的 Remove oldest if too many
        if (fireworks.length > 10) {
            fireworks.shift();
        }
    }
    
    // 動畫循環 Animation loop
    function animate() {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        
        fireworks.forEach(firework => {
            firework.update();
        });
        
        // 如果還有粒子，繼續動畫 Continue animation if particles exist
        if (fireworks.some(f => f.particles.length > 0)) {
            requestAnimationFrame(animate);
        } else {
            // 所有粒子消失後結束特效 End effect when all particles are gone
            canvas.style.display = 'none';
            successMessage.style.display = 'none';
            clearInterval(fireworkInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    // 每0.5秒創建一個新煙火 Create a new firework every 0.5 seconds
    fireworkInterval = setInterval(createFirework, 500);
    
    // 初始煙火 Initial fireworks
    for (let i = 0; i < 3; i++) {
        createFirework();
    }
    
    // 開始動畫 Start animation
    animate();
    
    // 5秒後停止創建新煙火 Stop creating fireworks after 5 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 5000);
}

// 當頁面載入完成後綁定事件 Bind events after page load
document.addEventListener('DOMContentLoaded', function() {
    // 設定壓縮參數滑桿的實時顯示 Set up real-time display for compression parameter sliders
    const compressionQualitySlider = document.getElementById('compressionQuality');
    const compressionQualityValue = document.getElementById('compressionQualityValue');
    const dpiSlider = document.getElementById('dpi');
    const dpiValue = document.getElementById('dpiValue');
    
    // 更新壓縮品質值 Update compression quality value
    if (compressionQualitySlider && compressionQualityValue) {
        compressionQualitySlider.addEventListener('input', function() {
            compressionQualityValue.textContent = this.value;
        });
    }
    
    // 更新 DPI 值 Update DPI value
    if (dpiSlider && dpiValue) {
        dpiSlider.addEventListener('input', function() {
            dpiValue.textContent = this.value;
        });
    }
    
    // 當表單提交時，攔截並處理下載 Intercept form submission and handle download
    document.getElementById('compression-form').addEventListener('submit', function(event) {
        const form = this;
        const file = form.querySelector('input[type="file"]').files[0];
        
        // 檢查是否已選擇檔案 Check if a file is selected
        if (!file) return;
        
        // 防止表單常規提交 Prevent regular form submission
        event.preventDefault();
        
        // 創建表單數據 Create form data
        const formData = new FormData(form);
        
        // 發送 AJAX 請求 Send AJAX request
        fetch('/compress', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // 獲取檔案名 Get filename from header or use default
            let filename = 'compressed.pdf';
            const disposition = response.headers.get('Content-Disposition');
            
            if (disposition) {
                // 處理 UTF-8 編碼的檔案名 (Handle UTF-8 encoded filename)
                if (disposition.indexOf('filename*=UTF-8') !== -1) {
                    const filenameRegex = /filename\*=UTF-8''([^;]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches && matches[1]) {
                        try {
                            // 解碼 URL 編碼的檔名 (Decode URL-encoded filename)
                            filename = decodeURIComponent(matches[1]);
                            console.log('Decoded filename:', filename);
                        } catch (e) {
                            console.error('檔名解碼錯誤 Error decoding filename:', e);
                        }
                    }
                } 
                // 處理普通檔案名 (Handle regular filename)
                else if (disposition.indexOf('filename=') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }
            }
            
            console.log('Final filename:', filename);
            
            // 下載檔案 Download file
            return response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                
                // 啟動煙火特效 Start fireworks effect
                startFireworks();
            });
        })
        .catch(error => {
            console.error('下載過程中發生錯誤：', error);
            alert('下載過程中發生錯誤。請再試一次。 (Error during download. Please try again.)');
        });
    });
    
    // 響應視窗大小變化 Respond to window resize
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('fireworks-container');
        if (canvas.style.display === 'block') {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});
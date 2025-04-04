document.addEventListener("DOMContentLoaded", function () {
    const popup = document.createElement("div");
    popup.id = "customPopup";
    popup.innerHTML = `
        <div class='popup-content'>
            <div class='popup-header'>
                <img alt='Logo' class='popup-logo' src='https://i.hizliresim.com/sro927x.png'/>
                <div class='popup-social-icons'>
                    <a href='https://wa.me/905452603560' target='_blank'><span data-uk-icon='icon: whatsapp'/></a>
                    <a href='https://www.facebook.com/bucalee.soneer/' target='_blank'><span data-uk-icon='icon: facebook'/></a>
                    <a href='https://www.instagram.com/jant_boyama_soner_ylmaz/' target='_blank'><span data-uk-icon='icon: instagram'/></a>
                    <a href='https://youtube.com/@sonerylmazjantonarmyenileme' target='_blank'><span data-uk-icon='icon: youtube'/></a>
                </div>
            </div>
            <h2>Oto Jant Bakım, Onarım</h2>
            <p>"Mükemmel ve kusursuz bir görünüm için jantlarınızı özenle onarıyor, boyasını titizlikle yeniliyoruz."</p>
            <div class='popup-slider'>
                <span class='prev-slide'>&#10094;</span>
                <img alt='Slayt 1' class='popup-slide' src='https://i.hizliresim.com/ns1h0xo.jpg'/>
                <img alt='Slayt 2' class='popup-slide' src='https://i.hizliresim.com/5x1amq1.jpg'/>
                <img alt='Slayt 3' class='popup-slide' src='https://i.hizliresim.com/ryiy2yp.jpg'/>
                <img alt='Slayt 4' class='popup-slide' src='https://i.hizliresim.com/g8atoml.jpg'/>
                <span class='next-slide'>&#10095;</span>
            </div>
            <button id='closePopup'>Kapat</button>
        </div>
    `;

    // Arka plan flu efekti
    const backdrop = document.createElement("div");
    backdrop.id = "popupBackdrop";
    document.body.appendChild(backdrop);

    document.body.appendChild(popup);

    const lastShown = localStorage.getItem("popupLastShown");
    const now = Date.now();
    const sixHours = 6 * 60 * 60 * 1000; // 6 saat

    if (!lastShown || (now - Number(lastShown)) > sixHours) {
        popup.style.display = "block";
        backdrop.style.display = "block"; // Arka planı göster

        // Scroll'u gizle
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    }

    document.getElementById("closePopup").addEventListener("click", function () {
        popup.style.display = "none";
        backdrop.style.display = "none"; // Arka planı gizle
        localStorage.setItem("popupLastShown", Date.now().toString());

        // Scroll'u tekrar göster
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    });

    // Slayt gösterisi
    let currentSlide = 0;
    const slides = document.querySelectorAll('.popup-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let autoSlideInterval;

    function showSlide(index) {
        // Tüm slaytları gizle
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length; // Döngüsel geçiş
            showSlide(currentSlide);
        }, 10000); // 10 saniye
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    showSlide(currentSlide);
    startAutoSlide(); // Otomatik slayt başlat

    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Döngüsel geçiş
        showSlide(currentSlide);
        stopAutoSlide(); // Otomatik geçişi durdur
        startAutoSlide(); // Süreyi sıfırla ve başlat
    });

    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length; // Döngüsel geçiş
        showSlide(currentSlide);
        stopAutoSlide(); // Otomatik geçişi durdur
        startAutoSlide(); // Süreyi sıfırla ve başlat
    });

    // Mouse ile resmin üzerine gelindiğinde otomatik geçişi durdur
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', stopAutoSlide); // Mouse ile üzerine gelindiğinde durdur
        slide.addEventListener('mouseleave', startAutoSlide); // Mouse başka yere gittiğinde başlat
    });
});
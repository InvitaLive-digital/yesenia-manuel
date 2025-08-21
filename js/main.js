(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scroll
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            $('.navbar-nav .active').removeClass('active');
            $(this).closest('a').addClass('active');
        }
    });

    // Modal Video
    $(document).ready(function () {
        let $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
        });
        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Scroll to bottom
    $(window).scroll(function () {
        $('.scroll-to-bottom').fadeToggle($(this).scrollTop() <= 100);
    });

    // Portfolio isotope and filter
    const $portfolioContainer = $('.portfolio-container');
    if ($portfolioContainer.length) {
        const portfolioIsotope = $portfolioContainer.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    }

    // Back to top
    $(window).scroll(function () {
        $('.back-to-top').fadeToggle($(this).scrollTop() > 200);
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive: {
            0: { items: 2 },
            576: { items: 3 },
            768: { items: 4 },
            992: { items: 5 },
            1200: { items: 6 }
        }
    });
})(jQuery);


// ✅ BOTÓN DE MÚSICA (solo si existe)
// ✅ BOTÓN DE MÚSICA (solo si existe)
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicMessage = document.querySelector('.text-note');
    let isPlaying = false;

    if (musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicBtn.classList.remove('active');
            } else {
                audio.play();
                musicBtn.classList.add('active');
            }
            isPlaying = !isPlaying;
            if (musicMessage) musicMessage.style.display = isPlaying ? 'block' : 'none'; // ← INVERTIDO
        });

        window.addEventListener('click', () => {
            if (!isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    musicBtn.classList.add('active');
                    if (musicMessage) musicMessage.style.display = 'block'; // ← CAMBIADO
                }).catch(() => { });
            }
        }, { once: true });
    }
});

// ✅ CUENTA REGRESIVA (si hay contenedor)
(function countdownInit() {
    const targetDate = new Date("2025-10-25T09:45:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");

        if (!d || !h || !m || !s) return;

        if (distance <= 0) {
            document.getElementById("countdown").innerHTML = "<h2>¡El gran día ha llegado!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        d.innerText = days.toString().padStart(2, "0");
        h.innerText = hours.toString().padStart(2, "0");
        m.innerText = minutes.toString().padStart(2, "0");
        s.innerText = seconds.toString().padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
})();


// ✅ ANIMACIÓN AL HACER SCROLL (si hay elementos)
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});


// ✅ MOSTRAR NOMBRE DESDE URL (solo si hay el contenedor)
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre");
    const contenedor = document.getElementById("nombre-invitado");

    if (nombre && contenedor) {
        contenedor.textContent = `${decodeURIComponent(nombre)}`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.querySelector("a.envelope-btn"); // El botón que lleva a inicio.html
    if (envelope) {
        envelope.addEventListener("click", function () {
            // Guardar bandera en localStorage
            localStorage.setItem("playMusic", "true");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    if (!audio) return;

    // ✅ Reproducir automáticamente si viene del sobre
    const shouldPlay = localStorage.getItem("playMusic");
    localStorage.removeItem("playMusic"); // Limpia la bandera

    if (shouldPlay === "true") {
        audio.play().then(() => {
            if (musicBtn) musicBtn.classList.add('active');
        }).catch(() => {
            console.warn("Navegador bloqueó reproducción automática");
        });
    }

    // ✅ Control manual del botón
    if (musicBtn) {
        let isPlaying = !audio.paused;

        musicBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                musicBtn.classList.add('active');
            } else {
                audio.pause();
                musicBtn.classList.remove('active');
            }
        });
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('rsvpForm');
//   if (!form) return;

//   const statusBox = document.getElementById('rsvpStatus');
//   const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyDrUC6Q7xCGv1jBe9tarqQ9z8FRKjzV_n0Nwri_JSBmytF603DFTcKYPCjQDZLU3nD/exec';
//   const WSP_NUMBER = '51927602272';

//   // 🚀 FUNCIÓN PARA ABRIR WHATSAPP OPTIMIZADA
//   function openWhatsApp(phoneNumber, message) {
//     const encodedMessage = encodeURIComponent(message);
//     const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

//     if (isMobile) {
//       const isAndroid = /Android/i.test(navigator.userAgent);

//       if (isAndroid) {
//         // Android: Usar intent que siempre abre la app
//         window.open(`intent://send?phone=${phoneNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;end`, '_blank');
//       } else {
//         // iOS: Usar protocolo nativo
//         window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
//       }

//       // Fallback universal si no funciona después de 2 segundos
//       setTimeout(() => {
//         window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
//       }, 2000);

//     } else {
//       // Desktop: wa.me funciona perfecto
//       window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
//     }
//   }

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // Honeypot (anti-bot)
//     if (form.website && form.website.value.trim() !== '') return;

//     const nombre = (form.nombre?.value || '').trim();
//     const pases = (form.pases?.value || '').trim();
//     const nota = (form.nota?.value || '').trim();

//     if (!nombre || !pases) {
//       alert('Por favor completa tu nombre y el número de pase.');
//       return;
//     }

//     const btn = form.querySelector('button[type="submit"]');
//     if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
//     if (statusBox) statusBox.textContent = 'Guardando tu confirmación...';

//     try {
//       // Enviamos como x-www-form-urlencoded (evita CORS preflight)
//       const body = new URLSearchParams({ nombre, pases, nota });

//       const res = await fetch(WEB_APP_URL, { method: 'POST', body });
//       const txt = await res.text(); // útil para debug
//       console.log('Respuesta Apps Script:', txt);

//       // Intentamos parsear JSON, si no, usamos res.ok
//       let ok = res.ok;
//       try {
//         const json = JSON.parse(txt);
//         ok = !!json.ok;
//       } catch (_) {}

//       if (ok) {
//         if (statusBox) statusBox.innerHTML =
//           '<span class="text-success">¡Listo! Tu confirmación fue registrada. 🚀 Abriendo WhatsApp...</span>';

//         // 🚀 WHATSAPP OPTIMIZADO - REEMPLAZAMOS ESTA PARTE
//         const msg = `💌 Hola, soy *${nombre}*. ✅ Confirmo mi asistencia. 🎟️ Pase(s): ${pases} ${nota ? `📝 Nota: ${nota}\n` : ''}¡Gracias!`;

//         // ✅ NUEVA FUNCIÓN OPTIMIZADA
//         openWhatsApp(WSP_NUMBER, msg);

//         // form.reset(); // si quieres limpiar
//       } else {
//         if (statusBox) statusBox.innerHTML =
//           '<span class="text-danger">No pudimos guardar tu confirmación. Intenta de nuevo.</span>';
//       }
//     } catch (err) {
//       console.error(err);
//       if (statusBox) statusBox.innerHTML =
//         '<span class="text-danger">Hubo un problema al enviar. Intenta nuevamente.</span>';
//     } finally {
//       if (btn) { btn.disabled = false; btn.textContent = 'Confirmo Asistencia'; }
//     }
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('rsvpForm');
//   if (!form) return;

//   const statusBox = document.getElementById('rsvpStatus');
//   const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyDrUC6Q7xCGv1jBe9tarqQ9z8FRKjzV_n0Nwri_JSBmytF603DFTcKYPCjQDZLU3nD/exec';

//   form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // Honeypot (anti-bot)
//     if (form.website && form.website.value.trim() !== '') return;

//     const nombre = (form.nombre?.value || '').trim();
//     const pases = (form.pases?.value || '').trim();
//     const nota = (form.nota?.value || '').trim();

//     if (!nombre || !pases) {
//       alert('Por favor completa tu nombre y el número de pase.');
//       return;
//     }

//     const btn = form.querySelector('button[type="submit"]');
//     if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
//     if (statusBox) statusBox.textContent = 'Guardando tu confirmación...';

//     try {
//       // Enviamos como x-www-form-urlencoded (evita CORS preflight)
//       const body = new URLSearchParams({ nombre, pases, nota });

//       const res = await fetch(WEB_APP_URL, { method: 'POST', body });
//       const txt = await res.text(); // útil para debug
//       console.log('Respuesta Apps Script:', txt);

//       // Intentamos parsear JSON, si no, usamos res.ok
//       let ok = res.ok;
//       try {
//         const json = JSON.parse(txt);
//         ok = !!json.ok;
//       } catch (_) {}

//       if (ok) {
//         if (statusBox) statusBox.innerHTML =
//           '<span class="text-success">✅ ¡Confirmación registrada exitosamente! Se envió un email de confirmación a los organizadores.</span>';

//         // Opcionalmente limpiar el formulario después del éxito
//         // form.reset();
//       } else {
//         if (statusBox) statusBox.innerHTML =
//           '<span class="text-danger">No pudimos guardar tu confirmación. Intenta de nuevo.</span>';
//       }
//     } catch (err) {
//       console.error(err);
//       if (statusBox) statusBox.innerHTML =
//         '<span class="text-danger">Hubo un problema al enviar. Intenta nuevamente.</span>';
//     } finally {
//       if (btn) { btn.disabled = false; btn.textContent = 'Confirmo Asistencia'; }
//     }
//   });
// });


let currentGuestCount = 1;
let isAttending = null;

// ELEMENTOS DEL DOM
const attendanceBtns = document.querySelectorAll('.attendance-btn');
const guestCounterSection = document.getElementById('guestCounterSection');
const guestFieldsContainer = document.getElementById('guestFieldsContainer');
const guestCountDisplay = document.getElementById('guestCountDisplay');
const increaseBtn = document.getElementById('increaseGuests');
const decreaseBtn = document.getElementById('decreaseGuests');
const submitBtn = document.getElementById('submitBtn');
const messageSection = document.getElementById('messageSection');

// NUEVA FUNCIONALIDAD: Manejo de botones de asistencia
attendanceBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remover active de todos
        attendanceBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al clickeado
        this.classList.add('active');

        // Determinar si asiste
        isAttending = this.getAttribute('data-attendance') === 'yes';

        if (isAttending) {
            guestCounterSection.style.display = 'block';
            generateGuestFields();
            submitBtn.textContent = 'CONFIRMAR ASISTENCIA';
            messageSection.querySelector('textarea').placeholder = 'Muchas Felicidades, estaré presente!!';
        } else {
            guestCounterSection.style.display = 'none';
            generateSingleDeclineField();
            submitBtn.textContent = 'ENVIAR FELICITACIONES';
            messageSection.querySelector('textarea').placeholder = 'Deja un mensaje de felicitaciones...';
        }
    });
});

// NUEVA FUNCIONALIDAD: Botones contador
increaseBtn.addEventListener('click', () => {
    if (currentGuestCount < 10) {
        currentGuestCount++;
        updateCounter();
        generateGuestFields();
    }
});

decreaseBtn.addEventListener('click', () => {
    if (currentGuestCount > 1) {
        currentGuestCount--;
        updateCounter();
        generateGuestFields();
    }
});

// NUEVA FUNCIÓN: Actualizar contador visual
function updateCounter() {
    guestCountDisplay.textContent = currentGuestCount;
    decreaseBtn.disabled = currentGuestCount <= 1;
    increaseBtn.disabled = currentGuestCount >= 10;
}

// NUEVA FUNCIÓN: Generar campos dinámicos para invitados
function generateGuestFields() {
    let html = '';

    for (let i = 0; i < currentGuestCount; i++) {
        const isMain = i === 0;
        const title = isMain ? 'Tus datos' : `Acompañante ${i}`;

        html += `
                    <div class="guest-field-group">
                        <h6><i class="fas fa-user me-2"></i>${title}</h6>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <input name="nombre_${i}" required type="text"
                                    class="form-control border-2 py-4 px-3" 
                                    placeholder="${isMain ? 'Tu nombre completo' : 'Nombre completo'}">
                            </div>
                            <div class="form-group col-sm-6">
                                <input name="email_${i}" ${isMain ? 'required' : ''} type="email"
                                    class="form-control border-2 py-4 px-3"
                                    placeholder="${isMain ? 'Tu correo electrónico' : 'Correo (opcional)'}">
                            </div>
                        </div>
                    </div>
                `;
    }

    guestFieldsContainer.innerHTML = html;
}

// NUEVA FUNCIÓN: Campo único para quien no asiste
function generateSingleDeclineField() {
    guestFieldsContainer.innerHTML = `
                <div class="guest-field-group">
                    <h6><i class="fas fa-user me-2"></i>Tus datos</h6>
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <input name="nombre" required type="text"
                                class="form-control border-2 py-4 px-3 " 
                                placeholder="Tu nombre completo">
                        </div>
                        <div class="form-group col-sm-6">
                            <input name="email" required type="email"
                                class="form-control border-2 py-4 px-3"
                                placeholder="Tu correo electrónico">
                        </div>
                    </div>
                </div>
            `;
}

// MODIFICACIÓN MÍNIMA: Tu JavaScript existente con pequeños ajustes
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    const statusBox = document.getElementById('rsvpStatus');
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwgkOtKu1dWxLpCbtF7Sh7VoZWv6nchfc9goL8BKtS1mOetcso0Xyv5t2TKiA4x6Vm1tA/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot (anti-bot) - mantener igual
        if (form.website && form.website.value.trim() !== '') return;

        // NUEVA VALIDACIÓN: Verificar que haya seleccionado asistencia
        if (isAttending === null) {
            // alert('Por favor indica si podrás asistir o no.');
            $('#validationModal').modal('show'); // ✅ Modal en lugar de alert
            return;
        }

        // NUEVA LÓGICA: Recopilar datos según el tipo de respuesta
        let formData = {};

        if (isAttending) {
            // Si asiste: recopilar datos de todos los invitados
            formData.asistencia = 'Si';
            formData.cantidad_invitados = currentGuestCount;

            let nombres = [];
            let emails = [];

            for (let i = 0; i < currentGuestCount; i++) {
                const nombreField = form.querySelector(`input[name="nombre_${i}"]`);
                const emailField = form.querySelector(`input[name="email_${i}"]`);

                if (nombreField && nombreField.value.trim()) {
                    nombres.push(nombreField.value.trim());
                }
                if (emailField && emailField.value.trim()) {
                    emails.push(emailField.value.trim());
                }
            }

            formData.nombres = nombres.join(', ');
            formData.emails = emails.join(', ');
        } else {
            // Si no asiste: datos simples
            formData.asistencia = 'No';
            formData.cantidad_invitados = 0;
            formData.nombres = (form.nombre?.value || '').trim();
            formData.emails = (form.email?.value || '').trim();
        }

        // Nota (común para ambos casos)
        formData.nota = (form.nota?.value || '').trim();

        // Validar campos requeridos
        if (!formData.nombres) {
            alert('Por favor completa tu nombre.');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
        if (statusBox) statusBox.textContent = 'Guardando tu confirmación...';

        try {
            // MANTENER: Tu lógica de envío existente
            const body = new URLSearchParams(formData);
            const res = await fetch(WEB_APP_URL, { method: 'POST', body });
            const txt = await res.text();
            console.log('Respuesta Apps Script:', txt);

            let ok = res.ok;
            try {
                const json = JSON.parse(txt);
                ok = !!json.ok;
            } catch (_) { }

            if (ok) {
                if (statusBox) statusBox.innerHTML =
                    '<span class="text-success">✅ ¡Confirmación registrada exitosamente! Se envió un email de confirmación a los organizadores.</span>';
            } else {
                if (statusBox) statusBox.innerHTML =
                    '<span class="text-danger">No pudimos guardar tu confirmación. Intenta de nuevo.</span>';
            }
        } catch (err) {
            console.error(err);
            if (statusBox) statusBox.innerHTML =
                '<span class="text-danger">Hubo un problema al enviar. Intenta nuevamente.</span>';
        } finally {
            if (btn) { btn.disabled = false; btn.textContent = isAttending ? 'CONFIRMAR ASISTENCIA' : 'ENVIAR FELICITACIONES'; }
        }
    });

    // Inicializar contador
    updateCounter();
});
// Klik tumpukan foto: foto depan terangkat, pindah ke belakang, foto di belakangnya maju dan membesar.
(() => {
    const stack = document.getElementById('heroStack');
    if (!stack) return;

    const order = [...stack.querySelectorAll('.stack-card')]; // order[0] = paling depan
    let busy = false;

    const paint = () => order.forEach((card, i) => { card.dataset.pos = i; });
    paint();

    function next() {
        if (busy) return;           // abaikan klik selama animasi masih jalan
        busy = true;

        const front = order[0];
        front.classList.add('lifting');          // 1) foto depan diangkat

        setTimeout(() => {
            order.push(order.shift());           // 2) pindah ke belakang, yang lain maju
            paint();
            front.classList.remove('lifting');
            setTimeout(() => { busy = false; }, 600);
        }, 280);
    }

    stack.addEventListener('click', next);
    stack.addEventListener('keydown', e => {     // bisa juga lewat keyboard: Tab, lalu Enter / Spasi
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            next();
        }
    });
})();
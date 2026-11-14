
// ==========================================
// 1. INITIALIZATION & HELPER FUNCTIONS
// ==========================================

document.body.className = "js";

const _d = {};

const $ = id =>
    document.getElementById(id) ||
    (_d[id] = _d[id] || document.createElement("div"));

const rp = n =>
    "Rp " + Math.round(n).toLocaleString("id-ID");


// ==========================================
// 2. DATA TIPS HEMAT ENERGI
// ==========================================

const TIPS = [
    [
        "Rumah",
        "💡",
        "Gunakan Lampu LED",
        "Lampu LED menggunakan hingga 80% energi lebih sedikit dibanding lampu biasa.",
        "#3a2a1a"
    ],
    [
        "Elektronik",
        "🔌",
        "Matikan Perangkat yang Tidak Digunakan",
        "Jangan biarkan perangkat dalam mode standby karena tetap mengonsumsi listrik.",
        "#2c5d8f"
    ],
    [
        "AC & Pendingin",
        "❄️",
        "Atur Suhu AC 24–26°C",
        "Suhu ini cukup nyaman dan membantu menghemat energi hingga 10%.",
        "#8a9aa6"
    ],
    [
        "Rumah",
        "🏠",
        "Gunakan Peralatan Hemat Energi",
        "Pilih perangkat dengan label energi hemat untuk konsumsi listrik lebih rendah.",
        "#5b6b78"
    ],
    [
        "Gaya Hidup",
        "☀️",
        "Manfaatkan Cahaya Alami",
        "Buka tirai dan gunakan cahaya matahari sebanyak mungkin pada siang hari.",
        "#5a9a2f"
    ],
    [
        "Gaya Hidup",
        "🌿",
        "Gunakan Energi Secara Bijak",
        "Mulai dari hal kecil, seperti mencabut charger yang tidak digunakan.",
        "#3f7d3a"
    ]
];


// ==========================================
// 3. ILUSTRASI SVG
// ==========================================

const ILL = {

    "💡": `
        <circle cx="32" cy="26" r="14"
            fill="#ffd37a" stroke="none"/>

        <path d="M26 44h12M28 50h8"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `,

    "🔌": `
        <path d="M24 12v12M40 12v12
            M18 24h28v8a14 14 0 0 1-28 0z
            M32 46v10"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `,

    "❄️": `
        <rect x="6" y="18" width="52" height="22"
            rx="6"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>

        <path d="M14 33h36M20 48l-3 8
            M32 48v8M44 48l3 8"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `,

    "🏠": `
        <path d="M8 30 32 10l24 20
            M14 28v26h36V28
            M27 54V38h10v16"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `,

    "☀️": `
        <circle cx="32" cy="32" r="10"
            fill="#ffd37a" stroke="none"/>

        <path d="M32 8v8M32 48v8
            M8 32h8M48 32h8
            M15 15l6 6M43 43l6 6
            M49 15l-6 6M21 43l-6 6"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `,

    "🌿": `
        <path d="M12 52c0-22 14-36 40-36
            0 24-14 36-40 36z
            M12 52c8-14 16-22 28-28"
            stroke="#fff"
            stroke-width="2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    `
};


// ==========================================
// 4. RENDER TIPS CARD
// ==========================================

const card = t => `
    <div class="tip">

        <div class="im" style="background:${t[4]}">

            ${
                ILL[t[1]]
                    ? `
                        <svg width="64" height="64"
                            viewBox="0 0 64 64">
                            ${ILL[t[1]]}
                        </svg>
                    `
                    : t[1]
            }

        </div>

        <div class="b">

            <span class="tag">
                🍃 ${t[0]}
            </span>

            <b>${t[2]}</b>

            <span class="mu">
                ${t[3]}
            </span>

        </div>

    </div>
`;


// ==========================================
// 5. DASHBOARD TIPS
// ==========================================

$("dtips").innerHTML = [0, 1, 2, 3]
    .map(i => card(TIPS[i]))
    .join("");


// ==========================================
// 6. FILTER KATEGORI TIPS
// ==========================================

let cat = "Semua Tips";

const cats = [
    "Semua Tips",
    "Rumah",
    "Elektronik",
    "AC & Pendingin",
    "Gaya Hidup"
];

function rt() {

    $("tabs").innerHTML = cats
        .map(c => `
            <button
                class="${c == cat ? "on" : ""}"
                data-c="${c}"
            >
                ${c}
            </button>
        `)
        .join("");

    $("tgrid").innerHTML = TIPS
        .filter(t => cat == "Semua Tips" || t[0] == cat)
        .map(card)
        .join("");
}


// ==========================================
// 7. DATA ENERGI TERBARUKAN
// ==========================================

const EN = [
    [
        "SR",
        "Energi Surya",
        "Mengubah sinar matahari menjadi listrik menggunakan panel surya."
    ],
    [
        "AN",
        "Energi Angin",
        "Memanfaatkan tenaga angin untuk menghasilkan listrik melalui turbin."
    ],
    [
        "HI",
        "Energi Hidro",
        "Menggunakan aliran air untuk memutar turbin dan menghasilkan listrik."
    ],
    [
        "BM",
        "Biomassa",
        "Memanfaatkan bahan organik seperti limbah pertanian atau kayu untuk energi."
    ],
    [
        "GT",
        "Energi Geotermal",
        "Memanfaatkan panas bumi untuk membangkitkan listrik yang stabil."
    ]
];

const DET = [
    [
        "Panel surya (PLTS) mengubah cahaya matahari jadi listrik. Indonesia punya sinar matahari melimpah sepanjang tahun.",
        [
            "Bisa dipasang di atap rumah (PLTS atap)",
            "Perawatan relatif mudah",
            "Bisa menekan tagihan listrik bulanan"
        ]
    ],
    [
        "Turbin angin memutar generator untuk menghasilkan listrik, cocok di daerah berangin kencang seperti pesisir.",
        [
            "Tanpa emisi saat beroperasi",
            "Contoh: PLTB Sidrap di Sulawesi Selatan",
            "Butuh lokasi dengan angin stabil"
        ]
    ],
    [
        "Aliran air memutar turbin. Ini sumber energi terbarukan terbesar di dunia untuk pembangkit listrik.",
        [
            "Output stabil dan bisa diatur",
            "Contoh: PLTA Cirata di Jawa Barat",
            "Perlu kajian dampak lingkungan sekitar"
        ]
    ],
    [
        "Limbah pertanian, kayu, atau sampah organik dibakar atau diolah jadi biogas untuk energi.",
        [
            "Memanfaatkan limbah jadi bernilai",
            "Cocok untuk daerah pertanian",
            "Bisa jadi biogas untuk dapur rumah"
        ]
    ],
    [
        "Uap panas dari dalam bumi memutar turbin. Indonesia punya cadangan panas bumi terbesar kedua di dunia.",
        [
            "Beroperasi 24 jam, tidak bergantung cuaca",
            "Contoh: PLTP Kamojang di Jawa Barat",
            "Emisi karbon sangat rendah"
        ]
    ]
];


// ==========================================
// 8. RENDER ENERGI TERBARUKAN
// ==========================================

$("egrid").innerHTML = EN
    .map((e, i) => `
        <div class="card ec">

            <div class="c">${e[0]}</div>

            <h2>${e[1]}</h2>

            <p>${e[2]}</p>

            <button data-e="${i}">
                Pelajari lebih lanjut →
            </button>

        </div>
    `)
    .join("") +

    `
        <div class="card" style="background:var(--soft)">

            <h2>Mengapa energi terbarukan penting?</h2>

            <ul class="ok" style="padding:0">
                <li>Mengurangi emisi karbon</li>
                <li>Menjaga keberlanjutan lingkungan</li>
                <li>Mendukung SDG 7</li>
            </ul>

        </div>
    `;


// ==========================================
// 9. MODAL ENERGI TERBARUKAN
// ==========================================

$("egrid").onclick = e => {

    const i = e.target.dataset.e;

    if (i == null) return;

    $("mt").textContent = EN[i][1];
    $("mb").textContent = DET[i][0];

    $("ml").innerHTML = DET[i][1]
        .map(x => `<li>${x}</li>`)
        .join("");

    $("md").classList.add("on");
};

$("md").onclick = e => {

    if (e.target.id == "md") {
        $("md").classList.remove("on");
    }

};


// ==========================================
// 10. FILTER EVENT
// ==========================================

$("tabs").onclick = e => {

    if (e.target.dataset.c) {

        cat = e.target.dataset.c;

        rt();

    }

};

rt();


// ==========================================
// 11. DATA KEBIASAAN HEMAT ENERGI
// ==========================================

const HAB = [
    [
        "Gunakan lampu LED",
        "hingga 80% lebih efisien · simulasi ±10%",
        10,
        1
    ],
    [
        "Matikan perangkat saat tidak digunakan",
        "hindari mode standby · simulasi ±5%",
        5,
        1
    ],
    [
        "Atur suhu AC 24–26°C",
        "lebih nyaman dan efisien · simulasi ±10%",
        10,
        0
    ],
    [
        "Gunakan peralatan hemat energi",
        "pilih label energi terbaik · simulasi ±5%",
        5,
        0
    ],
    [
        "Manfaatkan cahaya alami",
        "kurangi lampu di siang hari · simulasi ±5%",
        5,
        1
    ]
];


// ==========================================
// 12. STATE TERSIMPAN (SINKRON DASHBOARD ⇄ KALKULATOR)
// ==========================================

const STORE_KEY = "hemat";

const STATE_DEFAULT = {
    bill: 750000,
    pct: 15,
    tar: 1444.7,
    devices: [
        ["AC 1/2 PK", 500, 1, 8],
        ["Kulkas 2 pintu", 100, 1, 24],
        ["Televisi LED", 80, 1, 4],
        ["Lampu LED", 12, 6, 7]
    ],
    habits: [true, true, false, false, true]
};

// Angka aman: pakai cadangan bila kosong / bukan angka / negatif
const num = (v, fallback) => {

    const n = Number(v);

    return Number.isFinite(n) && n >= 0 ? n : fallback;

};

const clampPct = v =>
    Math.min(40, Math.max(5, num(v, STATE_DEFAULT.pct)));

function readState() {

    let raw = null;

    try {

        raw = JSON.parse(localStorage.getItem(STORE_KEY));

    } catch (e) {

        raw = null;

    }

    const s = Object.assign(
        {},
        STATE_DEFAULT,
        raw && typeof raw == "object" ? raw : {}
    );

    s.bill = num(s.bill, STATE_DEFAULT.bill);
    s.pct = clampPct(s.pct);
    s.tar = num(s.tar, STATE_DEFAULT.tar) || STATE_DEFAULT.tar;

    s.devices =
        Array.isArray(s.devices)
            ? s.devices.map(d => [
                  String((d && d[0]) || "Perangkat"),
                  num(d && d[1], 0),
                  num(d && d[2], 1),
                  num(d && d[3], 0)
              ])
            : STATE_DEFAULT.devices.map(d => d.slice());

    s.habits =
        Array.isArray(s.habits) && s.habits.length == HAB.length
            ? s.habits.map(Boolean)
            : STATE_DEFAULT.habits.slice();

    return s;

}

const state = readState();

function saveState() {

    try {

        localStorage.setItem(STORE_KEY, JSON.stringify(state));

    } catch (e) {}

}

// Satu rumus rupiah untuk semua halaman: dasar perhitungan adalah tagihan
// bulanan dan target persen, bukan estimasi kWh perangkat.
const savings = (bill, pct) => {

    const hemat = bill * pct / 100;

    return {
        bill: bill,
        pct: pct,
        hemat: hemat,
        after: bill - hemat,
        year: hemat * 12
    };

};

const deviceSavings = (devices, tar, pct) => {

    const T = devices.reduce(
        (a, d) => a + d[1] * d[2] * d[3] * 30 / 1000, 0
    );

    const est = T * tar;
    const hemat = est * pct / 100;

    return {
        est: est,
        hemat: hemat,
        after: est - hemat,
        year: hemat * 12
    };

};


// ==========================================
// 13. RENDER KEBIASAAN HEMAT
// ==========================================

$("hab").innerHTML = HAB
    .map((h, i) => `
        <label>

            <input
                type="checkbox"
                data-i="${i}"
                ${state.habits[i] ? "checked" : ""}
            >

            <span>
                <b>${h[0]}</b>
                <br>

                <span class="mu">
                    ${h[1]}
                </span>
            </span>

        </label>
    `)
    .join("");


// ==========================================
// 14. DATA PERANGKAT RUMAH
// ==========================================

// Daftar perangkat dipakai bersama dengan state agar isinya tidak hilang
// saat berpindah halaman.
const D = state.devices;


// ==========================================
// 15. RENDER TABEL PERANGKAT
// ==========================================

function rd() {

    const tb = document.getElementById("tb");

    $("tb").innerHTML = D.length
        ? D.map((d, i) => `
            <tr>

                <td>
                    <input
                        type="text"
                        class="nm"
                        data-r="${i}"
                        data-k="0"
                        placeholder="Nama perangkat"
                        autocomplete="off"
                    >
                </td>

                ${[1, 2, 3]
                    .map(k => `
                        <td>
                            <input
                                type="number"
                                min="0"
                                step="any"
                                value="${d[k]}"
                                data-r="${i}"
                                data-k="${k}"
                            >
                        </td>
                    `)
                    .join("")
                }

                <td class="k" id="k${i}"></td>

                <td>
                    <button
                        data-x="${i}"
                        style="border:0;background:none;cursor:pointer"
                    >
                        🗑
                    </button>
                </td>

            </tr>
        `)
        .join("")
        : `
            <tr>
                <td colspan="6" class="mu" style="padding:18px 4px">
                    Belum ada perangkat. Isi nama dan daya di bawah
                    untuk menambahkannya.
                </td>
            </tr>
        `;

    // Nama perangkat diisi lewat properti nilai, bukan lewat string HTML,
    // supaya karakter seperti tanda kutip tidak merusak tabel.
    if (tb) {

        D.forEach((d, i) => {

            const f = tb.querySelector(
                `input[data-r="${i}"][data-k="0"]`
            );

            if (f) f.value = d[0];

        });

    }

    calc();
}


// ==========================================
// 16. KALKULASI LISTRIK
// ==========================================

function calc() {

    // Konsumsi listrik setiap perangkat
    const kw = D.map(d =>
        d[1] * d[2] * d[3] * 30 / 1000
    );

    kw.forEach((v, i) => {

        $("k" + i).textContent =
            (+v.toFixed(1)).toLocaleString("id-ID");

    });


    // Total konsumsi dan parameter simulasi
    const T = kw.reduce((a, b) => a + b, 0);

    const tar = +$("tar").value || 0;
    const p = +$("rng").value / 100;
    const bill = +$("bill").value || 0;


    // Statistik konsumsi
    $("kwh").textContent =
        T.toFixed(1).replace(".", ",") + " kWh";

    $("est").textContent = rp(T * tar);

    $("sv").textContent = rp(T * tar * p);

    $("svk").textContent =
        (T * p).toFixed(1).replace(".", ",") +
        " kWh per bulan";


    // Target penghematan
    ["tg1", "tg2", "tg3"].forEach(i => {

        $(i).textContent =
            i == "tg1"
                ? "target " + $("rng").value + "%"
                : $("rng").value + "%";

    });


    // Hasil simulasi tagihan, semuanya memakai dasar tagihan + target %
    // supaya angkanya sama dengan kartu di dashboard
    const sim = savings(bill, +$("rng").value);

    $("after").textContent = rp(sim.after);

    $("pot").textContent = rp(sim.hemat);

    const dev = deviceSavings(D, tar, +$("rng").value);

    $("after2").textContent = rp(dev.after);

    $("yr").textContent = rp(dev.year);


    // Simpan seluruh isi kalkulator agar dashboard dan halaman ini
    // selalu menampilkan angka yang sama (hanya di halaman kalkulator)
    if (document.getElementById("bill")) {

        // Nilai kosong tidak menimpa angka terakhir yang valid
        if (bill > 0) state.bill = bill;

        if (tar > 0) state.tar = tar;

        state.pct = +$("rng").value;

        state.habits = [...document.querySelectorAll("#hab input")]
            .map(c => c.checked);

        saveState();

    }


    // Jumlah kebiasaan terpilih + deviasi terhadap slider
    const hs = [...document.querySelectorAll("#hab :checked")]
        .reduce((a, c) => a + HAB[c.dataset.i][2], 0);

    const dv = +$("rng").value - hs;

    $("cnt").textContent =
        document.querySelectorAll("#hab :checked").length +
        " kebiasaan dipilih untuk membantu mencapai target." +
        " Deviasi slider vs kebiasaan: " +
        (dv > 0 ? "+" : "") + dv + "% (kebiasaan " + hs + "%, slider " +
        $("rng").value + "%).";


    // Menentukan dua perangkat dengan konsumsi terbesar
    const top = kw
        .map((v, i) => [v, i])
        .sort((a, b) => b[0] - a[0])
        .slice(0, 2);

    const n = top.map(t => (D[t[1]][0] || "").trim() || "perangkat");


    // Rekomendasi penghematan
    $("plan").innerHTML = [

        [
            "Dampak terbesar",
            "Kurangi pemakaian " + (n[0] || "-"),
            "Konsumsi tertinggi: " +
                (top[0] ? top[0][0].toFixed(0) : 0) +
                " kWh/bln. Kurangi jam pakai dan tutup pintu saat AC menyala."
        ],

        [
            "Prioritas berikutnya",
            "Optimalkan " + (n[1] || "-"),
            "Menyumbang sekitar " +
                (top[1] ? top[1][0].toFixed(0) : 0) +
                " kWh/bulan. Gunakan mode hemat."
        ],

        [
            "Kebiasaan tanpa biaya",
            "Cegah konsumsi diam-diam",
            "Cabut charger dan gunakan stopkontak bersakelar. Manfaatkan cahaya alami sebelum menyalakan lampu."
        ]

    ]
        .map((r, i) => `
            <div class="rp">

                <em>0${i + 1}</em>

                <span class="tag">
                    ${r[0].toUpperCase()}
                </span>

                <b style="display:block;margin:6px 0">
                    ${r[1]}
                </b>

                <span class="mu">
                    ${r[2]}
                </span>

            </div>
        `)
        .join("");

}


// ==========================================
// 17. EVENT TABEL PERANGKAT
// ==========================================

$("tb").oninput = e => {

    const t = e.target;

    if (t.dataset.r == null) return;

    const k = t.dataset.k;

    // Kolom nama berisi teks, kolom lain berisi angka
    D[t.dataset.r][k] = k == "0" ? t.value : (+t.value || 0);

    calc();

};


// Hapus perangkat
$("tb").onclick = e => {

    if (e.target.dataset.x != null) {

        D.splice(e.target.dataset.x, 1);

        rd();

    }

};


// Tambah perangkat baru: nama dan daya bebas, preset hanya membantu
function addDevice() {

    const nameEl = $("add-name");
    const wattEl = $("add-watt");
    const msg = $("addmsg");

    const name = (nameEl.value || "").trim();
    const watt = +wattEl.value;

    if (!name) {

        msg.textContent = "Nama perangkat belum diisi.";
        nameEl.focus();

        return;

    }

    if (!(watt > 0)) {

        msg.textContent = "Daya harus lebih dari 0 watt.";
        wattEl.focus();

        return;

    }

    D.push([name, watt, 1, 2]);

    nameEl.value = "";
    wattEl.value = "";
    msg.textContent = "";

    $("add").value = "";

    rd();

    nameEl.focus();

}

$("addb").onclick = addDevice;

["add-name", "add-watt"].forEach(id => {

    $(id).oninput = () => {

        $("addmsg").textContent = "";

    };

    $(id).onkeydown = e => {

        if (e.key == "Enter") {

            e.preventDefault();

            addDevice();

        }

    };

});

// Preset cepat: hanya mengisi kolom, tetap bisa diubah sebelum ditambah
$("add").onchange = () => {

    const v = $("add").value;

    if (!v) return;

    const [name, watt] = v.split("|");

    $("add-name").value = name;
    $("add-watt").value = watt;
    $("addmsg").textContent = "";

};


// ==========================================
// 18. EVENT KEBIASAAN HEMAT
// ==========================================

$("hab").onchange = () => {

    let s = 0;

    document.querySelectorAll("#hab input").forEach(c => {

        if (c.checked) {

            s += HAB[c.dataset.i][2];

        }

    });

    $("rng").value = Math.max(5, Math.min(40, s));

    calc();

};


// ==========================================
// 19. EVENT TARGET DAN TARIF
// ==========================================

["rng", "tar", "bill"].forEach(i => {

    $(i).oninput = calc;

});


// ==========================================
// 20. INITIALIZE CALCULATOR (PULIHKAN NILAI TERSIMPAN)
// ==========================================

if (document.getElementById("bill")) {

    // Form diisi dari state, bukan dari nilai default HTML, supaya
    // angkanya tidak berubah saat kembali dari dashboard.
    $("bill").value = state.bill;
    $("tar").value = state.tar;
    $("rng").value = state.pct;

}

rd();


// ==========================================
// 21. FITUR PENCARIAN
// ==========================================

$("q").onkeydown = e => {

    if (e.key == "Enter") {

        const v = e.target.value.toLowerCase();

        location.href =
            /kalk|hitung|tagihan/.test(v)
                ? "kalkulator.html"
                : /surya|angin|hidro|energi/.test(v)
                    ? "energi.html"
                    : "tips.html";

    }

};


// ==========================================
// 22. DATA KALKULATOR DI DASHBOARD
// ==========================================

if (document.getElementById("d-bill")) {

    // Sumber data dan rumus sama persis dengan halaman kalkulator,
    // jadi angka di dashboard tidak pernah berbeda saat bolak-balik.
    const sim = savings(state.bill, state.pct);

    $("d-bill").textContent = rp(sim.bill);

    $("d-after").textContent = rp(sim.after);

    $("d-yr").textContent = rp(sim.year);

    $("d-p1").textContent = "dari tagihan awal ↓" + sim.pct + "%";

    $("d-p2").textContent = "dengan target " + sim.pct + "%";

}

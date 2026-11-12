
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
// 12. RENDER KEBIASAAN HEMAT
// ==========================================

$("hab").innerHTML = HAB
    .map((h, i) => `
        <label>

            <input
                type="checkbox"
                data-i="${i}"
                ${h[3] ? "checked" : ""}
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
// 13. DATA PERANGKAT RUMAH
// ==========================================

let D = [
    ["AC 1/2 PK", 500, 1, 8],
    ["Kulkas 2 pintu", 100, 1, 24],
    ["Televisi LED", 80, 1, 4],
    ["Lampu LED", 12, 6, 7]
];


// ==========================================
// 14. RENDER TABEL PERANGKAT
// ==========================================

function rd() {

    $("tb").innerHTML = D
        .map((d, i) => `
            <tr>

                <td>
                    <b>${d[0]}</b>
                </td>

                ${[1, 2, 3]
                    .map(k => `
                        <td>
                            <input
                                type="number"
                                min="0"
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
        .join("");

    calc();
}


// ==========================================
// 15. KALKULASI LISTRIK
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


    // Hasil simulasi tagihan
    $("after").textContent = rp(bill * (1 - p));

    $("pot").textContent = rp(bill * p);

    $("after2").textContent = rp(T * tar * (1 - p));

    $("yr").textContent = rp(T * tar * p * 12);


    // Simpan hasil untuk dashboard (hanya di halaman kalkulator)
    if (document.getElementById("bill")) {

        try {

            localStorage.setItem(
                "hemat",
                JSON.stringify({ bill: bill, pct: +$("rng").value })
            );

        } catch (e) {}

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

    const n = top.map(t => D[t[1]][0]);


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
// 16. EVENT TABEL PERANGKAT
// ==========================================

$("tb").oninput = e => {

    const t = e.target;

    if (t.dataset.r != null) {

        D[t.dataset.r][t.dataset.k] = +t.value || 0;

        calc();

    }

};


// Hapus perangkat
$("tb").onclick = e => {

    if (e.target.dataset.x != null) {

        D.splice(e.target.dataset.x, 1);

        rd();

    }

};


// Tambah perangkat
$("addb").onclick = () => {

    const [n, w] = $("add").value.split("|");

    D.push([n, +w, 1, 2]);

    rd();

};


// ==========================================
// 17. EVENT KEBIASAAN HEMAT
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
// 18. EVENT TARGET DAN TARIF
// ==========================================

["rng", "tar", "bill"].forEach(i => {

    $(i).oninput = calc;

});


// ==========================================
// 19. INITIALIZE CALCULATOR
// ==========================================

rd();

$("hab").onchange();


// ==========================================
// 20. FITUR PENCARIAN
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
// 21. DATA KALKULATOR DI DASHBOARD
// ==========================================

try {

    const sv = JSON.parse(localStorage.getItem("hemat"));

    if (sv && document.getElementById("d-bill")) {

        $("d-bill").textContent = rp(sv.bill);
        $("d-after").textContent = rp(sv.bill * (1 - sv.pct / 100));
        $("d-yr").textContent = rp(sv.bill * sv.pct / 100 * 12);
        $("d-p1").textContent = "dari tagihan awal ↓" + sv.pct + "%";
        $("d-p2").textContent = "dengan target " + sv.pct + "%";

    }

} catch (e) {}

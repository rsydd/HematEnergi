const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.join(__dirname, "..");
const SCRIPT = fs.readFileSync(path.join(ROOT, "script.js"), "utf8");

const txt = (doc, id) => doc.getElementById(id).textContent.trim();
const rowName = (doc, i) =>
    doc.querySelector(`#tb input[data-r="${i}"][data-k="0"]`).value;
const rowWatt = (doc, i) =>
    doc.querySelector(`#tb input[data-r="${i}"][data-k="1"]`).value;

let storage = {};
let failures = 0;

function check(label, actual, expected) {
    const ok = String(actual) === String(expected);
    if (!ok) failures++;
    console.log((ok ? "PASS " : "FAIL ") + label +
        (ok ? "" : `  → dapat "${actual}", harusnya "${expected}"`));
}

function openPage(file) {
    const dom = new JSDOM(fs.readFileSync(path.join(ROOT, file), "utf8"), {
        url: "http://localhost/" + file,
        runScripts: "outside-only"
    });
    Object.keys(storage).forEach(k => dom.window.localStorage.setItem(k, storage[k]));
    dom.window.eval(SCRIPT);
    Object.keys(dom.window.localStorage).forEach(k => {
        storage[k] = dom.window.localStorage.getItem(k);
    });
    return dom;
}

const type = (dom, el, value) => {
    el.value = value;
    el.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
};

// simpan localStorage halaman ini ke harness, seperti pindah halaman
const flush = dom => Object.keys(dom.window.localStorage).forEach(k => {
    storage[k] = dom.window.localStorage.getItem(k);
});

// ---------- 1. tabel awal ----------
let dom = openPage("kalkulator.html");
let doc = dom.window.document;

console.log("== Tabel perangkat awal ==");
check("baris", doc.querySelectorAll("#tb tr").length, 4);
check("nama baris 1", rowName(doc, 0), "AC 1/2 PK");
check("kWh baris 1", txt(doc, "k0"), "120");

// ---------- 2. rename inline ----------
type(dom, doc.querySelector('#tb input[data-r="0"][data-k="0"]'), "AC Kamar");
type(dom, doc.querySelector('#tb input[data-r="0"][data-k="1"]'), "400");

console.log("\n== Ubah nama & daya langsung di tabel ==");
check("nama baru", rowName(doc, 0), "AC Kamar");
check("kWh setelah daya 400 W", txt(doc, "k0"), "96");
check("rekomendasi pakai nama baru",
    txt(doc, "plan").includes("AC Kamar"), true);

// ---------- 3. tambah perangkat sendiri ----------
type(dom, doc.getElementById("add-name"), "Setrika");
type(dom, doc.getElementById("add-watt"), "350");
doc.getElementById("addb").click();

console.log("\n== Tambah perangkat buatan sendiri ==");
check("baris jadi 5", doc.querySelectorAll("#tb tr").length, 5);
check("nama perangkat baru", rowName(doc, 4), "Setrika");
check("daya perangkat baru", rowWatt(doc, 4), "350");
check("kWh perangkat baru", txt(doc, "k4"), "21");
check("kolom nama dikosongkan",
    doc.getElementById("add-name").value, "");
check("pesan kosong", txt(doc, "addmsg"), "");

// ---------- 4. preset mengisi kolom ----------
const sel = doc.getElementById("add");
sel.value = "Kipas angin|50";
sel.dispatchEvent(new dom.window.Event("change", { bubbles: true }));

console.log("\n== Preset cepat mengisi kolom ==");
check("preset isi nama", doc.getElementById("add-name").value, "Kipas angin");
check("preset isi daya", doc.getElementById("add-watt").value, "50");

// ---------- 5. validasi ----------
doc.getElementById("add-name").value = "";
doc.getElementById("add-watt").value = "";
doc.getElementById("addb").click();
console.log("\n== Validasi ==");
check("baris tidak bertambah", doc.querySelectorAll("#tb tr").length, 5);
check("pesan nama kosong", txt(doc, "addmsg"), "Nama perangkat belum diisi.");

doc.getElementById("add-name").value = "Blender";
doc.getElementById("add-watt").value = "0";
doc.getElementById("addb").click();
check("pesan daya 0", txt(doc, "addmsg"), "Daya harus lebih dari 0 watt.");
check("baris tetap", doc.querySelectorAll("#tb tr").length, 5);

// ---------- 6. perangkat tersimpan setelah pindah halaman ----------
flush(dom);
dom = openPage("index.html");
doc = dom.window.document;
check("dashboard tetap sinkron", txt(doc, "d-bill"), "Rp 750.000");

dom = openPage("kalkulator.html");
doc = dom.window.document;
console.log("\n== Kembali ke kalkulator ==");
check("baris masih 5", doc.querySelectorAll("#tb tr").length, 5);
check("nama hasil rename tetap", rowName(doc, 0), "AC Kamar");
check("perangkat tambahan tetap", rowName(doc, 4), "Setrika");
check("daya AC tetap", rowWatt(doc, 0), "400");

// ---------- 7. hapus semua perangkat ----------
for (let i = 0; i < 5; i++) {
    doc.querySelector('#tb button[data-x="0"]').click();
}

console.log("\n== Hapus semua perangkat ==");
check("baris kosong", doc.querySelectorAll("#tb tr").length, 1);
check("ada pesan kosong",
    txt(doc, "tb").includes("Belum ada perangkat"), true);
check("pemakaian 0 kWh", txt(doc, "kwh"), "0,0 kWh");
check("tagihan simulasi tetap", txt(doc, "after"), "Rp 637.500");

flush(dom);
dom = openPage("kalkulator.html");
doc = dom.window.document;
check("tetap kosong setelah reload",
    txt(doc, "tb").includes("Belum ada perangkat"), true);

console.log("\n" + (failures ? failures + " CEK GAGAL" : "SEMUA CEK LULUS"));
process.exit(failures ? 1 : 0);

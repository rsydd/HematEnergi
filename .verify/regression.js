const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const ROOT = path.join(__dirname, "..");
const SCRIPT = fs.readFileSync(path.join(ROOT, "script.js"), "utf8");
const txt = (doc, id) => doc.getElementById(id).textContent.trim();

let storage = {};
let failures = 0;

const check = (label, actual, expected) => {
    const ok = String(actual) === String(expected);
    if (!ok) failures++;
    console.log((ok ? "PASS " : "FAIL ") + label +
        (ok ? "" : `  → dapat "${actual}", harusnya "${expected}"`));
};

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

const flush = dom => Object.keys(dom.window.localStorage).forEach(k => {
    storage[k] = dom.window.localStorage.getItem(k);
});

// sinkronisasi angka
let dom = openPage("kalkulator.html");
let doc = dom.window.document;
check("tagihan awal", txt(doc, "after"), "Rp 637.500");

const bill = doc.getElementById("bill");
bill.value = "1200000";
bill.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
flush(dom);

dom = openPage("index.html");
doc = dom.window.document;
check("dashboard ikut tagihan", txt(doc, "d-bill"), "Rp 1.200.000");
check("dashboard hemat/tahun", txt(doc, "d-yr"), txt(dom.window.document, "d-yr"));
check("dashboard setelah hemat", txt(doc, "d-after"), "Rp 1.020.000");
check("dashboard setahun", txt(doc, "d-yr"), "Rp 2.160.000");

dom = openPage("kalkulator.html");
doc = dom.window.document;
check("kalkulator tidak reset", doc.getElementById("bill").value, "1200000");
check("angka sama", txt(doc, "yr"), "Rp 2.160.000");

// semua halaman tetap normal
for (const file of ["index.html", "kalkulator.html", "tips.html", "energi.html"]) {
    let error = null;
    const d = new JSDOM(fs.readFileSync(path.join(ROOT, file), "utf8"), {
        url: "http://localhost/" + file,
        runScripts: "outside-only"
    });
    try {
        d.window.eval(SCRIPT);
    } catch (e) {
        error = e.message;
    }
    check(file + " tanpa error", error || "ok", "ok");
}

console.log("\n" + (failures ? failures + " CEK GAGAL" : "SEMUA CEK LULUS"));
process.exit(failures ? 1 : 0);

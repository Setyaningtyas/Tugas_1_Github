
// Array untuk menyimpan pilihan
let pilihan = [];
let pilihanTerpilih = [];

// Mengambil elemen HTML
const formData = document.getElementById("formData");
const namaInput = document.getElementById("nama");
const jumlahInput = document.getElementById("jumlah");

const bagianPilihan = document.getElementById("bagianPilihan");
const formPilihan = document.getElementById("formPilihan");
const daftarInput = document.getElementById("daftarInput");

const bagianPemilihan = document.getElementById("bagianPemilihan");
const jenis = document.getElementById("jenis");
const kontrolPilihan = document.getElementById("kontrolPilihan");
const tombolLanjut = document.getElementById("tombolLanjut");

const bagianEmail = document.getElementById("bagianEmail");
const formEmail = document.getElementById("formEmail");
const emailInput = document.getElementById("email");

const bagianHasil = document.getElementById("bagianHasil");
const hasil = document.getElementById("hasil");
const tombolUlang = document.getElementById("tombolUlang");


// TAHAP 1: Tombol OK
formData.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = namaInput.value.trim();
    const jumlah = Number(jumlahInput.value);

    if (nama === "") {
        alert("Nama harus diisi!");
        namaInput.focus();
        return;
    }

    if (
        jumlahInput.value.trim() === "" ||
        !Number.isInteger(jumlah) ||
        jumlah < 1 ||
        jumlah > 10
    ) {
        alert("Jumlah pilihan harus bilangan bulat 1 sampai 10!");
        jumlahInput.focus();
        return;
    }

    // Membuat kolom input berdasarkan jumlah pilihan
    daftarInput.innerHTML = "";

    for (let i = 0; i < jumlah; i++) {
        const label = document.createElement("label");
        label.textContent = "Pilihan " + (i + 1) + ":";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "input-pilihan";
        input.placeholder = "Masukkan pilihan " + (i + 1);
        input.required = true;

        daftarInput.appendChild(label);
        daftarInput.appendChild(input);
    }

    pilihan = [];
    pilihanTerpilih = [];

    bagianPilihan.classList.remove("hidden");
    bagianPemilihan.classList.add("hidden");
    bagianEmail.classList.add("hidden");
    bagianHasil.classList.add("hidden");

    bagianPilihan.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// TAHAP 2: Menyimpan semua pilihan ke array
formPilihan.addEventListener("submit", function(event) {
    event.preventDefault();

    const semuaInput = document.querySelectorAll(".input-pilihan");
    const pilihanBaru = [];

    for (let i = 0; i < semuaInput.length; i++) {
        const teks = semuaInput[i].value.trim();

        if (teks === "") {
            alert("Semua pilihan harus diisi!");
            semuaInput[i].focus();
            return;
        }

        pilihanBaru.push(teks);
    }

    // Memeriksa agar setiap pilihan berbeda
    const pilihanUnik = new Set(
        pilihanBaru.map(teks => teks.toLowerCase())
    );

    if (pilihanUnik.size !== pilihanBaru.length) {
        alert("Setiap pilihan harus berbeda!");
        return;
    }

    pilihan = pilihanBaru;
    renderPilihan();

    bagianPemilihan.classList.remove("hidden");
    bagianEmail.classList.add("hidden");
    bagianHasil.classList.add("hidden");

    bagianPemilihan.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// TAHAP 3: Membuat checkbox, radio button, atau dropdown
function renderPilihan() {
    kontrolPilihan.innerHTML = "";

    if (jenis.value === "dropdown") {
        const select = document.createElement("select");
        select.id = "dropdownPilihan";

        const awal = document.createElement("option");
        awal.value = "";
        awal.textContent = "-- Pilih jawaban --";
        select.appendChild(awal);

        pilihan.forEach(teks => {
            const option = document.createElement("option");
            option.value = teks;
            option.textContent = teks;
            select.appendChild(option);
        });

        kontrolPilihan.appendChild(select);

    } else {
        pilihan.forEach((teks, index) => {
            const div = document.createElement("div");
            div.className = "pilihan-item";

            const input = document.createElement("input");
            input.type = jenis.value;
            input.name = "jawaban";
            input.id = "jawaban" + index;
            input.value = teks;

            const label = document.createElement("label");
            label.htmlFor = input.id;
            label.textContent = teks;

            div.appendChild(input);
            div.appendChild(label);
            kontrolPilihan.appendChild(div);
        });
    }
}


// Mengganti tampilan saat jenis pilihan diubah
jenis.addEventListener("change", renderPilihan);


// TAHAP 4: Tombol Lanjut
tombolLanjut.addEventListener("click", function() {
    pilihanTerpilih = [];

    if (jenis.value === "dropdown") {
        const dropdown = document.getElementById("dropdownPilihan");

        if (!dropdown || dropdown.value === "") {
            alert("Silakan pilih jawaban terlebih dahulu!");
            return;
        }

        pilihanTerpilih.push(dropdown.value);

    } else {
        const jawaban = document.querySelectorAll(
            'input[name="jawaban"]:checked'
        );

        if (jawaban.length === 0) {
            alert("Silakan pilih minimal satu jawaban!");
            return;
        }

        jawaban.forEach(input => {
            pilihanTerpilih.push(input.value);
        });
    }

    bagianEmail.classList.remove("hidden");
    bagianHasil.classList.add("hidden");

    bagianEmail.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// TAHAP 5: Validasi email dan menampilkan hasil
formEmail.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {
        alert("Format email tidak valid! Contoh: nama@email.com");
        emailInput.focus();
        return;
    }

    hasil.innerHTML = "";

    const salam = document.createElement("p");
    salam.textContent = "Halo, nama saya " + namaInput.value.trim() + ".";
    hasil.appendChild(salam);

    const dataEmail = document.createElement("p");
    dataEmail.textContent = "Email saya: " + email;
    hasil.appendChild(dataEmail);

    const dataJumlah = document.createElement("p");
    dataJumlah.textContent = "Jumlah pilihan: " + pilihan.length;
    hasil.appendChild(dataJumlah);

    const judul = document.createElement("p");
    judul.textContent = "Semua pilihan:";
    hasil.appendChild(judul);

    const daftar = document.createElement("ol");

    pilihan.forEach(teks => {
        const item = document.createElement("li");
        item.textContent = teks;
        daftar.appendChild(item);
    });

    hasil.appendChild(daftar);

    const jawaban = document.createElement("p");
    jawaban.textContent =
        "Jawaban yang dipilih: " + pilihanTerpilih.join(", ");
    hasil.appendChild(jawaban);

    bagianHasil.classList.remove("hidden");

    bagianHasil.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});


// TAHAP 6: Mengulang formulir
tombolUlang.addEventListener("click", function() {
    formData.reset();
    formPilihan.reset();
    formEmail.reset();

    daftarInput.innerHTML = "";
    kontrolPilihan.innerHTML = "";
    hasil.innerHTML = "";

    pilihan = [];
    pilihanTerpilih = [];
    jenis.value = "radio";

    bagianPilihan.classList.add("hidden");
    bagianPemilihan.classList.add("hidden");
    bagianEmail.classList.add("hidden");
    bagianHasil.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    namaInput.focus();
});

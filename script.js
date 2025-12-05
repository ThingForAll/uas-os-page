const soalButtons = document.querySelectorAll('.soal');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.getElementById('closeBtn');

const timerCard = document.getElementById('timerCard');
const timerValue = document.getElementById('timerValue');
const miniProgressFill = document.getElementById('miniProgressFill');

let timerInterval = null;
const TOTAL = 60;

// ==================== JAWABAN ======================
const jawaban = {
    1: `
      <h3>Penjelasan Konsep</h3>
      <p>Layered approach membangun sistem operasi sebagai tumpukan lapisan. Setiap lapisan hanya berinteraksi dengan lapisan di bawah/atas melalui interface yang jelas. Model client-server memecah fungsi OS menjadi layanan (server) yang berkomunikasi via IPC dengan klien.</p>

      <h3>Kelebihan Layered</h3>
      <ul>
        <li>Modular & mudah diverifikasi serta dirawat.</li>
        <li>Isolasi tanggung jawab tiap lapisan mempermudah debugging.</li>
      </ul>

      <h3>Kekurangan Layered</h3>
      <ul>
        <li>Overhead antar-lapisan (latensi tambahan).</li>
        <li>Kurang fleksibel untuk optimisasi performa.</li>
      </ul>

      <h3>Kelebihan Client-Server</h3>
      <ul>
        <li>Fault isolation: crash satu service tidak menghancurkan kernel.</li>
        <li>Mudah hot-swap atau update service individual.</li>
      </ul>

      <h3>Kekurangan Client-Server</h3>
      <ul>
        <li>IPC menambah overhead & kompleksitas.</li>
        <li>Perlu mekanisme autentikasi/otorisasi antar-service.</li>
      </ul>

      <div class="highlight">Kesimpulan: Pilih layered untuk performa inti & kode terpusat; pilih client-server (microkernel) untuk keamanan & modularitas layanan.</div>
    `,

    2: `
      <h3>Lima Keadaan Proses</h3>
      <ul>
        <li><strong>New</strong> – proses dibuat.</li>
        <li><strong>Ready</strong> – menunggu CPU di ready queue.</li>
        <li><strong>Running</strong> – mendapat CPU dan mengeksekusi instruksi.</li>
        <li><strong>Waiting</strong> – menunggu I/O atau event.</li>
        <li><strong>Terminated</strong> – selesai dan resource dibersihkan.</li>
      </ul>

      <h3>Process Control Block (PCB)</h3>
      <p>PCB menyimpan PID, state, program counter, CPU registers, memory info (page table/base-limit), file descriptors, serta info scheduling. PCB memungkinkan OS menyimpan state sebuah proses saat context switch.</p>

      <h3>Context Switch</h3>
      <p>Context switch terjadi saat OS menyimpan register & PC proses lama ke PCB, lalu memuat konteks proses baru. Biaya: overhead menyimpan/restore register, flush TLB, cache miss, dan kerja scheduler.</p>

      <div class="highlight">Dampak performa: terlalu sering context switch menurunkan throughput; waktu respons tergantung trade-off quantum & preemptiveness.</div>
    `,

    3: `
      <h3>Konsep Thread</h3>
      <p>Thread adalah unit eksekusi terkecil yang dapat dijadwalkan. Thread berbagi ruang alamat proses (heap, file descriptors) tetapi memiliki stack dan register sendiri.</p>

      <h3>Proses vs Thread</h3>
      <ul>
        <li>Proses: memiliki address space terpisah, overhead pembuatan & switching lebih besar.</li>
        <li>Thread: lightweight, cepat dibuat & di-switch, komunikasi antar-thread mudah via shared memory.</li>
      </ul>

      <h3>Model Multithreading</h3>
      <ul>
        <li><strong>Many-to-One</strong> – user threads → 1 kernel thread (efisien tetapi tidak parallel di multiprosesor).</li>
        <li><strong>One-to-One</strong> – setiap user thread → kernel thread (mendukung parallelisme, overhead kernel lebih besar).</li>
        <li><strong>Many-to-Many</strong> – banyak user threads dipetakan ke banyak kernel threads (fleksibel tapi kompleks).</li>
      </ul>

      <div class="highlight">Rekomendasi: model one-to-one umum di OS modern untuk memanfaatkan multi-core, sedangkan user-level threading cocok untuk I/O-bound dengan runtime scheduler (mis. goroutine).</div>
    `,

    4: `
      <h3>Tujuan CPU Scheduling</h3>
      <p>Tujuan: memaksimalkan utilisasi CPU & throughput, meminimalkan waiting/turnaround/response time, serta menjaga fairness.</p>

      <h3>Terminologi</h3>
      <ul>
        <li><strong>Burst time</strong> – durasi CPU yang dibutuhkan sebuah proses.</li>
        <li><strong>Turnaround time</strong> – completion time − arrival time.</li>
        <li><strong>Waiting time</strong> – total waktu menunggu di ready queue.</li>
      </ul>

      <h3>Scheduler Levels</h3>
      <ul>
        <li><strong>Long-term</strong> – admission job (mengatur multiprogramming).</li>
        <li><strong>Medium-term</strong> – swapping & mengurangi thrashing.</li>
        <li><strong>Short-term</strong> – CPU scheduler (frekuensi tinggi).</li>
      </ul>

      <h3>Algoritma (kritis)</h3>
      <ul>
        <li><strong>FCFS</strong> – sederhana, namun convoy effect dan non-preemptive.</li>
        <li><strong>SJF / SRTF</strong> – optimal rata-rata waiting time tapi butuh estimasi dan dapat menyebabkan starvation.</li>
        <li><strong>Priority</strong> – fleksibel, namun rentan starvation & priority inversion.</li>
        <li><strong>Round Robin</strong> – fair & responsif untuk interactive, pilihan quantum penting.</li>
      </ul>

      <div class="highlight">Catatan: pemilihan algoritma tergantung kebutuhan (throughput vs response vs fairness).</div>
    `,

    5: `
      <h3>Critical Section & Sinkronisasi</h3>
      <p>Critical section adalah area kode yang mengakses resource bersama dan harus dieksekusi eksklusif.</p>

      <h3>Tiga Syarat</h3>
      <ul>
        <li>Mutual exclusion</li>
        <li>Progress</li>
        <li>Bounded waiting</li>
      </ul>

      <h3>Contoh Masalah</h3>
      <ul>
        <li><strong>Producer-Consumer</strong> – gunakan semaphore 'empty' & 'full' + mutex.</li>
        <li><strong>Dining Philosophers</strong> – solusi: waiter/arbiter, atau aturan pengambilan garpu.</li>
        <li><strong>Readers-Writers</strong> – variasi untuk mencegah starvation penulis atau pembaca.</li>
      </ul>

      <div class="highlight">Implementasi benar dengan semaphores/mutex dan algoritma fairness untuk mencegah starvation & deadlock.</div>
    `,

    6: `
      <h3>Deadlock</h3>
      <p>Deadlock terjadi ketika sekelompok proses saling menunggu resource yang dimiliki proses lain sehingga tidak ada yang bisa melanjutkan.</p>

      <h3>Empat Kondisi (Coffman)</h3>
      <ul>
        <li>Mutual exclusion</li>
        <li>Hold and wait</li>
        <li>No preemption</li>
        <li>Circular wait</li>
      </ul>

      <h3>Penanganan</h3>
      <ul>
        <li><strong>Prevention</strong> – hilangkan salah satu kondisi (mis. minta semua resource di awal).</li>
        <li><strong>Avoidance</strong> – Banker's algorithm (alokasi aman).</li>
        <li><strong>Detection & Recovery</strong> – deteksi cycle & rollback/terminate.</li>
        <li><strong>Ignore</strong> – ostrich algorithm (dipakai bila deadlock sangat jarang).</li>
      </ul>

      <div class="highlight">Praktik: sistem produksi sering pakai deteksi & recovery untuk fleksibilitas, atau prevention bila keamanan wajib.</div>
    `,

    7: `
      <h3>Manajemen Media Penyimpanan</h3>
      <p>Fungsi: abstraksi file, alokasi blok, metadata, keamanan & keandalan (journaling, RAID, snapshots).</p>

      <h3>Fragmentasi</h3>
      <ul>
        <li>Internal fragmentation – space wasted in block.</li>
        <li>External fragmentation – free space scattered.</li>
      </ul>

      <h3>HDD vs SSD vs Cloud</h3>
      <ul>
        <li>HDD: mekanis, baik untuk kapasitas besar; defrag bisa membantu.</li>
        <li>SSD: cepat random I/O, perlu TRIM & wear-leveling; jangan defrag sembarangan.</li>
        <li>Cloud: replikasi & consistency model, security via IAM & encryption.</li>
      </ul>

      <div class="highlight">Backup & replication adalah kunci keandalan produksi.</div>
    `,

    8: `
      <h3>Contiguous Allocation</h3>
      <p>File disimpan di blok yang berurutan. Cepat untuk random/sequential access, tapi rawan external fragmentation.</p>

      <h3>Linked Allocation</h3>
      <p>Setiap blok menunjuk ke blok berikutnya. Tidak ada external fragmentation, tetapi random access lambat.</p>

      <h3>Indexed Allocation</h3>
      <p>Setiap file punya index block (inode) berisi pointer ke blok data; cocok untuk filesystem modern.</p>

      <div class="highlight">Indexed allocation umumnya paling fleksibel untuk OS modern.</div>
    `
  };

// ==================================================
// OPEN MODAL
// ==================================================
function openModal(id){
  modalTitle.textContent = "Jawaban No " + id;
  modalBody.innerHTML = jawaban[id];

  modal.setAttribute("aria-hidden","false");
  timerCard.style.display = "block";

  resetTimer();
  startTimer();
}

// ==================================================
// CLOSE MODAL
// ==================================================
function closeModal(){
  modal.setAttribute("aria-hidden","true");
  timerCard.style.display = "none";

  clearInterval(timerInterval);
  timerInterval = null;
}

// ==================================================
// TIMER
// ==================================================
function resetTimer(){
  timerValue.textContent = TOTAL;
  miniProgressFill.style.width = "100%";
}

function startTimer(){
  let time = TOTAL;

  timerInterval = setInterval(()=>{
    time--;
    timerValue.textContent = time;

    const percent = (time / TOTAL) * 100;
    miniProgressFill.style.width = percent + "%";

    if(time <= 0){
      clearInterval(timerInterval);
      timerInterval = null;

      setTimeout(()=>{ closeModal(); }, 700);
    }
  }, 1000);
}

// ==================================================
// EVENT LISTENERS
// ==================================================
soalButtons.forEach(btn=>{
  btn.onclick = ()=> openModal(btn.dataset.id);
});
closeBtn.onclick = closeModal;
modal.onclick = (e)=>{ if(e.target === modal) closeModal(); };
document.onkeydown = (e)=>{ if(e.key === "Escape") closeModal(); };

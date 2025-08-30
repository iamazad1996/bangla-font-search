
const fonts = [
  {family: "SolaimanLipi", src: "./fonts/SolaimanLipi.ttf", free: true},
  {family: "Nikosh", src: "./fonts/Nikosh.ttf", free: true},
  {family: "Siyam Rupali", src: "./fonts/SiyamRupali.ttf", free: true},
  {family: "PremiumFont1", img: "./images/premium1.png", free: false}
];

function loadFonts() {
  fonts.forEach(f => {
    if(f.src) {
      const fontFace = new FontFace(f.family, `url(${f.src})`);
      document.fonts.add(fontFace);
      fontFace.load();
    }
  });
}

function renderFonts(query) {
  const grid = document.getElementById('fontGrid');
  grid.innerHTML = '';
  const text = document.getElementById('textInput').value || "বাংলা টেক্সট";
  fonts.filter(f => !query || f.family.toLowerCase().includes(query.toLowerCase()))
       .forEach(f => {
         const card = document.createElement('div');
         card.className = 'font-card';
         const sample = document.createElement('div');
         sample.className = 'font-sample';
         sample.textContent = text;
         if(f.src) sample.style.fontFamily = f.family;
         if(!f.free && f.img) {
           const img = document.createElement('img');
           img.src = f.img;
           img.style.width = '100%';
           card.appendChild(img);
         }
         card.appendChild(sample);
         if(f.free && f.src) {
           const a = document.createElement('a');
           a.href = f.src;
           a.download = '';
           a.textContent = "ডাউনলোড";
           card.appendChild(a);
         }
         grid.appendChild(card);
       });
}

document.getElementById('textInput').addEventListener('input', () => renderFonts(''));
document.getElementById('imageInput').addEventListener('change', e => {
  alert('ছবি থেকে ফন্ট শনাক্ত করতে API ইন্টিগ্রেশন প্রয়োজন। বর্তমানে শুধুমাত্র UI আছে।');
});

window.onload = () => { loadFonts(); renderFonts(''); };

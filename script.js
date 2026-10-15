// Formatting Helper
const formatINR = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

// ==========================================
// 0. MOBILE HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinks.classList.toggle('active'); });
document.querySelectorAll('.nav-links a, .nav-actions-mobile button').forEach(item => { item.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('active'); }); });

// ==========================================
// 1. HERO SLIDER
// ==========================================
let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let slideTimer;

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach(s => s.classList.remove("active")); dots.forEach(d => d.classList.remove("active"));
    slides[slideIndex].classList.add("active"); dots[slideIndex].classList.add("active");
}
function moveSlide(step) { slideIndex += step; showSlide(slideIndex); resetTimer(); }
function currentSlide(index) { slideIndex = index; showSlide(slideIndex); resetTimer(); }
function autoSlide() { slideIndex++; showSlide(slideIndex); }
function resetTimer() { clearInterval(slideTimer); slideTimer = setInterval(autoSlide, 5000); }
showSlide(slideIndex); slideTimer = setInterval(autoSlide, 5000);


// ==========================================
// 2. 4 PROCESS ANIMATION (Walking Man)
// ==========================================
const processData = [
    { title: "BRAIN STORMING", desc: "Unlocking endless possibilities - From inspiration to conceptualization, we start by understanding the true potential of your home.", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" },
    { title: "DESIGN INTEGRATION", desc: "Where design meets function - we find the perfect harmony of themes, lighting and texture and blend it with convenience.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" },
    
    // UPDATE THIS LINE TO MATCH YOUR EXACT FILE NAME
    { title: "3D RENDITION", desc: "Experience your future home - our 3D walkthroughs offer a detailed preview of your interiors so you can get a feel before it is brought to life.", img: "Family VR Interior Design Experience.png" },
    
    { title: "EXECUTION", desc: "Made to perfection - our custom-built furniture solutions and team of experts ensure every design is made to perfection.", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80" }
];

let processStepIndex = 1;
let processTimer;

function setProcessStep(stepNum) {
    processStepIndex = stepNum;
    
    // Update active node
    document.querySelectorAll('.p-node').forEach((node, idx) => {
        if(idx + 1 === stepNum) node.classList.add('active');
        else node.classList.remove('active');
    });

    // Move Walking Man
    const man = document.getElementById('walkingMan');
    if(stepNum === 1) man.style.left = "0%";
    else if(stepNum === 2) man.style.left = "33.33%";
    else if(stepNum === 3) man.style.left = "66.66%";
    else man.style.left = "100%";

    // Update Text & Image with transition
    const imgEl = document.getElementById('processImg');
    imgEl.style.opacity = 0;
    
    setTimeout(() => {
        document.getElementById('processTitle').innerText = processData[stepNum-1].title;
        document.getElementById('processDesc').innerText = processData[stepNum-1].desc;
        imgEl.src = processData[stepNum-1].img;
        imgEl.style.opacity = 1;
    }, 300);

    resetProcessTimer();
}

function autoProcess() {
    processStepIndex++;
    if(processStepIndex > 4) processStepIndex = 1;
    setProcessStep(processStepIndex);
}

function resetProcessTimer() {
    clearInterval(processTimer);
    processTimer = setInterval(autoProcess, 4500);
}

// Initialize Process Animation
setTimeout(() => setProcessStep(1), 500);
resetProcessTimer();


// ==========================================
// 3. MODAL CLOSING & CONTACT
// ==========================================
window.addEventListener("click", (e) => { if (e.target.classList.contains('modal')) e.target.style.display = "none"; });
const contactModal = document.getElementById("contactModal");
document.querySelectorAll(".modal-trigger").forEach(t => t.addEventListener("click", (e) => { e.preventDefault(); contactModal.style.display = "flex"; document.getElementById("consultForm").style.display = "block"; document.getElementById("successMessage").style.display = "none"; }));
document.querySelector(".close-btn").addEventListener("click", () => contactModal.style.display = "none");
document.getElementById("consultForm").addEventListener("submit", (e) => { e.preventDefault(); document.getElementById("consultForm").style.display = "none"; document.getElementById("successMessage").style.display = "block"; setTimeout(() => { contactModal.style.display = "none"; }, 3000); });

// ==========================================
// 4. HOME WIZARD & DYNAMIC CALCULATION
// ==========================================
const wizardModal = document.getElementById("wizardModal");
let hStep = 1;
let hData = { layout: "2 BHK - Small", pkg: "Premium" };

function openWizard() {
    wizardModal.style.display = "flex"; hStep = 1; updateHWiz();
    document.querySelectorAll('#wizardModal .wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById('wizardStep1').classList.add('active');
    document.getElementById('payBtn').style.display = 'block'; document.getElementById('paymentLoader').style.display = 'none';
}
document.querySelector(".close-wizard-btn").addEventListener("click", () => wizardModal.style.display = "none");

function nextStep(dir) {
    document.getElementById(`wizardStep${hStep}`).classList.remove('active');
    hStep += dir;
    document.getElementById(`wizardStep${hStep}`).classList.add('active');
    updateHWiz();
}

function updateHWiz() {
    document.querySelectorAll('#wizardModal .step').forEach((d, i) => {
        if(i < hStep) d.classList.add('active'); else d.classList.remove('active');
        if(i < hStep - 1) d.classList.add('completed'); else d.classList.remove('completed');
    });
    document.getElementById('wizBackBtn').style.display = hStep === 1 ? 'none' : 'block';
    document.getElementById('wizardFooter').style.display = hStep >= 4 ? 'none' : 'flex';
    
    if (hStep === 4) {
        let l = parseInt(document.getElementById('count-living').innerText) || 1;
        let k = parseInt(document.getElementById('count-kitchen').innerText) || 1;
        let b = parseInt(document.getElementById('count-bedroom').innerText) || 1;
        let bath = parseInt(document.getElementById('count-bathroom').innerText) || 1;
        
        let basePrice = (l * 60000) + (k * 120000) + (b * 80000) + (bath * 40000);
        if (hData.layout.includes("Large")) basePrice *= 1.25; 
        
        let pkgMult = hData.pkg === "Essentials" ? 1 : (hData.pkg === "Premium" ? 1.3 : 1.7);
        let total = basePrice * pkgMult;
        
        document.getElementById("hEstimateAmount").innerText = `${formatINR.format(total)} - ${formatINR.format(total * 1.2)}`;
    }
}

function selectBHK(num, el) {
    hData.layout = num + " BHK";
    document.querySelectorAll('.bhk-accordion').forEach(a => { a.classList.remove('active'); a.querySelector('.radio-circle').classList.remove('selected'); if(a.querySelector('.bhk-body')) a.querySelector('.bhk-body').style.display='none'; });
    el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected');
    if(el.querySelector('.bhk-body')) el.querySelector('.bhk-body').style.display='flex';
    document.getElementById('count-bedroom').innerText = num; document.getElementById('count-bathroom').innerText = num;
}
function selectSize(sz, el, e) { e.stopPropagation(); hData.layout = hData.layout.split(" - ")[0] + " - " + sz; el.closest('.bhk-body').querySelectorAll('.sub-option').forEach(o => { o.classList.remove('active'); o.querySelector('.radio-circle').classList.remove('selected'); }); el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected'); }
function updateCount(room, chg) { let curr = parseInt(document.getElementById(`count-${room}`).innerText); if(curr + chg >= 0) document.getElementById(`count-${room}`).innerText = curr + chg; }
function selectPackage(pkg, el) { hData.pkg = pkg; document.querySelectorAll('#wizardModal .package-card').forEach(c => c.classList.remove('active')); el.classList.add('active'); }
function processPayment() { document.getElementById('payBtn').style.display = 'none'; document.getElementById('paymentLoader').style.display = 'block'; setTimeout(() => { document.getElementById('paymentLoader').style.display = 'none'; nextStep(1); }, 2000); }
function downloadPlan() { const txt = `AVAIO INNEX PLAN\nLAYOUT: ${hData.layout}\nPACKAGE: ${hData.pkg}\nSTATUS: PAID ₹999`; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'text/plain'})); a.download = 'Home_Plan.txt'; a.click(); }


// ==========================================
// 5. KITCHEN WIZARD
// ==========================================
const kwizModal = document.getElementById("kitchenWizardModal");
let kStep = 1;
let kData = { layout: "L-shaped", pkg: "Premium", ms: {A:3, B:8} };

function openKitchenWizard() {
    kwizModal.style.display = "flex"; kStep = 1; updateKWiz();
    document.querySelectorAll('#kitchenWizardModal .wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById('kwizStep1').classList.add('active');
    document.getElementById('kPayBtn').style.display = 'block'; document.getElementById('kPaymentLoader').style.display = 'none';
    renderKitchenMeasurements();
}
document.querySelector(".close-kwiz-btn").addEventListener("click", () => kwizModal.style.display = "none");

function nextKwizStep(dir) {
    document.getElementById(`kwizStep${kStep}`).classList.remove('active');
    kStep += dir;
    document.getElementById(`kwizStep${kStep}`).classList.add('active');
    updateKWiz();
}

function updateKWiz() {
    document.querySelectorAll('#kitchenWizardModal .step').forEach((d, i) => {
        if(i < kStep) d.classList.add('active'); else d.classList.remove('active');
        if(i < kStep - 1) d.classList.add('completed'); else d.classList.remove('completed');
    });
    document.getElementById('kwizBackBtn').style.display = kStep === 1 ? 'none' : 'block';
    document.getElementById('kwizFooter').style.display = kStep >= 4 ? 'none' : 'flex';
    
    if (kStep === 4) {
        let a = parseInt(kData.ms.A) || 0; let b = parseInt(kData.ms.B) || 0; let c = parseInt(kData.ms.C) || 0;
        let totalLinearFeet = a + b + c;
        let basePrice = totalLinearFeet * 16000; 
        let pkgMult = kData.pkg === "Premium" ? 1 : 1.4; 
        let total = basePrice * pkgMult;
        document.getElementById("kEstimateAmount").innerText = `${formatINR.format(total)} - ${formatINR.format(total * 1.25)}`;
    }
}

function selectKitchenLayout(lay, el) {
    kData.layout = lay;
    document.querySelectorAll('.layout-card').forEach(c => { c.classList.remove('active'); c.querySelector('.radio-circle').classList.remove('selected'); });
    el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected');
    if(lay === 'L-shaped') kData.ms = {A:3, B:8}; else if(lay === 'U-shaped') kData.ms = {A:10, B:11, C:10}; else if(lay === 'Straight') kData.ms = {A:10}; else kData.ms = {A:10, B:10};
    renderKitchenMeasurements();
}

function renderKitchenMeasurements() {
    const area = document.getElementById('dynamicMeasurementsArea');
    const getOpts = (v) => { let o=''; for(let i=3;i<=20;i++) o+=`<option value="${i}" ${i==v?'selected':''}>${i}</option>`; return o; };
    let dHtml = '', iHtml = '';
    
    if(kData.layout === 'L-shaped') {
        dHtml = `<div class="ms-box" style="width:40px;height:100px;left:calc(50% - 60px);top:50px;">A</div><div class="ms-box" style="width:120px;height:40px;left:calc(50% - 20px);top:50px;">B</div>`;
        iHtml = `<div class="ms-input-row"><span>A</span><select onchange="kData.ms.A=this.value">${getOpts(kData.ms.A)}</select> ft.</div><div class="ms-input-row"><span>B</span><select onchange="kData.ms.B=this.value">${getOpts(kData.ms.B)}</select> ft.</div>`;
    } else if(kData.layout === 'U-shaped') {
        dHtml = `<div class="ms-box" style="width:40px;height:100px;left:calc(50% - 70px);top:90px;">A</div><div class="ms-box" style="width:140px;height:40px;left:calc(50% - 70px);top:50px;">B</div><div class="ms-box" style="width:40px;height:100px;left:calc(50% + 30px);top:90px;">C</div>`;
        iHtml = `<div class="ms-input-row"><span>A</span><select onchange="kData.ms.A=this.value">${getOpts(kData.ms.A)}</select> ft.</div><div class="ms-input-row"><span>B</span><select onchange="kData.ms.B=this.value">${getOpts(kData.ms.B)}</select> ft.</div><div class="ms-input-row"><span>C</span><select onchange="kData.ms.C=this.value">${getOpts(kData.ms.C)}</select> ft.</div>`;
    } else if(kData.layout === 'Straight') {
        dHtml = `<div class="ms-box" style="width:160px;height:40px;left:calc(50% - 80px);top:80px;">A</div>`; iHtml = `<div class="ms-input-row"><span>A</span><select onchange="kData.ms.A=this.value">${getOpts(kData.ms.A)}</select> ft.</div>`;
    } else {
        dHtml = `<div class="ms-box" style="width:160px;height:40px;left:calc(50% - 80px);top:40px;">A</div><div class="ms-box" style="width:160px;height:40px;left:calc(50% - 80px);top:120px;">B</div>`;
        iHtml = `<div class="ms-input-row"><span>A</span><select onchange="kData.ms.A=this.value">${getOpts(kData.ms.A)}</select> ft.</div><div class="ms-input-row"><span>B</span><select onchange="kData.ms.B=this.value">${getOpts(kData.ms.B)}</select> ft.</div>`;
    }
    area.innerHTML = `<div class="measurement-visual">${dHtml}</div><div class="measurement-inputs">${iHtml}</div>`;
}

function selectKitchenPackage(pkg, el) { kData.pkg = pkg; document.querySelectorAll('#kitchenWizardModal .package-card').forEach(c => c.classList.remove('active')); el.classList.add('active'); }
function processKitchenPayment() { document.getElementById('kPayBtn').style.display = 'none'; document.getElementById('kPaymentLoader').style.display = 'block'; setTimeout(() => { document.getElementById('kPaymentLoader').style.display = 'none'; nextKwizStep(1); }, 2000); }
function downloadKitchenPlan() { let m = `A: ${kData.ms.A}ft`; if(kData.ms.B) m += `, B: ${kData.ms.B}ft`; if(kData.ms.C) m += `, C: ${kData.ms.C}ft`; const txt = `AVAIO INNEX KITCHEN\nLAYOUT: ${kData.layout}\nMEASURE: ${m}\nPACKAGE: ${kData.pkg}\nSTATUS: PAID ₹999`; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'text/plain'})); a.download = 'Kitchen_Plan.txt'; a.click(); }


// ==========================================
// 6. WARDROBE WIZARD
// ==========================================
const wwizModal = document.getElementById("wardrobeWizardModal");
let wStep = 1;
let wData = { height: "4 ft", type: "Sliding", finish: "Standard - Laminate", material: "MDF", accessories: [] };

function openWardrobeWizard() {
    wwizModal.style.display = "flex"; wStep = 1; updateWWiz();
    document.querySelectorAll('#wardrobeWizardModal .wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById('wwizStep1').classList.add('active');
    document.getElementById('wPayBtn').style.display = 'block'; document.getElementById('wPaymentLoader').style.display = 'none';
}
document.querySelector(".close-wwiz-btn").addEventListener("click", () => wwizModal.style.display = "none");

function nextWWizStep(dir) {
    document.getElementById(`wwizStep${wStep}`).classList.remove('active');
    wStep += dir;
    document.getElementById(`wwizStep${wStep}`).classList.add('active');
    updateWWiz();
}

function updateWWiz() {
    document.querySelectorAll('#wardrobeWizardModal .step').forEach((d, i) => {
        if(i < wStep) d.classList.add('active'); else d.classList.remove('active');
        if(i < wStep - 1) d.classList.add('completed'); else d.classList.remove('completed');
    });
    document.getElementById('wwizBackBtn').style.display = wStep === 1 ? 'none' : 'block';
    document.getElementById('wwizFooter').style.display = wStep >= 5 ? 'none' : 'flex';
    
    if (wStep === 5) {
        let heightNumeric = parseInt(wData.height);
        let baseAreaCost = heightNumeric * 14000; 
        let typeMult = wData.type === "Swing" ? 1 : 1.15;
        let finMult = wData.finish.includes("Laminate") ? 1 : (wData.finish.includes("Membrane") ? 1.25 : 1.6);
        let matMult = wData.material === "MDF" ? 1 : 1.15;
        let accessoriesCost = wData.accessories.length * 4500; 
        
        let total = (baseAreaCost * typeMult * finMult * matMult) + accessoriesCost;
        document.getElementById("wEstimateAmount").innerText = `${formatINR.format(total)} - ${formatINR.format(total * 1.15)}`;
    }
}

function selectWHeight(val, el) { wData.height = val; document.querySelectorAll('#wwizStep1 .sub-option').forEach(o => { o.classList.remove('active'); o.querySelector('.radio-circle').classList.remove('selected'); }); el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected'); }
function selectWType(val, el) { wData.type = val; document.querySelectorAll('.w-type-card').forEach(c => { c.classList.remove('active'); c.querySelector('.radio-circle').classList.remove('selected'); }); el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected'); }
function selectWFinish(val, el) { wData.finish = val; let container = el.parentElement; container.querySelectorAll('.w-list-card').forEach(c => { c.classList.remove('active'); c.querySelector('.radio-circle').classList.remove('selected'); }); el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected'); }
function selectWMaterial(val, el) { wData.material = val; let container = el.parentElement; container.querySelectorAll('.w-list-card').forEach(c => { c.classList.remove('active'); c.querySelector('.radio-circle').classList.remove('selected'); }); el.classList.add('active'); el.querySelector('.radio-circle').classList.add('selected'); }
function toggleWAccessory(val, el) { el.classList.toggle('active'); if (el.classList.contains('active')) { wData.accessories.push(val); } else { wData.accessories = wData.accessories.filter(item => item !== val); } }
function processWPayment() { document.getElementById('wPayBtn').style.display = 'none'; document.getElementById('wPaymentLoader').style.display = 'block'; setTimeout(() => { document.getElementById('wPaymentLoader').style.display = 'none'; nextWWizStep(1); }, 2000); }
function downloadWPlan() { let accList = wData.accessories.length > 0 ? wData.accessories.join(', ') : "None"; const txt = `AVAIO INNEX WARDROBE\nHEIGHT: ${wData.height}\nTYPE: ${wData.type}\nFINISH: ${wData.finish}\nCORE: ${wData.material}\nEXTRAS: ${accList}\nSTATUS: PAID ₹999`; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'text/plain'})); a.download = 'Wardrobe_Plan.txt'; a.click(); }
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_YRT-gDYYxKazAjZC4nQGV-sGOsdQLEU",
  authDomain: "cloudfirestore-2cba5.firebaseapp.com",
  projectId: "cloudfirestore-2cba5",
  storageBucket: "cloudfirestore-2cba5.firebasestorage.app",
  messagingSenderId: "67324644580",
  appId: "1:67324644580:web:a75602f6250ffe763ef0f1",
  measurementId: "G-6K41Y2C15L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


async function getAllEmployee(db){      
    const emcol = collection(db,'employees')      //สร้างตัวแปร emcol มาเป็น collection  /  employees คือ ขื่อ collection
    const allem = await getDocs(emcol)    //อันนี้คือดึงมาทุก Employee
    return allem
}

//ตัวแปรที่เรียกใช้ ฟังก์ชั่น
const alldataem = await getAllEmployee(db)
//console.log(alldataem)
alldataem.forEach(doc => {
    console.log(doc.id, doc.data()); // <-- ตรงนี้แหละข้อมูลที่ "ใช้งานได้จริง"
});

console.table(alldataem.docs.map(doc => ({ id: doc.id, ...doc.data() }))) //แสดงเป็นตารางแบบสวยงาม

//แสดงข้อมูล
async function showData() {
    const snapshot = await getDocs(collection(db, "employees"));
    let html = "";

    snapshot.forEach(doc => {
        const d = doc.data();
        html += `<p>
        <strong>ID:</strong> ${doc.id}<br>
        <strong>Name:</strong> ${d.name}<br>
        <strong>Email:</strong> ${d.email}<br>
        <strong>Age:</strong> ${d.age}<br><br>
      </p>`;
    });

    document.getElementById("data").innerHTML = html;
}
showData();


//เพิ่มข้อมูลเพิ่มสำเร็จก็อัพเดตหน้า
window.addEmployee = async function () {
    const empName = document.getElementById("name").value;
    const empEmail = document.getElementById("email").value;
    const empAge = Number(document.getElementById("age").value);

    await addDoc(collection(db, "employees"), {
        name: empName,
        email: empEmail,
        age: empAge
    });

    showData();
}


var firebaseConfig = {
  apiKey: "AIzaSyBSWxEC-Mq0g-VSRLMJSQhSyG4yZ_t2rE8",
  authDomain: "energysolutionsmengar.firebaseapp.com",
  databaseURL: "https://energysolutionsmengar.firebaseio.com",
  projectId: "energysolutionsmengar",
  storageBucket: "",
  messagingSenderId: "617730690775",
  appId: "1:617730690775:web:bfc15a49cb21ab30"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase
  .database()
  .ref("services")
  .on("value", snapshot => {
    var html1 = "";
    var html2 = "";
    var counting1 = 0;
    var counting2 = 0;
    snapshot.forEach(e => {
      e = e.val();
      if (e.type == "renovable") {
        counting1++;
        html1 += `
        <div class="col-xl-4 col-md-6 col-12 wow fadeInDown" data-wow-delay=".3s">
          <div class="pricing-box ${
            counting1 % 2 ? "bg-gray-dark " : "bg-gray-primary"
          }">
            <div class="pricing-box-tittle">${e.nombre}</div>
            <p>${e.description}</p>
            <hr/>
            <div class="pricing-box-inner">
              <img src="${e.imgurl}" alt="">
            </div>
            <button class="button button-190 button-circle ${
              counting1 % 2 ? "btn-primary-rounded" : "btn-rounded-outline"
            }">Ver más</button>
          </div>
        </div>`;
      } else if (e.type == "instalacion") {
        counting2++;
        html1 += `
        <div class="col-xl-4 col-md-6 col-12 wow fadeInDown" data-wow-delay=".3s">
          <div class="pricing-box ${
            counting2 % 2 ? "bg-gray-dark " : "bg-gray-primary"
          }">
            <div class="pricing-box-tittle">${e.nombre}</div>
            <p>${e.description}</p>
            <hr/>
            <div class="pricing-box-inner">
              <img src="${e.imgurl}" alt="">
            </div>
            <button class="button button-190 button-circle ${
              counting2 % 2 ? "btn-primary-rounded" : "btn-rounded-outline"
            }">Ver más</button>
          </div>
        </div>`;
      }
    });
    document.getElementById("altroot").innerHTML = html1;
    document.getElementById("energyroot").innerHTML = html2;
  });

document.getElementById("sec1").addEventListener("click", e => {
  if (document.getElementById("altercont").classList.contains("hidden")) {
    document.getElementById("altercont").classList.remove("hidden");
  }
  if (!document.getElementById("energycont").classList.contains("hidden")) {
    document.getElementById("energycont").classList.add("hidden");
  }
  window.scroll({
    top:
      document.getElementById("altercont").getBoundingClientRect().top +
      window.scrollY,
    left: 0,
    behavior: "smooth"
  });
});
document.getElementById("sec2").addEventListener("click", e => {
  if (document.getElementById("energycont").classList.contains("hidden")) {
    document.getElementById("energycont").classList.remove("hidden");
  }
  if (!document.getElementById("altercont").classList.contains("hidden")) {
    document.getElementById("altercont").classList.add("hidden");
  }
  window.scroll({
    top:
      document.getElementById("energycont").getBoundingClientRect().top +
      window.scrollY,
    left: 0,
    behavior: "smooth"
  });
});

document.getElementById("formagregar").addEventListener("click", () => {
  console.log("tes");
  firebase
    .database()
    .ref("services")
    .push({
      description: document.getElementById("formdescription").value,
      imgurl: document.getElementById("formimagen").value,
      nombre: document.getElementById("formname").value,
      type: document.getElementById("formtype").value
    })
    .then(() => {
      document.getElementById("formdescription").value = "";
      document.getElementById("formimagen").value = "";
      document.getElementById("formname").value = "";
      document.getElementById("formtype").value = "";
    })
    .catch(e => console.log(e));
});

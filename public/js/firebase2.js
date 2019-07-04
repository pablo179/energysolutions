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

document.getElementById("formagregar").addEventListener("click", () => {
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

const firedelete = key => {
  firebase
    .database()
    .ref("services/" + key)
    .remove();
};

firebase
  .database()
  .ref("services")
  .on("value", snapshot => {
    var html1 = "";
    snapshot.forEach(e => {
      var key = e.key;
      e = e.val();
      html1 += `
      <div class="col-xl-4 col-md-6 col-12 wow fadeInDown" data-wow-delay=".3s">
        <div class="pricing-box bg-gray-dark">
          <div class="pricing-box-tittle">${e.nombre}</div>
          <p>${e.description}</p>
          <hr/>
          <div class="pricing-box-inner">
            <img src="${e.imgurl}" alt="">
          </div>
          <button class="button button-190 button-circle btn-primary-rounded">Editar</button>
          <button class="button button-190 button-circle btn-primary-rounded" onClick="firedelete('${key}')" >Borrar</button>
        </div>
      </div>`;
    });

    document.getElementById("altroot").innerHTML = html1;
  });

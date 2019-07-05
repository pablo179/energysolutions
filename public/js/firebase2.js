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

const openEdit = (key, nombre, description, imgurl, type) => {
  document.getElementById("modkey").value = key;
  document.getElementById("modnombre").value = nombre;
  document.getElementById("modurl").value = imgurl;
  document.getElementById("moddescription").value = description;
  document.getElementById("modtipo").value = type;
  document.getElementById("mimodal").classList.remove("hidden");
};

document.getElementById("formaeditar").addEventListener("click", () => {
  firebase
    .database()
    .ref("services/" + document.getElementById("modkey").value)
    .set({
      description: document.getElementById("moddescription").value,
      imgurl: document.getElementById("modurl").value,
      nombre: document.getElementById("modnombre").value,
      type: document.getElementById("modtipo").value
    })
    .then(() => {
      document.getElementById("modkey").value = "";
      document.getElementById("modnombre").value = "";
      document.getElementById("modurl").value = "";
      document.getElementById("moddescription").value = "";
      document.getElementById("modtipo").value = "";
      document.getElementById("mimodal").classList.add("hidden");
    })
    .catch(e => console.log(e));
});

document.getElementById("mimodal").addEventListener("click", e => {
  if (e.target == document.getElementById("mimodal")) {
    document.getElementById("mimodal").classList.add("hidden");
    document.getElementById("modkey").value = "";
    document.getElementById("modnombre").value = "";
    document.getElementById("modurl").value = "";
    document.getElementById("moddescription").value = "";
    document.getElementById("modtipo").value = "";
  }
});

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
          <button class="button button-190 button-circle btn-primary-rounded" 
          onClick="openEdit('${key}','${e.nombre}','${e.description}','${
        e.imgurl
      }','${e.type}')"
          >Editar</button>
          <button class="button button-190 button-circle btn-primary-rounded" onClick="firedelete('${key}')" >Borrar</button>
        </div>
      </div>`;
    });

    document.getElementById("altroot").innerHTML = html1;
  });

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (!document.getElementById("login").classList.contains("hidden")) {
      document.getElementById("login").classList.add("hidden");
    }
    if (document.getElementById("servicios").classList.contains("hidden")) {
      document.getElementById("servicios").classList.remove("hidden");
    }
  } else {
    if (!document.getElementById("servicios").classList.contains("hidden")) {
      document.getElementById("servicios").classList.add("hidden");
    }
    if (document.getElementById("login").classList.contains("hidden")) {
      document.getElementById("login").classList.remove("hidden");
    }
  }
});
document.getElementById("login").addEventListener("click", () => {
  var email = document.getElementById("firelog").value;
  var password = document.getElementById("firepass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(e => {
      console.log(e.message);
      console.log(e.code);
    });
});

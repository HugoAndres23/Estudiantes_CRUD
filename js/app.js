const AbrirModal = document.getElementById("AbrirRegistro");
const Modal = document.getElementById("modal");
const CerrarModal = document.getElementById("cerrarModal");
const form = document.getElementById("formularioR");
const Tabla = document.getElementById("table")

let condicion = true;

const MostrarRegistroModal = () => {
    Modal.classList.toggle("is-active");
};

AbrirModal.addEventListener("click", MostrarRegistroModal);
CerrarModal.addEventListener("click", MostrarRegistroModal);

async function MostarEst() {

    let { data: est, error } = await _supabase.from('est').select('*')

    if (error) {
        console.log(error)
        return
    } else {
        Tabla.innerHTML = '';
        est.map(est => {
            Tabla.innerHTML += `
           <tr>
             <th>${est.id}</th>
             <td>${est.nombre}</td>
             <td>${est.apellido1}</td>
             <td>${est.apellido2}</td>
             <td>${est.telefono}</td>
             <td>${est.correo}</td>
             <td>
               <button class="button is-warning" onClick="modificarD(${est.id})"><i class="fas fa-pencil-alt"></i></button>
               <button class="button is-danger" onClick="eliminarD(${est.id})"><i class="fas fa-trash"></i></button>
             </td>
           </tr>
            `
        })
    }
}
MostarEst();

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nombre = form.nombre.value;
    let apellido1 = form.apellido1.value;
    let apellido2 = form.apellido2.value;
    let telefono = form.telefono.value;
    let correo = form.correo.value;

    let datos = {
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        telefono: telefono,
        correo: correo
    }

    console.log(datos);

    if (condicion) {
        insertarDatos(datos);
    } else {
        let id = parseInt(form.inputId.value);
        actualizarD(id, datos);
    }
    form.reset();
    MostrarRegistroModal();
})


async function insertarDatos(dato) {
    const { data, error } = await _supabase.from('est').insert([dato]);

    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Dato subido exitosamente!");
        MostarEst();

    }
}

async function eliminarD(id) {
    if (confirm("Desea realmente eliminar este dato?")) {
        const { data, error } = await _supabase.from('est').delete().eq('id', id);
        if (error) {
            console.log(error);
            return
        }
        MostarEst();
    }
    return

}

async function modificarD(id){
    MostrarRegistroModal();
    let { data: est, error } = await _supabase.from('est').select('*').eq('id', id)
    if (error) {
        console.log(error)
        return
    } else {
    form.inputId.value = est[0]["id"];
    form.nombre.value = est[0]["nombre"];
    form.apellido1.value = est[0]["apellido1"];
    form.apellido2.value = est[0]["apellido2"];
    form.telefono.value = est[0]["telefono"];
    form.correo.value = est[0]["correo"];

    condicion = false ;
  }
}

async function actualizarD(id,dato){

    const { data, error } = await _supabase.from('est').update(dato).eq('id',id);

    if(error){
        console.log(error);
        return
    }
    condicion=true;
    MostarEst();

}





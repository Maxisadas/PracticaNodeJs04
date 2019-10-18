const fs = require('fs');

let listadoPorHacer = [];


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {

        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    return porHacer;
}



const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    const dataSend = new Uint8Array(Buffer.from(data));
    fs.writeFile('./db/data.json', dataSend, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

}


const cargarDB = () => {
    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }


}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;



}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer.splice(index, 1); //eliminar un indice de un array
        guardarDB();
        return true;

    } else {

        return false;
    }


}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // Devuelve el inidice de la tarea que coincida con la descripcion.

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;

        guardarDB();

        return true;


    } else {
        return false;
    }

}

module.exports = {
    borrar,
    actualizar,
    cargarDB,
    guardarDB,
    crear,
    getListado
}
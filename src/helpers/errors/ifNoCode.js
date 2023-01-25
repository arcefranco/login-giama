export const ifNoCode = (Codigo) => {
if(!Codigo && typeof Codigo !== "number"){
    throw {status: false, message: "Codigo no válido"}
}
}
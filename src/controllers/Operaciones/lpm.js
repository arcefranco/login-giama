if (Object.values(categorias)[posArray] === "PORS") {
  for (let i = 5; i <= 16; i++) {
    meses[i] = Math.round(
      (array
        .filter((e) => e.Categoria === "PS")
        .filter((e) => {
          return e[Object.keys(e)[i]];
        })
        .reduce((accumulator, value) => {
          return accumulator + value[Object.keys(value)[i]];
        }, 0) /
        array
          .filter((e) => e.Categoria === "GS")
          .filter((e) => {
            return e[Object.keys(e)[i]];
          })
          .reduce((accumulator, value) => {
            return accumulator + value[Object.keys(value)[i]];
          }, 0)) *
        100
    );
  }
}

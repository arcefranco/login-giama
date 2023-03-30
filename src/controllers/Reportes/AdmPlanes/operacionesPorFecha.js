import { returnErrorMessage } from "../../../helpers/errors/returnErrorMessage";

export const getOperacionesXFecha = async (req, res) => {
  const { pMarca, fechaD, fechaH } = req.body;
  const dbGiama = req.db;
  if (!fechaD || !fechaH) {
    return res.send({ status: false, message: "Faltan datos" });
  }

  try {
    let result = await dbGiama.query(
      "CALL net_operacionesconformadasporfecha(?,?,?)",
      {
        replacements: [pMarca, fechaD, fechaH],
      }
    );
    return res.send(result);
  } catch (error) {
    return res.send({ status: false, message: returnErrorMessage(error) });
  }
};

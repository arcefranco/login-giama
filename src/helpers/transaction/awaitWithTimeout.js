function awaitWithTimeout(timeout, ...args) {
    function timeOut() {
      return new Promise((res, rej) => setTimeout(rej, timeout, {status: false, message: 'El campo esta siendo modificado por otro usuario'}));
    }
    return Promise.race([...args, timeOut()]); 
  }

export default awaitWithTimeout
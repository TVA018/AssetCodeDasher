class BarcodeManager {
    constructor(divToStreamTo){
        Quagga.init(BarcodeManager.getQuaggaConfig(divToStreamTo), (err) => {
            if(err){
                return console.log(err);
            }

            Quagga.start();
        })

        Quagga.onDetected(function (result) {
            alert("Detected barcode: " + result.codeResult.code);
        });
    }

    static getQuaggaConfig(divToStreamTo) {
        return {
            inputStream: {
                target: divToStreamTo,
                type: "LiveStream",
                constraints: {
                    width: { min: 1280 },
                    height: { min: 720 },
                    facingMode: "environment",
                    aspectRatio: { min: 1, max: 2 }
                }
            },
            decoder: {
                readers: ['code_39_reader']
            },
        };
    }
}
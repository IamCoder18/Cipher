const alphabet = [...'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'];
// const symbols = [...`<>,*;':"/-`]
const symbols = [...`😀😄😁😆😅🤣😂🙂😇😉`]
const encodeText = document.querySelector("#encode-text")
const encodeKey1 = document.querySelector("#encode-key-1")
const encodeKey2 = document.querySelector("#encode-key-2")
const encodeResult = document.querySelector("#encode-output")
const decodeText = document.querySelector("#decode-text")
const decodeKey1 = document.querySelector("#decode-key-1")
const decodeKey2 = document.querySelector("#decode-key-2")
const decodeResult = document.querySelector("#decode-output")

let encode = (text, shift1, shift2) => {
    let encoded = "";
    [...text].forEach((letter) => {
        if (alphabet.includes(letter.toLowerCase())) {
            if (letter.toUpperCase() == letter) {
                encoded = encoded + (alphabet[alphabet.indexOf(letter.toLowerCase()) + shift1]).toUpperCase()
            } else {
                encoded = encoded + alphabet[alphabet.indexOf(letter) + shift1]
            }
        } else {
            encoded = encoded + letter
        }
    })

    let finalEncoded = "";
    [...encoded].forEach((letter) => {
        if (alphabet.includes(letter.toLowerCase())) {
            let num;
            if (letter.toUpperCase() == letter) {
                num = alphabet.indexOf(letter.toLowerCase()) + shift2 + 26
            } else {
                num = alphabet.indexOf(letter) + shift2
            }
            if (num >= 10) {
                finalEncoded = finalEncoded + symbols[parseInt(num.toString().split('')[0])]
                finalEncoded = finalEncoded + symbols[parseInt(num.toString().split('')[1])] + "}"
            }
            else {
                finalEncoded = finalEncoded + symbols[num] + "}"
            }
        } else {
            if (symbols.includes(letter) == false && letter != "}")
                finalEncoded = finalEncoded + letter
        }
    })

    return finalEncoded
}
let decode = (text, shift1, shift2) => {
    let letters = [];

    let words = text.split(" ")
    words.forEach((word) => {
        letters = [...letters, ...word.split("}")]
    })

    let decoded = ""

    letters.forEach((letter) => {
        if (letter != "") {
            decoded += (decodeLetter(letter, shift2))
        } else {
            decoded += " "
        }
    })

    if (decoded.includes("undefined")) {
        return "Invalid Text or Key"
    }

    let finalDecoded = "";

    console.log([...decoded]);

    [...decoded].forEach((letter) => {
        if (alphabet.includes(letter.toLowerCase())) {
            if (letter.toUpperCase() == letter) {
                finalDecoded += alphabet[(alphabet.indexOf(letter.toLowerCase()) + 26) - shift1].toUpperCase()
            } else {
                finalDecoded += alphabet[(alphabet.indexOf(letter) + 26) - shift1]
            }
        } else {
            finalDecoded += letter
        }
    })

    return finalDecoded
}
let decodeLetter = (letters, shift) => {
    let num = "";
    let decoded = "";
    [...letters].forEach((letter) => {
        if (symbols.includes(letter)) {
            num = num + symbols.indexOf(letter).toString()
        } else {
            num += letter
            console.log(letter)
            console.log("external num")

        }
    });


    if (parseInt(num) - shift > 25) {
        if (alphabet[parseInt(num) - shift])
            decoded = alphabet[parseInt(num) - shift].toUpperCase()
        else{
            console.log("hi")
            decoded = num
        }
    } else {
        if (alphabet[parseInt(num) + 26 - shift])
            decoded = decoded + alphabet[parseInt(num) + 26 - shift]
        else{
            decoded = num
            console.log("hi")
        }
    }

    console.log(decoded)

    return decoded
}
let encodeRun = () => {
    if (encodeText.value != "" && encodeKey1.value != "" && encodeKey2.value != "") {
        if (parseInt(encodeKey1.value) > -1 && parseInt(encodeKey1.value) < 27 && parseInt(encodeKey2.value) > -1 && parseInt(encodeKey2.value) < 27) {
            encodeResult.innerHTML = encode(encodeText.value, parseInt(encodeKey1.value), parseInt(encodeKey2.value))
            document.querySelector("#encode-key-error").style.display = "none"
        }
        else {
            document.querySelector("#encode-key-error").style.display = "block"
        }
    }
}
let decodeRun = () => {
    if (decodeText.value != "" && decodeKey1.value != "" && decodeKey2.value != "") {
        if (parseInt(decodeKey1.value) > -1 && parseInt(decodeKey1.value) < 27 && parseInt(decodeKey2.value) > -1 && parseInt(decodeKey2.value) < 27) {
            decodeResult.innerHTML = decode(decodeText.value, parseInt(decodeKey1.value), parseInt(decodeKey2.value))
            document.querySelector("#decode-key-error").style.display = "none"
        }
        else {
            document.querySelector("#decode-key-error").style.display = "block"
        }
    }
}

encodeText.addEventListener('change', encodeRun)
encodeKey1.addEventListener('change', encodeRun)
encodeKey2.addEventListener('change', encodeRun)

decodeText.addEventListener('change', decodeRun)
decodeKey1.addEventListener('change', decodeRun)
decodeKey2.addEventListener('change', decodeRun)

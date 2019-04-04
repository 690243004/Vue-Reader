import { Base64 } from 'js-base64';
export const apiId = '5c14752e'
export const apiKey = '33c6517f62fde9261d438b9a45e3908a'
const configJson = {
    "auf": "audio/L16;rate=16000",
    "aue": "raw",
    "voice_name": "xiaoyan",
    "speed": "50",
    "volume": "50",
    "pitch": "50",
    "engine_type": "intp65",
    "text_type": "text"
}

export const  xparam  = Base64.encode(JSON.stringify(configJson))
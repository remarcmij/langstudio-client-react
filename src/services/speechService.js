const MAX_RETRIES = 3

class SpeechService {

  constructor() {
    this.speechSynthesis = window['speechSynthesis']
    this.voices = []
    this.utterance = null
    this.setup()
  }

  setup() {
    if (!this.isSpeechSynthesisSupported()) {
      return Promise.reject(new Error('This browser does not support speech synthesis.'))
    }
    return this.loadVoices()
      .then(voices => this.voices = voices)
  }

  isSpeechSynthesisSupported() {
    return this.speechSynthesis
  }

  loadVoices() {
    return new Promise((resolve, reject) => {
      if (!this.isSpeechSynthesisSupported()) {
        return reject(new Error('Speech synthesis not supported'))
      }

      let voices = []
      let retries = 0

      const intervalId = setInterval(() => {
        voices = this.speechSynthesis.getVoices()
        retries += 1
        if (voices.length !== 0 || retries > MAX_RETRIES) {
          clearInterval(intervalId)
          if (voices.length > 0) {
            console.log(`loaded ${voices.length} voices in ${retries} retries`)
            return resolve(voices)
          }
          return reject(new Error('Could not load voices.'))
        }
      }, 1)
    })
  }

  speak(text, lang) {
    return new Promise((resolve, reject) => {

      if (!this.isSpeechSynthesisSupported()) {
        return reject(new Error('Speech synthesis not supported'))
      }

      const voice = this.voices.find(v => v.lang === lang)

      if (!voice) {
        return reject(new Error(`No voice available for language '${lang}'`))
      }

      this.utterance = Object.assign(new SpeechSynthesisUtterance(), {
        text,
        voice,
        lang,
        voiceURI: voice.voiceURI
      })

      const onStart = () => void console.log('saying: ' + text)

      const onEnd = () => {
        console.log('done: ' + text)
        resolve()
      }

      this.utterance.addEventListener('start', onStart)
      this.utterance.addEventListener('end', onEnd)
      this.utterance.addEventListener('error', onEnd)

      this.speechSynthesis.speak(this.utterance)
    })
  }

  cancel() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel()
    }
  }
}

export default new SpeechService()

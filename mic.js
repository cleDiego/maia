
function getMediaMic() {
  navigator.getMedia = (navigator.getUserMedia ||
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia);

  navigator.getMedia({audio:true}, function(stream){
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(fftSize, 1, 1);
    analyser.fftSize = fftSize;
    analyser.smoothingTimeConstant = smoothing;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = function(e) {
      let inputData = e.inputBuffer.getChannelData(0);
      audioBuffer = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatTimeDomainData(audioBuffer);
      //let bufferCopy = new Float32Array(inputData.length);
      //bufferCopy.set(inputData);
      //audioBuffer.push(bufferCopy);
    }
  }, function(e){});
}


/**
var speech; 
if("speechSynthesis" in window || speechSynthesis) { // Checking If speechSynthesis Is Supported.
    
    synth = window.speechSynthesis || speechSynthesis;
    voices = synth.getVoices();
    const speak = (msg) => {
      let u = new SpeechSynthesisUtterance();
      u.lang = 'pt-BR',
      u.pitch = 2, //0 - 2, step:0.1
      u.rate = 3, //0 - 10, step:0.1
      u.voice = voices[1],
      u.text = msg;
      synth.speak(u);
    }
    var text = 'Meu nome não é Cleverson';
    speak(text); // To Speak The Utterance
    window.onbeforeunload = function(){
        speech.cancel(); // To Stop Speaking If the Page Is Closed.
    }
}
*/

/**
// Criar uma instância de SpeechSynthesisUtterance
const utterance = new SpeechSynthesisUtterance();
utterance.text = "Olá, mundo!";

// Criar um elemento de áudio para a análise
const audioElement = new Audio();

// Adicionar um evento para quando o áudio começar a ser reproduzido
audioElement.addEventListener('play', function() {
  // Configurar o contexto de áudio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256; // Ajuste conforme necessário

  // Conectar o elemento de áudio ao analisador
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // Criar um array para armazenar os dados do espectro de áudio
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  // Função para atualizar a análise em tempo real
  function updateAnalysis() {
    analyser.getByteFrequencyData(dataArray);

    // Faça algo com os dados do array, por exemplo, visualização
    console.log(dataArray);

    // Repita a análise enquanto o áudio estiver sendo reproduzido
    if (!audioElement.paused) {
      requestAnimationFrame(updateAnalysis);
    }
  }

  // Iniciar a análise
  updateAnalysis();
});

// Sintetizar a fala e reproduzir o áudio
utterance.addEventListener('end', function() {
  audioElement.pause(); // Pausar o áudio quando a fala terminar
});

// Converter a fala em áudio e definir no elemento de áudio
const synth = window.speechSynthesis;
let record = synth.speak(utterance);
audioElement.src = URL.createObjectURL(new Blob(record, { type: 'audio/wav' }));
audioElement.play();
*/
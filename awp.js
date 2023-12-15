class MyWorkletProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    this.port.postMessage({input});
    return true;
  }
}

registerProcessor('awp', MyWorkletProcessor);
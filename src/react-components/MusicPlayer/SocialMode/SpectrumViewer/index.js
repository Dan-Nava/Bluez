import React from "react";
import "./styles.css";

class SpectrumViewer extends React.Component {
    constructor(props) {
        super(props);
        this.canvasWidth = 320;
        this.canvasHeight = 200;
        this.spectrumPadding = 3;
        this.canvas = React.createRef();
    }

    setupAnalyzer() {
        this.audioContext = this.audioContext || new AudioContext();
        this.source = this.source || this.audioContext.createMediaElementSource(this.props.audio_object);
        this.analyser = this.analyser || this.audioContext.createAnalyser();
        this.analyser.fftSize = 64
        this.source.connect(this.audioContext.destination);
        this.source.connect(this.analyser);
    }

    getFrequencyAmplitude() {
        const bufferLength = this.analyser.frequencyBinCount;
        const amplitudeArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(amplitudeArray)
        return this.normalize(amplitudeArray)
    }

    normalize(arr) {
        let max = arr.reduce(function (a, b) {
            return Math.max(a, b);
        }, 0);
        let results = [...Array(arr.length).keys()]
        for (let i = 0; i < arr.length; i++) {
            results[i] = arr[i] / max;
        }
        return results
    }

    drawSpectrum(amplitudeData) {
        const ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.fillStyle = "#3CAEA3";
        let w = this.canvasWidth / amplitudeData.length - this.spectrumPadding;
        for (let i = 0; i < amplitudeData.length; i++) {
            ctx.fillRect((w + this.spectrumPadding) * i,
                this.canvasHeight - amplitudeData[i] * this.canvasHeight,
                w,
                amplitudeData[i] * this.canvasHeight);
        }
    }

    updateSpectrum() {
        this.drawSpectrum(this.getFrequencyAmplitude())
        let t = this;
        this.audioAnimation = requestAnimationFrame(function () {
            t.updateSpectrum();
        })
    }

    stateChangeHandler() {
        if (this.source) {
            this.source.disconnect();
        }
        cancelAnimationFrame(this.audioAnimation);

        this.setupAnalyzer();
        let t = this;
        this.audioAnimation = requestAnimationFrame(function () {
            t.updateSpectrum();
        })
    }

    render() {
        return (
            <canvas className="waveCanvas" ref={this.canvas} width={this.canvasWidth} height={this.canvasHeight}/>
        );
    }
}

export default SpectrumViewer;
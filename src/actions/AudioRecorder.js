window.MediaRecorder = window.MediaRecorder;

export default class AudioRecorder {
    constructor(stream, onStart = null, onStop = null) {
        this.recordedChunks = [];
        let recorderOptions = null;
        // mutually exclusive audio encoding formats beween chrome and firefox
        if (window.MediaRecorder.isTypeSupported('audio/webm')) {
          recorderOptions = {mimeType: 'audio/webm'};
        } else if (window.MediaRecorder.isTypeSupported('audio/ogg')) {
           recorderOptions = {mimeType: 'audio/ogg'};
        } else {
            recorderOptions = {}; //let browser pick
        }
        this.mediaRecorder = new window.MediaRecorder(stream, recorderOptions);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        }
        if(onStart){
            this.mediaRecorder.onstart = onStart;
        }
        if(onStop){
            this.mediaRecorder.onstop = (event) => {
                onStop(event, this.makeRecording());
            };
        } else {
            this.mediaRecorder.onstop = () => {
                this.makeRecording();
            };
        }
        this.finishedRecording = null;
    }
    handleDataAvailable(event) {
    }
    record(){
        return new Promise((resolve, reject) => {
            this.mediaRecorder.start();
            this.mediaRecorder.onstop = () => {
                resolve(this.makeRecording());
            }
        });
    }
    start(){
        if(this.mediaRecorder.state === 'inactive'){
            this.mediaRecorder.start();
        }
    }
    stop(){
        if(this.mediaRecorder.state === 'recording'){
            this.mediaRecorder.stop();
        }
    }
    makeRecording(){
        if(this.mediaRecorder.state === 'inactive' && this.recordedChunks.length > 0){
            //unclear if this encoding option works
            let audioOutputType = {'type': 'audio/ogg'};
            this.finishedRecording = new Blob(this.recordedChunks, audioOutputType);
            this.recordedChunks = [];
        }
        return(this.finishedRecording);
    }
}


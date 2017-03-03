export const selfInfo = {
    peerId: null,
    readyToStart: false,
    micInput: null,
    speakerOutput: null
}

export const partnerInfo = {
    peerId: null,
    peerSocket: null,
    readyToStart: false,
    audio: null,
    volume: 1
}

export const instructions = {
    finished_instructions: false,
    instructions: 'By clicking "I understand these instructions" below, you confirm that you have read and understood the instructions.'
}

export const consent = {
    consented: false,
    instructions: 'By clicking "I consent to participate" below, you confirm that you have read and understood the consent form, that you are willing to participate in this experiment, and that you agree that the data you provide by participating can be used in scientific publications (no identifying information will be used).'
}

export const trials = [
        {stimuli: ['cab', 'surf', 'gab'],
            target: 0,
            response: null,
            displayed_words: false,
            speaker_cued: false,
            completed: false,
            data: {}
        },
        {stimuli: ['miss', 'wood', 'void'],
            target: 1,
            response: null,
            displayed_words: false,
            speaker_cued: false,
            completed: false,
            data: {}
        },
        {stimuli: ['raft', 'bill', 'pill'],
            target: 2,
            response: null,
            displayed_words: false,
            speaker_cued: false,
            completed: false,
            data: {}
        }]


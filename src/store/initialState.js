export const instructions = {
    finished_instructions: false,
    instructions: 'Here you will interact with a partner to complete a word game. You and your partner will see a series of sets of words. For each set, one of you will be asked to speak one of the words aloud and the other will have to click on the word that they hear spoken aloud. By clicking "I understand these instructions" below, you confirm that you have read and understood the instructions.'
}

export const consent = {
    consented: false,
    instructions: 'By clicking "I consent to participate" below, you confirm that you have read and understood the consent form, that you are willing to participate in this experiment, and that you acknowledge that the data you provide by participating in this experiment can be used in scientific publications (no identifying information will be used).'
}

export const trialBlocks = [
    {instructions: {
        finished_instructions: false,
        forSpeaker: 'You will see three words, then after a moment one will be highlighted. Say it aloud so your partner can select that same word on their screen.',
        forPartner: 'You will see three words. These are the same that your partner can see. They will be asked to say one aloud to you. When you recognize what word they said click on it.'},
        trials: [
            {stimuli: ['cab', 'surf', 'gab'],
                target: 0,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: '/stimuli/testword.ogg',
                data: {}
            },
            {stimuli: ['miss', 'wood', 'void'],
                target: 1,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: '/stimuli/testword.ogg',
                data: {}
            },
            {stimuli: ['raft', 'bill', 'pill'],
                target: 2,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: '/stimuli/testword.ogg',
                data: {}
            }]
    },
    {instructions: {
        finished_instructions: false,
        forSpeaker: 'For this set now you will be the speaker! You will see three words on your screen, then after a moment one will be highlighted. Say it aloud so your partner can select that same word on their screen.',
        forPartner: 'Now for this set you will be the selector! You will see three words. These are the same that your partner can see. Now they will be asked to say one aloud to you. When you recognize what word they said click on it.'},
        trials: [
            {stimuli: ['bike', 'lint', 'pike'],
                target: 2,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: null,
                data: {}
            },
            {stimuli: ['rush', 'jig', 'jerk'],
                target: 0,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: null,
                data: {}
            },
            {stimuli: ['daunt', 'taunt', 'lake'],
                target: 1,
                response: null,
                displayed_words: false,
                speaker_cued: false,
                completed: false,
                pre_recorded_audio: null,
                data: {}
            }]}
]


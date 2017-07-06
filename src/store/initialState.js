export const instructions = {
    finished_instructions: false,
    instructions: 'Here you will interact with a partner to complete picture matching game. You and your partner will see a series of sets of pictures. For each set of pictures, one of you will be asked to name the pictures from left to right so that the other person can correctly click on the pictures in the same order. By clicking "I understand these instructions" below, you confirm that you have read and understood these instructions.'
}

export const consent = {
    consented: false,
    instructions: 'By clicking "I consent to participate" below, you confirm that you have read and understood the consent form, that you are willing to participate in this experiment, and that you acknowledge that the data you provide by participating in this experiment can be used in scientific publications (no identifying information will be used).'
}

export const trialBlocks = [
    {instructions: {
        finished_instructions: false,
        forSpeaker: 'You will see four pictures. Label each using a single word, starting with the pictures on the left and. Your partner will be trying to click on the same pictures in the same order as you say them aloud. Once your partner has selected all the pictures you will have completed this set and you will be asked to start the next set.',
        forPartner: 'You will see four pictures on the upper half of your screen and four dashed boxes on the lower half. Your partner will name each picture alound using a single word. Click on the picture that corresponds to each word in the order your hear them. When you click on a picture it will move to the lower half of your screen, replacing the dashed boxes below. Once you select the last picture you will copmlete this set and you will be asked to start the next set.'},
        trials: [
            {stimuli: ['carrot', 'dog', 'medal', 'cupcake'],
                speaker_order: [0, 3, 1, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: 'recordings/pre_recorded/0_0.ogg',
                speaker_recording: null,
                partner_rt_adjust: null,
                data: {}
            },
            {stimuli: ['skull', 'scroll', 'clouds', 'blocks'],
                speaker_order: [3, 0, 1, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: 'recordings/pre_recorded/0_1.ogg',
                speaker_recording: null,
                partner_rt_adjust: null,
                data: {}
            },
            {stimuli: ['cup', 'lightning', 'hot_dog', 'bear'],
                speaker_order: [3, 1, 0, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: 'recordings/pre_recorded/0_2.ogg',
                speaker_recording: null,
                partner_rt_adjust: null,
                data: {}
            }
        ]
    },
    {instructions: {
        finished_instructions: false,
        forSpeaker: 'You will see four pictures. Label each using a single word, starting with the pictures on the left and. Your partner will be trying to click on the same pictures in the same order as you say them aloud. Once your partner has selected all the pictures you will have completed this set and you will be asked to start the next set.',
        forPartner: 'You will see four pictures on the upper half of your screen and four dashed boxes on the lower half. Your partner will name each picture alound using a single word. Click on the picture that corresponds to each word in the order your hear them. When you click on a picture it will move to the lower half of your screen, replacing the dashed boxes below. Once you select the last picture you will copmlete this set and you will be asked to start the next set.'},
        trials: [
            {stimuli: ['carrot', 'dog', 'medal', 'cupcake'],
                speaker_order: [0, 3, 1, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: null,
                speaker_recording: null,
                partner_rt_adjust: 0,
                data: {}
            },
            {stimuli: ['skull', 'scroll', 'clouds', 'blocks'],
                speaker_order: [3, 0, 1, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: null,
                speaker_recording: null,
                partner_rt_adjust: 0,
                data: {}
            },
            {stimuli: ['cup', 'lightning', 'hot_dog', 'bear'],
                speaker_order: [3, 1, 0, 2],
                response: [],
                displayed_pictures: false,
                completed: false,
                instructions_played: false,
                mock_recording: null,
                speaker_recording: null,
                partner_rt_adjust: 0,
                data: {}
            }
        ]
    }
]


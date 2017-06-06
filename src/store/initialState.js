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
            {stimuli: ['red', 'blue', 'green', 'navy'],
                speaker_order: [1, 2, 0, 3],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            },
            {stimuli: ['green', 'pink', 'red', 'blue'],
                speaker_order: [2, 3, 0, 1],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            },
            {stimuli: ['lime', 'red', 'blue', 'green'],
                speaker_order: [2, 1, 3, 0],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            }
        ]
    },
    {instructions: {
        finished_instructions: false,
        forSpeaker: 'You will see four pictures. Label each using a single word, starting with the pictures on the left and. Your partner will be trying to click on the same pictures in the same order as you say them aloud. Once your partner has selected all the pictures you will have completed this set and you will be asked to start the next set.',
        forPartner: 'You will see four pictures on the upper half of your screen and four dashed boxes on the lower half. Your partner will name each picture alound using a single word. Click on the picture that corresponds to each word in the order your hear them. When you click on a picture it will move to the lower half of your screen, replacing the dashed boxes below. Once you select the last picture you will copmlete this set and you will be asked to start the next set.'},
        trials: [
            {stimuli: ['red', 'blue', 'green', 'navy'],
                speaker_order: [1, 2, 0, 3],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            },
            {stimuli: ['green', 'pink', 'red', 'blue'],
                speaker_order: [2, 3, 0, 1],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            },
            {stimuli: ['lime', 'red', 'blue', 'green'],
                speaker_order: [2, 1, 3, 0],
                response: [],
                displayed_pictures: false,
                completed: false,
                data: {}
            }
        ]
    }
]


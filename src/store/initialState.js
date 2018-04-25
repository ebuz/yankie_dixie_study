export const instructions = {
    finished_instructions: false,
    instructions: 'Here you will interact with a partner to complete picture matching game. You and your partner will see a series of sets of pictures. For each set of pictures, one of you will be asked to name the pictures from left to right so that the other person can correctly click on the pictures in the same order. By clicking "I understand these instructions" below, you confirm that you have read and understood these instructions.'
}

export const consent = {
    consented: false,
    instructions: 'By clicking "I consent to participate" below, you confirm that you have read and understood the consent form, that you are willing to participate in this experiment, and that you acknowledge that the data you provide by participating in this experiment can be used in scientific publications (no identifying information will be used).'
}

export const debrief = {
    finished_debrief: false,
    debrief: "In this study your partner was actually simulated by our software. At no time did you interact with an actual human. While we would prefer to not use deception as part of our studies, here it was necessary for two reasons. First, we wanted to carefully control your partner's behavior. Second, we wanted to know how you would respond to someone you believed was real. Other researchers have found that people can treat human and computer agents differently."
}


const speakerInstructions = 'You will see four pictures. Label each using a single word, starting with the pictures on the left. Your partner will try to click on the same pictures in the same order as you say them aloud. Once your partner has selected all the pictures another set will appear.';

const partnerInstructions = 'You will see four pictures on the upper half of your screen and four dashed boxes on the lower half. Your partner will describe each picture aloud using a single word. Click on the picture that corresponds to each word in the order your hear them. When you click on a picture it will move to the lower half of your screen, replacing the dashed boxes below. Once you select the last picture another set will appear.';

const partnerTrialList1 = [
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
];

const partnerTrialList2 = [
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
];

const experimentalList1 = [
    {
        role: 'partner',
        instructions: {
            finished_instructions: false,
            forSpeaker: speakerInstructions,
            forPartner: partnerInstructions
        },
        trials: partnerTrialList1
    },
    {
        role: 'speaker',
        instructions: {
            finished_instructions: false,
            forSpeaker: speakerInstructions,
            forPartner: partnerInstructions
        },
        trials: partnerTrialList1
    }
];

const experimentalList2 = [
    {
        role: 'partner',
        instructions: {
            finished_instructions: false,
            forSpeaker: speakerInstructions,
            forPartner: partnerInstructions
        },
        trials: partnerTrialList2
    },
    {
        role: 'speaker',
        instructions: {
            finished_instructions: false,
            forSpeaker: speakerInstructions,
            forPartner: partnerInstructions
        },
        trials: partnerTrialList2
    }
];

export const experimentalLists = [
    experimentalList1,
    experimentalList2
];

export const survey = [
    {
        instructions: "fill this out",
        completed: false,
        questions: [
            {
                element: 'input',
                type: 'number',
                name: 'age',
                label: 'age',
                min: 18,
                value: ''
            },
            {
                element: 'select',
                name: 'sex',
                label: 'sex',
                options: ['NA', 'Male', 'Female'],
                value: '',
            },
            {
                element: 'select',
                name: 'sex1',
                label: 'sex1',
                options: ['NA', 'Male', 'Female'],
                value: 'Male',
            },
            {
                element: 'select',
                name: 'ethnicity1',
                label: 'ethnicity1',
                multiple: true,
                options: ['american indian', 'black', 'white'],
                value: []
            },
            {
                element: 'select',
                name: 'ethnicity3',
                label: 'ethnicity3',
                multiple: true,
                options: ['american indian', 'black', 'white'],
                value: ['black']
            },
            {
                element: 'select',
                name: 'ethnicity4',
                label: 'ethnicity4',
                multiple: true,
                options: ['american indian', 'black', 'white'],
                value: ['american indian', 'black']
            },
        ]
    },
    {
        instructions: "fill this out too",
        completed: false,
        questions: [
            {
                element: 'select',
                name: 'ethnicity',
                label: 'ethnicity',
                options: ['american indian', 'black', 'white'],
                value: 'black'
            },
            {
                element: 'input',
                type: 'text',
                name: 'typeyes1',
                label: 'type yes',
                value: ''
            },
            {
                element: 'textarea',
                name: 'typeyes2',
                label: 'type yes',
                rows: 10,
                cols: 30,
                value: ''
            },
        ]
    },
];

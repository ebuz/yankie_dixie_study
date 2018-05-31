import React from 'react';
import { experimentalLists as expl } from './experimentalLists';

export const instructions = {
    finished_instructions: false,
    instructions: 'In this task you will interact with a partner to complete a picture matching game. During each turn of the game, you or your partner will direct the other person to order a set of pictures. The director will name the pictures out loud and the matcher will click on the pictures based on the order they hear them.'
}

export const consent = {
    consented: false,
    consentFileURL: 'ExampleConsent.pdf',
    instructions: 'By clicking "I consent to participate" below, you confirm that you have read and understood the consent form, that you are willing to participate in this experiment, and that you acknowledge that the data you provide by participating in this experiment can be used in scientific publications (no identifying information will be used). After you consent we will start to try and pair you with a partner.'
}

export const debrief = {
    finished_debrief: false,
    debrief: ["In this study your partner was simulated by our software. At no time did you interact with a human partner, despite how we described the study at the start. Researchers should use deception as a last resort and here we felt we needed to. In this research we want to understand how a person changes how they communicate with their human partners based on how their partners behave. We can control how your software-based partner behaves in ways that would be impossible with a human. This level of control makes it possible for us to gather the amount of data we need to draw reliable conclusions about human behavior. But, other researchers have found that people communicate differently with human and software-based partners. So, in order to make reliable conclusions about how humans interact with humans, we needed to make it seem like your partner was human."]
}

export const partnerInfo = {
    publicId: null,
    peerId: null,
    peerSocket: null,
    readyToStart: false,
    audio: null,
    volume: 1,
    micTestFile: null,
    micTestFileSet: ['recordings/mock_recordings/Reading_yankee.ogg',
        'recordings/mock_recordings/Reading_yankee.ogg'],
    micCheck: false,
    micCheckRedos: 0
}

export const experimentalLists = expl;

export const survey = [
    {
        instructions: "The main part of the study is done and you have been disconnected from your partner. Now we want you answer a series of questions about yourself and your experience in the study. Answering any of these questions is optional. Neither whether you answer nor what your answers are will not affect your payment for participating. However, we ask that you answer these questions to the best of your ability. Your responses help us to analyze yours and other's data. They also help us improve our future experiments. And they ensure that our research well represents the population.",
        completed: false,
        questions: []
    },
    {
        instructions: "We would like some demographic information. We collect this information partly to better analyze our data. We also collect this information at the request of organizations that monitor or fund our research. This includes the Vanderbilt University institutional review board and may also include the National Science Foundation and the National Institutes of Health. These organizations ask for the demographics of ours and other researcher's participants to ensure research involves a representative sample of the population. Collecting demographics also ensures certain subsets of the population (such as some minorities and women) who historically have been wittingly or unwittingly misrepresented in past research, are no longer misrepresented in scientific data.",
        completed: false,
        questions: [
            {
                questionType: 'input',
                type: 'number',
                name: 'age',
                label: 'Age',
                value: ''
            },
            {
                questionType: 'select',
                name: 'sex',
                label: 'Sex',
                options: ['NA', 'Male', 'Female'],
                value: '',
            },
            {
                questionType: 'select',
                name: 'ethnicity',
                label: 'Ethnicity',
                options: ['NA', 'Hispanic or Latino', 'Not Hispanic or Latino'],
                value: ''
            },
            {
                questionType: 'select',
                name: 'race',
                label: 'Race. Hold down the Ctrl (windows) / Command (Mac) button to select multiple options.',
                multiple: true,
                options: ['American Indian', 'Black or African-American',
                    'Native Hawaiian or Other pacific Islander', 'Asian',
                    'White', 'Unknown', 'Other'],
                value: []
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'raceOther',
                label: "If you selected 'Other' feel free provide any details.",
                value: ''
            },
        ]
    },
    {
        instructions: "Please answer these additional questions about your background.",
        completed: false,
        questions: [
            {
                questionType: 'select',
                name: 'education',
                label: 'Education',
                options: ['NA', "Didn't finish high school",
                    'Finished high school', 'Attended college',
                    'Finished college',
                    'Started and/or finished graduate education'],
                value: ''
            },
            {
                questionType: 'select',
                name: 'dialectRegion',
                label: ['What dialect region do you live in? Please look at ',
                    <a key='dialectMap' target="_blank" href="http://www.aschmann.net/AmEng/#SmallMap">this map</a>, " for reference. If your dialect is specific to a smaller region please select 'Other' and specify its location in the next text box."
                ],
                options: ['', "The Midland", "The South", "The North",
                    'The North Central', 'The West',
                    'The Northern New England',
                    'Greater New York City', 'Other'],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'dialctRegionOther',
                label: "Please specify your dialect region if you selected 'Other'.",
                value: ''
            },
            {
                questionType: 'select',
                name: 'dialectRegionBirth',
                label: 'If you grow up in a different region, please select it.',
                options: ['I grew up in the same region I live in now',
                    "The Midland", "The South", "The North",
                    'The North Central', 'The West',
                    'The Northern New England',
                    'Greater New York City', 'Other'],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'dialctRegionBirthOther',
                label: "Please specify your early dialect region if you selected 'Other'.",
                value: ''
            },
        ]
    },
    {
        instructions: "Please answer some questions about the website, your computer, and your microphone.",
        completed: false,
        questions: [
            {
                questionType: 'likert',
                name: 'websiteResponse',
                label: 'How responsive was the website?',
                range: [1, 7],
                rangeLabels: ['poorly responsive', '', '',
                    'typical to other websites', '', '', 'very responsive'],
                value: ''
            },
            {
                questionType: 'likert',
                name: 'instructionClarity',
                label: 'How clear were the instructions about this task?',
                range: [1, 7],
                rangeLabels: ['very unclear', '', '',
                    'neither clear nor unclear', '', '', 'very clear'],
                value: ''
            },
            {
                questionType: 'select',
                name: 'internetSpeed',
                label: 'Select the type of internet connection you have.',
                options: ['', 'Dial up',
                    "Cable", "DSL", "Other high speed"],
                value: ''
            },
            {
                questionType: 'likert',
                name: 'internetQuality',
                label: 'How would you rate the quality of your internet?',
                range: [1, 7],
                rangeLabels: ['poor quality', '', '',
                    'typical', '', '', 'high quality'],
                value: ''
            },
            {
                questionType: 'select',
                name: 'microphoneType',
                label: 'Select the type of microphone you used for this task.',
                options: ['',
                    "Built into computer/laptop", "Head mounted", "Desk mounted"],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'microphoneModel',
                label: "Please write the make and model of your microphone. If it is built into your computer/laptop, please provide the make and model of your computer/laptop. Write 'unknown' if you do not know.",
                value: ''
            },
        ]
    },
    {
        instructions: "Please answer these questions about your partner.",
        completed: false,
        questions: [
            {
                questionType: 'likert',
                name: 'partnerAccuracy',
                label: 'How accurate was your partner at picking the right pictures?',
                range: [1, 7],
                rangeLabels: ['always wrong', '', '',
                    'about half right', '', '', 'always right'],
                value: ''
            },
            {
                questionType: 'input',
                type: 'number',
                name: 'partnerMistakes',
                label: 'About how many mistakes did your partner make?',
                value: ''
            },
            {
                questionType: 'likert',
                name: 'partnerRTPerception',
                label: 'On average, how quickly did your partner respond?',
                range: [1, 7],
                rangeLabels: ['very slow', '', '',
                    'typical', '', '', 'high quality'],
                value: ''
            },
            {
                questionType: 'select',
                name: 'microphoneType',
                label: 'Select the type of microphone you used for this task.',
                options: ['',
                    "Built into computer/laptop", "Head mounted", "Desk mounted"],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'microphoneModel',
                label: "Please write the make and model of your microphone. If it is built into your computer/laptop, please provide the make and model of your computer/laptop. Write 'unknown' if you do not know.",
                value: ''
            },
        ]
    },
    {
        instructions: "Please write about your overall impressions.",
        completed: false,
        questions: [
            {
                questionType: 'textarea',
                name: 'studyImpression',
                label: 'What was your overall impression of the study?',
                cols: 40,
                rows: 2,
                value: ''
            },
            {
                questionType: 'textarea',
                name: 'partnerImpression',
                label: 'What was your overall impression of your partner?',
                cols: 40,
                rows: 2,
                value: ''
            },
        ]
    },
    {
        instructions: "In this study some people were randomly paired with an actual person and some were paired with software meant to act like a person.",
        completed: false,
        questions: [
            {
                questionType: 'likert',
                name: 'partnerComputerLike',
                label: 'Your partner was:',
                range: [1, 7],
                rangeLabels: ['a computer', 'highly likely a computer',
                    'likely a computer',
                    'unsure',
                    'likely a human', 'highly likely a human', 'a human'],
                value: ''
            },
        ]
    },
    {
        instructions: "You specifically were assigned to software meant to act like a person. Part of our research depends on making our software-based partners act believable and natural. Please answer some of these questions about how believable you thought the software was. Your answers will help improve future versions of our studies.",
        completed: false,
        questions: [
            {
                questionType: 'likert',
                name: 'coverStoryPlausibility',
                label: 'How convinced were you by the cover story that we gave at the start of the study?',
                range: [1, 7],
                rangeLabels: ['not convinced',
                    '', 'somewhat not convinced',
                    '',
                    'somewhat convinced', '',
                    'convinced'],
                value: ''
            },
            {
                questionType: 'likert',
                name: 'partnerInteractivity',
                label: 'During the experiment did you feel like you were interacting with another person?',
                range: [1, 7],
                rangeLabels: ['not at all',
                    '', 'mostly not',
                    '',
                    'mostly', '',
                    'absolutely'],
                value: ''
            },
            {
                questionType: 'textarea',
                name: 'partnerRealization',
                label: 'If you realized you were not interacting with an actual person, what caused you to come to that conclusion? If you found our software partner completely convincing you can leave this empty.',
                cols: 40,
                rows: 2,
                value: ''
            },
            {
                questionType: 'textarea',
                name: 'partnerSuspicion',
                label: 'If you were at least somewhat suspicious about whether your partner was an actual person, what caused you to be suspicious? If you were completely convinced you can leave this empty.',
                cols: 40,
                rows: 2,
                value: ''
            },
            {
                questionType: 'textarea',
                name: 'partnerSuggestion',
                label: "Are there any changes in how our software behaves that you feel might make it appear more like you are interacting with a person?",
                cols: 40,
                rows: 2,
                value: ''
            },
        ]
    },
];


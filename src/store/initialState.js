import React from 'react';
import { experimentalLists as expl } from './experimentalLists';

export const instructions = {
    finished_instructions: false,
    instructions: 'In this task you will interact with a partner to complete a picture matching game. During each turn of the game, you or your partner will direct the other person to order a set of pictures. The director will name the pictures out loud and the matcher will click on the pictures based on the order they hear them.'
}

export const consent = {
    consented: false,
    consentFileURL: 'Stamped-ICD_Qualtrics.pdf',
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
    micTestFileSet: [process.env.PUBLIC_URL + '/recordings/mock_recordings/Reading_yankee.ogg',
        process.env.PUBLIC_URL + '/recordings/mock_recordings/Reading_yankee.ogg'],
    micCheck: false,
    micCheckRedos: 0
}

export const experimentalLists = expl;

export const survey = [
    {
        instructions: [<p>The main part of the study is done and you have been disconnected from your partner. Now we want you answer a series of questions about yourself and your experience in the study.</p>, <p>Answering any of these questions is <span style={{fontWeight: 'bold'}}>optional</span>. You answers will not affect your payment for participating. However, we ask that you answer these questions to the best of your ability. Your responses help us to analyze yours and other's data. They also help us improve our future experiments. And they ensure that our research well represents the population.</p>,],
        completed: false,
        questions: []
    },
    {
        instructions: "Please answer these questions about your education and language history.",
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
                name: 'nativeEnglish',
                label: 'Did you learn English prior to the age of three?',
                options: ['', 'Yes',
                    "No"],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'otherNative',
                label: "Did you learn any other languages prior to the age of three?",
                value: ''
            },
        ]
    },
    {
        instructions: "Please answer these additional questions about your language history.",
        completed: false,
        questions: [
            {
                questionType: 'select',
                name: 'dialectRegion',
                label: ['What dialect region do you live in? Please look at ',
                    <a key='dialectMap' target="_blank" rel="noopener noreferrer" href="http://www.aschmann.net/AmEng/#SmallMap">this map</a>, " for reference. If your dialect is specific to a smaller region please select 'Other' and specify its location in the next question."
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
        instructions: "Please answer some questions about this website, your computer, and your microphone.",
        completed: false,
        questions: [
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
                label: "Please write in the make and model of your microphone. If it is built into your computer/laptop, write in the make and model of your computer/laptop. Write 'unknown' if you do not know.",
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
                label: 'How would you rate the quality of your internet connection?',
                range: [1, 7],
                rangeLabels: ['poor quality', '', '',
                    'typical', '', '', 'high quality'],
                value: ''
            },
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
];


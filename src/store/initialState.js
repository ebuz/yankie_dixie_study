import React from 'react';
import { experimentalLists as expl } from './experimentalLists';

export const instructions = {
    finished_instructions: false,
    instructions: 'You and your partner will play a matching game. You have to help each other put pictures in the right order. You will take turns sending each other messages about the order.'
}

export const consent = {
    consented: true,
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
        instructions: [<p>Great job!</p>, <p>You and your partner finished the game!</p>,],
        completed: false,
        questions: []
    },
    {
        instructions: "Child age, education, and language history.",
        completed: false,
        questions: [
            {
                questionType: 'input',
                type: 'text',
                name: 'childAge',
                label: "How old?",
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'childSchoolGrade',
                label: "What grade in school?",
                value: ''
            },
            {
                questionType: 'select',
                name: 'nativeEnglish',
                label: 'Did the child learn English prior to the age of three?',
                options: ['', 'Yes',
                    "No"],
                value: ''
            },
            {
                questionType: 'input',
                type: 'text',
                name: 'otherNative',
                label: "Did the child learn any other languages prior to the age of three?",
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
                label: ['What dialect region does the child live in? Please look at ',
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
                label: "Please specify the dialect region if 'Other'.",
                value: ''
            },
            {
                questionType: 'select',
                name: 'dialectRegionBirth',
                label: 'What prior region might the child have lived in?',
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
                label: "Please specify the dialect region if 'Other'.",
                value: ''
            },
        ]
    },
];



export const surveyService = {
    getSurvey
}

function getSurvey() {
    return Promise.resolve(survey)
}

const survey =
{
    cmps: [
        {
            type: 'textBox',
            info: {
                label: 'Take a note...',
                placeholder: 'Take a note...'
            }
        },
    ]
}
import { surveyService } from '../services/survey.service.js'
import { notesService } from "../services/note.service.js"

import TextBox from './TextBox.js'

export default {
    props: ['notes'],
    template: `
        <section v-if="survey">
        <h2 :style="{color: survey.color}">{{survey.title}}</h2>

            <form @submit.prevent="save" class="form-add-note">
                <div v-for="(cmp, idx) in survey.cmps">
                    <Component 
                    :is="cmp.type"  
                    :info="cmp.info" 
                    @setVal="setAns($event, idx)" />
                </div>
                <button class="btn-save-new-update">Save</button>
            </form>
            <!-- <pre>{{answers}}</pre> -->
        </section>
    `,
    data() {
        return {
            survey: null,
            answers: [],
            newNote: notesService.getEmptyNote()
        }
    },
    methods: {
        save() {
            console.log('Saving..',)
        },
        setAns(ans, idx) {
            // console.log('Setting the answer: ', ans, 'idx:', idx)
            if(!ans)return
            this.newNote.info.txt = ans
            this.$emit('onAddNote', JSON.parse(JSON.stringify(this.newNote)))
        },
    },
    computed: {

    },
    created() {
        surveyService.getSurvey()
            .then(survey => {
                this.survey = survey
                this.answers = new Array(this.survey.cmps.length)
            })
    },
    components: {
        TextBox,
    }
}

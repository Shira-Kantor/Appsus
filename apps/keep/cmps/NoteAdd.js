import { surveyService } from '../services/survey.service.js'
import TextBox from './TextBox.js'

export default {
    props: ['notes'],
	template: `
        <section v-if="survey">
        <h2 :style="{color: survey.color}">{{survey.title}}</h2>
            <form @submit.prevent="save">
                <div v-for="(cmp, idx) in survey.cmps">
                    <Component 
                        :is="cmp.type"  
                        :info="cmp.info" 
                        @setVal="setAns($event, idx)" />
                </div>
                <button>Save</button>
            </form>
            <!-- <pre>{{answers}}</pre> -->
        </section>
    `,
      data() {
        return {
            survey: null,
            answers: []
        }
    },
    methods: {
        save() {
            console.log('Saving..', this.answers) 
        },
        setAns(ans, idx) {
            // console.log('Setting the answer: ', ans, 'idx:', idx) 
             this.$emit('answer', ans)
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

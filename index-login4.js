import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const site = "https://vue3-course-api.hexschool.io/v2/";

const app = createApp({
    data(){
        return{
            user: {
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            console.log(this.user);
            const url=`${site}admin/signin`;
            axios.post(url ,this.user)
            .then((res) => {
                const { expired,token} = res.data; //解構
                console.log(expired,token);
                document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
                window.location = 'products4.html';
            })          
        }
    },
});
app.mount('#app');
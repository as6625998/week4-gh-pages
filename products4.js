import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import pagination from './pagination.js';

const site = "https://vue3-course-api.hexschool.io/v2/";
const api_path = "koung-hexschool";

let productModal = {};
let delProductModal = {};

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imagesUrl:[],
            },
            isNew: false, //編輯或新增使用
            page:{},
        }
    },
    methods: {
        getProducts(page=1){ //參數預設值
            const url = `${site}api/${api_path}/admin/products/?page=${page}`;
            axios.get(url)
            .then(res =>{
                this.products = res.data.products;
                // console.log(this.products);
                this.page = res.data.pagination; //將page存起來,外層定義page
                console.log(res.data);
            })
            .catch(err =>{
                console.log(err.data.message);
            })
        },
        openModal(status ,product){
            if(status === 'create'){
                productModal.show()
                this.isNew = true;
                //帶入初始化資料
                this.tempProduct={
                    imagesUrl:[],
                };
            }else if(status === 'edit'){
                productModal.show()
                this.isNew =false;
                //會帶入當前編輯的資料
                this.tempProduct = {...product};
            }else if(status === 'delete'){
                delProductModal.show()
                this.tempProduct = {...product};
            }
            
        },
        updateProduct(){
            // console.log('updateProduct');
            let url = `${site}api/${api_path}/admin/product`;
            let method = 'post';
            if(!this.isNew){
                url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
                method= 'put';
            }
            axios[method](url , { data: this.tempProduct })
            .then( res => {
                this.getProducts();
                productModal.hide(); //關閉 modal
            })   
        },
        deleteProduct(){
            const url = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
            .then(res =>{
                this.getProducts();
                delProductModal.hide();
            })
        }
    },
    components:{
        pagination,
    },
    
    mounted() {
        const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];
        console.log(cookieValue);

        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.getProducts();

        // Bootstrap 方法
        // 1.初始化 new
        // 2.呼叫方法 .show, hide
        productModal =  new bootstrap.Modal('#productModal');
        // productModal.show(); 
        delProductModal = new bootstrap.Modal('#delProductModal');
    },
});

app.component('product-modal', {
    props:['tempProduct'],
    template:'#product-modal-template'
})

app.mount('#app');